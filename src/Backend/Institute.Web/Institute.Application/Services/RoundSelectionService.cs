using Institute.Application.Configurations;
using Institute.Application.Exceptions;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain;
using Institute.Domain.Entities;
using Institute.Domain.specifications;
using Microsoft.Extensions.Options;

namespace Institute.Application.Services
{
    public class RoundSelectionService : IRoundSelectionService
    {
        private readonly IRepository<PlanworkRound> _rounds;
        private readonly RoundsOptions _options;

        public RoundSelectionService(IRepository<PlanworkRound> rounds, IOptions<RoundsOptions> options)
        {
            _rounds = rounds;
            _options = options.Value;
        }

        public async Task<PlanworkRound?> ResolveAsync(int planworkId, int? roundId)
        {
            var spec = new BaseSpecification<PlanworkRound>(r => r.PlanworkId == planworkId && r.IsActive);
            var courseRounds = (await _rounds.GetAllWithSpecAsync(spec)).ToList();

            if (roundId.HasValue)
            {
                var round = courseRounds.FirstOrDefault(r => r.Id == roundId.Value)
                    ?? throw new BusinessRuleException("الموعد المختار غير صحيح لهذه الدورة.");

                if (!RoundRules.IsBookable(round))
                    throw new BusinessRuleException("هذا الموعد بدأ بالفعل ولا يمكن الاشتراك فيه. يرجى اختيار موعد آخر.");

                return round;
            }

            // no round sent: legacy behaviour unless enforcement is on and the course has rounds
            if (courseRounds.Count == 0 || !_options.Enforce)
                return null;

            if (!courseRounds.Any(RoundRules.IsBookable))
                throw new BusinessRuleException("لا توجد مواعيد متاحة حالياً لهذه الدورة.");

            throw new BusinessRuleException("يرجى اختيار موعد انعقاد الدورة.");
        }
    }
}