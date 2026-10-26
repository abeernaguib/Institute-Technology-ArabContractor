using Institute.Application.DTOs;
using Microsoft.AspNetCore.Http;

namespace Institute.Application.Interfaces.IService
{
    public interface ITeamService
    {
        Task<IEnumerable<TeamMemberResponseDto>> GetPublicAsync();   // active only
        Task<IEnumerable<TeamMemberResponseDto>> GetAllAsync();      // admin: everyone
        Task<TeamMemberResponseDto?> GetByIdAsync(int id);
        Task<TeamMemberResponseDto> CreateAsync(TeamMemberCreateUpdateDto dto);
        Task<TeamMemberResponseDto?> UpdateAsync(int id, TeamMemberCreateUpdateDto dto);
        Task<bool> DeleteAsync(int id);
        Task<string?> UploadPhotoAsync(int id, IFormFile photo);
    }
}