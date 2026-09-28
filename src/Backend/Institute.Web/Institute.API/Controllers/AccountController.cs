using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Institute.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Institute.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IClerkService _clerk;
        private readonly ICurrentUserService _currentUser;

        public AccountController(AppDbContext context, IClerkService clerk, ICurrentUserService currentUser)
        {
            _context = context;
            _clerk = clerk;
            _currentUser = currentUser;
        }

        [HttpPost("sync")]
        public async Task<IActionResult> Sync()
        {
            var clerkUserId = _currentUser.UserId;
           
            var clerkUser = await _clerk.GetUserAsync(clerkUserId);
            if (clerkUser == null)
                return BadRequest();

            //// 1️⃣ حاول تجيب المستخدم على أساس ClerkUserId أولاً
            var user = await _context.AppUsers
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(u => u.ClerkUserId == clerkUserId);

            if (user != null)
            {
                // لو موجود، فقط حدث بياناته وفعّل الحساب لو كان soft-deleted
                user.FirstName = clerkUser.FirstName;
                user.LastName = clerkUser.LastName;
                user.Username = clerkUser.Username ?? clerkUser.Email.Split('@')[0];
                user.IsDeleted = false;

                await _context.SaveChangesAsync();
                return Ok(user);
            }

            //// 2️⃣ لو مفيش مستخدم بنفس ClerkUserId، دور على Email موجود (حتى لو soft-deleted)
            user = await _context.AppUsers
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(u => u.Email == clerkUser.Email);

            if (user != null)
            {
                // اعمل Restore + حدّث الـ ClerkUserId الجديد
                user.ClerkUserId = clerkUserId;
                user.FirstName = clerkUser.FirstName;
                user.LastName = clerkUser.LastName;
                user.Username = clerkUser.Username ?? clerkUser.Email.Split('@')[0];
                user.IsDeleted = false;

                await _context.SaveChangesAsync();
                return Ok(user);
            }

            // 3️⃣ لو مفيش أي حاجة، اعمل مستخدم جديد
            var newUser = new AppUser
            {
                ClerkUserId = clerkUserId,
                Email = clerkUser.Email,
                FirstName = clerkUser.FirstName,
                LastName = clerkUser.LastName,
                Username = clerkUser.Username ?? clerkUser.Email.Split('@')[0],
                IsDeleted = false
            };

            _context.AppUsers.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(newUser);
        }




    }
}
