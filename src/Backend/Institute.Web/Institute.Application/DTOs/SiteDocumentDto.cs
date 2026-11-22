public class SiteDocumentDto
{
    public int Id { get; set; }
    public string DocKey { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string? Subtitle { get; set; }
    public string? FileUrl { get; set; }
    public string? OriginalFileName { get; set; }
    public DateTime? UpdatedAt { get; set; }
}