using System.ComponentModel.DataAnnotations;

namespace Institute.Application.DTOs
{
    public class CustomerCreateUpdateDto
    {
        [Required, MaxLength(300)]
        public string Name { get; set; } = null!;

        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; } = true;
    }
}