namespace Institute.Application.DTOs
{
    public class TeamMemberListDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Role { get; set; }
        public int Level { get; set; }
        public string? Pic { get; set; }
        public bool HasCv { get; set; }
    }
}