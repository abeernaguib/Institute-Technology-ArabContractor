using Institute.Application.Configurations;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Institute.Domain.specifications;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Globalization;
using System.Net;

namespace Institute.Application.Services
{
    public class RefundNotificationService : IRefundNotificationService
    {
        private const string LogoContentId = "icemt-logo@icemt";

        private readonly IRepository<RefundRequest> _refunds;
        private readonly IEmailService _email;
        private readonly EmailSettings _settings;
        private readonly IWebHostEnvironment _env;
        private readonly ILogger<RefundNotificationService> _logger;

        public RefundNotificationService(
            IRepository<RefundRequest> refunds,
            IEmailService email,
            IOptions<EmailSettings> options,
            IWebHostEnvironment env,
            ILogger<RefundNotificationService> logger)
        {
            _refunds = refunds;
            _email = email;
            _settings = options.Value;
            _env = env;
            _logger = logger;
        }

        public async Task NotifyRefundRequestedAsync(int refundRequestId)
        {
            var recipients = _settings.OrderNotificationRecipients
                .Where(r => !string.IsNullOrWhiteSpace(r)).ToList();

            if (!_settings.Enabled || recipients.Count == 0)
                return;

            var spec = new BaseSpecification<RefundRequest>(r => r.Id == refundRequestId);
            spec.AddInclude(r => r.User);
            spec.AddInclude(r => r.Order);
            spec.AddInclude(r => r.Planwork);

            var refund = (await _refunds.GetAllWithSpecAsync(spec)).FirstOrDefault()
                ?? throw new InvalidOperationException($"RefundRequest {refundRequestId} not found.");

            var fullName = $"{refund.User?.FirstName} {refund.User?.LastName}".Trim();
            if (string.IsNullOrEmpty(fullName)) fullName = refund.User?.Username ?? "-";

            var course = refund.Planwork?.ServiceTitle ?? "-";
            var subject = $"طلب استرداد جديد من {fullName} – {Money(refund.Amount)} جنيه ({refund.RefNumber})";

            var values = new Dictionary<string, string>
            {
                ["RefNumber"] = Dash(refund.RefNumber),
                ["FullName"] = Dash(fullName),
                ["Email"] = Dash(refund.User?.Email),
                ["Phone"] = Dash(refund.User?.Phone),
                ["UserId"] = refund.UserId.ToString(CultureInfo.InvariantCulture),
                ["OrderId"] = refund.OrderId.ToString(CultureInfo.InvariantCulture),
                ["OrderNumber"] = Dash(refund.Order?.OrderNumber),
                ["Course"] = Dash(course),
                ["Amount"] = $"{Money(refund.Amount)} جنيه",
                ["Reason"] = Dash(refund.Reason),
                ["Details"] = Dash(refund.Details),
                ["RequestedAt"] = Fmt(ToCairo(refund.RequestedAt)),
                // Never put the full account number / IBAN in an email
                ["BankName"] = Dash(refund.BankName),
                ["AccountHolder"] = Dash(refund.AccountHolder),
                ["AccountMasked"] = Dash(Mask(refund.AccountNumber)),
                ["IbanMasked"] = Dash(Mask(refund.Iban)),
            };

            var html = RefundRequestedEmailRenderer.Render(values);
            await _email.SendAsync(recipients, subject, html, await LoadLogoAsync());

            _logger.LogInformation("Refund-requested email sent. RefundId={Id}, Ref={Ref}", refund.Id, refund.RefNumber);
        }

        // ── helpers (same behaviour as OrderNotificationService) ─────────
        private async Task<IReadOnlyList<EmailInlineImage>> LoadLogoAsync()
        {
            try
            {
                var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
                var path = Path.Combine(webRoot, "images", "icemt-logo.png");
                if (!File.Exists(path)) return Array.Empty<EmailInlineImage>();
                return new[] { new EmailInlineImage(LogoContentId, await File.ReadAllBytesAsync(path), "image/png") };
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to load email logo; sending without logo.");
                return Array.Empty<EmailInlineImage>();
            }
        }

        private static string Mask(string? s) =>
            string.IsNullOrWhiteSpace(s) ? "" : (s.Length <= 4 ? s : "****" + s[^4..]);

        private static string Enc(string? s) => WebUtility.HtmlEncode(s ?? "");

        private static string Dash(string? s) =>
            Enc(string.IsNullOrWhiteSpace(s) || s.Trim().Equals("null", StringComparison.OrdinalIgnoreCase) ? "-" : s);

        private static string Money(decimal v) => v.ToString("N2", CultureInfo.InvariantCulture);

        private static string Fmt(DateTime d) => d.ToString("yyyy/MM/dd HH:mm", CultureInfo.InvariantCulture);

        private static DateTime ToCairo(DateTime utc)
        {
            utc = DateTime.SpecifyKind(utc, DateTimeKind.Utc);
            foreach (var id in new[] { "Africa/Cairo", "Egypt Standard Time" })
            {
                try { return TimeZoneInfo.ConvertTimeFromUtc(utc, TimeZoneInfo.FindSystemTimeZoneById(id)); }
                catch (TimeZoneNotFoundException) { }
            }
            return utc;
        }
    }
}