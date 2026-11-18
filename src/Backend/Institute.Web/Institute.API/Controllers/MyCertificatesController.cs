using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Institute.API.Controllers
{
    [Route("api/my-certificates")]
    [ApiController]
    [Authorize]
    public class MyCertificatesController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public MyCertificatesController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        // GET api/my-certificates/21
        [HttpGet("{planworkId:int}")]
        public async Task<IActionResult> Get(int planworkId)
        {
            var clerkId = User.FindFirst("sub")?.Value;
            if (string.IsNullOrEmpty(clerkId))
                return Unauthorized();

            var cert = await _adminService.GetCertificateByClerkIdAsync(clerkId, planworkId);

            if (cert == null)
                return NoContent();

            return Ok(cert);
        }
    }
}