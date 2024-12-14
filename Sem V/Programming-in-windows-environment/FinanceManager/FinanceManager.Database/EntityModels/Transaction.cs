using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceManager.Database.EntityModels;

public class Transaction
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey("User")]
    [Column(TypeName = "uuid")]
    public Guid UserId { get; set; }

    public User User { get; set; } // Navigation property

    [Required]
    [ForeignKey("TransactionCategory")]
    [Column(TypeName = "integer")]
    public int CategoryId { get; set; }

    public TransactionCategory TransactionCategory { get; set; } // Navigation property

    [Required]
    [Column(TypeName = "varchar(10)")]
    public TransactionType Type { get; set; }

    [Required]
    [Column(TypeName = "timestamp")]
    public DateTime Date { get; set; }

    [Required]
    [Column(TypeName = "varchar(255)")]
    [StringLength(255)]
    public string? Description { get; set; }

    [Required]
    [Column(TypeName = "decimal(12,2)")]
    public decimal Amount { get; set; }

    [Column(TypeName = "varchar(255)")]
    [StringLength(255)]
    public string? Note { get; set; }
}