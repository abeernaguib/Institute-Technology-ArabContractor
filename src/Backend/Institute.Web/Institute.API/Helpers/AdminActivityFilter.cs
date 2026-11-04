using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Institute.API.Helpers
{
    public class AdminActivityFilter : IAsyncActionFilter
    {
        private readonly IAdminActivityService _activity;
        public AdminActivityFilter(IAdminActivityService activity) => _activity = activity;

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
                var req = context.HttpContext.Request;
                if (!WriteMethods.Contains(req.Method)) return;
                if (context.HttpContext.User?.Identity?.IsAuthenticated != true) return;
                if (executed.Exception != null && !executed.ExceptionHandled) return;

                var controller = context.RouteData.Values["controller"]?.ToString() ?? "";
                var isAdminArea = controller.StartsWith("Admin", StringComparison.OrdinalIgnoreCase)
                                  || ExtraControllers.Contains(controller);
                if (!isAdminArea) return;

                // log only successful actions
                var status = (executed.Result as IStatusCodeActionResult)?.StatusCode ?? 200;
                if (status >= 400) return;

                var actionType = req.Method.ToUpperInvariant() switch
                {
                    "POST" => "Create",
                    "DELETE" => "Delete",
                    _ => "Update"
                };

                var entityId = context.RouteData.Values
                    .Where(kv => kv.Key != "controller" && kv.Key != "action" && kv.Key != "area")
                    .Select(kv => kv.Value?.ToString())
                    .FirstOrDefault();

                var args = Summarize(context.ActionArguments);
                var details = $"{req.Method} {req.Path.Value}" + (args.Length > 0 ? $" | {args}" : "");

                await _activity.LogAsync(actionType, controller, entityId, details);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Admin activity filter failed: " + ex.Message);
            }
        }

        // Short summary of simple values (ids, true/false, numbers). Never strings or files.
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