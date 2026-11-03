using Institute.Application.DTOs;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;

namespace Institute.Application.Services
{
    public class ProtocolService : IProtocolService
    {
        private readonly IRepository<ProtocolGroup> _groups;
        private readonly IRepository<ProtocolItem> _items;

        public ProtocolService(IRepository<ProtocolGroup> groups, IRepository<ProtocolItem> items)
        {
            _groups = groups;
            _items = items;
        }

        // ── PUBLIC ────────────────────────────────────────────────────────────
        public async Task<IEnumerable<ProtocolGroupPublicDto>> GetPublicAsync()
        {
            var groups = (await _groups.GetAllAsync())
                .Where(g => g.IsActive)
                .OrderBy(g => g.DisplayOrder).ThenBy(g => g.Id)
                .ToList();

            var items = (await _items.GetAllAsync())
                .Where(i => i.IsActive)
                .ToList();

            return groups
                .Select(g => new ProtocolGroupPublicDto
                {
                    Id = g.Id,
                    Title = g.Title,
                    Icon = g.Icon,
                    Items = items
                        .Where(i => i.GroupId == g.Id)
                        .OrderBy(i => i.DisplayOrder).ThenBy(i => i.Id)
                        .Select(i => new ProtocolItemPublicDto { Id = i.Id, Name = i.Name })
                        .ToList()
                })
                .Where(g => g.Items.Count > 0)   // don't show a heading with nothing under it
                .ToList();
        }

        // ── GROUPS (admin) ────────────────────────────────────────────────────
        public async Task<IEnumerable<ProtocolGroupResponseDto>> GetGroupsAsync()
        {
            var groups = await _groups.GetAllAsync();
            var items = (await _items.GetAllAsync()).ToList();

            return groups
                .OrderBy(g => g.DisplayOrder).ThenBy(g => g.Id)
                .Select(g => GroupToDto(g, items.Count(i => i.GroupId == g.Id)))
                .ToList();
        }

        public async Task<ProtocolGroupResponseDto> CreateGroupAsync(ProtocolGroupCreateUpdateDto dto)
        {
            var entity = new ProtocolGroup();
            ApplyGroup(entity, dto);

            await _groups.AddAsync(entity);
            await _groups.SaveChangesAsync();

            return GroupToDto(entity, 0);
        }

        public async Task<ProtocolGroupResponseDto?> UpdateGroupAsync(int id, ProtocolGroupCreateUpdateDto dto)
        {
            var entity = await _groups.GetByIdAsync(id);
            if (entity == null) return null;

            ApplyGroup(entity, dto);

            _groups.Update(entity);
            await _groups.SaveChangesAsync();

            var count = (await _items.GetAllAsync()).Count(i => i.GroupId == id);
            return GroupToDto(entity, count);
        }

        public async Task<DeleteGroupResult> DeleteGroupAsync(int id)
        {
            var entity = await _groups.GetByIdAsync(id);
            if (entity == null) return DeleteGroupResult.NotFound;

            if (await _items.AnyAsync(i => i.GroupId == id))
                return DeleteGroupResult.HasItems;

            _groups.Delete(entity);
            await _groups.SaveChangesAsync();
            return DeleteGroupResult.Deleted;
        }

        public Task<bool> GroupExistsAsync(int groupId) => _groups.AnyAsync(g => g.Id == groupId);

        // ── ITEMS (admin) ─────────────────────────────────────────────────────
        public async Task<IEnumerable<ProtocolItemResponseDto>> GetItemsAsync()
        {
            var groups = (await _groups.GetAllAsync()).ToDictionary(g => g.Id);
            var items = await _items.GetAllAsync();

            return items
                .OrderBy(i => groups.TryGetValue(i.GroupId, out var g) ? g.DisplayOrder : int.MaxValue)
                .ThenBy(i => i.GroupId)
                .ThenBy(i => i.DisplayOrder).ThenBy(i => i.Id)
                .Select(i => ItemToDto(i, groups))
                .ToList();
        }

        public async Task<ProtocolItemResponseDto?> GetItemByIdAsync(int id)
        {
            var entity = await _items.GetByIdAsync(id);
            if (entity == null) return null;

            var groups = (await _groups.GetAllAsync()).ToDictionary(g => g.Id);
            return ItemToDto(entity, groups);
        }

        public async Task<ProtocolItemResponseDto> CreateItemAsync(ProtocolItemCreateUpdateDto dto)
        {
            var entity = new ProtocolItem();
            ApplyItem(entity, dto);

            await _items.AddAsync(entity);
            await _items.SaveChangesAsync();

            var groups = (await _groups.GetAllAsync()).ToDictionary(g => g.Id);
            return ItemToDto(entity, groups);
        }

        public async Task<ProtocolItemResponseDto?> UpdateItemAsync(int id, ProtocolItemCreateUpdateDto dto)
        {
            var entity = await _items.GetByIdAsync(id);
            if (entity == null) return null;

            ApplyItem(entity, dto);

            _items.Update(entity);
            await _items.SaveChangesAsync();

            var groups = (await _groups.GetAllAsync()).ToDictionary(g => g.Id);
            return ItemToDto(entity, groups);
        }

        public async Task<bool> DeleteItemAsync(int id)
        {
            var entity = await _items.GetByIdAsync(id);
            if (entity == null) return false;

            _items.Delete(entity);
            await _items.SaveChangesAsync();
            return true;
        }

        // ── Mapping ───────────────────────────────────────────────────────────
        private static void ApplyGroup(ProtocolGroup e, ProtocolGroupCreateUpdateDto dto)
        {
            e.Title = dto.Title.Trim();
            e.Icon = string.IsNullOrWhiteSpace(dto.Icon) ? null : dto.Icon.Trim();
            e.DisplayOrder = dto.DisplayOrder;
            e.IsActive = dto.IsActive;
        }

        private static void ApplyItem(ProtocolItem e, ProtocolItemCreateUpdateDto dto)
        {
            e.GroupId = dto.GroupId;
            e.Name = dto.Name.Trim();
            e.DisplayOrder = dto.DisplayOrder;
            e.IsActive = dto.IsActive;
        }

        private static ProtocolGroupResponseDto GroupToDto(ProtocolGroup g, int itemsCount) => new()
        {
            Id = g.Id,
            Title = g.Title,
            Icon = g.Icon,
            DisplayOrder = g.DisplayOrder,
            IsActive = g.IsActive,
            ItemsCount = itemsCount
        };

        private static ProtocolItemResponseDto ItemToDto(ProtocolItem i, IDictionary<int, ProtocolGroup> groups)
        {
            groups.TryGetValue(i.GroupId, out var g);
            return new ProtocolItemResponseDto
            {
                Id = i.Id,
                GroupId = i.GroupId,
                GroupTitle = g?.Title,
                GroupIcon = g?.Icon,
                Name = i.Name,
                DisplayOrder = i.DisplayOrder,
                IsActive = i.IsActive
            };
        }
    }
}