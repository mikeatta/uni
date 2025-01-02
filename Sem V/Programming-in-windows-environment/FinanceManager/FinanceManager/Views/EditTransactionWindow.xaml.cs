using System.Windows;
using System.Windows.Controls;
using FinanceManager.DTOs;
using FinanceManager.ViewModels;

namespace FinanceManager.Views;

public partial class EditTransactionWindow : Window
{
    public EditTransactionWindow(object item)
    {
        InitializeComponent();
        DataContext = item;
    }

    private void ComboBox_OnLostFocus(object sender, RoutedEventArgs e)
    {
        if (sender is ComboBox comboBox)
        {
            var viewModel = DataContext as TransactionDTO;
            var categoryNameString = comboBox.Text; // Get the value of the editable ComboBox input
            viewModel.CategoriesSelectedValue = categoryNameString; // Set a new value for the category
        }
    }

    /// <summary>
    /// Method <c>SaveButton_Click</c> submits the changes to the database and updates the Transaction.
    /// </summary>
    private void SaveButton_Click(object sender, RoutedEventArgs e)
    {
        DialogResult = true;
        Close();
    }

    /// <summary>
    /// Method <c>CancelButton_Click</c> exits the EditTransactionWindow without making changes to the
    /// Transaction object.
    /// </summary>
    private void CancelButton_Click(object sender, RoutedEventArgs e)
    {
        DialogResult = false;
        Close();
    }
}