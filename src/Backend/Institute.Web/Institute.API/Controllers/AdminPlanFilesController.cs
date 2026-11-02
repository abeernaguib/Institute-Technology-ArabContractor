using Institute.Application.DTOs.AdminDtos;
using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Mvc;

namespace Institute.API.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class AdminPlanFilesController : ControllerBase
    {
        private readonly IPlanFileService _service;

        public AdminPlanFilesController(IPlanFileService service)
        {
            _service = service;
        }

        [HttpGet("{planId:int}")]
        public async Task<IActionResult> GetFiles(int planId)
        {
            var result = await _service.GetFilesAsync(planId);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromForm] CreatePlanFileDto dto)
        {
            await _service.AddAsync(dto);
            return Ok(new { message = "File uploaded successfully" });
        }

        [HttpPut("{fileId:int}")]
        public async Task<IActionResult> Update(int fileId, [FromForm] UpdatePlanFileDto dto)
        {
            var updated = await _service.UpdateAsync(fileId, dto);
            if (!updated)
                return NotFound(new { message = $"File {fileId} not found" });

            return Ok(new { message = "File updated successfully" });
        }

        [HttpDelete("{fileId:int}")]
        public async Task<IActionResult> Delete(int fileId)
        {
            var deleted = await _service.DeleteAsync(fileId);
            if (!deleted)
                return NotFound(new { message = $"File {fileId} not found" });

            return NoContent();
        }
    }
}