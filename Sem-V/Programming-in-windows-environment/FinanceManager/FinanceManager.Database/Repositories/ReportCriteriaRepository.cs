using FinanceManager.Database.EntityModels;
using Microsoft.EntityFrameworkCore;

namespace FinanceManager.Database.Repositories;

public class ReportCriteriaRepository
{
    private readonly IDbContextFactory<FinanceManagerDbContext> _dbContextFactory;

    public ReportCriteriaRepository(IDbContextFactory<FinanceManagerDbContext> dbContextFactory)
    {
        _dbContextFactory = dbContextFactory;
    }

    public async Task<IList<ReportCriteria>> GetReportCriteriaAsync()
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        return await context.ReportCriteria.ToListAsync();
    }

    public async Task<ReportCriteria> GetReportCriteriaByIdAsync(int id)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        return context.ReportCriteria.FirstOrDefault(rc => rc.Id == id) ?? throw new NullReferenceException();
    }

    public async Task AddReportCriteriaAsync(ReportCriteria reportCriteria)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        await context.ReportCriteria.AddAsync(reportCriteria);
        await context.SaveChangesAsync();
    }

    public async Task RemoveReportCriteriaAsync(ReportCriteria reportCriteria)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        context.ReportCriteria.Remove(reportCriteria);
        await context.SaveChangesAsync();
    }

    public async Task EditReportCriteriaAsync(ReportCriteria reportCriteria)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        context.Update(reportCriteria);
        await context.SaveChangesAsync();
    }
}