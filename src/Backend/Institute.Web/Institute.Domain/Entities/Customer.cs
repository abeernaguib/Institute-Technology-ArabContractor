namespace Institute.Domain.Entities;

public partial class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Logo { get; set; }          // file name only (stored in blob folder "customers")
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}