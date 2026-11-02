using Microsoft.AspNetCore.Http;

namespace Institute.Application.DTOs.AdminDtos
{
    public class UpdatePlanFileDto
    {
        public string? FileTitle { get; set; }
        public int? FilePeriorty { get; set; }
        public IFormFile? File { get; set; }   // only sent when replacing the file
    }
}