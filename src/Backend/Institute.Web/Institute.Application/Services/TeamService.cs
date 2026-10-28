using Institute.Application.DTOs;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Institute.Application.Services
{
    public class TeamService : ITeamService
    {
        private readonly IRepository<TeamMember> _repo;
        private readonly IBlobStorage _blobStorage;
        private readonly IConfiguration _config;

        private const string Container = "icemt";
        private const string Folder = "team";

        public TeamService(IRepository<TeamMember> repo, IBlobStorage blobStorage, IConfiguration config)
        {
            _repo = repo;
            _blobStorage = blobStorage;
            _config = config;
        }

        // ── Mapping ───────────────────────────────────────────────────────────
        private TeamMemberResponseDto ToDto(TeamMember t) => new()
        {
            Id = t.Id,
            Name = t.Name,
            Role = t.Role,
            Level = t.Level,
            DisplayOrder = t.DisplayOrder,
            IsActive = t.IsActive,
            Pic = GetImageUrl(t.Pic),
            Email = t.Email,
            Details = t.Details
        };

        private TeamMemberListDto ToListDto(TeamMember t) => new()
        {
            Id = t.Id,
            Name = t.Name,
            Role = t.Role,
            Level = t.Level,
            Pic = GetImageUrl(t.Pic),
            HasCv = !string.IsNullOrWhiteSpace(t.Details)
                 || !string.IsNullOrWhiteSpace(t.Email)
        };

        private static IEnumerable<TeamMember> Order(IEnumerable<TeamMember> list) =>
            list.OrderBy(t => t.Level).ThenBy(t => t.DisplayOrder).ThenBy(t => t.Id);

        private static void Apply(TeamMember e, TeamMemberCreateUpdateDto dto)
        {
            e.Name = dto.Name.Trim();
            e.Role = dto.Role?.Trim();
            e.Level = dto.Level;
            e.DisplayOrder = dto.DisplayOrder;
            e.IsActive = dto.IsActive;
            e.Email = dto.Email?.Trim();
            e.Details = dto.Details;   // base64 string, stored exactly as sent
        }

        // ── PUBLIC ────────────────────────────────────────────────────────────
        public async Task<IEnumerable<TeamMemberListDto>> GetPublicAsync()
        {
            var all = await _repo.GetAllAsync();
            return Order(all.Where(t => t.IsActive)).Select(ToListDto).ToList();
        }

        public async Task<TeamMemberResponseDto?> GetPublicByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            return entity == null || !entity.IsActive ? null : ToDto(entity);
        }

        // ── ADMIN ─────────────────────────────────────────────────────────────
        public async Task<IEnumerable<TeamMemberResponseDto>> GetAllAsync()
        {
            var all = await _repo.GetAllAsync();
            return Order(all).Select(ToDto).ToList();
        }

        public async Task<TeamMemberResponseDto?> GetByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            return entity == null ? null : ToDto(entity);
        }

        public async Task<TeamMemberResponseDto> CreateAsync(TeamMemberCreateUpdateDto dto)
        {
            var entity = new TeamMember();
            Apply(entity, dto);

            await _repo.AddAsync(entity);
            await _repo.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<TeamMemberResponseDto?> UpdateAsync(int id, TeamMemberCreateUpdateDto dto)
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