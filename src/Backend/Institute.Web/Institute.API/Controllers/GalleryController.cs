// GalleryController.cs (public)
using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Mvc;

namespace Institute.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : ControllerBase
    {
        private readonly IGalleryService _service;
        public GalleryController(IGalleryService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetOverview() => Ok(await _service.GetPublicOverviewAsync());

        [HttpGet("albums/{id:int}")]
        public async Task<IActionResult> GetAlbum(int id)
        {
            var album = await _service.GetPublicAlbumAsync(id);
            return album == null ? NotFound() : Ok(album);
        }
    }
}