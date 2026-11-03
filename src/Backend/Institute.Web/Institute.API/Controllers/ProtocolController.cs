using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Mvc;

namespace Institute.API.Controllers
{
    // Public: GET /api/protocol → used by the "البروتوكولات و التعاقدات" page
    [Route("api/[controller]")]
    [ApiController]
    public class ProtocolController : ControllerBase
    {
        private readonly IProtocolService _service;
        public ProtocolController(IProtocolService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetPublicAsync());
    }
}