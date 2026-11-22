using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class SiteDocumentController : ControllerBase
{
    private readonly ISiteDocumentService _service;
    public SiteDocumentController(ISiteDocumentService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetPublicAsync());
}