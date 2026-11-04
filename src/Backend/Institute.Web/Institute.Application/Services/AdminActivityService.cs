using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Institute.Application.Services
{
    public class AdminActivityService : IAdminActivityService
    {
        private readonly IRepository<AdminActivityLog> _repo;
        private readonly IRepository<AppUser> _users;
        private readonly IHttpContextAccessor _http;

        public AdminActivityService(IRepository<AdminActivityLog> repo,
            IRepository<AppUser> users, IHttpContextAccessor http)
        {
            _repo = repo; _users = users; _http = http;
        }

        public async Task LogAsync(string actionType, string section, string? subSection,
                                   string controller, string? entityId, string? details)
        {
            try   // logging must never break the admin's real action
            {
                var ctx = _http.HttpContext;
                var clerkId = ctx?.User?.FindFirst("sub")?.Value;
                if (string.IsNullOrEmpty(clerkId)) return;

                var user = await _users.GetByClerkIdAsync(clerkId);
                if (user == null || (!user.IsAdmin && !user.IsManager)) return;

                var name = $"{user.FirstName} {user.LastName}".Trim();
                if (string.IsNullOrWhiteSpace(name)) name = user.Username;

                var ip = ctx?.Request.Headers["X-Forwarded-For"].FirstOrDefault()?.Split(',')[0].Trim()
                         ?? ctx?.Connection.RemoteIpAddress?.ToString();

                if (details != null && details.Length > 4000) details = details[..4000] + "…";

                await _repo.AddAsync(new AdminActivityLog
                {
                    AdminClerkId = clerkId,
                    AdminName = name,
                    AdminEmail = user.Email,
                    AdminRole = user.IsManager ? "Manager" : "Admin",
                    ActionType = actionType,
                    Section = section,
                    SubSection = subSection,
                    EntityType = controller,
                    EntityId = entityId,
                    Details = details,
                    IpAddress = ip,
                    CreatedAt = DateTime.UtcNow
                });
                await _repo.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Admin activity log failed: " + ex.Message);
            }
        }
    }
}