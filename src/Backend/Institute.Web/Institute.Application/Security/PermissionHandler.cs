
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;

namespace Institute.Application.Security
{
    public class PermissionHandler : AuthorizationHandler<PermissionRequirement>
    {
        private readonly IUserPermissionService _service;
        private readonly ICurrentUserService _currentUser;

        public PermissionHandler(
            IUserPermissionService service,
            ICurrentUserService currentUser)
        {
            _service = service;
            _currentUser = currentUser;
        }

        protected override async Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            PermissionRequirement requirement)
        {
            // Managers can access every permission-protected tab.
            if (await _currentUser.IsManagerAsync())
            {
                context.Succeed(requirement);
                return;
            }

            var clerkId = context.User.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(clerkId))
                return;

            var permissions =
                await _service.GetPermissionsByClerkId(clerkId);

            if (permissions.Contains(requirement.Permission))
            {
                context.Succeed(requirement);
            }
        }
    }
}
