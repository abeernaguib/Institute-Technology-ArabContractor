using Institute.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Institute.Infrastructure;

public partial class AppUser
{
    [Key]
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    [StringLength(255)]
    public string? Email { get; set; }

    [StringLength(100)]
    public string? FirstName { get; set; }

    [StringLength(100)]
    public string? LastName { get; set; }

    public DateTime CreatedAt { get; set; }

    [InverseProperty("User")]
    public virtual ICollection<CoursePurchase> CoursePurchases { get; set; } = new List<CoursePurchase>();

    [InverseProperty("User")]
    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}