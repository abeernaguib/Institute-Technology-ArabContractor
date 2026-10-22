namespace Institute.Domain.Entities;

public class PlanworkRound
{
    public int Id { get; set; }
    public int PlanworkId { get; set; }
    public Planwork? Planwork { get; set; }

    public DateTime StartDate { get; set; }   // stored as SQL "date"
    public DateTime EndDate { get; set; }
    public bool IsActive { get; set; } = true;
}