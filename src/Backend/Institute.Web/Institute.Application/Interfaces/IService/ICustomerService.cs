using Institute.Application.DTOs;
using Microsoft.AspNetCore.Http;

namespace Institute.Application.Interfaces.IService
{
    public interface ICustomerService
    {
        Task<IEnumerable<CustomerListDto>> GetPublicAsync();                 // active only
        Task<IEnumerable<CustomerResponseDto>> GetAllAsync();                // admin
        Task<CustomerResponseDto?> GetByIdAsync(int id);
        Task<CustomerResponseDto> CreateAsync(CustomerCreateUpdateDto dto);
        Task<CustomerResponseDto?> UpdateAsync(int id, CustomerCreateUpdateDto dto);
        Task<bool> DeleteAsync(int id);
        Task<string?> UploadLogoAsync(int id, IFormFile logo);
        Task<bool> DeleteLogoAsync(int id);
    }
}