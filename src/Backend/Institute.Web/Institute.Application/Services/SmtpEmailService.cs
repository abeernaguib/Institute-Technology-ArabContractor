using Institute.Application.Configurations;
using Institute.Application.Interfaces.IService;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;


namespace Institute.Application.Services
{
    public class SmtpEmailService : IEmailService
    {
        private readonly EmailSettings _s;

        public SmtpEmailService(IOptions<EmailSettings> options) => _s = options.Value;

        public async Task SendAsync(IEnumerable<string> to, string subject, string htmlBody,
                                    CancellationToken ct = default)
        {
            var msg = new MimeMessage();
            msg.From.Add(new MailboxAddress(_s.FromName, _s.FromAddress));
            foreach (var r in to)
                msg.To.Add(MailboxAddress.Parse(r));
            msg.Subject = subject;
            msg.Body = new BodyBuilder { HtmlBody = htmlBody }.ToMessageBody();

            using var client = new SmtpClient();
            client.Timeout = 15000;

            var security = _s.Port == 465
                ? SecureSocketOptions.SslOnConnect
                : SecureSocketOptions.StartTls;

            await client.ConnectAsync(_s.Host, _s.Port, security, ct);
            if (!string.IsNullOrEmpty(_s.UserName))
                await client.AuthenticateAsync(_s.UserName, _s.Password, ct);

            await client.SendAsync(msg, ct);
            await client.DisconnectAsync(true, ct);
        }
    }
}