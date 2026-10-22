using Institute.Application.DTOs.AdminDtos;

namespace Institute.Application.Interfaces.IService
{
    public interface IPlanworkRoundService
    {
        Task<List<RoundAdminDto>> GetRoundsAsync(int planworkId);
        Task<RoundAdminDto> AddRoundAsync(int planworkId, SaveRoundDto dto);
        Task<RoundAdminDto> UpdateRoundAsync(int roundId, SaveRoundDto dto);
        Task DeleteRoundAsync(int roundId);
    }
}