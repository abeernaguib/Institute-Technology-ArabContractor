using Institute.Domain.Entities;
using Institute.Infrastructure;          // <- namespace of AppDbContext (Institute.Infrastructure/AppDbContext.cs); adjust if different
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Institute.API.Controllers;

public record EmailDto(string? Email);

// Route must produce: /api/admin/AdminPlanEmails/{planId}
// Copy the class-level attributes ([ApiController], [Route], [Authorize]...) from AdminPlanFilesController
// if they differ. RequireAuthForAdminControllersConvention probably already secures "Admin*" controllers.
[ApiController]
[Route("api/admin/[controller]")]
[Authorize(Policy = "PlanEmails")]

public class AdminPlanEmailsController : ControllerBase
{
    private readonly AppDbContext _db;
    public AdminPlanEmailsController(AppDbContext db) => _db = db;

    private static string? Clean(string? e) =>
        string.IsNullOrWhiteSpace(e) ? null : e.Trim().ToLowerInvariant();

    private static bool IsValid(string e) =>
        e.Length <= 256 && new EmailAddressAttribute().IsValid(e);

    private static object Shape(PlanEnrolledEmail x) =>
        new { x.Id, x.Email, x.CreatedAt, isClaimed = x.ClaimedAt != null, x.ClaimedAt };

    [HttpGet("{planId:int}")]
    public async Task<IActionResult> Get(int planId) =>
        Ok(await _db.PlanEnrolledEmails.AsNoTracking()
            .Where(x => x.PlanId == planId)
            .OrderByDescending(x => x.Id)
            .Select(x => new { x.Id, x.Email, x.CreatedAt, isClaimed = x.ClaimedAt != null, x.ClaimedAt })
            .ToListAsync());

    [HttpPost("{planId:int}")]
    public async Task<IActionResult> Add(int planId, [FromBody] EmailDto dto)
    {
        var email = Clean(dto.Email);
        if (email == null || !IsValid(email))
            return BadRequest(new { message = "بريد إلكتروني غير صحيح" });

        if (await _db.PlanEnrolledEmails.AnyAsync(x => x.PlanId == planId && x.Email == email))
            return Conflict(new { message = "هذا البريد مسجل بالفعل لهذه الدورة" });

        var row = new PlanEnrolledEmail { PlanId = planId, Email = email, CreatedBy = User.Identity?.Name };
        _db.PlanEnrolledEmails.Add(row);
        try { await _db.SaveChangesAsync(); }
        catch (DbUpdateException) { return Conflict(new { message = "هذا البريد مسجل بالفعل لهذه الدورة" }); }
        return StatusCode(201, Shape(row));
    }

    [HttpPut("{planId:int}/{id:int}")]
    public async Task<IActionResult> Update(int planId, int id, [FromBody] EmailDto dto)
    {
        var email = Clean(dto.Email);
        if (email == null || !IsValid(email))
            return BadRequest(new { message = "بريد إلكتروني غير صحيح" });

        var row = await _db.PlanEnrolledEmails.FirstOrDefaultAsync(x => x.PlanId == planId && x.Id == id);
        if (row == null) return NotFound(new { message = "غير موجود" });
        if (row.Email == email) return Ok(Shape(row));

        if (await _db.PlanEnrolledEmails.AnyAsync(x => x.PlanId == planId && x.Email == email && x.Id != id))
            return Conflict(new { message = "هذا البريد مسجل بالفعل لهذه الدورة" });

        row.Email = email;
        row.ClaimedAt = null;   // new email => not claimed yet
        try { await _db.SaveChangesAsync(); }
        catch (DbUpdateException) { return Conflict(new { message = "هذا البريد مسجل بالفعل لهذه الدورة" }); }
        return Ok(Shape(row));
    }

    [HttpDelete("{planId:int}/{id:int}")]
    public async Task<IActionResult> Delete(int planId, int id)
    {
        var row = await _db.PlanEnrolledEmails.FirstOrDefaultAsync(x => x.PlanId == planId && x.Id == id);
        if (row == null) return NotFound(new { message = "غير موجود" });
        _db.PlanEnrolledEmails.Remove(row);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}