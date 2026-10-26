namespace Institute.Domain.Entities;

public partial class TeamMember
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Role { get; set; }
    public int Level { get; set; } = 3;          // 1 chairman, 2 director, 3 deputies
    public int DisplayOrder { get; set; }
    public string? Pic { get; set; }              // file name in blob "team" folder, or a site path like /images/team1.jpg
    public bool IsActive { get; set; } = true;
}