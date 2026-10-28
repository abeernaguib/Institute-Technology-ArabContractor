namespace Institute.API.DTOs.PaymentDtos
{
    // ════════════════════════════════════════════════════════
    //  REQUEST DTOs
    // ════════════════════════════════════════════════════════

    /// <summary>
    /// POST /api/refund — User submits a new refund request.
    /// </summary>
    public class CreateRefundRequestDto
    {
        public int OrderId { get; set; }
        public int PlanworkId { get; set; }
        public string Reason { get; set; } = null!;
        public string? Details { get; set; }

        // Bank account info
        public string? BankName { get; set; }
        public string? AccountNumber { get; set; }
        public string? AccountHolder { get; set; }
        public string? Iban { get; set; }
    }

    /// <summary>
    /// PUT /api/refund/{id}/approve — Admin approves the request.
    /// </summary>
    public class ApproveRefundDto
    {
        public string? AdminNote { get; set; }
    }

    /// <summary>
    /// PUT /api/refund/{id}/reject — Admin rejects the request.
    /// </summary>
    public class RejectRefundDto
    {
        public string RejectionReason { get; set; } = null!;
    }

    /// <summary>
    /// PUT /api/refund/{id}/sent — Admin marks money as sent.
    /// </summary>
    public class MarkSentDto
    {
        public string? AdminNote { get; set; }
    }

    // ════════════════════════════════════════════════════════
    //  RESPONSE DTOs
    // ════════════════════════════════════════════════════════

    public class RefundRequestResponseDto
    {
        public int Id { get; set; }
        public string RefNumber { get; set; } = null!;
        public int OrderId { get; set; }
        public string? OrderNumber { get; set; }
        public int UserId { get; set; }
        public string? UserFullName { get; set; }
        public string? UserEmail { get; set; }
        public int PlanworkId { get; set; }
        public string? CourseTitle { get; set; }
        public bool? IsOnline { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "EGP";
        public string Reason { get; set; } = null!;
        public string? Details { get; set; }
        public string Status { get; set; } = null!;

        // Bank account
        public string? BankName { get; set; }
        public string? AccountNumber { get; set; }
        public string? AccountHolder { get; set; }
        public string? Iban { get; set; }

        // Admin
        public string? AdminNote { get; set; }
        public string? RejectionReason { get; set; }

        // Timestamps
        public DateTime RequestedAt { get; set; }
        public DateTime? ApprovedAt { get; set; }
        public DateTime? SentAt { get; set; }
        public DateTime? RejectedAt { get; set; }
    }
}