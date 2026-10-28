using Institute.Application.DTOs.FinancialDtos;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Institute.Domain.Enums;
using Institute.Domain.specifications;

namespace Institute.Application.Services
{
    /// <summary>
    /// Revenue  = paid OrderItems, dated by the payment date (fallback: order CreatedAt).
    /// Refunds  = RefundRequests, Sent counted by SentAt (cash out), Approved shown as pending.
    /// Does NOT depend on Enrollments (they are deleted when a refund is approved).
    /// </summary>
    public class FinancialReportService : IFinancialReportService
    {
        private readonly IRepository<Order> _orderRepo;
        private readonly IRepository<RefundRequest> _refundRepo;
        private readonly IRepository<Enrollment> _enrollmentRepo;
        private readonly IRepository<Planwork> _planworkRepo;

        public FinancialReportService(
            IRepository<Order> orderRepo,
            IRepository<RefundRequest> refundRepo,
            IRepository<Enrollment> enrollmentRepo,
            IRepository<Planwork> planworkRepo)
        {
            _orderRepo = orderRepo;
            _refundRepo = refundRepo;
            _enrollmentRepo = enrollmentRepo;
            _planworkRepo = planworkRepo;
        }

        public async Task<FinancialReportDto> GetReportAsync(DateTime? from, DateTime? to)
        {
            var tz = CairoTz();
            var (fromUtc, toUtcExclusive) = ToUtcRange(from, to, tz);
            bool InRange(DateTime utc) =>
                (fromUtc == null || utc >= fromUtc) && (toUtcExclusive == null || utc < toUtcExclusive);

            // ── 1) Paid orders ────────────────────────────────────────────
            var orderSpec = new BaseSpecification<Order>(o => o.Status == OrderStatus.Paid);
            orderSpec.AddInclude(o => o.Items);
            orderSpec.AddInclude(o => o.Payments);
            orderSpec.AddInclude(o => o.User);
            var orders = await _orderRepo.GetAllWithSpecAsync(orderSpec);

            var items = orders
                .Select(o => new { Order = o, PaidAt = PaidAtOf(o) })
                .Where(x => InRange(x.PaidAt))
                .SelectMany(x => x.Order.Items.Select(i => new { x.Order, Item = i, x.PaidAt }))
                .ToList();

            // ── 2) Refunds ────────────────────────────────────────────────
            var refundSpec = new BaseSpecification<RefundRequest>(
                r => r.Status == "Sent" || r.Status == "Approved");
            var allRefunds = await _refundRepo.GetAllWithSpecAsync(refundSpec);

            var sentInRange = allRefunds
                .Where(r => r.Status == "Sent" && InRange(r.SentAt ?? r.ApprovedAt ?? r.RequestedAt))
                .ToList();
            var pendingInRange = allRefunds
                .Where(r => r.Status == "Approved" && InRange(r.ApprovedAt ?? r.RequestedAt))
                .ToList();

            // refunded amount per order item (any date) — informational, shown on each course line
            var refundedByItem = allRefunds
                .GroupBy(r => (r.OrderId, r.PlanworkId))
                .ToDictionary(g => g.Key, g => g.Sum(r => r.Amount));

            // ── 3) Titles + attendance (only for what we need) ────────────
            var planworkIds = items.Select(x => x.Item.PlanworkId).Distinct().ToList();
            var userIds = items.Select(x => x.Order.UserId).Distinct().ToList();

            var titles = new Dictionary<int, string>();
            if (planworkIds.Count > 0)
            {
                var pws = await _planworkRepo.GetAllWithSpecAsync(
                    new BaseSpecification<Planwork>(p => planworkIds.Contains(p.ChildId)));
                titles = pws.ToDictionary(p => p.ChildId, p => p.ServiceTitle ?? "—");
            }

            var attendance = new Dictionary<(int, int), bool>();
            if (userIds.Count > 0)
            {
                var enrolls = await _enrollmentRepo.GetAllWithSpecAsync(
                    new BaseSpecification<Enrollment>(e => userIds.Contains(e.UserId)));
                attendance = enrolls
                    .GroupBy(e => (e.UserId, e.PlanworkId))
                    .ToDictionary(g => g.Key, g => g.Any(e => e.Attended));
            }

            string TitleOf(int id) => titles.TryGetValue(id, out var t) ? t : "—";

            // ── 4) Build response ─────────────────────────────────────────
            var gross = items.Sum(x => x.Item.Price);
            var refundsSent = sentInRange.Sum(r => r.Amount);
            var refundsPending = pendingInRange.Sum(r => r.Amount);

            var dto = new FinancialReportDto
            {
                Summary = new FinancialSummaryDto
                {
                    Gross = gross,
                    RefundsSent = refundsSent,
                    RefundsPending = refundsPending,
                    Net = gross - refundsSent,
                    Enrollments = items.Count,
                    PayingUsers = userIds.Count,
                    RefundsCount = sentInRange.Count + pendingInRange.Count
                }
            };

            dto.Monthly = items
                .Select(x => new { Local = TimeZoneInfo.ConvertTimeFromUtc(Utc(x.PaidAt), tz), x.Item.Price })
                .GroupBy(x => (x.Local.Year, x.Local.Month))
                .OrderBy(g => g.Key.Year).ThenBy(g => g.Key.Month)
                .Select(g => new MonthlyPointDto
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Revenue = g.Sum(x => x.Price),
                    Enrollments = g.Count()
                }).ToList();

            dto.Courses = items
                .GroupBy(x => x.Item.PlanworkId)
                .Select(g => new CourseRevenueDto
                {
                    PlanworkId = g.Key,
                    Title = TitleOf(g.Key),
                    Revenue = g.Sum(x => x.Item.Price),
                    Count = g.Count()
                })
                .OrderByDescending(c => c.Revenue).ToList();

            dto.Rows = items
                .GroupBy(x => x.Order.UserId)
                .Select(g =>
                {
                    var u = g.First().Order.User;
                    var fullName = $"{u?.FirstName} {u?.LastName}".Trim();
                    return new UserFinanceRowDto
                    {
                        UserId = g.Key,
                        Username = string.IsNullOrWhiteSpace(fullName) ? (u?.Email ?? "") : fullName,
                        Email = u?.Email ?? "",
                        TotalPaid = g.Sum(x => x.Item.Price),
                        Courses = g.OrderBy(x => x.PaidAt).Select(x => new UserCourseLineDto
                        {
                            OrderId = x.Order.Id,
                            OrderNumber = x.Order.OrderNumber,
                            PlanworkId = x.Item.PlanworkId,
                            Title = TitleOf(x.Item.PlanworkId),
                            Price = x.Item.Price,
                            PaidAt = Utc(x.PaidAt),
                            Attended = attendance.TryGetValue((g.Key, x.Item.PlanworkId), out var a) ? a : null,
                            Refunded = refundedByItem.TryGetValue((x.Order.Id, x.Item.PlanworkId), out var rf) ? rf : 0m
                        }).ToList()
                    };
                })
                .OrderByDescending(r => r.TotalPaid).ToList();

            return dto;
        }

        // ── Helpers ──────────────────────────────────────────────────────

        private static DateTime PaidAtOf(Order o) =>
            o.Payments.Where(p => p.PaymentDate.HasValue)
                      .Select(p => p.PaymentDate!.Value)
                      .DefaultIfEmpty(o.CreatedAt)
                      .Max();

        private static DateTime Utc(DateTime d) => DateTime.SpecifyKind(d, DateTimeKind.Utc);

        private static TimeZoneInfo CairoTz()
        {
            try { return TimeZoneInfo.FindSystemTimeZoneById("Egypt Standard Time"); }   // Windows / Azure App Service
            catch (TimeZoneNotFoundException) { return TimeZoneInfo.FindSystemTimeZoneById("Africa/Cairo"); } // Linux
        }

        /// <summary>Cairo day boundaries → UTC. 'to' is inclusive, so we return the start of the next day.</summary>
        private static (DateTime? fromUtc, DateTime? toUtcExclusive) ToUtcRange(DateTime? from, DateTime? to, TimeZoneInfo tz)
        {
            DateTime? f = from.HasValue
                ? TimeZoneInfo.ConvertTimeToUtc(DateTime.SpecifyKind(from.Value.Date, DateTimeKind.Unspecified), tz)
                : null;
            DateTime? t = to.HasValue
                ? TimeZoneInfo.ConvertTimeToUtc(DateTime.SpecifyKind(to.Value.Date.AddDays(1), DateTimeKind.Unspecified), tz)
                : null;
            return (f, t);
        }
    }
}