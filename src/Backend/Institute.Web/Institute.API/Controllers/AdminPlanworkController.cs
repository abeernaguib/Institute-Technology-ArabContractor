using Institute.Application.DTOs.AdminDtos;
using Institute.Application.Exceptions;
using Institute.Application.Interfaces.IService;
using Institute.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Institute.API.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class AdminPlanworkController : ControllerBase
    {
        private readonly IPlanworkService _service;
        private readonly IPlanworkRoundService _rounds;

        public AdminPlanworkController(IPlanworkService service, IPlanworkRoundService rounds)
        {
            _service = service;
            _rounds = rounds;
        }

        // 🌳 GET TREE
        [HttpGet("tree")]
        public async Task<IActionResult> GetAdminTree()
        {
            var tree = await _service.GetTreeForAdminAsync();
            return Ok(tree);
        }

        // 🔍 GET BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);

            if (result == null)
                return NotFound(new { message = "Planwork not found" });

            return Ok(result);
        }

        // ➕ CREATE
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePlanworkDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _service.CreateAsync(dto);
                return Ok(new { message = "Created successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // ✏️ UPDATE
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreatePlanworkDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updated = await _service.UpdateAsync(id, dto);

                if (!updated)
                    return NotFound(new { message = "Planwork not found" });

                return Ok(new { message = "Updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.Message,
                    innerException = ex.InnerException?.Message,
                    innerInnerException = ex.InnerException?.InnerException?.Message,
                    fullException = ex.ToString()
                });
            }
        }

        // ❌ DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deleted = await _service.DeleteAsync(id);

                if (!deleted)
                    return NotFound(new { message = "Planwork not found" });

                return Ok(new { message = "Deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // =========================
        // 🔁 ROUNDS
        // =========================
        [HttpGet("{id}/rounds")]
        [Authorize(Policy = "Courses")]
        public async Task<IActionResult> GetRounds(int id)
        {
            try { return Ok(await _rounds.GetRoundsAsync(id)); }
            catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
        }

        [HttpPost("{id}/rounds")]
        [Authorize(Policy = "Courses")]
        public async Task<IActionResult> AddRound(int id, [FromBody] SaveRoundDto dto)
        {
            try { return Ok(await _rounds.AddRoundAsync(id, dto)); }
            catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
            catch (BusinessRuleException ex) { return BadRequest(new { message = ex.Message }); }
        }

        [HttpPut("rounds/{roundId}")]
        [Authorize(Policy = "Courses")]
        public async Task<IActionResult> UpdateRound(int roundId, [FromBody] SaveRoundDto dto)
        {
            try { return Ok(await _rounds.UpdateRoundAsync(roundId, dto)); }
            catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
            catch (BusinessRuleException ex) { return BadRequest(new { message = ex.Message }); }
        }

        [HttpDelete("rounds/{roundId}")]
        [Authorize(Policy = "Courses")]
        public async Task<IActionResult> DeleteRound(int roundId)
        {
            try { await _rounds.DeleteRoundAsync(roundId); return Ok(new { message = "Deleted successfully" }); }
            catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
            catch (BusinessRuleException ex) { return BadRequest(new { message = ex.Message }); }
        }
    }
}