namespace Institute.Application.Interfaces.IService
{
    /// <summary>An image embedded in the email body (referenced as src="cid:{ContentId}").</summary>
    public sealed record EmailInlineImage(string ContentId, byte[] Data, string MimeType);

    public interface IEmailService
    {
        Task SendAsync(IEnumerable<string> to, string subject, string htmlBody,
                       IEnumerable<EmailInlineImage>? inlineImages = null,
                       CancellationToken ct = default);
    }
}