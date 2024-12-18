using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceManager.Database.EntityModels;

[Table("transactions")]
public class Transaction
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [ForeignKey("User")]
    [Column("userid", TypeName = "uuid")]
    public Guid UserId { get; set; }

    public User User { get; set; } // Navigation property

    [Required]
    [ForeignKey("TransactionCategory")]
    [Column("categoryid", TypeName = "integer")]
    public int CategoryId { get; set; }

    public TransactionCategory TransactionCategory { get; set; } // Navigation property

    [Required]
    [Column("transactiontype", TypeName = "varchar(10)")]
    public TransactionType Type { get; set; }

    [Required]
    [Column("date", TypeName = "timestamp")]
    public DateTime Date { get; set; }

    [Required]
    [Column("description", TypeName = "varchar(255)")]
    [StringLength(255)]
    public string? Description { get; set; }

    [Required]
    [Column("amount", TypeName = "numeric(12,2)")]
    public decimal Amount { get; set; }

    [Column("note", TypeName = "varchar(255)")]
    [StringLength(255)]
    public string? Note { get; set; }
}