using Institute.Application.Interfaces.IService;
using Microsoft.EntityFrameworkCore;

namespace Institute.Infrastructure;

public class PlanAccessService : IPlanAccessService
{
    private readonly AppDbContext _db;
    public PlanAccessService(AppDbContext db) => _db = db;

    private static string? Norm(string? e) =>
        string.IsNullOrWhiteSpace(e) ? null : e.Trim().ToLowerInvariant();

    public async Task<Dictionary<int, DateTime>> GetPlanGrantsByEmailAsync(string? email, CancellationToken ct = default)
    {
        var e = Norm(email);
        if (e == null) return new Dictionary<int, DateTime>();

        var rows = await _db.PlanEnrolledEmails.AsNoTracking()
            .Where(x => x.Email == e)
            .Select(x => new { x.PlanId, x.CreatedAt })
            .ToListAsync(ct);

        return rows.GroupBy(r => r.PlanId)
                   .ToDictionary(g => g.Key, g => g.Min(r => r.CreatedAt));
    }

    public async Task<bool> HasEmailAccessAsync(string? email, int planId, CancellationToken ct = default)
    {
        var e = Norm(email);
        if (e == null) return false;
        return await _db.PlanEnrolledEmails.AsNoTracking()
            .AnyAsync(x => x.Email == e && x.PlanId == planId, ct);
    }

    public async Task MarkClaimedAsync(string? email, CancellationToken ct = default)
    {
        var e = Norm(email);
        if (e == null) return;
        await _db.PlanEnrolledEmails
            .Where(x => x.Email == e && x.ClaimedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.ClaimedAt, DateTime.UtcNow), ct);
    }
}