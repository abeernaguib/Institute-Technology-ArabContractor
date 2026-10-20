namespace Institute.Application.Interfaces.IService
{
    public interface IEmailService
    {
        Task SendAsync(IEnumerable<string> to, string subject, string htmlBody,
                       CancellationToken ct = default);
    }
}