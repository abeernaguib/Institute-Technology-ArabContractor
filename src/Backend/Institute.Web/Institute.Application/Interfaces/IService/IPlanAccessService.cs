namespace Institute.Application.Interfaces.IService;

/// <summary>
/// Decides which courses a user gets for free because the institute admin
/// registered the user's email on the course.
/// </summary>
public interface IPlanAccessService
{
    /// <summary>
    /// PlanId -> date the admin registered the email, for every course this email is registered on.
    /// Empty when the email is null/blank.
    /// </summary>
    Task<Dictionary<int, DateTime>> GetPlanGrantsByEmailAsync(string? email, CancellationToken ct = default);

    /// <summary>True when the email is registered on this plan.</summary>
    Task<bool> HasEmailAccessAsync(string? email, int planId, CancellationToken ct = default);

    /// <summary>Stamps ClaimedAt the first time the email is used (admin table then shows "registered").</summary>
    Task MarkClaimedAsync(string? email, CancellationToken ct = default);
}