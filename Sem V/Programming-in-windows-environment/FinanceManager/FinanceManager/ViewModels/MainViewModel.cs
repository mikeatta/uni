using System.ComponentModel;
using System.Windows.Input;
using FinanceManager.Commands;

namespace FinanceManager.ViewModels;

public class MainViewModel : INotifyPropertyChanged
{
    private object _currentView;

    public object CurrentView
    {
        get => _currentView;
        set
        {
            _currentView = value;
            OnPropertyChanged(nameof(CurrentView));
        }
    }

    public ICommand NavigateCommand { get; }

    // View models
    private readonly SummaryViewModel _summaryViewModel = new();
    private readonly TransactionsViewModel _transactionsViewModel = new();
    private readonly CalendarViewModel _calendarViewModel = new();
    private readonly ReportsViewModel _reportsViewModel = new();

    public MainViewModel()
    {
        CurrentView = _summaryViewModel;
        NavigateCommand = new RelayCommand(Navigate);
    }

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

    public event PropertyChangedEventHandler PropertyChanged;

    protected virtual void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}