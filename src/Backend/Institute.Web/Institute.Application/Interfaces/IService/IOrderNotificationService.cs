namespace Institute.Application.Interfaces.IService
{
    public interface IOrderNotificationService
    {
        /// <summary>
        /// Sends the "order paid" email once per order. Safe to call more than once
        /// (and concurrently) for the same order.
        /// </summary>
        Task NotifyOrderPaidAsync(int orderId);
    }
}