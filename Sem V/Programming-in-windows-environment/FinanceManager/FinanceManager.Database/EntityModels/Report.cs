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

    [Required]
    [Column("criteria", TypeName = "varchar(255)")]
    [StringLength(255)]
    public required string Criteria { get; set; }
}