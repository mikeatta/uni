using System.Windows;
using FinanceManager.Database.EntityModels;
using FinanceManager.ViewModels;

namespace FinanceManager.Views;

public partial class AddAlertWindow : Window
{
    private readonly SummaryViewModel _viewModel;

    public AddAlertWindow(SummaryViewModel viewModel)
    {
        InitializeComponent();
        _viewModel = viewModel;
        DataContext = _viewModel;
    }

    private void AddButton_Click(object sender, RoutedEventArgs e)
    {
        Alert alert = new Alert
        {
            Id = Guid.NewGuid(),
            UserId = _viewModel.CurrentUser.Id,
            Threshold = _viewModel.AlertThreshold,
            Message = _viewModel.AlertMessage,
        };

        DialogResult = true;
        Alert = alert;
        Close();
    }

    private void CancelButton_Click(object sender, RoutedEventArgs e)
    {
        DialogResult = false;
        Close();
    }

    public Alert Alert { get; set; }
}