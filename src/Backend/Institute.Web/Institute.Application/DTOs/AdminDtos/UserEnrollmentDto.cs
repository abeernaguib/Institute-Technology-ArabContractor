using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Institute.Application.DTOs.AdminDtos
{
    public class UserEnrollmentDto
    {
        public string Username { get; set; } = null!;
        public string? Email { get; set; }
        public DateTime EnrolledAt { get; set; }
        public string? RoundStart { get; set; }
        public string? RoundEnd { get; set; }
    }
}
