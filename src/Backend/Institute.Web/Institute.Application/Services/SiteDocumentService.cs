using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

public class SiteDocumentService : ISiteDocumentService
{
    private readonly IRepository<SiteDocument> _repo;
    private readonly IBlobStorage _blobStorage;
    private readonly IConfiguration _config;

    private const string Container = "icemt";
    private const string Folder = "documents";

    public SiteDocumentService(IRepository<SiteDocument> repo, IBlobStorage blobStorage, IConfiguration config)
    {
        _repo = repo;
        _blobStorage = blobStorage;
        _config = config;
    }

    private SiteDocumentDto ToDto(SiteDocument d) => new()
    {
        Id = d.Id,
        DocKey = d.DocKey,
        Title = d.Title,
        Subtitle = d.Subtitle,
        FileUrl = GetFileUrl(d.FilePath),
        OriginalFileName = d.OriginalFileName,
        UpdatedAt = d.UpdatedAt
    };

    public async Task<IEnumerable<SiteDocumentDto>> GetPublicAsync()
    {
        var all = await _repo.GetAllAsync();
        return all.Where(d => !string.IsNullOrWhiteSpace(d.FilePath))
                  .OrderBy(d => d.DisplayOrder).Select(ToDto).ToList();
    }

    public async Task<IEnumerable<SiteDocumentDto>> GetAllAsync()
    {
        var all = await _repo.GetAllAsync();
        return all.OrderBy(d => d.DisplayOrder).Select(ToDto).ToList();
    }

    public async Task<SiteDocumentDto> CreateAsync(CreateSiteDocumentDto dto)
    {
        var all = (await _repo.GetAllAsync()).ToList();
        var nextOrder = all.Count == 0 ? 1 : all.Max(d => d.DisplayOrder) + 1;

        var entity = new SiteDocument
        {
            DocKey = "doc-" + Guid.NewGuid().ToString("N")[..8],
            Title = dto.Title.Trim(),
            Subtitle = string.IsNullOrWhiteSpace(dto.Subtitle) ? null : dto.Subtitle.Trim(),
            DisplayOrder = nextOrder,
            UpdatedAt = DateTime.UtcNow
        };

        if (dto.File != null)
        {
            var ext = Path.GetExtension(dto.File.FileName);
            var uniqueName = $"{Guid.NewGuid():N}{ext}";

            await using var ms = new MemoryStream();
            await dto.File.CopyToAsync(ms);
            ms.Position = 0;

            var renamed = new FormFile(ms, 0, ms.Length, dto.File.Name, uniqueName)
            {
                Headers = new HeaderDictionary(),
                ContentType = dto.File.ContentType
            };

            var uploadedName = await _blobStorage.UploadFileAsync(renamed, Container, Folder);
            entity.FilePath = Path.GetFileName(uploadedName);
            entity.OriginalFileName = dto.File.FileName;
        }

        await _repo.AddAsync(entity);
        await _repo.SaveChangesAsync();

        return ToDto(entity);
    }

    public async Task<SiteDocumentDto?> UpdateAsync(string docKey, UpdateSiteDocumentDto dto)
    {
        var all = await _repo.GetAllAsync();
        var entity = all.FirstOrDefault(d => d.DocKey == docKey);
        if (entity == null) return null;

        entity.Title = dto.Title.Trim();
        entity.Subtitle = string.IsNullOrWhiteSpace(dto.Subtitle) ? null : dto.Subtitle.Trim();
        entity.UpdatedAt = DateTime.UtcNow;

        _repo.Update(entity);
        await _repo.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> DeleteAsync(string docKey)
    {
        var all = await _repo.GetAllAsync();
        var entity = all.FirstOrDefault(d => d.DocKey == docKey);
        if (entity == null) return false;

        var oldFile = entity.FilePath;

        _repo.Delete(entity);
        await _repo.SaveChangesAsync();

        if (!string.IsNullOrWhiteSpace(oldFile)
            && !oldFile.StartsWith("http", StringComparison.OrdinalIgnoreCase)
            && !oldFile.StartsWith("/"))
            await _blobStorage.DeleteFileAsync(oldFile, Container, Folder);

        return true;
    }

    public async Task<SiteDocumentDto?> UploadAsync(string docKey, IFormFile file)
    {
        var all = await _repo.GetAllAsync();
        var entity = all.FirstOrDefault(d => d.DocKey == docKey);
        if (entity == null) return null;

        var ext = Path.GetExtension(file.FileName);
        var uniqueName = $"{Guid.NewGuid():N}{ext}";

        await using var ms = new MemoryStream();
        await file.CopyToAsync(ms);
        ms.Position = 0;

        var renamed = new FormFile(ms, 0, ms.Length, file.Name, uniqueName)
        {
            Headers = new HeaderDictionary(),
            ContentType = file.ContentType
        };

        var uploadedName = await _blobStorage.UploadFileAsync(renamed, Container, Folder);
        var fileNameOnly = Path.GetFileName(uploadedName);

        var oldFile = entity.FilePath;

        entity.FilePath = fileNameOnly;
        entity.OriginalFileName = file.FileName;
        entity.UpdatedAt = DateTime.UtcNow;
        _repo.Update(entity);
        await _repo.SaveChangesAsync();

        if (!string.IsNullOrWhiteSpace(oldFile)
            && !oldFile.StartsWith("http", StringComparison.OrdinalIgnoreCase)
            && !oldFile.StartsWith("/"))
            await _blobStorage.DeleteFileAsync(oldFile, Container, Folder);

        return ToDto(entity);
    }

    private string? GetFileUrl(string? path)
    {
        if (string.IsNullOrWhiteSpace(path)) return null;
        if (path.StartsWith("http", StringComparison.OrdinalIgnoreCase) || path.StartsWith("/"))
            return path;

        var baseUrl = _config["AzureStorage:BaseUrl"];
        return $"{baseUrl?.TrimEnd('/')}/{Folder}/{path}";
    }
}