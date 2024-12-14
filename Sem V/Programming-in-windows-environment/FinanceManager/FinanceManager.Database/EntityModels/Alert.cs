using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceManager.Database.EntityModels;

public class Alert
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [ForeignKey("User")]
    [Column(TypeName = "uuid")]
    public Guid UserId { get; set; }

    public User User { get; set; } // Navigation property

    [Required]
    [Column(TypeName = "decimal(12, 2)")]
    public decimal Threshold { get; set; }

    [Required]
    [Column(TypeName = "varchar(255)")]
    [StringLength(255)]
    public required string Message { get; set; }
}