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

        // ───────────────────────── details text ─────────────────────────
        private async Task<string> BuildDetails(List<AuditChange> audits)
        {
            var cache = new Dictionary<string, string?>();
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

                var parts = new List<string>();

                // which course / user / round ... this belongs to
                foreach (var kv in a.Ctx)
                {
                    var text = await DescribeContext(a.Entity, kv.Key, kv.Value, cache);
                    if (text != null) parts.Add(text);
                }

                foreach (var f in a.Fields)
                {
                    // ids already shown above as names (skip on add / delete)
                    if (a.Action != "Update" && a.Ctx.ContainsKey(f.Field)) continue;

                    var name = ActivityMap.Field(f.Field);
                    if (f.Long)
                        parts.Add(a.Action == "Update" ? $"{name}: تم التعديل" : $"{name}: (نص طويل)");
                    else if (a.Action == "Update")
                        parts.Add($"{name}: من «{f.Old}» إلى «{f.New}»");
                    else
                        parts.Add($"{name}: «{f.New ?? f.Old}»");
                }

                if (a.Action == "Update" && !a.Fields.Any())
                    parts.Add("بدون تغيير في القيم");

                lines.Add(parts.Count == 0 ? head : head + "\n   " + string.Join("\n   ", parts));
            }

            if (audits.Count > 15) lines.Add($"… و{audits.Count - 15} تغييرات أخرى");
            return string.Join("\n", lines);
        }

        private async Task<string?> DescribeContext(string entity, string key, string value,
            Dictionary<string, string?> cache)
        {
            if (!int.TryParse(value, out var id) || id <= 0) return null;

            switch (key)
            {
                case "PlanId":
                case "PlanworkId":
                    if (entity == "Planwork") return null;
                    var course = await Cached(cache, $"course:{id}", async () =>
                        TitleOf(await _db.Planworks.AsNoTracking().FirstOrDefaultAsync(p => p.ChildId == id)));
                    return $"الدورة: «{course ?? "—"}» (#{id})";

                case "UserId":
                case "AppUserId":
                    if (entity == "AppUser") return null;
                    var user = await Cached(cache, $"user:{id}", async () =>
                    {
                        var u = await _db.AppUsers.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
                        if (u == null) return null;
                        var n = $"{u.FirstName} {u.LastName}".Trim();
                        return $"{(string.IsNullOrWhiteSpace(n) ? u.Username : n)} ({u.Email})";
                    });
                    return $"المستخدم: «{user ?? "—"}» (#{id})";

                case "RoundId":
                    var round = await Cached(cache, $"round:{id}", async () =>
                    {
                        var r = await _db.PlanworkRounds.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
                        return r == null ? null : $"من {r.StartDate:yyyy-MM-dd} إلى {r.EndDate:yyyy-MM-dd}";
                    });
                    return $"موعد الانعقاد: {round ?? "—"}";

                case "GroupId":
                    var group = await Cached(cache, $"group:{id}", async () =>
                        TitleOf(await _db.ProtocolGroups.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id)));
                    return $"المجموعة: «{group ?? "—"}»";

                case "TypeId":
                    if (entity == "BooksType") return null;
                    var type = await Cached(cache, $"btype:{id}", async () =>
                        TitleOf(await _db.BooksTypes.AsNoTracking().FirstOrDefaultAsync(x => x.TypeId == id)));
                    return $"نوع الكتاب: «{type ?? "—"}»";

                case "OrderId":
                    return $"رقم الطلب: #{id}";

                default:
                    return null;
            }
        }

        private static async Task<string?> Cached(Dictionary<string, string?> cache, string key,
            Func<Task<string?>> load)
        {
            if (cache.TryGetValue(key, out var v)) return v;
            v = await load();
            cache[key] = v;
            return v;
        }

        // first short text property named like Name / Title (works for any entity)
        private static string? TitleOf(object? entity)
        {
            if (entity == null) return null;
            var props = entity.GetType().GetProperties().Where(p => p.PropertyType == typeof(string)).ToList();

            foreach (var n in new[] { "Name", "Title", "PlanName", "CourseName", "CourseTitle", "PlanTitle", "TypeName" })
            {
                var p = props.FirstOrDefault(x => x.Name.Equals(n, StringComparison.OrdinalIgnoreCase));
                if (p?.GetValue(entity) is string s && !string.IsNullOrWhiteSpace(s)) return Cut(s);
            }
            foreach (var p in props)
            {
                if (p.Name.Contains("name", StringComparison.OrdinalIgnoreCase)
                    || p.Name.Contains("title", StringComparison.OrdinalIgnoreCase)
                    || p.Name.Contains("titel", StringComparison.OrdinalIgnoreCase))
                    if (p.GetValue(entity) is string s && !string.IsNullOrWhiteSpace(s) && s.Length <= 200)
                        return Cut(s);
            }
            return null;
        }

        private static string Cut(string s) => s.Length > 80 ? s[..80] + "…" : s;

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