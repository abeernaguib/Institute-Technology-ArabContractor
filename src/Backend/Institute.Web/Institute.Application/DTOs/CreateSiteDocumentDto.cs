using Microsoft.AspNetCore.Http;

public class CreateSiteDocumentDto
{
    public string Title { get; set; } = null!;
    public string? Subtitle { get; set; }
    public IFormFile? File { get; set; }
}

 