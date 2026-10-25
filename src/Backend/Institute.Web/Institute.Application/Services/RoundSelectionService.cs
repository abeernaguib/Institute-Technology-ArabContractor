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
        private const string NoRoundsMessage = "لا توجد مواعيد متاحة للتسجيل حالياً. سيتم الإعلان عن المواعيد القادمة قريباً.";

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

            // CHANGED: a course with no rounds (or none bookable) is visible on the site
            // but cannot be bought / enrolled in until a round is added.
            if (courseRounds.Count == 0 || !courseRounds.Any(RoundRules.IsBookable))
                throw new BusinessRuleException(NoRoundsMessage);

            // rounds exist and are bookable, but none was sent
            if (!_options.Enforce)
                return null;

            throw new BusinessRuleException("يرجى اختيار موعد انعقاد الدورة.");
        }
    }
}