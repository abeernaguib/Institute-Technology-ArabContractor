namespace Institute.Domain.Entities;

// One protocol / contract line inside a ProtocolGroup
public partial class ProtocolItem
{
    public int Id { get; set; }
    public int GroupId { get; set; }
    public string Name { get; set; } = null!;
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}