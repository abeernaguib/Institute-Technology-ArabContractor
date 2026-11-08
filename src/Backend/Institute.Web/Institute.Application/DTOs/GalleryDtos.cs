using System.ComponentModel.DataAnnotations;

namespace Institute.Application.DTOs
{
    // ── Output ────────────────────────────────────────────────────────────
    public record GalleryCategoryDto(int Id, int Kind, string Name, string? Description, int DisplayOrder, bool IsActive);
    public record GalleryAlbumDto(int Id, int CategoryId, string Title, string? Cover, int PhotosCount, int DisplayOrder, bool IsActive);
    public record GalleryPhotoDto(int Id, string Url, bool IsCover);
    public record GalleryAlbumDetailsDto(int Id, int CategoryId, string Title, string? Cover, int DisplayOrder, bool IsActive, List<GalleryPhotoDto> Photos);
    public record GalleryVideoDto(int Id, string YoutubeId, string? Title, int DisplayOrder);
    public record GalleryVideoGroupDto(int Id, int CategoryId, string Title, string Color, bool IsLtr, int DisplayOrder, bool IsActive, List<GalleryVideoDto> Videos);
    public record GalleryOverviewDto(List<GalleryCategoryDto> Categories, List<GalleryAlbumDto> Albums, List<GalleryVideoGroupDto> VideoGroups);

    // ── Input ─────────────────────────────────────────────────────────────
    public class GalleryCategoryInput
    {
        [Range(1, 2)] public int Kind { get; set; } = 1;
        [Required, MaxLength(200)] public string Name { get; set; } = null!;
        [MaxLength(500)] public string? Description { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public class GalleryAlbumInput
    {
        [Range(1, int.MaxValue)] public int CategoryId { get; set; }
        [Required, MaxLength(300)] public string Title { get; set; } = null!;
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public class GalleryVideoGroupInput
    {
        [Range(1, int.MaxValue)] public int CategoryId { get; set; }
        [Required, MaxLength(300)] public string Title { get; set; } = null!;
        [RegularExpression(@"^#[0-9a-fA-F]{6}$", ErrorMessage = "Color must look like #rrggbb")]
        public string Color { get; set; } = "#0865a8";
        public bool IsLtr { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public class GalleryVideoInput
    {
        [Required, MaxLength(300)] public string Video { get; set; } = null!;   // YouTube link or the 11-character ID
        [MaxLength(200)] public string? Title { get; set; }
        public int DisplayOrder { get; set; }
    }
}