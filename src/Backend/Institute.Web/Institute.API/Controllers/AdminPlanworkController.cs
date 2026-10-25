
using Institute.Application.DTOs.AdminDtos;
using Institute.Application.Exceptions;
using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Institute.API.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class AdminPlanworkController : ControllerBase
    {
        private readonly IPlanworkService _service;
        private readonly IPlanworkRoundService _rounds;

        public AdminPlanworkController(
            IPlanworkService service,
            IPlanworkRoundService rounds)
        {
            _service = service;
            _rounds = rounds;
        }

        // PLANWORK: requires Workplan permission

        [HttpGet("tree")]
        [Authorize(Policy = "Workplan")]
        public async Task<IActionResult> GetAdminTree()
        {
            var tree = await _service.GetTreeForAdminAsync();
            return Ok(tree);
        }

        [HttpGet("{id}")]
        [Authorize(Policy = "Workplan")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);

            if (result == null)
                return NotFound(new { message = "Planwork not found" });

            return Ok(result);
        }

        [HttpPost]
        [Authorize(Policy = "Workplan")]
        public async Task<IActionResult> Create(
            [FromBody] CreatePlanworkDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var id = await _service.CreateAsync(dto);
                return Ok(new { id, message = "Created successfully" });
            }
            catch (BusinessRuleException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while creating Planwork."
                });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "Workplan")]
        public async Task<IActionResult> Update(
            int id,
            [FromBody] CreatePlanworkDto dto)
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
            catch (BusinessRuleException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while updating Planwork."
                });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "Workplan")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deleted = await _service.DeleteAsync(id);

                if (!deleted)
                    return NotFound(new { message = "Planwork not found" });

                return Ok(new { message = "Deleted successfully" });
            }
            catch (BusinessRuleException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while deleting Planwork."
                });
            }
        }

        // ROUNDS: requires Courses permission

        [HttpGet("{id}/rounds")]
        [Authorize(Policy = "Courses")]
        public async Task<IActionResult> GetRounds(int id)
        {
            try
            {
                return Ok(await _rounds.GetRoundsAsync(id));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPost("{id}/rounds")]
        [Authorize(Policy = "Courses")]
        public async Task<IActionResult> AddRound(
            int id,
            [FromBody] SaveRoundDto dto)
        {
            try
            {
                return Ok(await _rounds.AddRoundAsync(id, dto));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (BusinessRuleException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("rounds/{roundId}")]
        [Authorize(Policy = "Courses")]
        public async Task<IActionResult> UpdateRound(
            int roundId,
            [FromBody] SaveRoundDto dto)
        {
            try
            {
                return Ok(await _rounds.UpdateRoundAsync(roundId, dto));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (BusinessRuleException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("rounds/{roundId}")]
        [Authorize(Policy = "Courses")]
        public async Task<IActionResult> DeleteRound(int roundId)
        {
            try
            {
                await _rounds.DeleteRoundAsync(roundId);
                return Ok(new { message = "Deleted successfully" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (BusinessRuleException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
