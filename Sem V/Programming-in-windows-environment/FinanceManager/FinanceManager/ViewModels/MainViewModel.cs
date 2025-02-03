using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Windows.Input;
using FinanceManager.Commands;
using FinanceManager.Database;
using FinanceManager.Database.EntityModels;
using FinanceManager.Database.Repositories;
using FinanceManager.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace FinanceManager.ViewModels;

public class MainViewModel : INotifyPropertyChanged
{
    private readonly IDbContextFactory<FinanceManagerDbContext> _contextFactory;

    private UserRepository _userRepository;
    private TransactionRepository _transactionRepository;
    private TransactionCategoryRepository _transactionCategoryRepository;
    private ReportRepository _reportRepository;
    private ReportCriteriaRepository _reportCriteriaRepository;
    private AlertRepository _alertRepository;
    private FinancialGoalRepository _financialGoalRepository;

    private ObservableCollection<TransactionDTO> _transactions = new();
    private ObservableCollection<TransactionCategory> _transactionCategories = new();
    private ObservableCollection<ReportDTO> _reports = new();
    private object _currentView;

    // View models
    private SummaryViewModel _summaryViewModel;
    private TransactionsViewModel _transactionsViewModel;
    private CalendarViewModel _calendarViewModel;
    private ReportsViewModel _reportsViewModel;


    public object CurrentView
    {
        get => _currentView;
        set
        {
            _currentView = value;
            OnPropertyChanged(nameof(CurrentView));
        }
    }

    public ObservableCollection<TransactionDTO> Transactions
    {
        get => _transactions;
        private set
        {
            _transactions = value;
            OnPropertyChanged(nameof(Transactions));
        }
    }

    public ObservableCollection<TransactionCategory> TransactionsCategories
    {
        get => _transactionCategories;
        private set
        {
            _transactionCategories = value;
            OnPropertyChanged(nameof(TransactionsCategories));
        }
    }

    public ObservableCollection<ReportDTO> Reports
    {
        get => _reports;
        set
        {
            _reports = value;
            OnPropertyChanged(nameof(Reports));
        }
    }

    public MainViewModel(DbContextOptions<FinanceManagerDbContext> options)
    {
        _contextFactory = new PooledDbContextFactory<FinanceManagerDbContext>(options);
        InitializeRepositories();
        LoadTransactions();
        LoadCategories();
        LoadReports();
        InitializeViewModels();
    }

    private void InitializeRepositories()
    {
        _userRepository = new UserRepository(_contextFactory);
        _transactionRepository = new TransactionRepository(_contextFactory);
        _transactionCategoryRepository = new TransactionCategoryRepository(_contextFactory);
        _reportRepository = new ReportRepository(_contextFactory);
        _reportCriteriaRepository = new ReportCriteriaRepository(_contextFactory);
        _alertRepository = new AlertRepository(_contextFactory);
        _financialGoalRepository = new FinancialGoalRepository(_contextFactory);
    }

    private async Task LoadTransactions()
    {
        var transactions = await _transactionRepository.GetAllTransactionsAsync();

        foreach (var transaction in transactions)
        {
            Transactions.Add(new TransactionDTO(transaction));
        }
    }

    private async Task LoadCategories()
    {
        var categories = await _transactionCategoryRepository.GetAllAsync();

        foreach (var category in categories)
        {
            TransactionsCategories.Add(category);
        }
    }

    private async Task LoadReports()
    {
        var reports = await _reportRepository.GetAllReportsAsync();

        foreach (var report in reports)
        {
            Reports.Add(new ReportDTO(report));
        }
    }

    private void InitializeViewModels()
    {
        _summaryViewModel =
            new SummaryViewModel(_userRepository, Transactions, _financialGoalRepository, _alertRepository);

        _transactionsViewModel = new TransactionsViewModel(Transactions, TransactionsCategories,
            _transactionRepository,
            _userRepository, _transactionCategoryRepository);

        _calendarViewModel = new CalendarViewModel(Transactions, TransactionsCategories);

        _reportsViewModel =
            new ReportsViewModel(_reportRepository, _reportCriteriaRepository, _userRepository, Reports, Transactions,
                TransactionsCategories);

        CurrentView = _summaryViewModel;
        NavigateCommand = new RelayCommand(Navigate);
    }

    public ICommand NavigateCommand { get; set; }

    private void Navigate(object parameter)
    {
        switch (parameter as string)
        {
            case "Summary":
                CurrentView = _summaryViewModel;
                break;
            case "Transactions":
                CurrentView = _transactionsViewModel;
                break;
            case "Calendar":
                CurrentView = _calendarViewModel;
                break;
            case "Reports":
                CurrentView = _reportsViewModel;
                break;
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}