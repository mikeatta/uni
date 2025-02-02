using System.Windows;

namespace FinanceManager.Views;

public partial class EditTransactionWindow : Window
{
    public EditTransactionWindow(object item)
    {
        InitializeComponent();
        DataContext = item;
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