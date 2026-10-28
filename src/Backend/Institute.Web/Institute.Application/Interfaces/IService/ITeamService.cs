using Institute.Application.DTOs;
using Microsoft.AspNetCore.Http;

namespace Institute.Application.Interfaces.IService
{
    public interface ITeamService
    {
        Task<IEnumerable<TeamMemberListDto>> GetPublicAsync();               // active only, light
        Task<TeamMemberResponseDto?> GetPublicByIdAsync(int id);             // active only, full CV
        Task<IEnumerable<TeamMemberResponseDto>> GetAllAsync();              // admin
        Task<TeamMemberResponseDto?> GetByIdAsync(int id);
        Task<TeamMemberResponseDto> CreateAsync(TeamMemberCreateUpdateDto dto);
        Task<TeamMemberResponseDto?> UpdateAsync(int id, TeamMemberCreateUpdateDto dto);
        Task<bool> DeleteAsync(int id);
        Task<string?> UploadPhotoAsync(int id, IFormFile photo);
    }
}