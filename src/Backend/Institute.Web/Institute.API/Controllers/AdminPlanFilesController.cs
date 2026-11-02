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

        // GET api/admin/AdminPlanFiles/{planId}
        [HttpGet("{planId:int}")]
        public async Task<IActionResult> GetFiles(int planId)
        {
            var result = await _service.GetFilesAsync(planId);
            return Ok(result);
        }

        // POST api/admin/AdminPlanFiles
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] CreatePlanFileDto dto)
        {
            await _service.AddAsync(dto);
            return Ok(new { message = "File uploaded successfully" });
        }

        // PUT api/admin/AdminPlanFiles/{planId}/{fileId}
        [HttpPut("{planId:int}/{fileId:int}")]
        public async Task<IActionResult> Update(int planId, int fileId, [FromForm] UpdatePlanFileDto dto)
        {
            var updated = await _service.UpdateAsync(planId, fileId, dto);
            if (!updated)
                return NotFound(new { message = $"File {fileId} not found in plan {planId}" });

            return Ok(new { message = "File updated successfully" });
        }

        // DELETE api/admin/AdminPlanFiles/{planId}/{fileId}
        [HttpDelete("{planId:int}/{fileId:int}")]
        public async Task<IActionResult> Delete(int planId, int fileId)
        {
            var deleted = await _service.DeleteAsync(planId, fileId);
            if (!deleted)
                return NotFound(new { message = $"File {fileId} not found in plan {planId}" });

            return NoContent();
        }
    }
}