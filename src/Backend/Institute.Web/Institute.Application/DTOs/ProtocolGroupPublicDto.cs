using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Institute.Application.DTOs
{
    public class ProtocolGroupPublicDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Icon { get; set; }
        public List<ProtocolItemPublicDto> Items { get; set; } = new();
    }
}
