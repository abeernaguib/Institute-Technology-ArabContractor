using Institute.API.DTOs;
using Institute.Application.Exceptions;
using Institute.Application.Interfaces.IService;
using Institute.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Institute.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        private readonly ICurrentUserService _currentUser;

        public CartController(ICartService cartService, ICurrentUserService currentUser)
        {
            _cartService = cartService;
            _currentUser = currentUser;
        }

        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var cart = await _cartService.GetUserCartAsync(_currentUser.UserId);

            var result = new CartDto
            {
                Id = cart.Id,
                CreatedAt = cart.CreatedAt,
                Items = cart.Items.Select(i => new CartItemDto
                {
                    PlanworkId = i.PlanworkId,
                    Price = i.Price,
                    Title = i.Planwork?.ServiceTitle,
                    Place = i.Planwork?.CoursePlace,
                    Date = i.Planwork?.CourseDate,
                    Days = i.Planwork?.CourseDays,
                    Slug = i.Planwork?.Slug,
                    IsOnline = i.IsOnline,                                          // ✅
                    Cost = i.Planwork?.PlanCost,  // ← السعر الأصلي دايماً
                    OnlineCost = i.Planwork?.OnlineCost,                            // ✅
                    RoundId = i.RoundId,
                    RoundStart = i.Round?.StartDate.ToString("yyyy-MM-dd"),
                    RoundEnd = i.Round?.EndDate.ToString("yyyy-MM-dd"),
                    RoundIsBookable = i.Round != null ? RoundRules.IsBookable(i.Round) : (bool?)null,
                }).ToList()
            };

            return Ok(result);
        }

        /// <summary>
        /// POST /api/cart/add/{planworkId}
        /// Body: { "isOnline": true/false, "roundId": 12 (optional) }
        /// </summary>
        [HttpPost("add/{planworkId}")]
        public async Task<IActionResult> AddToCart(int planworkId, [FromBody] AddToCartDto dto)
        {
            try
            {
                await _cartService.AddToCartAsync(_currentUser.UserId, planworkId, dto.IsOnline, dto.RoundId);
                return Ok();
            }
            catch (BusinessRuleException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("remove/{planworkId}")]
        public async Task<IActionResult> RemoveFromCart(int planworkId)
        {
            await _cartService.RemoveFromCartAsync(_currentUser.UserId, planworkId);
            return Ok();
        }
    }

    public class AddToCartDto
    {
        public bool IsOnline { get; set; }
        public int? RoundId { get; set; }
    }
}