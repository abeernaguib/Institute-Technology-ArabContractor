namespace Institute.Application.Interfaces.IService
{
    public interface IRefundNotificationService
    {
        /// <summary>
        /// Sends the "refund requested" email to the admin recipients.
        /// Call once, right after the RefundRequest is created.
        /// </summary>
        Task NotifyRefundRequestedAsync(int refundRequestId);
    }
}