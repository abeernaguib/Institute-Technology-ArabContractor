using Microsoft.AspNetCore.Http;

namespace Institute.Application.DTOs
{
    public class NewsPicMetaDto
    {
        public int? PicId { get; set; }        // null for newly uploaded files
        public bool StartUpPic { get; set; }
        public int? Priority { get; set; }
    }

    public class NewsCreateUpdateDto
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public bool? ShowFlag { get; set; }

        // ✅ بدل Image (مفرد) → Images (جمع)
        public List<IFormFile>? Images { get; set; }

        // existing images: changed checkbox / priority
        public List<NewsPicMetaDto>? ExistingPics { get; set; }

        // new files: same order as Images
        public List<NewsPicMetaDto>? NewPics { get; set; }

        // ✅ للـ response بس
        public string? ImageUrl { get; set; }
        public List<string?>? ImageUrls { get; set; }
    }
}