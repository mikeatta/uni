using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceManager.Database.EntityModels;

[Table("reportcriteria")]
public class ReportCriteria
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("startdate", TypeName = "timestamp")]
    public DateTime? StartDate { get; set; }

    [Column("enddate", TypeName = "timestamp")]
    public DateTime? EndDate { get; set; }

    [ForeignKey("TransactionCategory")]
    [Column("categoryid", TypeName = "int")]
    public int? CategoryId { get; set; }

    public TransactionCategory? Category { get; set; } // Navigation property

    [Column("type")]
    public TransactionType? Type { get; set; }

    [Column("content", TypeName = "varchar(255)")]
    public string? Content { get; set; }

    [Column("minamount", TypeName = "decimal(12,2")]
    public decimal? MinAmount { get; set; }

    [Column("maxamount", TypeName = "decimal(12,2")]
    public decimal? MaxAmount { get; set; }
}