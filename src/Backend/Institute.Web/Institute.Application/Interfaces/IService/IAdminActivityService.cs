namespace Institute.Application.Interfaces.IService
{
    public interface IAdminActivityService
    {
        // Logs only if the current user is an Admin or a Manager
        Task LogAsync(string actionType, string entityType, string? entityId, string? details);
    }
}