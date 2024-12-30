using System.Windows;
using System.Windows.Controls;
using FinanceManager.ViewModels;

namespace FinanceManager.Views;

public partial class TransactionsView : UserControl
{
    public TransactionsView()
    {
        InitializeComponent();
    }

    private void ComboBox_OnLostFocus(object sender, RoutedEventArgs e)
    {
        if (sender is ComboBox comboBox)
        {
            var viewModel = DataContext as TransactionsViewModel;
            var categoryName = comboBox.Text;
            viewModel.CategoriesSelectedValue = categoryName;
        }
    }
}