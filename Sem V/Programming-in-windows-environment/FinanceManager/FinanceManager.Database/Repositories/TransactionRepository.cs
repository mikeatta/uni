using FinanceManager.Database.EntityModels;
using Microsoft.EntityFrameworkCore;

namespace FinanceManager.Database.Repositories;

public class TransactionRepository
{
    private readonly IDbContextFactory<FinanceManagerDbContext> _dbContextFactory;

    public TransactionRepository(IDbContextFactory<FinanceManagerDbContext> dbContextFactory)
    {
        _dbContextFactory = dbContextFactory;
    }

    public async Task<IEnumerable<Transaction>> GetAllTransactionsAsync()
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        return await context.Transactions.ToListAsync();
    }

    public async Task<Transaction> GetTransactionByIdAsync(int id)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        return await context.Transactions.FindAsync(id);
    }

    public async Task<IEnumerable<Transaction>> GetRecentTransactionsAsync(int count = 10)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();

        return await context.Transactions
            .Include(t => t.User)
            .OrderByDescending(t => t.Date)
            .Take(count)
            .ToListAsync();
    }

    public async Task AddTransactionAsync(Transaction transaction)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        await context.Transactions.AddAsync(transaction);
        await context.SaveChangesAsync();
    }

    public async Task RemoveTransactionAsync(int transactionId)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        var transactionMatch = await context.Transactions.FindAsync(transactionId);

        if (transactionMatch != null)
        {
            context.Transactions.Remove(transactionMatch);
            await context.SaveChangesAsync();
        }
    }

    public async Task EditTransactionAsync(Transaction transaction)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        var transactionMatch = await context.Transactions.FindAsync(transaction.Id);

        if (transactionMatch == null)
        {
            throw new Exception("Failed to find transaction to update.");
        }

        // Modify the transaction properties
        transactionMatch.CategoryId = transaction.CategoryId;
        transactionMatch.Type = transaction.Type;
        transactionMatch.Description = transaction.Description;
        transactionMatch.Note = transaction.Note;
        transactionMatch.Amount = transaction.Amount;
        transactionMatch.Date = transaction.Date;

        // Mark the transaction entity as modified
        context.Entry(transactionMatch).State = EntityState.Modified;

        await context.SaveChangesAsync();
    }
}