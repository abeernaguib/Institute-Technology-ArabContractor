using Institute.Application.DTOs.AdminDtos;

namespace Institute.Application.Interfaces.IService
{
    public interface IPlanFileService
    {
        Task<IEnumerable<PlanFileDto>> GetFilesAsync(int planId);
        Task AddAsync(CreatePlanFileDto dto);
        Task<bool> UpdateAsync(int fileId, UpdatePlanFileDto dto);
        Task<bool> DeleteAsync(int fileId);
    }
}