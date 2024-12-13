namespace FinanceManager.Database.EntityModels;

public class Report
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateTime DateCreated { get; set; }
    public required string Criteria  { get; set; }
}