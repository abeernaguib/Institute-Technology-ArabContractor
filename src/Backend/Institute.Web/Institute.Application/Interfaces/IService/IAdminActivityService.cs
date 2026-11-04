namespace Institute.Application.Interfaces.IService
{
    public interface IAdminActivityService
    {
        // Logs only if the current user is an Admin or a Manager
        Task LogAsync(string actionType, string section, string? subSection,
                      string controller, string? entityId, string? details);
    }
}