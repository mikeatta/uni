using FinanceManager.Database.EntityModels;
using Microsoft.EntityFrameworkCore;

namespace FinanceManager.Database.Repositories;

public class FinancialGoalRepository
{
    private readonly IDbContextFactory<FinanceManagerDbContext> _dbContextFactory;

    public FinancialGoalRepository(IDbContextFactory<FinanceManagerDbContext> dbContextFactory)
    {
        _dbContextFactory = dbContextFactory;
    }

    public async Task<FinancialGoal> GetFinancialGoalAsync()
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        return await context.FinancialGoals.FirstOrDefaultAsync(); // Can return null
    }

    public async Task AddGoal(FinancialGoal goal)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        context.FinancialGoals.Add(goal);
        await context.SaveChangesAsync();
    }

    public async Task RemoveGoal(FinancialGoal goal)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        context.FinancialGoals.Remove(goal);
        await context.SaveChangesAsync();
    }

    public async Task UpdateGoal(FinancialGoal goal)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        context.FinancialGoals.Update(goal);
        await context.SaveChangesAsync();
    }
}