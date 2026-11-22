namespace Institute.Domain.Entities
{
    public class SiteDocument
    {
        public int Id { get; set; }
        public string DocKey { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string? Subtitle { get; set; }
        public string? FilePath { get; set; }
        public string? OriginalFileName { get; set; }
        public int DisplayOrder { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}