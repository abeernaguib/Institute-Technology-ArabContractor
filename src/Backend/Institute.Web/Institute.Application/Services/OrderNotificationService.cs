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
using System.Text;

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
                return; // already sent (or being sent)

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

                var subject = $"عملية دفع جديدة – طلب #{order.Id} – {Money(order.TotalAmount)} جنيه";
                await _email.SendAsync(recipients, subject, BuildHtml(order));

                _logger.LogInformation("Order-paid email sent. OrderId={OrderId}", orderId);
            }
            catch
            {
                // 3) Sending failed → release the claim
                _sent.TryRemove(orderId, out _);
                throw;
            }
        }

        // ── Email body (RTL, Arabic) ──────────────────────────────────
        private static string BuildHtml(Order order)
        {
            var user = order.User;
            var fullName = $"{user?.FirstName} {user?.LastName}".Trim();
            if (string.IsNullOrEmpty(fullName)) fullName = user?.Username ?? "-";

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

            var warningHtml = warnings.Count == 0
                ? ""
                : "<div style='background:#fff4e5;border:1px solid #f0b95a;padding:10px;margin:12px 0'>" +
                  "<b>⚠ تنبيه للمراجعة:</b><br/>" +
                  string.Join("<br/>", warnings.Select(w => Enc(w))) + "</div>";

            // Courses table
            var rows = new StringBuilder();
            var no = 0;
            foreach (var item in items)
            {
                no++;
                var plan = item.Planwork;
                rows.Append(
                    "<tr>" +
                    Td(no.ToString(CultureInfo.InvariantCulture)) +
                    Td(Enc(plan?.ServiceTitle)) +
                    Td(Enc(plan?.CourseDate)) +
                    Td(Enc(plan?.CourseDays)) +
                    Td(Enc(plan?.CoursePlace)) +
                    Td(item.IsOnline ? "أونلاين" : "حضوري") +
                    Td($"{Money(item.Price)} جنيه") +
                    "</tr>");
            }

            var buyer =
                Row("الاسم", fullName) +
                Row("الإيميل", user?.Email) +
                Row("اسم المستخدم", user?.Username) +
                Row("رقم المستخدم", user != null ? $"#{user.Id}" : null);

            var orderInfo =
                Row("رقم الطلب", $"#{order.Id}") +
                Row("المرجع", order.OrderNumber) +
                Row("حالة الطلب", OrderStatusName(order.Status)) +
                Row("تاريخ إنشاء الطلب", Fmt(ToCairo(order.CreatedAt)));

            var paymentInfo =
                Row("طريقة الدفع", MethodName(payment?.Method)) +
                Row("حالة الدفع", PaymentStatusName(payment?.Status)) +
                Row("المبلغ المدفوع", payment != null ? $"{Money(payment.Amount)} جنيه" : null) +
                Row("تاريخ الدفع", Fmt(ToCairo(payment?.PaymentDate ?? DateTime.UtcNow))) +
                Row("مرجع الدفع", payment?.TransactionRef) +
                Row("رقم جلسة الدفع", order.GatewaySessionId);

            return
                "<div dir='rtl' style='font-family:Tahoma,Arial,sans-serif;font-size:14px;color:#222;max-width:720px'>" +
                "<h2 style='margin:0 0 4px'>تم دفع طلب جديد ✅</h2>" +
                $"<p style='margin:0 0 8px;color:#666'>طلب #{order.Id} – {Enc(fullName)}</p>" +
                warningHtml +
                Section("بيانات المشتري", buyer) +
                Section("بيانات الطلب", orderInfo) +
                Section("بيانات الدفع", paymentInfo) +
                "<h3 style='margin:18px 0 6px;font-size:15px;color:#1a3c6e'>الكورسات</h3>" +
                "<table style='border-collapse:collapse;width:100%'>" +
                "<thead><tr style='background:#f3f3f3'>" +
                Th("#") + Th("الكورس") + Th("التاريخ") + Th("الأيام") + Th("المكان") + Th("النوع") + Th("السعر") +
                "</tr></thead>" +
                $"<tbody>{rows}</tbody></table>" +
                $"<p style='font-size:13px;color:#555'>عدد الكورسات: {items.Count} (حضوري: {onsiteCount} • أونلاين: {onlineCount})</p>" +
                $"<p style='font-size:17px'><b>الإجمالي: {Money(order.TotalAmount)} جنيه</b></p>" +
                "</div>";
        }

        // ── helpers ───────────────────────────────────────────────────
        private static string Section(string title, string rowsHtml) =>
            $"<h3 style='margin:18px 0 6px;font-size:15px;color:#1a3c6e'>{title}</h3>" +
            $"<table style='border-collapse:collapse;width:100%'>{rowsHtml}</table>";

        private static string Row(string label, string? value) =>
            "<tr>" +
            $"<td style='padding:6px 10px;color:#666;width:32%;border-bottom:1px solid #eee'>{label}</td>" +
            $"<td style='padding:6px 10px;border-bottom:1px solid #eee'>{Enc(string.IsNullOrWhiteSpace(value) ? "-" : value)}</td>" +
            "</tr>";

        // html is already encoded by the caller
        private static string Td(string html) =>
            $"<td style='padding:7px;border:1px solid #ddd'>{html}</td>";

        private static string Th(string text) =>
            $"<th style='padding:7px;border:1px solid #ddd;text-align:right'>{text}</th>";

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