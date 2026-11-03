namespace Institute.API.DTOs
{
    /// <summary>
    /// One row of GET /api/course/my-courses.
    /// Property names are identical to the old anonymous object, so the JSON the
    /// frontend already reads does not change. Only FromInstitute is new.
    /// </summary>
    public class MyCourseDto
    {
        public int ChildId { get; set; }
        public string? CoursePlace { get; set; }
        public string? CourseDate { get; set; }
        public string? ServiceTitle { get; set; }
        public string? Slug { get; set; }
        public DateTime EnrolledAt { get; set; }
        public int? OrderId { get; set; }
        public int UserId { get; set; }
        public decimal? Cost { get; set; }
        public bool IsFree { get; set; }
        public bool IsOnline { get; set; }
        public decimal? OnlineCost { get; set; }
        public bool PurchasedOnline { get; set; }
        public string? OnlineLink { get; set; }
        public int? RoundId { get; set; }
        public string? RoundStart { get; set; }
        public string? RoundEnd { get; set; }

        /// <summary>NEW: true when the course is unlocked because the admin registered the user's email.</summary>
        public bool FromInstitute { get; set; }
    }
}