using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;
using FinanceManager.Commands;
using FinanceManager.Database.EntityModels;
using FinanceManager.Database.Repositories;
using FinanceManager.DTOs;
using FinanceManager.Services;

namespace FinanceManager.ViewModels;

public class TransactionsViewModel : INotifyPropertyChanged
{
    private TransactionRepository _transactionRepository;
    private TransactionCategoryRepository _transactionCategoryRepository;
    private UserRepository _userRepository;

    private readonly UserBalanceService _userBalanceService;

    private ObservableCollection<TransactionDTO> _transactions = new();

    public ObservableCollection<TransactionDTO> Transactions
    {
        get => _transactions;
        private set
        {
            _transactions = value;
            OnPropertyChanged();
        }
    }

    private ObservableCollection<TransactionCategory> _categories;

    public ObservableCollection<TransactionCategory> Categories
    {
        get => _categories;
        set
        {
            _categories = value;
            OnPropertyChanged();
        }
    }

    private string _categoriesSelectedValue;

    public string CategoriesSelectedValue
    {
        get => _categoriesSelectedValue;
        set
        {
            _categoriesSelectedValue = value;
            OnPropertyChanged();
        }
    }

    private TransactionType _transactionType;

    public TransactionType TransactionType
    {
        get => _transactionType;
        set
        {
            _transactionType = value;
            OnPropertyChanged();
        }
    }

    private string _transactionTypeSelectedValue;

    public string TransactionTypeSelectedValue
    {
        get => _transactionTypeSelectedValue;
        set
        {
            _transactionTypeSelectedValue = value;
            OnPropertyChanged();
        }
    }

    private string _description;

    public string Description
    {
        get => _description;
        set
        {
            _description = value;
            OnPropertyChanged();
        }
    }

    private string? _note;

    public string? Note
    {
        get => _note;
        set
        {
            _note = value;
            OnPropertyChanged();
        }
    }

    private decimal _amount;

    public decimal Amount
    {
        get => _amount;
        set
        {
            _amount = value;
            OnPropertyChanged();
        }
    }

    private DateTime _date;

    public DateTime Date
    {
        get => _date;
        set
        {
            _date = value;
            OnPropertyChanged();
        }
    }

    public ICommand SubmitCommand { get; }
    public ICommand CancelCommand { get; }

    public TransactionsViewModel(ObservableCollection<TransactionDTO> transactions,
        ObservableCollection<TransactionCategory> transactionCategories, TransactionRepository transactionRepository,
        UserRepository userRepository, TransactionCategoryRepository transactionCategoryRepository)
    {
        _transactionRepository = transactionRepository;
        _transactionCategoryRepository = transactionCategoryRepository;
        _userRepository = userRepository;
        _userBalanceService = new UserBalanceService(_userRepository);
        Transactions = transactions;
        Categories = transactionCategories;
        Date = DateTime.Now; // Select current date by default

        SubmitCommand =
            new AddTransactionCommand(this, _transactionRepository, _userRepository, _transactionCategoryRepository);

        CancelCommand = new CancelTransactionCommand(this);
    }

    public void AddCategoryToCollection(TransactionCategory transactionCategory)
    {
        Categories.Add(transactionCategory);
    }

    public async Task CallRemoveTransaction(Transaction transaction)
    {
        await _userBalanceService.UpdateBalanceForRemovedTransaction(transaction);
        await _transactionRepository.RemoveTransactionAsync(transaction);
    }

    private void EditTransactionProperties(Transaction transaction)
    {
        var selectedTransaction = Transactions.FirstOrDefault(t => t.Transaction.Id == transaction.Id);

        if (selectedTransaction == null)
        {
            throw new Exception("Could not find edited transaction");
        }

        selectedTransaction.Transaction = transaction;
    }

    public async Task CallUpdateTransaction(Transaction updatedTransaction)
    {
        var existingTransaction = await _transactionRepository.GetTransactionByIdAsync(updatedTransaction.Id);
        if (existingTransaction == null) throw new NullReferenceException();

        await _userBalanceService.UpdateBalanceForModifiedTransaction(existingTransaction, updatedTransaction);
        await _transactionRepository.EditTransactionAsync(updatedTransaction);
        EditTransactionProperties(updatedTransaction);
    }

    public async Task CallAddTransactionCategory(TransactionCategory transactionCategory)
    {
        await _transactionCategoryRepository.AddTransactionCategory(transactionCategory);
    }

    public async Task<TransactionCategory> CallGetTransactionCategory(TransactionCategory transactionCategory)
    {
        var transactionCategories = await _transactionCategoryRepository.GetAllAsync();
        return transactionCategories.FirstOrDefault(c => c.Name == transactionCategory.Name);
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}