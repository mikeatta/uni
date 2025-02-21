using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceManager.Database.EntityModels;

[Table("financialgoals")]
public class FinancialGoal
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [ForeignKey("User")]
    [Column("userid", TypeName = "uuid")]
    public Guid UserId { get; set; }

    public User User { get; set; } // Navigation property

    [Required]
    [Column("description", TypeName = "varchar(255)")]
    [StringLength(255)]
    public string? Description { get; set; }

    [Required]
    [Column("currentamount", TypeName = "numeric(12,2")]
    public decimal CurrentAmount { get; set; }

    [Required]
    [Column("goalamount", TypeName = "numeric(12,2")]
    public decimal TargetAmount { get; set; }
}