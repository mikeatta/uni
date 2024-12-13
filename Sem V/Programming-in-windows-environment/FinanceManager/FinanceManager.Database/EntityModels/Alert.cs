namespace FinanceManager.Database.EntityModels;

public class Alert
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public decimal Threshold { get; set; }
    public required string Message { get; set; }
}