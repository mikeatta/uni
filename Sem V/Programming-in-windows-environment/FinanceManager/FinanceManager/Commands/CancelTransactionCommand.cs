using FinanceManager.ViewModels;

namespace FinanceManager.Commands;

public class CancelTransactionCommand : CommandBase
{
    private TransactionsViewModel _transactionsViewModel;

    public CancelTransactionCommand(TransactionsViewModel viewModel)
    {
        _transactionsViewModel = viewModel;
    }

    public override void Execute(object? parameter)
    {
        ClearFormfields();
    }

    private void ClearFormfields()
    {
        _transactionsViewModel.CategoriesSelectedValue = string.Empty;
        _transactionsViewModel.TransactionTypeSelectedValue = string.Empty;
        _transactionsViewModel.Description = string.Empty;
        _transactionsViewModel.Note = string.Empty;
        _transactionsViewModel.Amount = Decimal.Zero;
        _transactionsViewModel.Date = DateTime.Now;
    }
}