using System.Windows;
using System.Windows.Controls;
using FinanceManager.ViewModels;

namespace FinanceManager.Views;

public partial class SummaryView : UserControl
{
    public SummaryView()
    {
        InitializeComponent();
    }

    private async void AddAlertButton_Click(object sender, RoutedEventArgs e)
    {
        var viewModel = DataContext as SummaryViewModel;
        // if (viewModel != null) return;

        var addAlertWindow = new AddAlertWindow(viewModel);
        addAlertWindow.Owner = Window.GetWindow(this);

        if (addAlertWindow.ShowDialog() == true)
        {
            await viewModel.CallAddAlert(addAlertWindow.Alert);

            // Reset the input fields after adding the alert
            viewModel.AlertThreshold = Decimal.Zero;
            viewModel.AlertMessage = string.Empty;
        }
    }
}