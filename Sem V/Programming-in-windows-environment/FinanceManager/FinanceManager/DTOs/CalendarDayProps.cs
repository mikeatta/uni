using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace FinanceManager.DTOs;

public class CalendarDayProps : INotifyPropertyChanged
{
    private DateTime? _date;
    private bool _hasTransactions;
    private bool _isToday;
    private bool _isSelected;

    public DateTime? Date
    {
        get => _date;
        set
        {
            _date = value;
            OnPropertyChanged();
        }
    }

    public bool HasTransactions
    {
        get => _hasTransactions;
        set
        {
            _hasTransactions = value;
            OnPropertyChanged();
        }
    }

    public bool IsToday
    {
        get => _isToday;
        set
        {
            _isToday = value;
            OnPropertyChanged();
        }
    }

    public bool IsSelected
    {
        get => _isSelected;
        set
        {
            _isSelected = value;
            OnPropertyChanged();
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}