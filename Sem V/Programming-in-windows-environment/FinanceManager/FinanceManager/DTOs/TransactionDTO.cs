using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using FinanceManager.Database.EntityModels;
using FinanceManager.ViewModels;

namespace FinanceManager.DTOs;

public class TransactionDTO : INotifyPropertyChanged
{
    private readonly TransactionsViewModel _transactionsViewModel;

    private Transaction _transaction;

    public Transaction Transaction
    {
        get => _transaction;
        set
        {
            _transaction = value;
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

    private string _note;

    public string Note
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

    public TransactionDTO(Transaction transaction)
    {
        Transaction = transaction;
    }

    public TransactionDTO(Transaction transaction, TransactionsViewModel viewModel)
    {
        _transactionsViewModel = viewModel;

        var categoryNameString = viewModel.Categories.FirstOrDefault(c => c.Id == transaction.CategoryId).Name;

        CategoriesSelectedValue = categoryNameString;
        Categories = viewModel.Categories;
        TransactionType = transaction.Type;
        Description = transaction.Description;
        Note = transaction.Note;
        Amount = transaction.Amount;
        Date = transaction.Date;

        CopyTransactionProperties(transaction);
    }

    private void CopyTransactionProperties(Transaction transaction)
    {
        Transaction = new Transaction
        {
            Id = transaction.Id,
            UserId = transaction.UserId,
            User = transaction.User,
            CategoryId = transaction.CategoryId,
            TransactionCategory = transaction.TransactionCategory,
            Type = transaction.Type,
            Description = transaction.Description,
            Note = transaction.Note,
            Amount = transaction.Amount,
            Date = transaction.Date,
        };
    }

    public async Task<Transaction> UpdateTransactionProperties()
    {
        // Add new category to the database if the user has entered a new one
        var transactionCategory = new TransactionCategory
        {
            Name = CategoriesSelectedValue
        };

        var categoryId = Categories
            .Where(c => c.Name == transactionCategory.Name)
            .Select(c => c.Id).FirstOrDefault();

        if (!CategoryExists(categoryId))
        {
            await _transactionsViewModel.CallAddTransactionCategory(transactionCategory);
            var createdCategory = await _transactionsViewModel.CallGetTransactionCategory(transactionCategory);

            if (createdCategory == null)
            {
                throw new Exception("Exception while getting created category");
            }

            transactionCategory.Id = createdCategory.Id;
            _transactionsViewModel.Categories.Add(transactionCategory);
        }
        else
        {
            transactionCategory.Id = categoryId;
        }

        Transaction.CategoryId = transactionCategory.Id;
        Transaction.TransactionCategory = transactionCategory;
        Transaction.Type = TransactionType;
        Transaction.Description = Description;
        Transaction.Note = Note;
        Transaction.Amount = Amount;
        Transaction.Date = Date;

        return Transaction;
    }

    private bool CategoryExists(int categoryId)
    {
        return _transactionsViewModel.Categories.Any(c => c.Id == categoryId);
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}