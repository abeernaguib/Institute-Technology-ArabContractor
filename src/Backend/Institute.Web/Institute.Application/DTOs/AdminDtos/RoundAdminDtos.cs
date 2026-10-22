namespace Institute.Application.DTOs.AdminDtos
{
    public class RoundAdminDto
    {
        public int Id { get; set; }
        public int PlanworkId { get; set; }
        public string StartDate { get; set; } = "";
        public string EndDate { get; set; } = "";
        public bool IsActive { get; set; }
        public bool IsBookable { get; set; }
        public int DurationDays { get; set; }      // UI can flag > 30 as "check the dates"
        public int EnrollmentsCount { get; set; }
    }

    public class SaveRoundDto
    {
        public string? StartDate { get; set; }     // "yyyy-MM-dd"
        public string? EndDate { get; set; }       // "yyyy-MM-dd"
        public bool? IsActive { get; set; }
    }
}