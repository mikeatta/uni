using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceManager.Database.EntityModels;

public class TransactionCategory
{
    [Key]
    public int Id { get; set; }

    [Required]
    [Column(TypeName = "varchar(50)")]
    [StringLength(50)]
    public required string Name { get; set; }

    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}