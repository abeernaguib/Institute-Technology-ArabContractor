using Institute.Application.DTOs.AdminDtos;
using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Http;
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

        [HttpGet("{planId}")]
        public async Task<IActionResult> GetFiles(int planId)
        {
            var result = await _service.GetFilesAsync(planId);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Add(
            [FromForm] CreatePlanFileDto dto)
        {
            await _service.AddAsync(dto);

            return Ok(new
            {
                message = "File uploaded successfully"
            });
        }

        // PUT api/admin/AdminPlanFiles/{fileId}   (multipart/form-data: planId, FileTitle, FilePeriorty, File?)
        [HttpPut("{fileId}")]
        public async Task<IActionResult> Update(
            int fileId,
            [FromForm] UpdatePlanFileDto dto)
        {
            if (dto.PlanId <= 0)
                return BadRequest(new { message = "planId is required" });

            var ok = await _service.UpdateAsync(fileId, dto);

            return ok
                ? Ok(new { message = "File updated successfully" })
                : NotFound();
        }

        // DELETE api/admin/AdminPlanFiles/{fileId}?planId=5
        [HttpDelete("{fileId}")]
        public async Task<IActionResult> Delete(
            int fileId,
            [FromQuery] int planId)
        {
            if (planId <= 0)
                return BadRequest(new { message = "planId is required" });

            var ok = await _service.DeleteAsync(planId, fileId);

            return ok ? Ok() : NotFound();
        }
    }
}