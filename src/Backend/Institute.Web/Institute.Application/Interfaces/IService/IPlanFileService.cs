using Institute.Application.DTOs.AdminDtos;

namespace Institute.Application.Interfaces.IService
{
    public interface IPlanFileService
    {
        Task<IEnumerable<PlanFileDto>> GetFilesAsync(int planId);

        Task AddAsync(CreatePlanFileDto dto);

        // false = file not found
        Task<bool> UpdateAsync(int fileId, UpdatePlanFileDto dto);

        // false = file not found
        Task<bool> DeleteAsync(int planId, int fileId);
    }
}