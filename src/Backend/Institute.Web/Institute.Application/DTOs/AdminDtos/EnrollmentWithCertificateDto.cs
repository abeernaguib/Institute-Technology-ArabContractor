using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Institute.Application.DTOs.AdminDtos
{
    public class EnrollmentWithCertificateDto
    {
        public int EnrollmentId { get; set; }

        public int UserId { get; set; }
        public string Username { get; set; }

        public int PlanworkId { get; set; }
        public string PlanworkTitle { get; set; }

        public bool Attended { get; set; }

        public bool HasCertificate { get; set; }  // 🔥 ده المهم
        public string? RoundStart { get; set; }
        public string? RoundEnd { get; set; }
    }
}
