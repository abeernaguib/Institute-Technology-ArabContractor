using Institute.Application.DTOs.AdminDtos;
using Institute.Application.Exceptions;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain;
using Institute.Domain.Entities;
using Institute.Domain.specifications;
using System.Globalization;

namespace Institute.Application.Services
{
    public class PlanworkRoundService : IPlanworkRoundService
    {
        private readonly IRepository<Planwork> _plans;
        private readonly IRepository<PlanworkRound> _rounds;
        private readonly IRepository<Enrollment> _enrollments;
        private readonly IRepository<OrderItem> _orderItems;
        private readonly IRepository<CartItem> _cartItems;

        public PlanworkRoundService(
            IRepository<Planwork> plans,
            IRepository<PlanworkRound> rounds,
            IRepository<Enrollment> enrollments,
            IRepository<OrderItem> orderItems,
            IRepository<CartItem> cartItems)
        {
            _plans = plans;
            _rounds = rounds;
            _enrollments = enrollments;
            _orderItems = orderItems;
            _cartItems = cartItems;
        }

        public async Task<List<RoundAdminDto>> GetRoundsAsync(int planworkId)
        {
            if (await _plans.GetByIdAsync(planworkId) == null)
                throw new KeyNotFoundException("الدورة غير موجودة.");

            var rounds = (await _rounds.GetAllWithSpecAsync(
                new BaseSpecification<PlanworkRound>(r => r.PlanworkId == planworkId)))
                .OrderBy(r => r.StartDate).ToList();

            var counts = (await _enrollments.GetAllWithSpecAsync(
                new BaseSpecification<Enrollment>(e => e.PlanworkId == planworkId && e.RoundId != null)))
                .GroupBy(e => e.RoundId!.Value)
                .ToDictionary(g => g.Key, g => g.Count());

            return rounds.Select(r => ToDto(r, counts.GetValueOrDefault(r.Id))).ToList();
        }

        public async Task<RoundAdminDto> AddRoundAsync(int planworkId, SaveRoundDto dto)
        {
            var plan = await _plans.GetByIdAsync(planworkId)
                ?? throw new KeyNotFoundException("الدورة غير موجودة.");

            if (plan.DetailsFlag != false)
                throw new BusinessRuleException("هذا عنوان تنظيمي وليس دورة، لا يمكن إضافة مواعيد له.");

            var (start, end) = ParseRange(dto);

            if (await _rounds.AnyAsync(r => r.PlanworkId == planworkId && r.StartDate == start && r.EndDate == end))
                throw new BusinessRuleException("هذا الموعد مضاف بالفعل.");

            var round = new PlanworkRound
            {
                PlanworkId = planworkId,
                StartDate = start,
                EndDate = end,
                IsActive = dto.IsActive ?? true
            };
            await _rounds.AddAsync(round);
            await _rounds.SaveChangesAsync();

            await SyncLegacyCourseDateAsync(planworkId);
            return ToDto(round, 0);
        }

        public async Task<RoundAdminDto> UpdateRoundAsync(int roundId, SaveRoundDto dto)
        {
            var round = await _rounds.GetByIdAsync(roundId)
                ?? throw new KeyNotFoundException("الموعد غير موجود.");

            var used = await IsUsedAsync(roundId);

            if (dto.StartDate != null || dto.EndDate != null)
            {
                var (start, end) = ParseRange(dto);

                if (start != round.StartDate || end != round.EndDate)
                {
                    // postponing is fine; pulling a round earlier would change refund eligibility
                    if (used && start < round.StartDate)
                        throw new BusinessRuleException("لا يمكن تقديم موعد عليه اشتراكات. يمكنك تأجيله فقط.");

                    if (await _rounds.AnyAsync(r => r.PlanworkId == round.PlanworkId && r.Id != roundId
                                                    && r.StartDate == start && r.EndDate == end))
                        throw new BusinessRuleException("هذا الموعد مضاف بالفعل.");

                    round.StartDate = start;
                    round.EndDate = end;
                }
            }

            if (dto.IsActive.HasValue)
                round.IsActive = dto.IsActive.Value;

            _rounds.Update(round);
            await _rounds.SaveChangesAsync();

            await SyncLegacyCourseDateAsync(round.PlanworkId);

            var count = (await _enrollments.GetAllWithSpecAsync(
                new BaseSpecification<Enrollment>(e => e.RoundId == roundId))).Count();
            return ToDto(round, count);
        }

        public async Task DeleteRoundAsync(int roundId)
        {
            var round = await _rounds.GetByIdAsync(roundId)
                ?? throw new KeyNotFoundException("الموعد غير موجود.");

            if (await IsUsedAsync(roundId))
                throw new BusinessRuleException("عليه اشتراكات أو طلبات، لا يمكن حذفه. قم بتعطيله بدلاً من ذلك.");

            // carts holding this round: clear it so the user has to pick again
            var cartRefs = (await _cartItems.GetAllWithSpecAsync(
                new BaseSpecification<CartItem>(c => c.RoundId == roundId))).ToList();
            foreach (var c in cartRefs)
            {
                c.RoundId = null;
                _cartItems.Update(c);
            }

            var planworkId = round.PlanworkId;
            _rounds.Delete(round);
            await _rounds.SaveChangesAsync();

            await SyncLegacyCourseDateAsync(planworkId);
        }

        // ── helpers ──────────────────────────────────────────────────
        private async Task<bool> IsUsedAsync(int roundId) =>
            await _enrollments.AnyAsync(e => e.RoundId == roundId) ||
            await _orderItems.AnyAsync(o => o.RoundId == roundId);

        private static (DateTime start, DateTime end) ParseRange(SaveRoundDto dto)
        {
            if (!DateTime.TryParseExact(dto.StartDate, "yyyy-MM-dd", CultureInfo.InvariantCulture,
                    DateTimeStyles.None, out var start) ||
                !DateTime.TryParseExact(dto.EndDate, "yyyy-MM-dd", CultureInfo.InvariantCulture,
                    DateTimeStyles.None, out var end))
                throw new BusinessRuleException("يرجى إدخال تاريخ البداية والنهاية بالشكل yyyy-MM-dd.");

            if (end < start)
                throw new BusinessRuleException("تاريخ النهاية قبل تاريخ البداية.");

            return (start.Date, end.Date);
        }

        private static RoundAdminDto ToDto(PlanworkRound r, int enrollmentsCount) => new()
        {
            Id = r.Id,
            PlanworkId = r.PlanworkId,
            StartDate = r.StartDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
            EndDate = r.EndDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
            IsActive = r.IsActive,
            IsBookable = RoundRules.IsBookable(r),
            DurationDays = (int)(r.EndDate.Date - r.StartDate.Date).TotalDays + 1,
            EnrollmentsCount = enrollmentsCount
        };

        // keeps Planwork.CourseDate (the legacy text) pointing at the relevant round
        private async Task SyncLegacyCourseDateAsync(int planworkId)
        {
            var plan = await _plans.GetByIdAsync(planworkId);
            if (plan == null) return;

            var active = (await _rounds.GetAllWithSpecAsync(
                new BaseSpecification<PlanworkRound>(r => r.PlanworkId == planworkId && r.IsActive))).ToList();

            if (active.Count == 0) return;   // never clear it: no CourseDate = treated as a category

            var pick = active.Where(RoundRules.IsBookable).OrderBy(r => r.StartDate).FirstOrDefault()
                       ?? active.OrderByDescending(r => r.StartDate).First();

            plan.CourseDate =
                $"{pick.StartDate.ToString("yyyy/MM/dd", CultureInfo.InvariantCulture)} - " +
                $"{pick.EndDate.ToString("yyyy/MM/dd", CultureInfo.InvariantCulture)}";

            await _plans.SaveChangesAsync();
        }
    }
}