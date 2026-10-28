namespace Institute.Domain.Entities;

public partial class TeamMember
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Role { get; set; }
    public int Level { get; set; } = 3;          // 1 chairman, 2 director, 3 deputies
    public int DisplayOrder { get; set; }
    public string? Pic { get; set; }
    public bool IsActive { get; set; } = true;

    public string? Email { get; set; }
    public string? Details { get; set; }          // rich text (base64 from the admin): qualifications + experience
}