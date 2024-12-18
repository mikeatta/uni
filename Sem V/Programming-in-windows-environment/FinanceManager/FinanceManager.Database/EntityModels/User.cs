using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceManager.Database.EntityModels;

[Table("users")]
public class User
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [Column("balance", TypeName = "numeric(12, 2)")]
    public decimal Balance { get; set; }

    public ICollection<FinancialGoal> FinancialGoals { get; set; } = new List<FinancialGoal>();
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    public ICollection<Report> Reports { get; set; } = new List<Report>();
    public ICollection<Alert> Alerts { get; set; } = new List<Alert>();
}