using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Windows.Input;
using FinanceManager.Commands;
using FinanceManager.Database;
using FinanceManager.Database.EntityModels;
using FinanceManager.Database.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace FinanceManager.ViewModels;

public class MainViewModel : INotifyPropertyChanged
{
    private readonly IDbContextFactory<FinanceManagerDbContext> _contextFactory;

    private UserRepository _userRepository;
    private TransactionRepository _transactionRepository;
    private TransactionCategoryRepository _transactionCategoryRepository;

    private ObservableCollection<Transaction> _transactions = new();
    private ObservableCollection<TransactionCategory> _transactionCategories = new();
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

    public ObservableCollection<Transaction> Transactions
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

    public MainViewModel(DbContextOptions<FinanceManagerDbContext> options)
    {
        _contextFactory = new PooledDbContextFactory<FinanceManagerDbContext>(options);
        InitializeRepositories();
        LoadTransactions();
        InitializeViewModels();
    }

    private void InitializeRepositories()
    {
        _userRepository = new UserRepository(_contextFactory);
        _transactionRepository = new TransactionRepository(_contextFactory);
        _transactionCategoryRepository = new TransactionCategoryRepository(_contextFactory);
    }

    private async Task LoadTransactions()
    {
        var transactions = await _transactionRepository.GetAllTransactionsAsync();

        foreach (var transaction in transactions)
        {
            Transactions.Add(transaction);
        }

        var categories = await _transactionCategoryRepository.GetAllAsync();

        foreach (var category in categories)
        {
            TransactionsCategories.Add(category);
        }
    }

    private void InitializeViewModels()
    {
        _summaryViewModel = new SummaryViewModel(_userRepository, _transactions);

        _transactionsViewModel = new TransactionsViewModel(_transactions, _transactionCategories,
            _transactionRepository,
            _userRepository, _transactionCategoryRepository);

        _calendarViewModel = new CalendarViewModel();
        _reportsViewModel = new ReportsViewModel();

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