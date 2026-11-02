namespace Institute.Application.DTOs
{ 

    // Public: only what the "عملاؤنا" page needs
    public class CustomerListDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Logo { get; set; }
    }
}