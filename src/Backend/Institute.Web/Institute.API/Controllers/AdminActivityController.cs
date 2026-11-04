using Institute.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Institute.API.Controllers
{
    [Authorize(Policy = "ManagerOnly")]
    [Route("api/admin/[controller]")]
    [ApiController]
    public class AdminActivityController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AdminActivityController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] string? search = null,
            [FromQuery] string? entityType = null,
            [FromQuery] string? actionType = null,
            [FromQuery] string? role = null,
            [FromQuery] DateTime? from = null,
            [FromQuery] DateTime? to = null)
        {
            page = Math.Max(page, 1);
            pageSize = Math.Clamp(pageSize, 1, 100);

            var q = _context.AdminActivityLogs.AsNoTracking().AsQueryable();

            if (!string.IsNullOrWhiteSpace(entityType)) q = q.Where(x => x.EntityType == entityType);
            if (!string.IsNullOrWhiteSpace(actionType)) q = q.Where(x => x.ActionType == actionType);
            if (!string.IsNullOrWhiteSpace(role)) q = q.Where(x => x.AdminRole == role);
            if (from.HasValue) { var f = from.Value.ToUniversalTime(); q = q.Where(x => x.CreatedAt >= f); }
            if (to.HasValue) { var t = to.Value.ToUniversalTime(); q = q.Where(x => x.CreatedAt < t); }
            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.Trim();
                q = q.Where(x => (x.AdminName != null && x.AdminName.Contains(s))
                              || (x.AdminEmail != null && x.AdminEmail.Contains(s))
                              || (x.Details != null && x.Details.Contains(s)));
            }

            var total = await q.CountAsync();
            var rows = await q.OrderByDescending(x => x.CreatedAt)
                              .Skip((page - 1) * pageSize).Take(pageSize)
                              .ToListAsync();

            var items = rows.Select(x => new
            {
                x.Id,
                x.AdminName,
                x.AdminEmail,
                x.AdminRole,
                x.ActionType,
                x.EntityType,
                x.EntityId,
                x.Details,
                x.IpAddress,
                CreatedAt = DateTime.SpecifyKind(x.CreatedAt, DateTimeKind.Utc)
            });

            return Ok(new { total, page, pageSize, items });
        }
    }
}