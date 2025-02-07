using System.Collections;
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

public class TransactionsViewModel : INotifyPropertyChanged, INotifyDataErrorInfo
{
    private TransactionRepository _transactionRepository;
    private TransactionCategoryRepository _transactionCategoryRepository;
    private UserRepository _userRepository;

    private readonly UserBalanceService _userBalanceService;
    private readonly Dictionary<string, List<string>> _errors = new();

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
            ValidateProperty(nameof(CategoriesSelectedValue), value);
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
            ValidateProperty(nameof(TransactionTypeSelectedValue), value);
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
            ValidateProperty(nameof(Description), value);
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

    private string _stringAmount; // Stores raw TextBox input

    public string StringAmount
    {
        get => _stringAmount;
        set
        {
            _stringAmount = value;
            OnPropertyChanged();
            decimal? parsedAmount = ParseAmount(value);
            Amount = parsedAmount;

            ValidateProperty(nameof(StringAmount),
                parsedAmount); // Validate the input using both, the raw string, and the parsed decimal value
        }
    }

    private decimal? ParseAmount(string? value)
    {
        if (string.IsNullOrEmpty(value))
        {
            return null;
        }

        if (decimal.TryParse(value, out decimal parsedAmount))
        {
            return parsedAmount;
        }

        return null;
    }

    private decimal? _amount; // Stores the processed and validated amount

    public decimal? Amount
    {
        get => _amount;
        set
        {
            _amount = value;
            OnPropertyChanged();
        }
    }

    private DateTime? _date;

    public DateTime? Date
    {
        get => _date;
        set
        {
            if (value == null)
            {
                _date = null;
                ValidateProperty(nameof(Date), null);
            }
            else
            {
                _date = value;
                ValidateProperty(nameof(Date), _date);
            }

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

        SubmitCommand = new RelayCommand(Submit, CanSubmit);
        CancelCommand = new RelayCommand(ClearFormfields);
    }

    private void AddCategoryToCollection(TransactionCategory transactionCategory)
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

    public bool HasErrors
    {
        get => _errors.Any();
    }

    public event EventHandler<DataErrorsChangedEventArgs>? ErrorsChanged;

    public IEnumerable GetErrors(string? propertyName)
    {
        return _errors.GetValueOrDefault(propertyName);
    }

    private void OnErrorsChanged(string propertyName)
    {
        ErrorsChanged?.Invoke(this, new DataErrorsChangedEventArgs(propertyName));
    }

    private void AddError(string propertyName, string errorMessage)
    {
        if (!_errors.ContainsKey(propertyName))
        {
            _errors.Add(propertyName, new List<string>());
        }

        _errors[propertyName].Add(errorMessage);
        OnErrorsChanged(propertyName);
    }

    private void ClearErrors(string propertyName)
    {
        if (_errors.ContainsKey(propertyName))
        {
            _errors.Remove(propertyName);
            OnErrorsChanged(propertyName);
        }
    }

    // Resets the errors after clearing the form input fields
    private void UnsetErrors()
    {
        ClearErrors(nameof(CategoriesSelectedValue));
        ClearErrors(nameof(TransactionTypeSelectedValue));
        ClearErrors(nameof(Description));
        ClearErrors(nameof(StringAmount));
        ClearErrors(nameof(Date));
    }

    private void ValidateProperty(string propertyName, object? value)
    {
        ClearErrors(propertyName);

        switch (propertyName)
        {
            case nameof(CategoriesSelectedValue):
                if (string.IsNullOrWhiteSpace(value as string))
                {
                    AddError(propertyName, "Category is required.");
                }

                break;

            case nameof(TransactionTypeSelectedValue):
                if (string.IsNullOrWhiteSpace(value as string))
                {
                    AddError(propertyName, "Transaction type is required.");
                }

                break;

            case nameof(Description):
                if (string.IsNullOrWhiteSpace(value as string))
                {
                    AddError(propertyName, "Description is required.");
                }

                break;

            case nameof(StringAmount):
                if (value == null && string.IsNullOrEmpty(StringAmount))
                {
                    AddError(propertyName, "Amount is required.");
                }
                else if (value == null &&
                         (!string.IsNullOrEmpty(StringAmount) || string.IsNullOrWhiteSpace(StringAmount)))
                {
                    AddError(propertyName, "Invalid amount. **DEBUG");
                }
                else if (value is decimal amount)
                {
                    if (amount <= 0)
                    {
                        AddError(propertyName, "Amount must be greater than zero.");
                    }
                }

                break;

            case nameof(Date):
                if (value == null)
                {
                    AddError(propertyName, "Date is required.");
                }
                else if (value is DateTime date && (date <= DateTime.MinValue || date > DateTime.MaxValue))
                {
                    AddError(propertyName, "Date is invalid.");
                }

                break;
        }
    }

    private async void Submit(object parameter)
    {
        // Validate the inputs before submitting the form
        ValidateProperty(nameof(CategoriesSelectedValue), CategoriesSelectedValue);
        ValidateProperty(nameof(TransactionTypeSelectedValue), TransactionTypeSelectedValue);
        ValidateProperty(nameof(Description), Description);
        ValidateProperty(nameof(StringAmount), Amount);
        ValidateProperty(nameof(Date), Date);

        if (!HasErrors)
        {
            var users = await _userRepository.GetAllUsersAsync();
            var defaultUser = users.FirstOrDefault();

            if (defaultUser == null)
            {
                throw new Exception("User does not exist");
            }

            var enteredCategory = CategoriesSelectedValue;

            var categoryId = Categories
                .Where(c => c.Name == enteredCategory)
                .Select(c => c.Id)
                .FirstOrDefault();

            // Submit new category to the database, if it did not exist before
            if (!CategoryExists(categoryId))
            {
                TransactionCategory transactionCategory = new TransactionCategory
                {
                    // Only add the Name property, since the ID is auto-incremented
                    Name = enteredCategory,
                };

                await _transactionCategoryRepository.AddTransactionCategory(transactionCategory);

                var createdCategory = (await _transactionCategoryRepository.GetAllAsync()).LastOrDefault();

                if (createdCategory != null)
                {
                    // Copy the ID from the newly created category
                    categoryId = createdCategory.Id;

                    // Add the category to the frontend list
                    AddCategoryToCollection(createdCategory);
                }
            }

            // Parse the selected transaction type to the corresponding enum value
            var transactionType =
                (TransactionType)Enum.Parse(typeof(TransactionType), TransactionTypeSelectedValue);

            // Create new transaction object
            var transaction = new Transaction
            {
                UserId = defaultUser.Id,
                CategoryId = categoryId,
                Type = transactionType,
                Description = Description,
                Note = Note,
                Amount = Amount ?? throw new NullReferenceException("Submitted amount cannot be null."),
                Date = Date ?? DateTime.Now
            };

            await _userBalanceService.UpdateBalanceForNewTransaction(transaction);
            await _transactionRepository.AddTransactionAsync(transaction);

            // Update the ObservableCollection to make changes on the frontend
            Transactions.Add(new TransactionDTO(transaction));

            // Clear the form fields
            CategoriesSelectedValue = string.Empty;
            TransactionTypeSelectedValue = string.Empty;
            Description = string.Empty;
            Note = string.Empty;
            StringAmount = string.Empty;
            Date = DateTime.Now;

            UnsetErrors(); // Clear the error messages after removing form contents
        }
    }

    private bool CategoryExists(int categoryId)
    {
        return Categories.Any(category => category.Id == categoryId);
    }

    private bool CanSubmit(object parameter)
    {
        return !HasErrors;
    }

    private void ClearFormfields(object parameter)
    {
        CategoriesSelectedValue = string.Empty;
        TransactionTypeSelectedValue = string.Empty;
        Description = string.Empty;
        Note = string.Empty;
        StringAmount = String.Empty;
        Date = DateTime.Now;

        UnsetErrors(); // Clear the error messages after removing form contents
    }
}