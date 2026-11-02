using Institute.Application.DTOs;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Institute.Application.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IRepository<Customer> _repo;
        private readonly IBlobStorage _blobStorage;
        private readonly IConfiguration _config;

        private const string Container = "icemt";
        private const string Folder = "customers";

        public CustomerService(IRepository<Customer> repo, IBlobStorage blobStorage, IConfiguration config)
        {
            _repo = repo;
            _blobStorage = blobStorage;
            _config = config;
        }

        // ── Mapping ───────────────────────────────────────────────────────────
        private CustomerResponseDto ToDto(Customer c) => new()
        {
            Id = c.Id,
            Name = c.Name,
            Logo = GetImageUrl(c.Logo),
            DisplayOrder = c.DisplayOrder,
            IsActive = c.IsActive
        };

        private CustomerListDto ToListDto(Customer c) => new()
        {
            Id = c.Id,
            Name = c.Name,
            Logo = GetImageUrl(c.Logo)
        };

        private static IEnumerable<Customer> Order(IEnumerable<Customer> list) =>
            list.OrderBy(c => c.DisplayOrder).ThenBy(c => c.Id);

        private static void Apply(Customer e, CustomerCreateUpdateDto dto)
        {
            e.Name = dto.Name.Trim();
            e.DisplayOrder = dto.DisplayOrder;
            e.IsActive = dto.IsActive;
        }

        // ── PUBLIC ────────────────────────────────────────────────────────────
        public async Task<IEnumerable<CustomerListDto>> GetPublicAsync()
        {
            var all = await _repo.GetAllAsync();
            return Order(all.Where(c => c.IsActive)).Select(ToListDto).ToList();
        }

        // ── ADMIN ─────────────────────────────────────────────────────────────
        public async Task<IEnumerable<CustomerResponseDto>> GetAllAsync()
        {
            var all = await _repo.GetAllAsync();
            return Order(all).Select(ToDto).ToList();
        }

        public async Task<CustomerResponseDto?> GetByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            return entity == null ? null : ToDto(entity);
        }

        public async Task<CustomerResponseDto> CreateAsync(CustomerCreateUpdateDto dto)
        {
            var entity = new Customer();
            Apply(entity, dto);

            await _repo.AddAsync(entity);
            await _repo.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<CustomerResponseDto?> UpdateAsync(int id, CustomerCreateUpdateDto dto)
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

            var oldLogo = entity.Logo;

            _repo.Delete(entity);
            await _repo.SaveChangesAsync();

            await DeleteBlobIfUnusedAsync(oldLogo);
            return true;
        }

        // ── LOGO ──────────────────────────────────────────────────────────────
        public async Task<string?> UploadLogoAsync(int id, IFormFile logo)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return null;

            // Unique file name so two customers uploading "logo.png" never overwrite each other
            var ext = Path.GetExtension(logo.FileName);
            var uniqueName = $"{Guid.NewGuid():N}{ext}";

            await using var ms = new MemoryStream();
            await logo.CopyToAsync(ms);
            ms.Position = 0;

            var renamed = new FormFile(ms, 0, ms.Length, logo.Name, uniqueName)
            {
                Headers = new HeaderDictionary(),
                ContentType = logo.ContentType
            };

            var uploadedName = await _blobStorage.UploadFileAsync(renamed, Container, Folder);
            var fileNameOnly = Path.GetFileName(uploadedName);

            var oldLogo = entity.Logo;

            entity.Logo = fileNameOnly;
            _repo.Update(entity);
            await _repo.SaveChangesAsync();

            // remove the previous logo from blob storage (only if nobody else uses it)
            if (!string.Equals(oldLogo, fileNameOnly, StringComparison.OrdinalIgnoreCase))
                await DeleteBlobIfUnusedAsync(oldLogo);

            return GetImageUrl(fileNameOnly);
        }

        public async Task<bool> DeleteLogoAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return false;

            var oldLogo = entity.Logo;

            entity.Logo = null;
            _repo.Update(entity);
            await _repo.SaveChangesAsync();

            await DeleteBlobIfUnusedAsync(oldLogo);
            return true;
        }

        // ── Helpers ───────────────────────────────────────────────────────────
        private async Task DeleteBlobIfUnusedAsync(string? fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName)) return;
            if (fileName.StartsWith("http", StringComparison.OrdinalIgnoreCase) || fileName.StartsWith("/")) return;

            var stillUsed = await _repo.AnyAsync(c => c.Logo == fileName);
            if (!stillUsed)
                await _blobStorage.DeleteFileAsync(fileName, Container, Folder);
        }

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