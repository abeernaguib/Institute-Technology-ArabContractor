namespace Institute.Application.DTOs
{
    // Admin: full details
    public class CustomerResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Logo { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }
 
}