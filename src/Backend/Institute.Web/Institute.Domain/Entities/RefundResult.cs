using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Institute.Domain.Entities
{
    /// <summary>
    /// Mirrors the existing dbo.RefundRequests table exactly.
    /// A user submits a manual refund request; admin reviews and approves/rejects/sends.
    /// </summary>
    public class RefundRequest
    {
        public int Id { get; set; }

        /// <summary>Human-readable reference number, e.g. "REF-20250612-001"</summary>
        public string RefNumber { get; set; } = null!;

        public int OrderId { get; set; }
        public int UserId { get; set; }
        public int PlanworkId { get; set; }

        public decimal Amount { get; set; }
        public string Currency { get; set; } = "EGP";

        /// <summary>Short reason selected by the user.</summary>
        public string Reason { get; set; } = null!;

        /// <summary>Optional detailed description from the user.</summary>
        public string? Details { get; set; }

        /// <summary>Pending | Approved | Rejected | Sent</summary>
        public string Status { get; set; } = "Pending";

        // ── Bank account info (filled by user) ──────────────────────────
        public string? BankName { get; set; }
        public string? AccountNumber { get; set; }
        public string? AccountHolder { get; set; }
        public string? Iban { get; set; }

        // ── Admin fields ────────────────────────────────────────────────
        public string? AdminNote { get; set; }
        public string? RejectionReason { get; set; }

        // ── Timestamps ──────────────────────────────────────────────────
        public DateTime RequestedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ApprovedAt { get; set; }
        public DateTime? SentAt { get; set; }
        public DateTime? RejectedAt { get; set; }

        // ── Navigation ───────────────────────────────────────────────────
        public AppUser User { get; set; } = null!;
        public Order Order { get; set; } = null!;
        public Planwork Planwork { get; set; } = null!;

        // Not a DB column: filled by RefundService from the matching OrderItem
        [NotMapped]
        public bool? IsOnline { get; set; }
    }
}