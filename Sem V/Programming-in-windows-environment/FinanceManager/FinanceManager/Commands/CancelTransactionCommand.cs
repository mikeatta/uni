using System.Windows.Controls;
using FinanceManager.Database.EntityModels;
using FinanceManager.ViewModels;

namespace FinanceManager.Commands;

public class CancelTransactionCommand : CommandBase
{
    private TransactionsViewModel _transactionsViewModel;

    public CancelTransactionCommand(TransactionsViewModel viewModel)
    {
        _transactionsViewModel = viewModel;
    }

    private void ClearFormfields(object? parameter)
    {
        // Unselect and clear input on the category ComboBox
        if (parameter is ComboBox comboBox)
        {
            comboBox.SelectedItem = null;
            comboBox.Text = string.Empty;
        }

        // Reset the class' property values
        _transactionsViewModel.CategoriesSelectedValue = string.Empty;
        _transactionsViewModel.TransactionType = TransactionType.Expense;
        _transactionsViewModel.Description = string.Empty;
        _transactionsViewModel.Note = string.Empty;
        _transactionsViewModel.Amount = Decimal.Zero;
        _transactionsViewModel.Date = DateTime.Now;
    }

    public override void Execute(object? parameter)
    {
        ClearFormfields(parameter);
    }
}