using Microsoft.AspNetCore.Http;

public interface ISiteDocumentService
{
    Task<IEnumerable<SiteDocumentDto>> GetPublicAsync();   // بس اللي ليهم ملف
    Task<IEnumerable<SiteDocumentDto>> GetAllAsync();      // للأدمن
    Task<SiteDocumentDto?> UploadAsync(string docKey, IFormFile file);
}