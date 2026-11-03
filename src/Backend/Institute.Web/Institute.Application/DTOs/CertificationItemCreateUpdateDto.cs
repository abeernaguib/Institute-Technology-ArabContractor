// CertificationItemCreateUpdateDto.cs
using System.ComponentModel.DataAnnotations;

namespace Institute.Application.DTOs
{
    public class CertificationItemCreateUpdateDto
    {
        [Range(1, 2)]
        public int Type { get; set; } = 1;

        [Required, MaxLength(300)]
        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        // only http(s) links are accepted (blocks javascript: and similar)
        [MaxLength(500)]
        [RegularExpression(@"^https?://.+$", ErrorMessage = "Link must start with http:// or https://")]
        public string? LinkUrl { get; set; }

        [MaxLength(200)]
        public string? LinkText { get; set; }

        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; } = true;
    }
}