using System.ComponentModel;
using System.Windows.Input;
using FinanceManager.Commands;
using FinanceManager.Database;
using FinanceManager.Database.Repositories;

namespace FinanceManager.ViewModels;

public class MainViewModel : INotifyPropertyChanged
{
    private readonly static FinanceManagerDbContext FinanceManagerDbContext = new();
    private readonly UserRepository _userRepository = new(FinanceManagerDbContext);
    private readonly TransactionRepository _transactionRepository = new(FinanceManagerDbContext);
    private object _currentView;

    // View models
    private SummaryViewModel _summaryViewModel;
    private TransactionsViewModel _transactionsViewModel;
    private CalendarViewModel _calendarViewModel;
    private ReportsViewModel _reportsViewModel;

    public MainViewModel()
    {
        InitializeViewModels();
    }

    private void InitializeViewModels()
    {
        _summaryViewModel = new SummaryViewModel(_userRepository, _transactionRepository);
        _transactionsViewModel = new TransactionsViewModel();
        _calendarViewModel = new CalendarViewModel();
        _reportsViewModel = new ReportsViewModel();

        CurrentView = _summaryViewModel;
        NavigateCommand = new RelayCommand(Navigate);
    }

    public object CurrentView
    {
        get => _currentView;
        set
        {
            _currentView = value;
            OnPropertyChanged(nameof(CurrentView));
        }
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