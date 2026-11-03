// CertificationItemResponseDto.cs
namespace Institute.Application.DTOs
{
    public class CertificationItemResponseDto
    {
        public int Id { get; set; }
        public int Type { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public string? LinkUrl { get; set; }
        public string? LinkText { get; set; }
        public string? Pic { get; set; }          // full URL
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }
}