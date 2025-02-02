using FinanceManager.Database.EntityModels;
using Microsoft.EntityFrameworkCore;

namespace FinanceManager.Database.Repositories;

public class AlertRepository
{
    private readonly IDbContextFactory<FinanceManagerDbContext> _dbContextFactory;

    public AlertRepository(IDbContextFactory<FinanceManagerDbContext> dbContextFactory)
    {
        _dbContextFactory = dbContextFactory;
    }

    public async Task<Alert> GetAlert()
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        return await context.Alerts.FirstOrDefaultAsync() ?? throw new NullReferenceException();
    }

    public async Task AddAlert(Alert alert)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        context.Alerts.Add(alert);
        await context.SaveChangesAsync();
    }

    public async Task RemoveAlert(Alert alert)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        context.Alerts.Remove(alert);
        await context.SaveChangesAsync();
    }
}