using Institute.Application.DTOs.FinancialDtos;

namespace Institute.Application.Interfaces.IService
{
    public interface IFinancialReportService
    {
        /// <param name="from">Cairo calendar day, inclusive. null = from the beginning.</param>
        /// <param name="to">Cairo calendar day, inclusive. null = until now.</param>
        Task<FinancialReportDto> GetReportAsync(DateTime? from, DateTime? to);
    }
}