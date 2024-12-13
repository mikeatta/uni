namespace FinanceManager.Database.EntityModels;

public class FinancialGoal
{
    public int Id { get; set; }
    public Guid UserId { get; set; }
    public string? Description { get; set; }
    public decimal CurrentAmount { get; set; }
    public decimal TargetAmount { get; set; }
}