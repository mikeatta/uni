using FinanceManager.Database.EntityModels;
using Microsoft.EntityFrameworkCore;

namespace FinanceManager.Database.Repositories;

public class ReportRepository
{
    private readonly IDbContextFactory<FinanceManagerDbContext> _dbContextFactory;

    public ReportRepository(IDbContextFactory<FinanceManagerDbContext> dbContextFactory)
    {
        _dbContextFactory = dbContextFactory;
    }

    public async Task<IList<Report>> GetAllReportsAsync()
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        return await context.Reports.ToListAsync();
    }

    public async Task<Report> GetReportByIdAsync(Guid id)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        return context.Reports.FirstOrDefault(r => r.Id == id) ?? throw new NullReferenceException();
    }

    public async Task AddReportAsync(Report report)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        await context.Reports.AddAsync(report);
        await context.SaveChangesAsync();
    }

    public async Task RemoveReportAsync(Report report)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        context.Remove(report);
        await context.SaveChangesAsync();
    }

    public async Task EditReportAsync(Report report)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        context.Update(report);
        await context.SaveChangesAsync();
    }
}