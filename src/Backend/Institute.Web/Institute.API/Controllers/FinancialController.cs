using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Institute.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FinancialController : ControllerBase
    {
        private readonly IFinancialReportService _report;
        private readonly ICurrentUserService _currentUser;
        private readonly IUserPermissionService _permissionService;

        public FinancialController(
            IFinancialReportService report,
            ICurrentUserService currentUser,
            IUserPermissionService permissionService)
        {
            _report = report;
            _currentUser = currentUser;
            _permissionService = permissionService;
        }

        /// GET /api/financial/report?from=2026-10-01&to=2026-10-28
        [HttpGet("report")]
        public async Task<IActionResult> GetReport([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            if (!await HasFinanceAccessAsync())
                return Forbid();

            if (from.HasValue && to.HasValue && from.Value.Date > to.Value.Date)
                return BadRequest(new { success = false, message = "تاريخ البداية بعد تاريخ النهاية." });

            return Ok(await _report.GetReportAsync(from, to));
        }

        // Managers, or users granted the "Finance" permission (same name as the tab in Admin.jsx)
        private async Task<bool> HasFinanceAccessAsync()
        {
            var clerkId = _currentUser.UserId;
            if (string.IsNullOrEmpty(clerkId)) return false;

            var (isManager, permissions) = await _permissionService.GetMyRoleAsync(clerkId);
            return isManager || (permissions?.Any(p =>
                string.Equals(p, "Finance", StringComparison.OrdinalIgnoreCase)) ?? false);
        }
    }
}