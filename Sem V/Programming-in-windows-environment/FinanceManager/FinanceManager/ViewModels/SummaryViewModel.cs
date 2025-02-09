using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using FinanceManager.Database.EntityModels;
using FinanceManager.Database.Repositories;
using FinanceManager.DTOs;
using FinanceManager.Services;

namespace FinanceManager.ViewModels;

public class SummaryViewModel : INotifyPropertyChanged
{
    private readonly UserRepository _userRepository;
    private readonly AlertRepository _alertRepository;
    private readonly FinancialGoalRepository _financialGoalRepository;
    private SpendingAlertService? _spendingAlertService;

    private User _currentUser;

    public User CurrentUser
    {
        get => _currentUser;
        private set
        {
            _currentUser = value;
            OnPropertyChanged();
        }
    }

    private ObservableCollection<TransactionDTO> _allTransactions;

    private ObservableCollection<TransactionDTO> _recentTransactions = new();

    public ObservableCollection<TransactionDTO> RecentTransactions
    {
        get => _recentTransactions;
        private set
        {
            _recentTransactions = value;
            OnPropertyChanged();
        }
    }

    private FinancialGoal? _financialGoal;

    public FinancialGoal? FinancialGoal
    {
        get => _financialGoal;
        set
        {
            _financialGoal = value;
            OnPropertyChanged();
        }
    }

    private string? _goalDescription;

    public string? GoalDescription
    {
        get => _goalDescription;
        set
        {
            _goalDescription = value;
            OnPropertyChanged();
        }
    }

    private decimal _goalTarget;

    public decimal GoalTarget
    {
        get => _goalTarget;
        set
        {
            _goalTarget = value;
            OnPropertyChanged();
        }
    }

    private decimal _goalPercentage;

    public decimal GoalPercentage
    {
        get => _goalPercentage;
        set
        {
            _goalPercentage = value;
            OnPropertyChanged();
        }
    }

    private Alert? _alert;

    public Alert? Alert
    {
        get => _alert;
        set
        {
            _alert = value;
            UpdateSpendingAlertService();
            OnPropertyChanged();
        }
    }

    private string _summaryInfoDateSpan = GetSummaryDateSpan();

    public string SummaryInfoDateSpan
    {
        get => _summaryInfoDateSpan;
        private set
        {
            _summaryInfoDateSpan = value;
            OnPropertyChanged();
        }
    }

    private MonthlySummary _monthlySummary;

    public MonthlySummary MonthlySummary
    {
        get => _monthlySummary;
        set
        {
            _monthlySummary = value;
            OnPropertyChanged();
        }
    }

    private decimal _alertThreshold;

    public decimal AlertThreshold
    {
        get => _alertThreshold;
        set
        {
            _alertThreshold = value;
            OnPropertyChanged();
        }
    }

    private string _alertMessage;

    public string AlertMessage
    {
        get => _alertMessage;
        set
        {
            _alertMessage = value;
            OnPropertyChanged();
        }
    }

    public SummaryViewModel(UserRepository userRepository, ObservableCollection<TransactionDTO> allTransactions,
        FinancialGoalRepository financialGoalRepository, AlertRepository alertRepository)
    {
        _userRepository = userRepository;
        _allTransactions = allTransactions;
        _financialGoalRepository = financialGoalRepository;
        _alertRepository = alertRepository;

        // Initialize the summary statistics
        SummaryInfoDateSpan = GetSummaryDateSpan();

        // Initialize the monthly summary
        UpdateMonthlySummary(_allTransactions);

        // Initialize the summary view content
        InitializeAsync();

        // Initialize the added goal (if exists)
        LoadFinancialGoals();

        // Populate ObservableConnection on app init
        UpdateRecentTransactions(_allTransactions);

        // Subscribe to transaction collection object changes
        allTransactions.CollectionChanged += (s, e) =>
        {
            if (e.NewItems != null)
            {
                foreach (TransactionDTO newItem in e.NewItems)
                {
                    // Subscribe to event changes on new items
                    newItem.PropertyChanged += Transaction_PropertyChanged;
                }
            }

            if (e.OldItems != null)
            {
                foreach (TransactionDTO oldItem in e.OldItems)
                {
                    // Unsubscribe from event changes of removed items
                    oldItem.PropertyChanged -= Transaction_PropertyChanged;
                }
            }

            UpdateRecentTransactions(_allTransactions);
            UpdateMonthlySummary(_allTransactions);
            UpdateUserBalance();
            UpdateSpendingAlertService();
        };

        foreach (var transaction in allTransactions)
        {
            transaction.PropertyChanged += Transaction_PropertyChanged;
        }
    }

    private void Transaction_PropertyChanged(object? sender, PropertyChangedEventArgs e)
    {
        if (sender is TransactionDTO)
        {
            UpdateMonthlySummary(_allTransactions);
            UpdateUserBalance();
        }
    }

    private void UpdateMonthlySummary(ObservableCollection<TransactionDTO> allTransactions)
    {
        var currentDate = DateTime.Now;

        var currentMonth = currentDate.Month;
        var currentYear = currentDate.Year;

        var previousMonth = currentMonth - 1;
        var previousYear = currentYear;

        // Adjust for rollover (when the current month is January)
        if (previousMonth == 0)
        {
            previousMonth = 12;
            previousYear -= 1;
        }

        var currentIncome = allTransactions.Where(t =>
                t.Transaction.Date.Month == currentMonth && t.Transaction.Date.Year == currentYear &&
                t.Transaction.Type == TransactionType.Income)
            .Sum(t => t.Transaction.Amount);

        var currentExpenses = allTransactions.Where(t =>
                t.Transaction.Date.Month == currentMonth && t.Transaction.Date.Year == currentYear &&
                t.Transaction.Type == TransactionType.Expense)
            .Sum(t => t.Transaction.Amount);

        var previousIncome = allTransactions.Where(t =>
                t.Transaction.Date.Month == previousMonth && t.Transaction.Date.Year == previousYear &&
                t.Transaction.Type == TransactionType.Income)
            .Sum(t => t.Transaction.Amount);

        var previousExpenses = allTransactions.Where(t =>
                t.Transaction.Date.Month == previousMonth && t.Transaction.Date.Year == previousYear &&
                t.Transaction.Type == TransactionType.Expense)
            .Sum(t => t.Transaction.Amount);

        MonthlySummary = GenerateMonthlySummary(currentIncome, currentExpenses, previousIncome, previousExpenses);
    }

    private async void UpdateUserBalance()
    {
        var updatedUser = await _userRepository.GetDefaultUserAsync();
        CurrentUser = updatedUser;

        // If a goal is set
        if (FinancialGoal != null)
        {
            // Update the balance to match the current user's balance
            FinancialGoal.CurrentAmount = CurrentUser.Balance;
            UpdateGoalProgressPercentage();

            // Update the database
            await _financialGoalRepository.UpdateGoal(FinancialGoal);
        }
    }

    private async void InitializeAsync()
    {
        try
        {
            CurrentUser = await EnsureUserExists();

            var users = await _userRepository.GetAllUsersAsync();
            CurrentUser = users.FirstOrDefault() ?? throw new InvalidOperationException();

            var alert = await _alertRepository.GetAlert();
            Alert = alert;
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"Initialization error: ", ex.Message);
        }
    }

    private async void LoadFinancialGoals()
    {
        var goal = await _financialGoalRepository.GetFinancialGoalAsync();

        if (goal != null)
        {
            FinancialGoal = goal;
        }

        UpdateGoalProgressPercentage();
    }

    private async Task<User> EnsureUserExists()
    {
        var users = await _userRepository.GetAllUsersAsync();

        if (users.Count == 0)
        {
            var defaultUser = new User
            {
                Id = Guid.NewGuid(),
                Balance = 0.00m
            };

            await _userRepository.AddUserAsync(defaultUser);
            return defaultUser;
        }

        return users.First();
    }

    private void UpdateRecentTransactions(ObservableCollection<TransactionDTO> allTransactions)
    {
        var recentTransactions = allTransactions
            .OrderByDescending(t => t.Transaction.Date)
            .Take(30)
            .ToList();

        RecentTransactions.Clear();

        foreach (var transaction in recentTransactions)
        {
            RecentTransactions.Add(transaction);
        }
    }

    private static string GetSummaryDateSpan()
    {
        var currentDate = DateTime.Now;

        // Determine the current month and the next month
        var currentMonth = currentDate.ToString("MMM. yyyy");
        var nextMonth = currentDate.AddMonths(1).ToString("MMM. yyyy");

        return $"{currentMonth} - {nextMonth}";
    }

    private MonthlySummary GenerateMonthlySummary(decimal currentIncome, decimal currentExpenses,
        decimal previousIncome, decimal previousExpenses)
    {
        // Calculate the change percentage based on the current and last month's performance
        decimal incomeChangePercentage = CalculatePercentageChange(previousIncome, currentIncome);
        decimal expensesChangePercentage = CalculatePercentageChange(previousExpenses, currentExpenses);

        // Calculate the trend ("Up", "Down", "None") based on the income and expense data
        string incomeTrend = GetTrend(previousIncome, currentIncome);
        string expensesTrend = GetTrend(previousExpenses, currentExpenses);

        return new MonthlySummary(
            TotalIncome: currentIncome,
            TotalExpenses: currentExpenses,
            IncomeChangePercentage: incomeChangePercentage,
            ExpensesChangePercentage: expensesChangePercentage,
            IncomeTrend: incomeTrend,
            ExpensesTrend: expensesTrend
        );
    }

    private decimal CalculatePercentageChange(decimal previousValue, decimal currentValue)
    {
        if (previousValue == 0) return currentValue == 0 ? 0 : 100;
        return ((currentValue - previousValue) / previousValue) * 100;
    }

    private string GetTrend(decimal previousValue, decimal currentValue)
    {
        if (currentValue > previousValue) return "Up";
        if (currentValue < previousValue) return "Down";
        return "None";
    }

    private void UpdateSpendingAlertService()
    {
        if (Alert != null)
        {
            if (_spendingAlertService == null)
            {
                _spendingAlertService = new SpendingAlertService(Alert.Threshold, Alert.Message);
            }
            else
            {
                _spendingAlertService.UpdateLimit(Alert.Threshold);
            }

            UpdateSpendingCheck();
        }
        else
        {
            _spendingAlertService = null;
        }
    }

    private void UpdateSpendingCheck()
    {
        if (_spendingAlertService != null && MonthlySummary.TotalExpenses > 0)
        {
            _spendingAlertService.UpdateSpending(MonthlySummary.TotalExpenses);
        }
    }

    private void UpdateGoalProgressPercentage()
    {
        if (FinancialGoal != null)
        {
            var percentage = (FinancialGoal.CurrentAmount / FinancialGoal.TargetAmount) * 100;

            // Cap the goal at 100%
            if (percentage > 100)
            {
                percentage = 100;
            }

            GoalPercentage = percentage;
        }
    }

    public async Task CallAddAlert(Alert alert)
    {
        await _alertRepository.AddAlert(alert);
        Alert = alert;
    }

    public async Task CallRemoveAlert(Alert alert)
    {
        await _alertRepository.RemoveAlert(alert);
        Alert = null;
    }

    public async Task CallAddGoal(FinancialGoal goal)
    {
        await _financialGoalRepository.AddGoal(goal);

        // Request the goal back from the database (database autofills the ID)
        var goalWithId = await _financialGoalRepository.GetFinancialGoalAsync();

        // Update added financial goal with the ID from the database
        FinancialGoal = goalWithId;
    }

    public async Task CallRemoveGoal(FinancialGoal goal)
    {
        await _financialGoalRepository.RemoveGoal(goal);
        FinancialGoal = null;
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}