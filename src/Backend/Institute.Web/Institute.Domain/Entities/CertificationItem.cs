namespace Institute.Domain.Entities;

public partial class CertificationItem
{
    public int Id { get; set; }
    public int Type { get; set; } = 1;            // 1 = certificate / accreditation, 2 = thank letter
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string? LinkUrl { get; set; }
    public string? LinkText { get; set; }
    public string? Pic { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}