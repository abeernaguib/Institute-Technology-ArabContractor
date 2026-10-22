using Institute.Application.Exceptions;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Institute.Domain.specifications;

namespace Institute.Application.Services
{
    public class CartService : ICartService
    {
        private readonly IRepository<AppUser> _userRepository;
        private readonly IRepository<Cart> _cartRepository;
        private readonly IRepository<CartItem> _cartItemRepository;
        private readonly IRepository<Planwork> _planworkRepository;
        private readonly IRepository<Enrollment> _enrollmentRepository;
        private readonly IRoundSelectionService _roundSelection;

        public CartService(
            IRepository<AppUser> userRepository,
            IRepository<Cart> cartRepository,
            IRepository<CartItem> cartItemRepository,
            IRepository<Planwork> planworkRepository,
            IRepository<Enrollment> enrollmentRepository,
            IRoundSelectionService roundSelection)
        {
            _userRepository = userRepository;
            _cartRepository = cartRepository;
            _cartItemRepository = cartItemRepository;
            _planworkRepository = planworkRepository;
            _enrollmentRepository = enrollmentRepository;
            _roundSelection = roundSelection;
        }

        public async Task<Cart> GetUserCartAsync(string clerkUserId)
        {
            var userSpec = new BaseSpecification<AppUser>(u => u.ClerkUserId == clerkUserId && !u.IsDeleted);
            var user = (await _userRepository.GetAllWithSpecAsync(userSpec)).FirstOrDefault();

            if (user == null)
                throw new Exception("User not found");

            var cartSpec = new BaseSpecification<Cart>(c => c.UserId == user.Id && !c.IsCheckedOut);
            cartSpec.AddInclude(c => c.Items);
            cartSpec.AddInclude("Items.Planwork");
            cartSpec.AddInclude("Items.Planwork.Files");
            cartSpec.AddInclude("Items.Round");                       // NEW

            var cart = (await _cartRepository.GetAllWithSpecAsync(cartSpec)).FirstOrDefault();

            if (cart == null)
            {
                cart = new Cart { UserId = user.Id, CreatedAt = DateTime.UtcNow };
                await _cartRepository.AddAsync(cart);
                await _cartRepository.SaveChangesAsync();
            }

            return cart;
        }

        public async Task AddToCartAsync(string clerkUserId, int planworkId, bool isOnline = false, int? roundId = null)
        {
            var cart = await GetUserCartAsync(clerkUserId);

            var planwork = await _planworkRepository.GetByIdAsync(planworkId);
            if (planwork == null)
                throw new Exception("Course not found");

            // one user = one enrollment per course (also enforced by a unique index)
            if (await _enrollmentRepository.AnyAsync(e => e.UserId == cart.UserId && e.PlanworkId == planworkId))
                throw new BusinessRuleException("أنت مسجل في هذه الدورة بالفعل.");

            var round = await _roundSelection.ResolveAsync(planworkId, roundId);   // may throw BusinessRuleException

            var price = isOnline
                ? (planwork.OnlineCost ?? planwork.PlanCost ?? 0)
                : (planwork.PlanCost ?? 0);

            var itemSpec = new BaseSpecification<CartItem>(
                i => i.CartId == cart.Id && i.PlanworkId == planworkId);

            var existingItem = (await _cartItemRepository.GetAllWithSpecAsync(itemSpec))
                .FirstOrDefault();

            if (existingItem != null)
            {
                var changed = false;

                if (existingItem.IsOnline != isOnline)
                {
                    existingItem.IsOnline = isOnline;
                    existingItem.Price = price;
                    changed = true;
                }

                // only touch the round when the client actually sent one
                if (round != null && existingItem.RoundId != round.Id)
                {
                    existingItem.RoundId = round.Id;
                    changed = true;
                }

                if (changed)
                {
                    _cartItemRepository.Update(existingItem);
                    await _cartItemRepository.SaveChangesAsync();
                }
                return;
            }

            await _cartItemRepository.AddAsync(new CartItem
            {
                CartId = cart.Id,
                PlanworkId = planworkId,
                Price = price,
                IsOnline = isOnline,
                RoundId = round?.Id
            });

            await _cartItemRepository.SaveChangesAsync();
        }

        public async Task RemoveFromCartAsync(string clerkUserId, int planworkId)
        {
            var cart = await GetUserCartAsync(clerkUserId);

            var itemSpec = new BaseSpecification<CartItem>(
                i => i.CartId == cart.Id && i.PlanworkId == planworkId);

            var item = (await _cartItemRepository.GetAllWithSpecAsync(itemSpec)).FirstOrDefault();
            if (item == null) return;

            _cartItemRepository.Delete(item);
            await _cartItemRepository.SaveChangesAsync();
        }
    }
}