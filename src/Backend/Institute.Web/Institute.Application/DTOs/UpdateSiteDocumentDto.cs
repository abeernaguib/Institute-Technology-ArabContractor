using Microsoft.AspNetCore.Http;

 
public class UpdateSiteDocumentDto
{
    public string Title { get; set; } = null!;
    public string? Subtitle { get; set; }
}