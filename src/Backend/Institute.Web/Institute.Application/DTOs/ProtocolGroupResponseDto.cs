using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Institute.Application.DTOs
{
    public class ProtocolGroupResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Icon { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
        public int ItemsCount { get; set; }
    }
}
