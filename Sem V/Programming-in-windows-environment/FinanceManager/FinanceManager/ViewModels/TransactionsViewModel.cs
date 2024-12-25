using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using FinanceManager.Database.EntityModels;

namespace FinanceManager.ViewModels;

public class TransactionsViewModel : INotifyPropertyChanged
{
    private ObservableCollection<Transaction> _transactions = new();

    public ObservableCollection<Transaction> Transactions
    {
        get => _transactions;
        private set
        {
            _transactions = value;
            OnPropertyChanged();
        }
    }

    public TransactionsViewModel(ObservableCollection<Transaction> transactions)
    {
        Transactions = transactions;
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}