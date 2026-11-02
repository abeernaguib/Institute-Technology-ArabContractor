using Microsoft.AspNetCore.Http;

namespace Institute.Application.DTOs.AdminDtos
{
    public class UpdatePlanFileDto
    {
        // FileId is NOT unique on its own (the key is PlanId + FileId), so the plan id must come with it
        public int PlanId { get; set; }

        public string? FileTitle { get; set; }

        public int? FilePeriorty { get; set; }

        // optional: send a new file only when the file itself should be replaced
        public IFormFile? File { get; set; }
    }
}