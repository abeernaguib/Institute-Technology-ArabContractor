using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;

namespace Institute.Application.Security
{
    public class AnyPermissionRequirement : IAuthorizationRequirement
    {
        public string[] Permissions { get; }
        public AnyPermissionRequirement(params string[] permissions) => Permissions = permissions;
    }

    public class AnyPermissionHandler : AuthorizationHandler<AnyPermissionRequirement>
    {
        private readonly IUserPermissionService _service;
        private readonly ICurrentUserService _currentUser;

        public AnyPermissionHandler(IUserPermissionService service, ICurrentUserService currentUser)
        {
            _service = service;
            _currentUser = currentUser;
        }

        protected override async Task HandleRequirementAsync(
            AuthorizationHandlerContext context, AnyPermissionRequirement requirement)
        {
            if (await _currentUser.IsManagerAsync()) { context.Succeed(requirement); return; }

            var clerkId = context.User.FindFirst("sub")?.Value;
            if (string.IsNullOrEmpty(clerkId)) return;

            var permissions = await _service.GetPermissionsByClerkId(clerkId);

            if (requirement.Permissions.Any(p =>
                    permissions.Contains(p, StringComparer.OrdinalIgnoreCase)))
                context.Succeed(requirement);
        }
    }
}