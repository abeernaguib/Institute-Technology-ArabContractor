namespace Institute.Application.DTOs.FinancialDtos
{
    public class FinancialReportDto
    {
        public FinancialSummaryDto Summary { get; set; } = new();
        public List<MonthlyPointDto> Monthly { get; set; } = new();
        public List<CourseRevenueDto> Courses { get; set; } = new();
        public List<UserFinanceRowDto> Rows { get; set; } = new();
    }

    public class FinancialSummaryDto
    {
        /// <summary>Sum of paid order items whose payment date is in the period.</summary>
        public decimal Gross { get; set; }

        /// <summary>Refunds with Status = Sent and SentAt in the period (money actually paid out).</summary>
        public decimal RefundsSent { get; set; }

        /// <summary>Refunds with Status = Approved (not sent yet) and ApprovedAt in the period. NOT subtracted from Net.</summary>
        public decimal RefundsPending { get; set; }

        /// <summary>Gross - RefundsSent.</summary>
        public decimal Net { get; set; }

        public int Enrollments { get; set; }
        public int PayingUsers { get; set; }
        public int RefundsCount { get; set; }
    }

    public class MonthlyPointDto
    {
        public int Year { get; set; }
        public int Month { get; set; }          // 1-12, Cairo time
        public decimal Revenue { get; set; }
        public int Enrollments { get; set; }
    }

    public class CourseRevenueDto
    {
        public int PlanworkId { get; set; }
        public string Title { get; set; } = "—";
        public decimal Revenue { get; set; }
        public int Count { get; set; }
    }

    public class UserFinanceRowDto
    {
        public int UserId { get; set; }
        public string Username { get; set; } = "";
        public string Email { get; set; } = "";
        public decimal TotalPaid { get; set; }
        public List<UserCourseLineDto> Courses { get; set; } = new();
    }

    public class UserCourseLineDto
    {
        public int OrderId { get; set; }
        public string? OrderNumber { get; set; }
        public int PlanworkId { get; set; }
        public string Title { get; set; } = "—";
        public decimal Price { get; set; }          // OrderItem.Price = what was really paid
        public DateTime PaidAt { get; set; }        // UTC, serialized with "Z"
        public bool? Attended { get; set; }         // null when the enrollment no longer exists (refunded)
        public decimal Refunded { get; set; }       // Sent or Approved refund amount for this item (any date)
    }
}