using FinanceManager.Database.EntityModels;
using FinanceManager.Database.Repositories;

namespace FinanceManager.Services;

public class UserBalanceService
{
    private readonly UserRepository _userRepository;

    public UserBalanceService(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task UpdateBalanceForNewTransaction(Transaction transaction)
    {
        var user = await GetCurrentUser();
        user.Balance += CalculateBalanceChange(transaction);
        await _userRepository.EditUserAsync(user);
    }

    public async Task UpdateBalanceForModifiedTransaction(Transaction oldTransaction, Transaction newTransaction)
    {
        var user = await GetCurrentUser();

        // Reset the old transaction effect from the balance
        user.Balance -= CalculateBalanceChange(oldTransaction);

        // Update the balance with the new value
        user.Balance += CalculateBalanceChange(newTransaction);

        await _userRepository.EditUserAsync(user);
    }

    public async Task UpdateBalanceForRemovedTransaction(Transaction transaction)
    {
        var user = await GetCurrentUser();
        user.Balance -= CalculateBalanceChange(transaction);
        await _userRepository.EditUserAsync(user);
    }

    private decimal CalculateBalanceChange(Transaction transaction)
    {
        return transaction.Type switch
        {
            TransactionType.Income => transaction.Amount,
            TransactionType.Expense => transaction.Amount * -1,
            _ => throw new ArgumentException("Invalid transaction type")
        };
    }

    private async Task<User> GetCurrentUser()
    {
        var user = await _userRepository.GetDefaultUserAsync();
        return user ?? throw new InvalidOperationException("No user found");
    }
}