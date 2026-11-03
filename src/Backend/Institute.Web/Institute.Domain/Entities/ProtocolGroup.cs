namespace Institute.Domain.Entities;

// A section on the "البروتوكولات و التعاقدات" page (e.g. البروتوكولات الدولية)
public partial class ProtocolGroup
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Icon { get; set; }          // an emoji, shown beside the title and on every card
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}