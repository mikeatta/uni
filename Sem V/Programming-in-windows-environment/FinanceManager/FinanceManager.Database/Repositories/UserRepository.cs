using FinanceManager.Database.EntityModels;
using Microsoft.EntityFrameworkCore;

namespace FinanceManager.Database.Repositories;

public class UserRepository
{
    private readonly IDbContextFactory<FinanceManagerDbContext> _dbContextFactory;

    public UserRepository(IDbContextFactory<FinanceManagerDbContext> dbContextFactory)
    {
        _dbContextFactory = dbContextFactory;
    }

    public async Task<List<User>> GetAllUsersAsync()
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        return await context.Users.ToListAsync();
    }

    public async Task AddUserAsync(User user)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
    }

    public async Task RemoveUserAsync(User userId)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        var user = await context.Users.FindAsync(userId);

        if (user != null)
        {
            context.Users.Remove(user);
            await context.SaveChangesAsync();
        }
    }

    public async Task EditUserAsync(User user)
    {
        await using var context = await _dbContextFactory.CreateDbContextAsync();
        context.Users.Update(user);
        await context.SaveChangesAsync();
    }
}