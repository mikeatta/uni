using Microsoft.EntityFrameworkCore;

namespace FinanceManager.Database.EntityModels;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var database = Environment.GetEnvironmentVariable("PG_DATABASE") ?? "database";
        var user = Environment.GetEnvironmentVariable("PG_USER") ?? "user";
        var password = Environment.GetEnvironmentVariable("PG_PASSWORD") ?? "password";

        var connectionString = $"Host=localhost;Port=5432;Database={database};Username={user};Password={password};";
        optionsBuilder.UseNpgsql(connectionString);
    }
}