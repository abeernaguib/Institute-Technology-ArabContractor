using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Institute.Domain.specifications.PermissionsSpec;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Institute.Application.Services
{
    public class UserPermissionService : IUserPermissionService
    {
        // Tabs that only managers can have. They can never be assigned to an Admin.
        private static readonly string[] ManagerOnlyPermissions = { "ActivityLog", "Settings" };

        private readonly IRepository<UserPermission> _userPermissionsRepo;
        private readonly IRepository<AppUser> _appUserRepo;
        private readonly IRepository<Permission> _permissionRepo;

        public UserPermissionService(
            IRepository<UserPermission> userPermissionsRepo,
            IRepository<AppUser> appUserRepo,
            IRepository<Permission> permissionRepo)
        {
            _userPermissionsRepo = userPermissionsRepo;
            _appUserRepo = appUserRepo;
            _permissionRepo = permissionRepo;
        }

        public async Task AssignAsync(int userId, int permissionId)
        {
            var user = await _appUserRepo.GetByIdAsync(userId);

            if (user == null)
                throw new KeyNotFoundException("User not found");

            var permission = await _permissionRepo.GetByIdAsync(permissionId);

            if (permission == null)
                throw new KeyNotFoundException("Permission not found");

            // Block manager-only tabs
            if (ManagerOnlyPermissions.Contains(permission.Name, StringComparer.OrdinalIgnoreCase))
                throw new InvalidOperationException("هذا التبويب للمدير فقط، لا يمكن منحه لـ Admin");

            var exists = await _userPermissionsRepo.AnyAsync(
                x => x.AppUserId == userId &&
                     x.PermissionId == permissionId);

            if (!exists)
            {
                var userPermission = new UserPermission
                {
                    AppUserId = userId,
                    PermissionId = permissionId
                };

                await _userPermissionsRepo.AddAsync(userPermission);
            }

            // User has at least one admin permission
            user.IsAdmin = true;

            await _userPermissionsRepo.SaveChangesAsync();
        }

        public async Task RemoveAsync(int userId, int permissionId)
        {
            var spec = new UserPermissionByUserAndPermissionSpec(
                userId,
                permissionId);

            var entity = (await _userPermissionsRepo.ListAsync(spec))
                .FirstOrDefault();

            if (entity == null)
                return;

            _userPermissionsRepo.Delete(entity);

            // Check if the user still has other permissions
            var hasOtherPermissions = await _userPermissionsRepo.AnyAsync(
                x => x.AppUserId == userId &&
                     x.PermissionId != permissionId);

            var user = await _appUserRepo.GetByIdAsync(userId);

            if (user != null)
            {
                user.IsAdmin = hasOtherPermissions;
            }

            await _userPermissionsRepo.SaveChangesAsync();
        }

        public async Task<List<string>> GetUserPermissionsAsync(int userId)
        {
            var spec = new UserPermissionsSpec(userId);

            var result = await _userPermissionsRepo.ListAsync(spec);

            return result
                .Where(x => x.Permission != null)
                .Select(x => x.Permission.Name)
                .ToList();
        }

        public async Task<List<string>> GetPermissionsByClerkId(
            string clerkId)
        {
            var user = await _appUserRepo.GetByClerkIdAsync(clerkId);

            if (user == null)
                return new List<string>();

            var spec = new UserPermissionsSpec(user.Id);

            var userPermissions =
                await _userPermissionsRepo.GetAllWithSpecAsync(spec);

            return userPermissions
                .Where(x => x.Permission != null)
                .Select(x => x.Permission.Name)
                .ToList();
        }

        // Powers GET /api/UserPermissions/me
        public async Task<(bool IsManager, List<string> Permissions)> GetMyRoleAsync(
            string clerkId)
        {
            var user = await _appUserRepo.GetByClerkIdAsync(clerkId);

            if (user == null)
                return (false, new List<string>());

            if (user.IsManager)
                return (true, new List<string>());

            var spec = new UserPermissionsSpec(user.Id);

            var userPermissions =
                await _userPermissionsRepo.GetAllWithSpecAsync(spec);

            var names = userPermissions
                .Where(x => x.Permission != null)
                .Select(x => x.Permission.Name)
                .ToList();

            return (false, names);
        }
    }
}