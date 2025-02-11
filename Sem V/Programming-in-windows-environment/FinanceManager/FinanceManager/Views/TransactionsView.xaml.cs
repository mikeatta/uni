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
        this.SizeChanged += TransactionsView_SizeChanged;
        this.Loaded += TransactionsView_Loaded;
        this.Unloaded += TransactionsView_Unloaded;
    }

    private void TransactionsView_Unloaded(object sender, RoutedEventArgs e)
    {
        this.SizeChanged -= TransactionsView_SizeChanged; // Unsubscribe from SizeChanged
        this.Loaded -= TransactionsView_Loaded; // Unsubscribe from Loaded
        this.Unloaded -= TransactionsView_Unloaded; // Unsubscribe from Unloaded
    }

    private void TransactionsView_SizeChanged(object sender, SizeChangedEventArgs e)
    {
        CalculateListViewColumnWidths();
    }

    private void TransactionsView_Loaded(object sender, RoutedEventArgs e)
    {
        CalculateListViewColumnWidths();
    }

    private void CalculateListViewColumnWidths()
    {
        if (TransactionsListView.View is GridView gridView) // TransactionsListView is the name of the ListView element
        {
            int gridColumnCount = gridView.Columns.Count;
            if (gridColumnCount == 0) return;

            // Calculate the available space across the X axis
            double availableSpace = TransactionsListView.ActualWidth -
                                    TransactionsListView.Padding.Left -
                                    TransactionsListView.Padding.Right -
                                    TransactionsListView.BorderThickness.Left -
                                    TransactionsListView.BorderThickness.Right;

            availableSpace -=
                12; // Remove the left and right margins, hardcoded into the element (default margin: (6, 0, 6, 0))

            // Return if the width is not yet available
            if (availableSpace <= 0) return;

            // Calculate the available space remaining after subtracting the columns' widths
            for (int i = 0; i < gridColumnCount; i++)
            {
                if (i is 1 or 2)
                    continue; // Skip the description and note columns, they should fill the remaining space

                availableSpace -= gridView.Columns[i].ActualWidth;
            }

            // Assign the remaining width to the desired column(s)
            if (availableSpace > 0)
            {
                gridView.Columns[1].Width = availableSpace / 2; // Description
                gridView.Columns[2].Width = availableSpace / 2; // Note (field could be empty)
            }
        }
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