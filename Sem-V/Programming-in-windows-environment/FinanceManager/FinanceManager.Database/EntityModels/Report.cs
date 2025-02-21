using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace FinanceManager.Database.EntityModels;

[Table("reports")]
public class Report
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [ForeignKey("User")]
    [Column("userid", TypeName = "uuid")]
    public Guid UserId { get; set; }

    public User User { get; set; } // Navigation property

    [Column("totalincome")]
    public decimal? TotalIncome { get; set; }

    [Column("totalexpenses")]
    public decimal? TotalExpenses { get; set; }

    [Column("netsavings")]
    public decimal? NetSavings { get; set; }

    [Column("incomebycategory", TypeName = "jsonb")]
    public Dictionary<string, decimal> IncomeByCategory { get; set; } = new();

    [Column("expensesbycategory", TypeName = "jsonb")]
    public Dictionary<string, decimal> ExpensesByCategory { get; set; } = new();

    [Required]
    [Column("datecreated", TypeName = "timestamp")]
    public DateTime DateCreated { get; set; }

    [ForeignKey("ReportCriteria")]
    [Column("criteriaid", TypeName = "int")]
    public int CriteriaId { get; set; }

    public ReportCriteria Criteria { get; set; } // Navigation property

    public string ToJson()
    {
        return JsonSerializer.Serialize(this);
    }

    public static Report FromJson(string json)
    {
        return JsonSerializer.Deserialize<Report>(json) ??
               throw new InvalidOperationException("Failed to deserialize report.");
    }
}