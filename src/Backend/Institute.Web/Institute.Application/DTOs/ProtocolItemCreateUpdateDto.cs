using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Institute.Application.DTOs
{
    public class ProtocolItemCreateUpdateDto
    {
        [Range(1, int.MaxValue)]
        public int GroupId { get; set; }

        [Required, MaxLength(400)]
        public string Name { get; set; } = null!;

        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
