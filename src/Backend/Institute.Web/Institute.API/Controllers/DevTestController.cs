using Institute.Application.Configurations;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Application.Services;
using Institute.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using System.Reflection;

namespace Institute.API.Controllers
{
    /// <summary>
    /// TEMPORARY — for testing the order-paid email from Swagger.
    /// Works only in the Development environment. DELETE THIS FILE BEFORE DEPLOYING.
    /// </summary>
    [ApiController]
    [Route("api/dev")]
    public class DevTestController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly IEmailService _email;
        private readonly IOrderNotificationService _notification;
        private readonly ICheckoutService _checkout;
        private readonly EmailSettings _settings;

        public DevTestController(
            IWebHostEnvironment env,
            IEmailService email,
            IOrderNotificationService notification,
            ICheckoutService checkout,
            IOptions<EmailSettings> options)
        {
            _env = env;
            _email = email;
            _notification = notification;
            _checkout = checkout;
            _settings = options.Value;
        }

        // POST /api/dev/test-email
        // Sends a plain test mail → verifies SMTP settings only.
        [HttpPost("test-email")]
        public async Task<IActionResult> TestEmail()
        {
            if (!_env.IsDevelopment()) return NotFound();

            var recipients = GetRecipients();
            if (recipients.Count == 0)
                return BadRequest(new
                {
                    success = false,
                    message = "Email:OrderNotificationRecipients is empty."
                });

            try
            {
                await _email.SendAsync(
                    recipients,
                    "اختبار إعدادات الإيميل – ICMET",
                    "<div dir='rtl' style='font-family:Tahoma,Arial,sans-serif'>" +
                    "<h3>الإيميل شغال ✅</h3>" +
                    "<p>ده إيميل تجريبي من الـ API للتأكد من إعدادات الإرسال.</p></div>");

                return Ok(new { success = true, sentTo = recipients });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    error = ex.GetType().Name,
                    message = ex.Message
                });
            }
        }

        // POST /api/dev/test-order-email/{orderId}?resend=true
        // Sends the real "order paid" email for an order that is ALREADY paid.
        [HttpPost("test-order-email/{orderId:int}")]
        public async Task<IActionResult> TestOrderEmail(int orderId, [FromQuery] bool resend = true)
        {
            if (!_env.IsDevelopment()) return NotFound();

            if (!_settings.Enabled || GetRecipients().Count == 0)
                return BadRequest(new
                {
                    success = false,
                    message = "Email is disabled or no recipients configured."
                });

            var order = await _checkout.GetOrderByIdAsync(orderId);
            if (order == null)
                return NotFound(new { success = false, message = "Order not found." });

            if (order.Status != OrderStatus.Paid)
                return BadRequest(new
                {
                    success = false,
                    message = "Order is not Paid.",
                    status = order.Status.ToString()
                });

            // The test-mode service remembers sent orders in memory; clear it so you can re-test.
            if (resend) ForgetSentFlag(orderId);

            try
            {
                await _notification.NotifyOrderPaidAsync(orderId);
                return Ok(new
                {
                    success = true,
                    message = "Done. Check the inbox (and Spam).",
                    orderId,
                    total = order.TotalAmount
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    error = ex.GetType().Name,
                    message = ex.Message
                });
            }
        }

        private List<string> GetRecipients() =>
            _settings.OrderNotificationRecipients
                .Where(r => !string.IsNullOrWhiteSpace(r)).ToList();

        // Clears the in-memory "already sent" flag of the no-DB service (no-op otherwise).
        private static void ForgetSentFlag(int orderId)
        {
            var field = typeof(OrderNotificationService).GetField(
                "_sent", BindingFlags.NonPublic | BindingFlags.Static);

            (field?.GetValue(null) as ConcurrentDictionary<int, byte>)?.TryRemove(orderId, out _);
        }
    }
}