using Institute.Application.DTOs;
using Microsoft.AspNetCore.Http;

namespace Institute.Application.Interfaces.IService
{
    public interface ICertificationService
    {
        Task<IEnumerable<CertificationItemResponseDto>> GetPublicAsync();    // active only
        Task<IEnumerable<CertificationItemResponseDto>> GetAllAsync();       // admin
        Task<CertificationItemResponseDto?> GetByIdAsync(int id);
        Task<CertificationItemResponseDto> CreateAsync(CertificationItemCreateUpdateDto dto);
        Task<CertificationItemResponseDto?> UpdateAsync(int id, CertificationItemCreateUpdateDto dto);
        Task<bool> DeleteAsync(int id);
        Task<string?> UploadPhotoAsync(int id, IFormFile photo);
    }
}