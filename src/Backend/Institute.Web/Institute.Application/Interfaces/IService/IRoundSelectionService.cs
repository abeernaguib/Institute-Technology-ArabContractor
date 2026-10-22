using Institute.Domain.Entities;

namespace Institute.Application.Interfaces.IService
{
    public interface IRoundSelectionService
    {
        /// Returns the chosen round (or null in legacy mode). Throws BusinessRuleException if invalid.
        Task<PlanworkRound?> ResolveAsync(int planworkId, int? roundId);
    }
}