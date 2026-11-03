using System.ComponentModel.DataAnnotations;

namespace Institute.Application.DTOs
{
    // ── Groups (admin) ───────────────────────────────────────────
    public class ProtocolGroupCreateUpdateDto
    {
        [Required, MaxLength(200)]
        public string Title { get; set; } = null!;

        [MaxLength(20)]
        public string? Icon { get; set; }

        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; } = true;
    }

    
   
    
    
}