using FinanceManager.Database.EntityModels;
using Microsoft.EntityFrameworkCore;
using Alert = FinanceManager.Database.EntityModels.Alert;
using FinancialGoal = FinanceManager.Database.EntityModels.FinancialGoal;
using Report = FinanceManager.Database.EntityModels.Report;
using Transaction = FinanceManager.Database.EntityModels.Transaction;
using TransactionCategory = FinanceManager.Database.EntityModels.TransactionCategory;

namespace FinanceManager.Database;

public class FinanceManagerDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<TransactionCategory> TransactionCategories { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<FinancialGoal> FinancialGoals { get; set; }
    public DbSet<Report> Reports { get; set; }
    public DbSet<Alert> Alerts { get; set; }

    public FinanceManagerDbContext(DbContextOptions<FinanceManagerDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresEnum<TransactionType>("public", "transactiontype");

        // Alert model mapping
        modelBuilder.Entity<Alert>(entity =>
        {
            entity.HasKey(a => a.Id);

            entity
                .HasOne(a => a.User)
                .WithMany(u => u.Alerts)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.Property(a => a.Threshold).HasColumnType("decimal(12,2)");

            entity.HasIndex(a => a.UserId).HasDatabaseName("idx_alerts_userid");
        });

        // Financial goal model mapping
        modelBuilder.Entity<FinancialGoal>(entity =>
        {
            entity.HasKey(fg => fg.Id);

            entity
                .HasOne(fg => fg.User)
                .WithMany(u => u.FinancialGoals)
                .HasForeignKey(fg => fg.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.Property(fg => fg.CurrentAmount).HasColumnType("decimal(12, 2)");
            entity.Property(fg => fg.TargetAmount).HasColumnType("decimal(12, 2)");

            entity.HasIndex(fg => fg.UserId).HasDatabaseName("idx_financialgoals_userid");
        });

        // Report model mapping
        modelBuilder.Entity<Report>(entity =>
        {
            entity.HasKey(r => r.Id);

            entity
                .HasOne(r => r.User)
                .WithMany(u => u.Reports)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.Property(r => r.DateCreated).HasColumnType("timestamp");

            entity.HasIndex(r => r.UserId).HasDatabaseName("idx_reports_userid");
        });

        // Transaction model mapping
        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(t => t.Id);

            entity
                .HasOne(t => t.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            entity
                .HasOne(t => t.TransactionCategory)
                .WithMany(tc => tc.Transactions)
                .HasForeignKey(t => t.CategoryId);

            entity.Property(t => t.Type)
                .HasColumnName("type")
                .HasColumnType("transactiontype")
                .HasConversion<TransactionType>();

            entity.Property(t => t.Date).HasColumnType("timestamp");
            entity.Property(t => t.Amount).HasColumnType("decimal(12,2)");

            entity.HasIndex(t => t.UserId).HasDatabaseName("idx_transactions_userid");
        });

        // Transaction category model mapping
        modelBuilder.Entity<TransactionCategory>(entity =>
        {
            entity.HasKey(tc => tc.Id);

            entity
                .HasMany(tc => tc.Transactions)
                .WithOne(t => t.TransactionCategory)
                .HasForeignKey(t => t.CategoryId);

            entity.Property(tc => tc.Name).HasColumnType("varchar(50)");
        });

        // User model mapping
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);

            entity
                .HasMany(u => u.FinancialGoals)
                .WithOne(fg => fg.User)
                .HasForeignKey(fg => fg.UserId);

            entity
                .HasMany(u => u.Transactions)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserId);

            entity
                .HasMany(u => u.Reports)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId);

            entity
                .HasMany(u => u.Alerts)
                .WithOne(a => a.User)
                .HasForeignKey(a => a.UserId);

            entity.Property(u => u.Id).HasColumnType("uuid");
            entity.Property(u => u.Balance).HasColumnType("decimal(12, 2)");
        });

        base.OnModelCreating(modelBuilder);
    }
}