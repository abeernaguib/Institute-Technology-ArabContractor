// TeamMemberCreateUpdateDto.cs
using System.ComponentModel.DataAnnotations;

namespace Institute.Application.DTOs
{
    public class TeamMemberCreateUpdateDto
    {
        [Required, MaxLength(200)]
        public string Name { get; set; } = null!;

        [MaxLength(400)]
        public string? Role { get; set; }

        [Range(1, 3)]
        public int Level { get; set; } = 3;

        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; } = true;

        [MaxLength(300)]
        public string? Email { get; set; }

        public string? Details { get; set; }
    }
}