using Microsoft.AspNetCore.Http;

public interface ISiteDocumentService
{
    Task<IEnumerable<SiteDocumentDto>> GetPublicAsync();
    Task<IEnumerable<SiteDocumentDto>> GetAllAsync();
    Task<SiteDocumentDto?> UploadAsync(string docKey, IFormFile file);
    Task<SiteDocumentDto> CreateAsync(CreateSiteDocumentDto dto);
    Task<SiteDocumentDto?> UpdateAsync(string docKey, UpdateSiteDocumentDto dto);
    Task<bool> DeleteAsync(string docKey);
}