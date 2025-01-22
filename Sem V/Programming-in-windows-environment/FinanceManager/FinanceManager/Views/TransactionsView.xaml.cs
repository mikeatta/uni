using System.Windows;
using System.Windows.Controls;
using FinanceManager.DTOs;
using FinanceManager.ViewModels;

namespace FinanceManager.Views;

public partial class TransactionsView : UserControl
{
    public TransactionsView()
    {
        InitializeComponent();
    }

    private void ShowMenuButton_Click(object sender, RoutedEventArgs e)
    {
        if (sender is Button button && button.ContextMenu != null)
        {
            // Explicitly set the PlacementTarget to the button element
            button.ContextMenu.PlacementTarget = button;
            button.ContextMenu.IsOpen = true;
        }
    }

    private async void EditMenuItem_Click(object sender, RoutedEventArgs e)
    {
        var menuItem = (MenuItem)sender;
        var contextMenu = (ContextMenu)menuItem.Parent;
        var button = contextMenu.PlacementTarget as Button;
        var item = button?.Tag as TransactionDTO;

        // Create a copy of the transaction containing the properties
        var viewModel = DataContext as TransactionsViewModel;
        TransactionDTO transactionDto = new TransactionDTO(item.Transaction, viewModel);

        var editWindow = new EditTransactionWindow(transactionDto); // Pass the copy as a data-transfer-object
        editWindow.Owner = Window.GetWindow(this); // Set the owner to 'TransactionsView' to center the pop-up

        if (editWindow.ShowDialog() == true)
        {
            var modifiedTransaction = await transactionDto.UpdateTransactionProperties();
            await viewModel.CallUpdateTransaction(modifiedTransaction);
        }
    }

    private async void RemoveMenuItem_Click(object sender, RoutedEventArgs e)
    {
        var menuItem = (MenuItem)sender;
        var contextMenu = (ContextMenu)menuItem.Parent;
        var button = contextMenu.PlacementTarget as Button;
        var item = button?.Tag as TransactionDTO;
        var transaction = item.Transaction;

        var viewModel = DataContext as TransactionsViewModel;
        await viewModel.CallRemoveTransaction(transaction);

        // Update the UI list element
        viewModel.Transactions.Remove(item);
    }
}