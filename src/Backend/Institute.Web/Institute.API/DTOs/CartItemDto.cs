namespace Institute.API.DTOs
{
    public class CartItemDto
    {
        public int PlanworkId { get; set; }
        public decimal Price { get; set; }

        public string? Title { get; set; }
        public string? CourseName { get => Title; set => Title = value; }
        public string? Place { get; set; }
        public string? Date { get; set; }
        public string? Days { get; set; }
        public decimal? Cost { get; set; }
        public decimal? OriginalPrice { get => Cost; set => Cost = value; }
        public string? Slug { get; set; }
        public string? CourseImage { get; set; }

        // ✅ Online fields
        public bool IsOnline { get; set; }
        public decimal? OnlineCost { get; set; }

        public decimal DiscountAmount => (Cost ?? Price) - Price;
        public decimal DiscountPercent => (Cost ?? 0) > 0
            ? Math.Round((DiscountAmount / Cost!.Value) * 100, 2)
            : 0;
        public int? RoundId { get; set; }
        public string? RoundStart { get; set; }
        public string? RoundEnd { get; set; }
        public bool? RoundIsBookable { get; set; }   // so the cart page can flag a round that has since started
    }
}