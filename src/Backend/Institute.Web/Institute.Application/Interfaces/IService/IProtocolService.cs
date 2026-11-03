using Institute.Application.DTOs;

namespace Institute.Application.Interfaces.IService
{
    public enum DeleteGroupResult { Deleted, NotFound, HasItems }

    public interface IProtocolService
    {
        // public page: active groups (that have at least one active item), ordered
        Task<IEnumerable<ProtocolGroupPublicDto>> GetPublicAsync();

        // groups (admin)
        Task<IEnumerable<ProtocolGroupResponseDto>> GetGroupsAsync();
        Task<ProtocolGroupResponseDto> CreateGroupAsync(ProtocolGroupCreateUpdateDto dto);
        Task<ProtocolGroupResponseDto?> UpdateGroupAsync(int id, ProtocolGroupCreateUpdateDto dto);
        Task<DeleteGroupResult> DeleteGroupAsync(int id);
        Task<bool> GroupExistsAsync(int groupId);

        // items (admin)
        Task<IEnumerable<ProtocolItemResponseDto>> GetItemsAsync();
        Task<ProtocolItemResponseDto?> GetItemByIdAsync(int id);
        Task<ProtocolItemResponseDto> CreateItemAsync(ProtocolItemCreateUpdateDto dto);
        Task<ProtocolItemResponseDto?> UpdateItemAsync(int id, ProtocolItemCreateUpdateDto dto);
        Task<bool> DeleteItemAsync(int id);
    }
}