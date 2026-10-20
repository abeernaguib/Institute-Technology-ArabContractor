namespace Institute.Application.DTOs
{
    public class ClerkUserDto
    {
        public string ClerkUserId { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Username { get; set; }
        public string? Phone { get; set; }   // from Clerk unsafe_metadata.phone
    }
}