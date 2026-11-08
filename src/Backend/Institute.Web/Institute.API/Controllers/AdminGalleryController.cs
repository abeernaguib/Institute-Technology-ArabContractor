// AdminGalleryController.cs
using Institute.Application.DTOs;
using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Institute.API.Controllers
{
    [ApiController]
    [Route("api/admin/[controller]")]          // => api/admin/AdminGallery
    [Authorize(Policy = "Gallery")]
    public class AdminGalleryController : ControllerBase
    {
        private static readonly string[] AllowedTypes = { "image/jpeg", "image/png", "image/webp" };
        private const long MaxPhotoBytes = 5 * 1024 * 1024;

        private readonly IGalleryService _service;
        public AdminGalleryController(IGalleryService service) => _service = service;

        // Turns validation errors thrown by the service into a clean 400
        private async Task<IActionResult> Safe(Func<Task<IActionResult>> action)
        {
            try { return await action(); }
            catch (ArgumentException ex) { return BadRequest(new { message = ex.Message }); }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAdminOverviewAsync());

        [HttpGet("albums/{id:int}")]
        public async Task<IActionResult> GetAlbum(int id)
        {
            var a = await _service.GetAlbumAsync(id);
            return a == null ? NotFound() : Ok(a);
        }

        // ── categories ────────────────────────────────────────────────────
        [HttpPost("categories")]
        public Task<IActionResult> CreateCategory([FromBody] GalleryCategoryInput input) =>
            Safe(async () => Ok(await _service.CreateCategoryAsync(input)));

        [HttpPut("categories/{id:int}")]
        public Task<IActionResult> UpdateCategory(int id, [FromBody] GalleryCategoryInput input) =>
            Safe(async () => { var r = await _service.UpdateCategoryAsync(id, input); return r == null ? NotFound() : Ok(r); });

        [HttpDelete("categories/{id:int}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var (found, error) = await _service.DeleteCategoryAsync(id);
            if (!found) return NotFound();
            if (error != null) return Conflict(new { message = error });
            return Ok(new { message = "Deleted successfully" });
        }

        // ── albums + photos ───────────────────────────────────────────────
        [HttpPost("albums")]
        public Task<IActionResult> CreateAlbum([FromBody] GalleryAlbumInput input) =>
            Safe(async () => Ok(await _service.CreateAlbumAsync(input)));

        [HttpPut("albums/{id:int}")]
        public Task<IActionResult> UpdateAlbum(int id, [FromBody] GalleryAlbumInput input) =>
            Safe(async () => { var r = await _service.UpdateAlbumAsync(id, input); return r == null ? NotFound() : Ok(r); });

        [HttpDelete("albums/{id:int}")]
        public async Task<IActionResult> DeleteAlbum(int id) =>
            await _service.DeleteAlbumAsync(id) ? Ok(new { message = "Deleted successfully" }) : NotFound();

        [HttpPost("albums/{id:int}/photos")]
        public async Task<IActionResult> UploadPhoto(int id, IFormFile file)
        {
            if (file == null || file.Length == 0) return BadRequest(new { message = "File is required" });
            if (file.Length > MaxPhotoBytes) return BadRequest(new { message = "Max size is 5MB" });
            if (!AllowedTypes.Contains(file.ContentType)) return BadRequest(new { message = "Only JPG / PNG / WEBP allowed" });

            var photo = await _service.UploadPhotoAsync(id, file);
            return photo == null ? NotFound() : Ok(photo);
        }

        [HttpDelete("photos/{photoId:int}")]
        public async Task<IActionResult> DeletePhoto(int photoId) =>
            await _service.DeletePhotoAsync(photoId) ? Ok(new { message = "Deleted successfully" }) : NotFound();

        [HttpPut("albums/{albumId:int}/cover/{photoId:int}")]
        public async Task<IActionResult> SetCover(int albumId, int photoId) =>
            await _service.SetCoverAsync(albumId, photoId) ? Ok(new { message = "Cover updated" }) : NotFound();

        // ── video groups + videos ─────────────────────────────────────────
        [HttpPost("video-groups")]
        public Task<IActionResult> CreateGroup([FromBody] GalleryVideoGroupInput input) =>
            Safe(async () => Ok(await _service.CreateVideoGroupAsync(input)));

        [HttpPut("video-groups/{id:int}")]
        public Task<IActionResult> UpdateGroup(int id, [FromBody] GalleryVideoGroupInput input) =>
            Safe(async () => { var r = await _service.UpdateVideoGroupAsync(id, input); return r == null ? NotFound() : Ok(r); });

        [HttpDelete("video-groups/{id:int}")]
        public async Task<IActionResult> DeleteGroup(int id) =>
            await _service.DeleteVideoGroupAsync(id) ? Ok(new { message = "Deleted successfully" }) : NotFound();

        [HttpPost("video-groups/{groupId:int}/videos")]
        public Task<IActionResult> AddVideo(int groupId, [FromBody] GalleryVideoInput input) =>
            Safe(async () => { var r = await _service.AddVideoAsync(groupId, input); return r == null ? NotFound() : Ok(r); });

        [HttpPut("videos/{id:int}")]
        public Task<IActionResult> UpdateVideo(int id, [FromBody] GalleryVideoInput input) =>
            Safe(async () => { var r = await _service.UpdateVideoAsync(id, input); return r == null ? NotFound() : Ok(r); });

        [HttpDelete("videos/{id:int}")]
        public async Task<IActionResult> DeleteVideo(int id) =>
            await _service.DeleteVideoAsync(id) ? Ok(new { message = "Deleted successfully" }) : NotFound();
    }
}