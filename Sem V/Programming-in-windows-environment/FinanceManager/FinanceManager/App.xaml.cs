using System.IO;
using System.Windows;
using dotenv.net;
using FinanceManager.Database;
using FinanceManager.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FinanceManager;

/// <summary>
/// Interaction logic for App.xaml
/// </summary>
public partial class App : Application
{
    protected override void OnStartup(StartupEventArgs e)
    {
        var optionsBuilder = new DbContextOptionsBuilder<FinanceManagerDbContext>();

        // Calculate the path to the .env file relative to the base directory
        string envPath = Path.Combine(AppContext.BaseDirectory, @"..\..\..\..\FinanceManager.Database\.env");

        var databaseEnv = DotEnv.Read(new DotEnvOptions(envFilePaths: new[] { envPath }, ignoreExceptions: false));

        // Build the connection string using the environment variables
        var host = databaseEnv["HOST"];
        int port = Int32.Parse(databaseEnv["PORT"]);
        var database = databaseEnv["DATABASE"];
        var username = databaseEnv["USERNAME"];
        var password = databaseEnv["PASSWORD"];

        var connectionString =
            $"Host={host};Port={port};Database={database};Username={username};Password={password};";

        // Configure the DbContext
        optionsBuilder.UseNpgsql(connectionString);
        optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);

        MainWindow = new MainWindow()
        {
            DataContext = new MainViewModel(optionsBuilder.Options)
        };

        MainWindow.Show();
        base.OnStartup(e);
    }
}