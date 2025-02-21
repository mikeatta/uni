using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceManager.Database.EntityModels;

[Table("alerts")]
public class Alert
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [ForeignKey("User")]
    [Column("userid", TypeName = "uuid")]
    public Guid UserId { get; set; }

    public User User { get; set; } // Navigation property

    [Required]
    [Column("threshold", TypeName = "numeric(12, 2)")]
    public decimal Threshold { get; set; }

    [Required]
    [Column("alertmessage", TypeName = "varchar(255)")]
    [StringLength(255)]
    public required string Message { get; set; }
}