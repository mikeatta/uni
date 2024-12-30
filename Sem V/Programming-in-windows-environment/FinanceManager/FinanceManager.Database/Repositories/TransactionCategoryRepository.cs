using FinanceManager.Database.EntityModels;
using Microsoft.EntityFrameworkCore;

namespace FinanceManager.Database.Repositories;

public class TransactionCategoryRepository
{
    private readonly IDbContextFactory<FinanceManagerDbContext> _dbContextFactory;

    public TransactionCategoryRepository(IDbContextFactory<FinanceManagerDbContext> dbContextFactory)
    {
        _dbContextFactory = dbContextFactory;
    }

    public async Task<IList<TransactionCategory>> GetAllAsync()
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        return await context.TransactionCategories.ToListAsync();
    }

    public async Task AddTransactionCategory(TransactionCategory transactionCategory)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        await context.TransactionCategories.AddAsync(transactionCategory);
        await context.SaveChangesAsync();
    }

    public async void RemoveTransactionCategory(TransactionCategory transactionCategory)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        context.TransactionCategories.Remove(transactionCategory);
    }
}