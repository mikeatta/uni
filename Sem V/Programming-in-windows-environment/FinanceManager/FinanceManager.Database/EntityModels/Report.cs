using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceManager.Database.EntityModels;

public class Report
{
    [Key]
    public Guid Id { get; set; }

    [ForeignKey("User")]
    [Column(TypeName = "uuid")]
    public Guid UserId { get; set; }

    public User User { get; set; } // Navigation property

    [Required]
    [Column(TypeName = "timestamp")]
    public DateTime DateCreated { get; set; }

    [Required]
    [Column(TypeName = "varchar(255)")]
    [StringLength(255)]
    public required string Criteria  { get; set; }
}