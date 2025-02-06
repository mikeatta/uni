using FinanceManager.Database.EntityModels;
using FinanceManager.Database.Repositories;
using FinanceManager.DTOs;
using FinanceManager.Services;
using FinanceManager.ViewModels;

namespace FinanceManager.Commands;

public class AddTransactionCommand : CommandBase
{
    private readonly TransactionsViewModel _viewModel;
    private readonly TransactionRepository _transactionRepository;
    private readonly UserRepository _userRepository;
    private readonly TransactionCategoryRepository _transactionCategoryRepository;
    private readonly UserBalanceService _userBalanceService;

    public AddTransactionCommand(TransactionsViewModel viewModel, TransactionRepository transactionRepository,
        UserRepository userRepository, TransactionCategoryRepository categoryRepository)
    {
        _viewModel = viewModel;
        _transactionRepository = transactionRepository;
        _userRepository = userRepository;
        _transactionCategoryRepository = categoryRepository;
        _userBalanceService = new UserBalanceService(_userRepository);
    }

    public override async void Execute(object? parameter)
    {
        var users = await _userRepository.GetAllUsersAsync();
        var defaultUser = users.FirstOrDefault();

        if (defaultUser == null)
        {
            throw new Exception("User does not exist");
        }

        var enteredCategory = _viewModel.CategoriesSelectedValue;

        var categoryId = _viewModel.Categories
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
                _viewModel.AddCategoryToCollection(createdCategory);
            }
        }

        // Parse the selected transaction type to the corresponding enum value
        var transactionType =
            (TransactionType)Enum.Parse(typeof(TransactionType), _viewModel.TransactionTypeSelectedValue);

        // Create new transaction object
        var transaction = new Transaction
        {
            UserId = defaultUser.Id,
            CategoryId = categoryId,
            Type = transactionType,
            Description = _viewModel.Description,
            Note = _viewModel.Note,
            Amount = _viewModel.Amount,
            Date = _viewModel.Date,
        };

        await _userBalanceService.UpdateBalanceForNewTransaction(transaction);
        await _transactionRepository.AddTransactionAsync(transaction);

        // Update the ObservableCollection to make changes on the frontend
        _viewModel.Transactions.Add(new TransactionDTO(transaction));

        // Reset the form input fields
        ClearFormfields();
    }

    private bool CategoryExists(int categoryId)
    {
        return _viewModel.Categories.Any(category => category.Id == categoryId);
    }

    private void ClearFormfields()
    {
        _viewModel.CategoriesSelectedValue = string.Empty;
        _viewModel.TransactionTypeSelectedValue = string.Empty;
        _viewModel.Description = string.Empty;
        _viewModel.Note = string.Empty;
        _viewModel.Amount = Decimal.Zero;
        _viewModel.Date = DateTime.Now;
    }
}