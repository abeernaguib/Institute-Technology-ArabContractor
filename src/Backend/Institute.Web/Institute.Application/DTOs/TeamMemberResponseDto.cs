// TeamMemberResponseDto.cs  (admin + public CV details)
namespace Institute.Application.DTOs
{
    public class TeamMemberResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Role { get; set; }
        public int Level { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
        public string? Pic { get; set; }
        public string? Email { get; set; }
        public string? Details { get; set; }
    }
}