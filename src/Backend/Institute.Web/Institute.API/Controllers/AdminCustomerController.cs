using Institute.Application.DTOs;
using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Institute.API.Controllers
{
    [ApiController]
    [Route("api/admin/[controller]")]
    [Authorize(Policy = "Settings")]   // same policy as AdminTeamController
    public class AdminCustomerController : ControllerBase
    {
        private static readonly string[] AllowedTypes = { "image/jpeg", "image/png", "image/webp" };
        private const long MaxLogoBytes = 5 * 1024 * 1024;

        private readonly ICustomerService _service;
        public AdminCustomerController(ICustomerService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CustomerCreateUpdateDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CustomerCreateUpdateDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            return updated == null ? NotFound() : Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _service.DeleteAsync(id);
            return ok ? Ok(new { message = "Deleted successfully" }) : NotFound();
        }

        [HttpPost("{id}/logo")]
        public async Task<IActionResult> UploadLogo(int id, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "File is required" });
            if (file.Length > MaxLogoBytes)
                return BadRequest(new { message = "Max size is 5MB" });
            if (!AllowedTypes.Contains(file.ContentType))
                return BadRequest(new { message = "Only JPG / PNG / WEBP allowed" });

            var imageUrl = await _service.UploadLogoAsync(id, file);
            return imageUrl == null ? NotFound() : Ok(new { imageUrl });
        }

        [HttpDelete("{id}/logo")]
        public async Task<IActionResult> DeleteLogo(int id)
        {
            var ok = await _service.DeleteLogoAsync(id);
            return ok ? Ok(new { message = "Logo removed" }) : NotFound();
        }
    }
}