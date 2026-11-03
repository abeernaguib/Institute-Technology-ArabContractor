using Institute.Application.DTOs;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Institute.Application.Services
{
    public class CertificationService : ICertificationService
    {
        private readonly IRepository<CertificationItem> _repo;
        private readonly IBlobStorage _blobStorage;
        private readonly IConfiguration _config;

        private const string Container = "icemt";
        private const string Folder = "certifications";

        public CertificationService(IRepository<CertificationItem> repo, IBlobStorage blobStorage, IConfiguration config)
        {
            _repo = repo;
            _blobStorage = blobStorage;
            _config = config;
        }

        private CertificationItemResponseDto ToDto(CertificationItem c) => new()
        {
            Id = c.Id,
            Type = c.Type,
            Title = c.Title,
            Description = c.Description,
            LinkUrl = c.LinkUrl,
            LinkText = c.LinkText,
            Pic = GetImageUrl(c.Pic),
            DisplayOrder = c.DisplayOrder,
            IsActive = c.IsActive
        };

        private static IEnumerable<CertificationItem> Order(IEnumerable<CertificationItem> list) =>
            list.OrderBy(c => c.Type).ThenBy(c => c.DisplayOrder).ThenBy(c => c.Id);

        private static string? Clean(string? s) => string.IsNullOrWhiteSpace(s) ? null : s.Trim();

        private static void Apply(CertificationItem e, CertificationItemCreateUpdateDto dto)
        {
            e.Type = dto.Type;
            e.Title = dto.Title.Trim();
            e.Description = Clean(dto.Description);
            e.LinkUrl = Clean(dto.LinkUrl);
            e.LinkText = Clean(dto.LinkText);
            e.DisplayOrder = dto.DisplayOrder;
            e.IsActive = dto.IsActive;
        }

        public async Task<IEnumerable<CertificationItemResponseDto>> GetPublicAsync()
        {
            var all = await _repo.GetAllAsync();
            return Order(all.Where(c => c.IsActive)).Select(ToDto).ToList();
        }

        public async Task<IEnumerable<CertificationItemResponseDto>> GetAllAsync()
        {
            var all = await _repo.GetAllAsync();
            return Order(all).Select(ToDto).ToList();
        }

        public async Task<CertificationItemResponseDto?> GetByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            return entity == null ? null : ToDto(entity);
        }

        public async Task<CertificationItemResponseDto> CreateAsync(CertificationItemCreateUpdateDto dto)
        {
            var entity = new CertificationItem();
            Apply(entity, dto);

            await _repo.AddAsync(entity);
            await _repo.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<CertificationItemResponseDto?> UpdateAsync(int id, CertificationItemCreateUpdateDto dto)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return null;

            Apply(entity, dto);

            _repo.Update(entity);
            await _repo.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return false;

            _repo.Delete(entity);
            await _repo.SaveChangesAsync();
            return true;
        }

        public async Task<string?> UploadPhotoAsync(int id, IFormFile photo)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return null;

            var fullBlobPath = await _blobStorage.UploadFileAsync(photo, Container, Folder);
            var fileNameOnly = Path.GetFileName(fullBlobPath);

            entity.Pic = fileNameOnly;
            _repo.Update(entity);
            await _repo.SaveChangesAsync();

            return GetImageUrl(fileNameOnly);
        }

        // blob file name -> full URL; seeded values (/images/... or http...) are returned as they are
        private string? GetImageUrl(string? pic)
        {
            if (string.IsNullOrWhiteSpace(pic)) return null;
            if (pic.StartsWith("http", StringComparison.OrdinalIgnoreCase) || pic.StartsWith("/"))
                return pic;

            var baseUrl = _config["AzureStorage:BaseUrl"];
            return $"{baseUrl?.TrimEnd('/')}/{Folder}/{pic}";
        }
    }
}