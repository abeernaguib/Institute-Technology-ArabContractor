namespace Institute.Domain.Entities;

/// <summary>
/// An email registered by the institute admin for a course (Planwork).
/// A user who signs up with this email gets the course without buying it again.
/// </summary>
public class PlanEnrolledEmail
{
    public int Id { get; set; }
    public int PlanId { get; set; }              // FK -> Planwork id
    public string Email { get; set; } = "";      // always stored trimmed + lower-case
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? CreatedBy { get; set; }
    public DateTime? ClaimedAt { get; set; }     // first time a user matched this email
}