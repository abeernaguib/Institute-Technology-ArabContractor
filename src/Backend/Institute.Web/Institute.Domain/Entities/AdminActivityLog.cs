namespace Institute.Domain.Entities;

public class AdminActivityLog
{
    public int Id { get; set; }
    public string AdminClerkId { get; set; } = null!;
    public string? AdminName { get; set; }
    public string? AdminEmail { get; set; }
    public string? AdminRole { get; set; }      // Manager / Admin
    public string ActionType { get; set; } = null!;
    public string? Section { get; set; }        // sidebar tab id: team, courses, ...
    public string? SubSection { get; set; }     // part inside the tab
    public string EntityType { get; set; } = null!;
    public string? EntityId { get; set; }
    public string? Details { get; set; }
    public string? IpAddress { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}