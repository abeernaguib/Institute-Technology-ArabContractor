using Institute.Application.Configurations;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Institute.Domain.Enums;
using Institute.Domain.specifications;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using System.Globalization;
using System.Net;

namespace Institute.Application.Services
{
    public class OrderNotificationService : IOrderNotificationService
    {
        // TEMPORARY (testing): in-memory guard instead of a DB column.
        // Lost on restart / not shared between instances.
        private static readonly ConcurrentDictionary<int, byte> _sent = new();

        private readonly IRepository<Order> _orders;
        private readonly IEmailService _email;
        private readonly EmailSettings _settings;
        private readonly ILogger<OrderNotificationService> _logger;

        public OrderNotificationService(
            IRepository<Order> orders,
            IEmailService email,
            IOptions<EmailSettings> options,
            ILogger<OrderNotificationService> logger)
        {
            _orders = orders;
            _email = email;
            _settings = options.Value;
            _logger = logger;
        }

        public async Task NotifyOrderPaidAsync(int orderId)
        {
            var recipients = _settings.OrderNotificationRecipients
                .Where(r => !string.IsNullOrWhiteSpace(r)).ToList();

            if (!_settings.Enabled || recipients.Count == 0)
                return;

            // 1) Claim in memory: only ONE caller per order gets TryAdd == true
            if (!_sent.TryAdd(orderId, 0))
                return;

            try
            {
                // 2) Load everything the email needs
                var spec = new BaseSpecification<Order>(o => o.Id == orderId);
                spec.AddInclude(o => o.User);
                spec.AddInclude(o => o.Items);
                spec.AddInclude("Items.Planwork");
                spec.AddInclude(o => o.Payments);

                var order = (await _orders.GetAllWithSpecAsync(spec)).FirstOrDefault()
                    ?? throw new InvalidOperationException($"Order {orderId} not found.");

                if (order.Status != OrderStatus.Paid)
                {
                    _sent.TryRemove(orderId, out _);
                    return;
                }

                await _email.SendAsync(recipients, BuildSubject(order), BuildHtml(order), LoadInlineImages());

                _logger.LogInformation("Order-paid email sent. OrderId={OrderId}", orderId);
            }
            catch
            {
                // 3) Sending failed → release the claim
                _sent.TryRemove(orderId, out _);
                throw;
            }
        }

        // ── Email body: collects the data, the design lives in OrderPaidEmailRenderer ──
        private static string BuildHtml(Order order)
        {
            var user = order.User;
            var fullName = FullNameOf(order);

            var payment = order.Payments
                              .Where(pay => pay.Status == PaymentStatus.Success)
                              .OrderByDescending(pay => pay.Id)
                              .FirstOrDefault()
                          ?? order.Payments.OrderByDescending(pay => pay.Id).FirstOrDefault();

            var items = order.Items.ToList();
            var onlineCount = items.Count(x => x.IsOnline);
            var onsiteCount = items.Count - onlineCount;
            var itemsSum = items.Sum(x => x.Price);

            // Data mismatches the admin should look at
            var warnings = new List<string>();
            if (payment == null)
                warnings.Add("لا يوجد سجل دفع مرتبط بالطلب.");
            else if (payment.Amount != order.TotalAmount)
                warnings.Add($"المبلغ المدفوع ({Money(payment.Amount)} جنيه) لا يساوي إجمالي الطلب ({Money(order.TotalAmount)} جنيه).");
            if (itemsSum != order.TotalAmount)
                warnings.Add($"مجموع أسعار الكورسات ({Money(itemsSum)} جنيه) لا يساوي إجمالي الطلب ({Money(order.TotalAmount)} جنيه).");

            var itemRows = new List<IReadOnlyDictionary<string, string>>();
            var no = 0;
            foreach (var item in items)
            {
                no++;
                var plan = item.Planwork;
                itemRows.Add(new Dictionary<string, string>
                {
                    ["No"] = no.ToString(CultureInfo.InvariantCulture),
                    ["Title"] = Dash(plan?.ServiceTitle),
                    ["Date"] = Dash(plan?.CourseDate),
                    ["Days"] = Dash(plan?.CourseDays),
                    ["Place"] = Dash(plan?.CoursePlace),
                    ["Type"] = item.IsOnline ? "أونلاين" : "حضوري",
                    ["Price"] = $"{Money(item.Price)} جنيه",
                });
            }

            // Everything below is already HTML-encoded
            var values = new Dictionary<string, string>
            {
                ["FullName"] = Dash(fullName),
                ["WhatBought"] = Enc(WhatBought(order, 80)),
                ["Email"] = Dash(user?.Email),
                ["Username"] = Dash(user?.Username),
                ["UserId"] = user != null ? user.Id.ToString(CultureInfo.InvariantCulture) : "-",
                ["OrderId"] = order.Id.ToString(CultureInfo.InvariantCulture),
                ["OrderNumber"] = Dash(order.OrderNumber),
                ["OrderStatus"] = Dash(OrderStatusName(order.Status)),
                ["CreatedAt"] = Fmt(ToCairo(order.CreatedAt)),
                ["PaymentMethod"] = Dash(MethodName(payment?.Method)),
                ["PaymentStatus"] = Dash(PaymentStatusName(payment?.Status)),
                ["PaidAmount"] = payment != null ? $"{Money(payment.Amount)} جنيه" : "-",
                ["PaidAt"] = Fmt(ToCairo(payment?.PaymentDate ?? DateTime.UtcNow)),
                ["PaymentRef"] = Dash(payment?.TransactionRef),
                ["SessionId"] = Dash(order.GatewaySessionId),
                ["CourseCount"] = items.Count.ToString(CultureInfo.InvariantCulture),
                ["OnsiteCount"] = onsiteCount.ToString(CultureInfo.InvariantCulture),
                ["OnlineCount"] = onlineCount.ToString(CultureInfo.InvariantCulture),
                ["Total"] = $"{Money(order.TotalAmount)} جنيه",
                // no "Phone" key → the phone row is skipped (this version has no Clerk lookup)
            };

            return OrderPaidEmailRenderer.Render(values, itemRows, warnings.Select(Enc).ToList());
        }

        // ── logo (embedded resource icemt-logo.png → inline image, cid:icemt-logo@icemt) ──
        private const string LogoContentId = "icemt-logo@icemt";
        private static byte[]? _logo;

        private static IReadOnlyList<EmailInlineImage> LoadInlineImages()
        {
            if (_logo == null)
            {
                var asm = typeof(OrderNotificationService).Assembly;
                var name = asm.GetManifestResourceNames()
                    .FirstOrDefault(n => n.EndsWith("icemt-logo.png", StringComparison.OrdinalIgnoreCase));
                if (name == null) return Array.Empty<EmailInlineImage>(); // no logo → email still works

                using var stream = asm.GetManifestResourceStream(name)!;
                using var ms = new MemoryStream();
                stream.CopyTo(ms);
                _logo = ms.ToArray();
            }
            return new[] { new EmailInlineImage(LogoContentId, _logo, "image/png") };
        }

        // ── subject + "who bought what" ───────────────────────────────
        private static string FullNameOf(Order order)
        {
            var user = order.User;
            var name = $"{user?.FirstName} {user?.LastName}".Trim();
            return string.IsNullOrEmpty(name) ? (user?.Username ?? "-") : name;
        }

        private static string WhatBought(Order order, int max)
        {
            var items = order.Items.ToList();
            return items.Count == 1
                ? $"كورس «{Trunc(items[0].Planwork?.ServiceTitle, max)}»"
                : $"{items.Count} كورسات";
        }

        private static string BuildSubject(Order order) =>
            $"اشترى {FullNameOf(order)} {WhatBought(order, 50)} – {Money(order.TotalAmount)} جنيه";

        private static string Trunc(string? s, int max) =>
            string.IsNullOrWhiteSpace(s) ? "-" : (s.Length <= max ? s : s[..max] + "…");

        // ── helpers ───────────────────────────────────────────────────
        private static string OrderStatusName(OrderStatus s) => s switch
        {
            OrderStatus.Pending => "قيد الانتظار",
            OrderStatus.Paid => "مدفوع",
            OrderStatus.Cancelled => "ملغي",
            OrderStatus.Refunded => "مسترد",
            _ => s.ToString()
        };

        private static string? MethodName(PaymentMethod? m) => m switch
        {
            PaymentMethod.Visa => "بطاقة ائتمان (Visa / Mastercard)",
            PaymentMethod.Fawry => "فوري",
            PaymentMethod.Instapay => "إنستاباي",
            _ => null
        };

        private static string? PaymentStatusName(PaymentStatus? s) => s switch
        {
            PaymentStatus.Success => "ناجحة",
            PaymentStatus.Pending => "معلّقة",
            PaymentStatus.Failed => "فاشلة",
            PaymentStatus.Refunded => "مستردة",
            _ => null
        };

        private static string Fmt(DateTime d) =>
            d.ToString("yyyy/MM/dd HH:mm", CultureInfo.InvariantCulture);

        private static string Enc(string? s) => WebUtility.HtmlEncode(s ?? "");

        private static string Dash(string? s) =>
            Enc(string.IsNullOrWhiteSpace(s) ? "-" : s);

        private static string Money(decimal v) =>
            v.ToString("N2", CultureInfo.InvariantCulture);

        private static DateTime ToCairo(DateTime utc)
        {
            utc = DateTime.SpecifyKind(utc, DateTimeKind.Utc);
            foreach (var id in new[] { "Africa/Cairo", "Egypt Standard Time" })
            {
                try
                {
                    return TimeZoneInfo.ConvertTimeFromUtc(utc, TimeZoneInfo.FindSystemTimeZoneById(id));
                }
                catch (TimeZoneNotFoundException) { }
            }
            return utc;
        }
    }
}