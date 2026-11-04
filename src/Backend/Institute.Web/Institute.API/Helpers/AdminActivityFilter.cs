using Institute.Application.Interfaces.IService;
using Institute.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Institute.API.Helpers
{
    public class AdminActivityFilter : IAsyncActionFilter
    {
        private readonly IAdminActivityService _activity;
        private readonly AppDbContext _db;

        public AdminActivityFilter(IAdminActivityService activity, AppDbContext db)
        {
            _activity = activity;
            _db = db;
        }

        private static readonly HashSet<string> WriteMethods =
            new(StringComparer.OrdinalIgnoreCase) { "POST", "PUT", "PATCH", "DELETE" };

        // Controllers NOT starting with "Admin" that admins also write to
        private static readonly HashSet<string> ExtraControllers =
            new(StringComparer.OrdinalIgnoreCase) { "UserPermissions", "Refund" };

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var executed = await next();   // run the real action first

            try
            {
                // what EF saved during this request (old -> new values)
                var audits = _db.AuditChanges.ToList();
                _db.AuditChanges.Clear();

                var req = context.HttpContext.Request;
                if (!WriteMethods.Contains(req.Method)) return;
                if (context.HttpContext.User?.Identity?.IsAuthenticated != true) return;
                if (executed.Exception != null && !executed.ExceptionHandled) return;

                var controller = context.RouteData.Values["controller"]?.ToString() ?? "";
                var isAdminArea = controller.StartsWith("Admin", StringComparison.OrdinalIgnoreCase)
                                  || ExtraControllers.Contains(controller);
                if (!isAdminArea) return;

                var status = (executed.Result as IStatusCodeActionResult)?.StatusCode ?? 200;
                if (status >= 400) return;

                var path = req.Path.Value ?? "";
                var (section, sub) = ActivityMap.Resolve(controller, path);

                string actionType;
                if (audits.Count > 0)
                    actionType = audits.Select(a => a.Action).Distinct().Count() == 1 ? audits[0].Action : "Update";
                else
                    actionType = req.Method.ToUpperInvariant() switch
                    {
                        "POST" => "Create",
                        "DELETE" => "Delete",
                        _ => "Update"
                    };

                var routeId = context.RouteData.Values
                    .Where(kv => kv.Key != "controller" && kv.Key != "action" && kv.Key != "area")
                    .Select(kv => kv.Value?.ToString())
                    .FirstOrDefault();
                var entityId = audits.FirstOrDefault(a => a.Key != null)?.Key ?? routeId;

                string details;
                if (audits.Count > 0)
                    details = await BuildDetails(audits);
                else
                {
                    var args = Summarize(context.ActionArguments);
                    details = $"{req.Method} {path}" + (args.Length > 0 ? $" | {args}" : "");
                }

                await _activity.LogAsync(actionType, section, sub, controller, entityId, details);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Admin activity filter failed: " + ex.Message);
            }
        }

        private async Task<string> BuildDetails(List<AuditChange> audits)
        {
            var lines = new List<string>();

            foreach (var a in audits.Take(15))
            {
                if (a.Entity == "UserPermission")
                {
                    lines.Add(await DescribePermission(a));
                    continue;
                }

                var verb = a.Action == "Create" ? "إضافة" : a.Action == "Delete" ? "حذف" : "تعديل";
                var head = $"{verb} {ActivityMap.EntityLabel(a.Entity)}"
                         + (a.Label != null ? $" «{a.Label}»" : "")
                         + (a.Key != null ? $" (#{a.Key})" : "");

                var parts = a.Fields.Select(f =>
                {
                    var name = ActivityMap.Field(f.Field);
                    if (f.Long) return a.Action == "Update" ? $"{name}: تم التعديل" : $"{name}: (نص طويل)";
                    return a.Action == "Update"
                        ? $"{name}: من «{f.Old}» إلى «{f.New}»"
                        : $"{name}: «{f.New ?? f.Old}»";
                }).ToList();

                if (parts.Count == 0)
                    lines.Add(head + (a.Action == "Update" ? " — بدون تغيير في البيانات" : ""));
                else
                    lines.Add(head + "\n   " + string.Join("\n   ", parts));
            }

            if (audits.Count > 15) lines.Add($"… و{audits.Count - 15} تغييرات أخرى");
            return string.Join("\n", lines);
        }

        private async Task<string> DescribePermission(AuditChange a)
        {
            string? Val(string field)
            {
                var f = a.Fields.FirstOrDefault(x => x.Field == field);
                return f?.New ?? f?.Old;
            }

            int.TryParse(Val("AppUserId"), out var uid);
            int.TryParse(Val("PermissionId"), out var pid);

            var user = uid > 0 ? await _db.AppUsers.AsNoTracking().FirstOrDefaultAsync(u => u.Id == uid) : null;
            var perm = pid > 0 ? await _db.Permissions.AsNoTracking().FirstOrDefaultAsync(p => p.Id == pid) : null;

            var verb = a.Action == "Delete" ? "سحب" : "منح";
            var prep = a.Action == "Delete" ? "من" : "إلى";
            var full = $"{user?.FirstName} {user?.LastName}".Trim();
            var who = user != null ? $"{full} ({user.Email})" : $"مستخدم #{uid}";

            return $"{verb} صلاحية «{perm?.Name ?? pid.ToString()}» {prep} {who}";
        }

        // Fallback summary (only when EF saved nothing): simple values only
        private static string Summarize(IDictionary<string, object?> args)
        {
            var parts = new List<string>();
            foreach (var (key, value) in args)
            {
                if (value == null) continue;
                var t = value.GetType();

                if (t.IsPrimitive || t == typeof(decimal) || t == typeof(Guid) || t.IsEnum)
                {
                    parts.Add($"{key}={value}");
                    continue;
                }
                if (value is string || value is IFormFile || value is System.Collections.IEnumerable) continue;

                foreach (var p in t.GetProperties())
                {
                    if (p.GetIndexParameters().Length > 0) continue;
                    var pt = Nullable.GetUnderlyingType(p.PropertyType) ?? p.PropertyType;
                    if (pt == typeof(bool) || pt == typeof(int) || pt == typeof(long) ||
                        pt == typeof(decimal) || pt.IsEnum)
                    {
                        var v = p.GetValue(value);
                        if (v != null) parts.Add($"{p.Name}={v}");
                    }
                }
            }
            return string.Join(", ", parts);
        }
    }
}