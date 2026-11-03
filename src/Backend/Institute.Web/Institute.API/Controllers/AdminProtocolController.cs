using Institute.Application.DTOs;
using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Institute.API.Controllers
{
    [ApiController]
    [Route("api/admin/[controller]")]
    [Authorize(Policy = "Protocols")]   // needs "Protocols" in Program.cs permissionNames
    public class AdminProtocolController : ControllerBase
    {
        private readonly IProtocolService _service;
        public AdminProtocolController(IProtocolService service) => _service = service;

        // ═════════ Items ═════════
        [HttpGet]
        public async Task<IActionResult> GetItems() => Ok(await _service.GetItemsAsync());

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetItem(int id)
        {
            var result = await _service.GetItemByIdAsync(id);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] ProtocolItemCreateUpdateDto dto)
        {
            if (!await _service.GroupExistsAsync(dto.GroupId))
                return BadRequest(new { message = "القسم غير موجود" });

            var created = await _service.CreateItemAsync(dto);
            return CreatedAtAction(nameof(GetItem), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] ProtocolItemCreateUpdateDto dto)
        {
            if (!await _service.GroupExistsAsync(dto.GroupId))
                return BadRequest(new { message = "القسم غير موجود" });

            var updated = await _service.UpdateItemAsync(id, dto);
            return updated == null ? NotFound() : Ok(updated);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var ok = await _service.DeleteItemAsync(id);
            return ok ? Ok(new { message = "Deleted successfully" }) : NotFound();
        }

        // ═════════ Groups ═════════
        [HttpGet("groups")]
        public async Task<IActionResult> GetGroups() => Ok(await _service.GetGroupsAsync());

        [HttpPost("groups")]
        public async Task<IActionResult> CreateGroup([FromBody] ProtocolGroupCreateUpdateDto dto)
            => Ok(await _service.CreateGroupAsync(dto));

        [HttpPut("groups/{id:int}")]
        public async Task<IActionResult> UpdateGroup(int id, [FromBody] ProtocolGroupCreateUpdateDto dto)
        {
            var updated = await _service.UpdateGroupAsync(id, dto);
            return updated == null ? NotFound() : Ok(updated);
        }

        [HttpDelete("groups/{id:int}")]
        public async Task<IActionResult> DeleteGroup(int id)
        {
            var result = await _service.DeleteGroupAsync(id);
            return result switch
            {
                DeleteGroupResult.Deleted => Ok(new { message = "Deleted successfully" }),
                DeleteGroupResult.HasItems => Conflict(new { message = "لا يمكن حذف قسم يحتوي على بروتوكولات. انقلها أو احذفها أولاً." }),
                _ => NotFound()
            };
        }
    }
}