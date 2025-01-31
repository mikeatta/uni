using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;
using FinanceManager.Commands;
using FinanceManager.DTOs;

namespace FinanceManager.ViewModels;

public class CalendarViewModel : INotifyPropertyChanged
{
    private ICommand _previousMonthCommand;
    private ICommand _nextMonthCommand;
    private ICommand _selectDateCommand;

    private ObservableCollection<TransactionDTO> _transactions;

    public ObservableCollection<TransactionDTO> Transactions
    {
        get => _transactions;
        set
        {
            _transactions = value;
            OnPropertyChanged();
        }
    }

    private DateTime _selectedDate;

    public DateTime SelectedDate
    {
        get => _selectedDate;
        set
        {
            _selectedDate = value;
            TransactionsFromSelectedDate = GetTransactionsFromSelectedDate(value);
            UpdateCalendarDays();
            OnPropertyChanged();
        }
    }

    private DateTime _displayedMonth;

    public DateTime DisplayedMonth
    {
        get => _displayedMonth;
        set
        {
            _displayedMonth = value;
            UpdateCalendarDays();
            OnPropertyChanged();
        }
    }

    private ObservableCollection<CalendarDayProps> _calendarDays;

    public ObservableCollection<CalendarDayProps> CalendarDays
    {
        get => _calendarDays;
        set
        {
            _calendarDays = value;
            OnPropertyChanged();
        }
    }

    private ObservableCollection<TransactionDTO> _transactionsFromSelectedDate;

    public ObservableCollection<TransactionDTO> TransactionsFromSelectedDate
    {
        get => _transactionsFromSelectedDate;
        set
        {
            _transactionsFromSelectedDate = value;
            OnPropertyChanged();
        }
    }

    public ICommand PreviousMonthCommand
    {
        get => _previousMonthCommand ??= new RelayCommand(_ => { DisplayedMonth = DisplayedMonth.AddMonths(-1); });
    }

    public ICommand NextMonthCommand
    {
        get => _nextMonthCommand ??= new RelayCommand(_ => { DisplayedMonth = DisplayedMonth.AddMonths(1); });
    }

    public ICommand SelectDateCommand
    {
        get => new RelayCommand(param =>
        {
            if (param is DateTime date)
            {
                SelectedDate = date;
            }
        });
    }

    public CalendarViewModel(ObservableCollection<TransactionDTO> transactions)
    {
        _transactions = transactions;
        _displayedMonth = DateTime.Today;
        _selectedDate = DateTime.Today;

        // Subscribe to transaction collection object changes
        Transactions.CollectionChanged += (s, e) =>
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

            UpdateCalendarDays();
            TransactionsFromSelectedDate = GetTransactionsFromSelectedDate(SelectedDate);
        };
    }

    private void Transaction_PropertyChanged(object? sender, PropertyChangedEventArgs e)
    {
        if (sender is TransactionDTO)
        {
            UpdateCalendarDays();
            TransactionsFromSelectedDate = GetTransactionsFromSelectedDate(SelectedDate);
        }
    }

    public ObservableCollection<TransactionDTO> GetTransactionsFromSelectedDate(DateTime date)
    {
        var transactionsFromDate = Transactions.Where(t => t.Transaction.Date.Date == date.Date);
        return new ObservableCollection<TransactionDTO>(transactionsFromDate);
    }

    private void UpdateCalendarDays()
    {
        var firstDayOfMonth = new DateTime(DisplayedMonth.Year, DisplayedMonth.Month, 1);
        var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

        var days = new List<CalendarDayProps>();

        // Add empty spaces for dates from the previous month
        int firstDayOfWeek = (int)firstDayOfMonth.DayOfWeek;

        for (int i = 0; i < firstDayOfWeek; i++)
        {
            days.Add(new CalendarDayProps { Date = null, HasTransactions = false });
        }

        // Add days of the selected month
        for (var date = firstDayOfMonth; date <= lastDayOfMonth; date = date.AddDays(1))
        {
            bool HasTransactions = Transactions.Any(t => t.Transaction.Date.Date == date.Date);

            days.Add(new CalendarDayProps
            {
                Date = date,
                HasTransactions = HasTransactions,
                IsToday = date.Date == DateTime.Today,
                IsSelected = date.Date == SelectedDate.Date
            });
        }

        CalendarDays = new ObservableCollection<CalendarDayProps>(days);
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}