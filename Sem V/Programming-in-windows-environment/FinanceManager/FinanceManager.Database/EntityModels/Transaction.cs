namespace FinanceManager.Database.EntityModels;

public class Transaction
{
    public int Id { get; set; }
    public Guid UserId { get; set; }
    public int CategoryId { get; set; }
    public TransactionType Type { get; set; }
    public DateTime Date { get; set; }
    public string? Description { get; set; }
    public decimal Amount { get; set; }
    public string? Note { get; set; }
}