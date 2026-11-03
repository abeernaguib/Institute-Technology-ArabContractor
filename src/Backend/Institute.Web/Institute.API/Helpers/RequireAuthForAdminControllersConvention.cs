using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace Institute.API.Helpers
{
    // Safety net: every admin controller requires a logged-in user.
    // Policies on the controllers (Users, Lecturers, Team...) are added on top of this.
    public class RequireAuthForAdminControllersConvention : IControllerModelConvention
    {
        public void Apply(ControllerModel controller)
        {
            var isAdminController =
                controller.ControllerName.StartsWith("Admin", StringComparison.OrdinalIgnoreCase) ||
                controller.Selectors.Any(s =>
                    s.AttributeRouteModel?.Template?.StartsWith("api/admin", StringComparison.OrdinalIgnoreCase) == true);

            if (!isAdminController) return;

            foreach (var selector in controller.Selectors)
                selector.EndpointMetadata.Add(new AuthorizeAttribute());
        }
    }
}