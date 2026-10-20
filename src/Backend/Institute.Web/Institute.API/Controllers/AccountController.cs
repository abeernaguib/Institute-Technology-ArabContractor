using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Institute.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

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

        // Egyptian mobile: 01 + (0/1/2/5) + 8 digits, optionally with +20 / 0020 prefix
        private static readonly Regex EgyptPhone =
            new(@"^(\+20|0020|0)?(1[0125][0-9]{8})$", RegexOptions.Compiled);

        public AccountController(AppDbContext context, IClerkService clerk, ICurrentUserService currentUser)
        {
            _context = context;
            _clerk = clerk;
            _currentUser = currentUser;
        }

        // Returns the number as 01XXXXXXXXX, or null if it is not a valid Egyptian mobile
        private static string? NormalizePhone(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw)) return null;
            var cleaned = Regex.Replace(raw, @"[\s-]", "");
            var m = EgyptPhone.Match(cleaned);
            return m.Success ? "0" + m.Groups[2].Value : null;
        }

        [HttpPost("sync")]
        public async Task<IActionResult> Sync()
        {
            var clerkUserId = _currentUser.UserId;

            var clerkUser = await _clerk.GetUserAsync(clerkUserId);
            if (clerkUser == null)
                return BadRequest();

            var clerkPhone = NormalizePhone(clerkUser.Phone);

            // 1️⃣ Existing user by ClerkUserId
            var user = await _context.AppUsers
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(u => u.ClerkUserId == clerkUserId);

            if (user != null)
            {
                // موجود: حدّث بياناته وفعّل الحساب لو كان soft-deleted
                user.FirstName = clerkUser.FirstName;
                user.LastName = clerkUser.LastName;
                user.Username = clerkUser.Username ?? clerkUser.Email.Split('@')[0];
                user.IsDeleted = false;
                if (clerkPhone != null) user.Phone = clerkPhone;

                await _context.SaveChangesAsync();
                return Ok(user);
            }

            // 2️⃣ Existing user by Email (even if soft-deleted)
            user = await _context.AppUsers
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(u => u.Email == clerkUser.Email);

            if (user != null)
            {
                // Restore + حدّث الـ ClerkUserId الجديد
                user.ClerkUserId = clerkUserId;
                user.FirstName = clerkUser.FirstName;
                user.LastName = clerkUser.LastName;
                user.Username = clerkUser.Username ?? clerkUser.Email.Split('@')[0];
                user.IsDeleted = false;
                if (clerkPhone != null) user.Phone = clerkPhone;

                await _context.SaveChangesAsync();
                return Ok(user);
            }

            // 3️⃣ New user
            var newUser = new AppUser
            {
                ClerkUserId = clerkUserId,
                Email = clerkUser.Email,
                FirstName = clerkUser.FirstName,
                LastName = clerkUser.LastName,
                Username = clerkUser.Username ?? clerkUser.Email.Split('@')[0],
                Phone = clerkPhone,
                IsDeleted = false
            };

            _context.AppUsers.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(newUser);
        }

        // Saves the logged-in user's phone. The user comes from the token, never from the body.
        [HttpPut("phone")]
        public async Task<IActionResult> UpdatePhone([FromBody] UpdatePhoneDto dto)
        {
            var phone = NormalizePhone(dto?.Phone);
            if (phone == null)
                return BadRequest(new { message = "رقم الموبايل غير صحيح" });

            var clerkUserId = _currentUser.UserId;
            var user = await _context.AppUsers
                .FirstOrDefaultAsync(u => u.ClerkUserId == clerkUserId);

            if (user == null)
                return NotFound(new { message = "User not found" });

            user.Phone = phone;
            await _context.SaveChangesAsync();

            return Ok(new { phone = user.Phone });
        }
    }

    public class UpdatePhoneDto
    {
        public string? Phone { get; set; }
    }
}