using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

    [Required]
    [Column("datecreated", TypeName = "timestamp")]
    public DateTime DateCreated { get; set; }

    [ForeignKey("ReportCriteria")]
    [Column("criteriaid", TypeName = "int")]
    public int CriteriaId { get; set; }
    
    public ReportCriteria Criteria { get; set; } // Navigation property
}