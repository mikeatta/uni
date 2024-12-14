using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceManager.Database.EntityModels;

public class FinancialGoal
{
    [Key]
    public int Id { get; set; }

    [ForeignKey("User")]
    [Column(TypeName = "uuid")]
    public Guid UserId { get; set; }

    public User User { get; set; } // Navigation property

    [Required]
    [Column(TypeName = "varchar(255")]
    [StringLength(255)]
    public string? Description { get; set; }

    [Required]
    [Column(TypeName = "decimal(12,2")]
    public decimal CurrentAmount { get; set; }

    [Required]
    [Column(TypeName = "decimal(12,2")]
    public decimal TargetAmount { get; set; }
}