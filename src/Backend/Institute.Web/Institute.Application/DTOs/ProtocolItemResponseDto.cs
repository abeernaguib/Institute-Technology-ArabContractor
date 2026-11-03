using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Institute.Application.DTOs
{
    public class ProtocolItemResponseDto
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public string? GroupTitle { get; set; }
        public string? GroupIcon { get; set; }
        public string Name { get; set; } = null!;
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }
}
