using System.Windows;
using System.Windows.Controls;
using FinanceManager.DTOs;
using FinanceManager.ViewModels;

namespace FinanceManager.Views;

public partial class ReportsView : UserControl
{
    public ReportsView()
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

    private async void ViewMenuItem_Click(object sender, RoutedEventArgs e)
    {
        var menuItem = (MenuItem)sender;
        var contextMenu = (ContextMenu)menuItem.Parent;
        var button = contextMenu.PlacementTarget as Button;
        var item = button?.Tag as ReportDTO;

        var viewModel = DataContext as ReportsViewModel;
        ReportDTO reportDto = new ReportDTO(item.Report, viewModel);

        var viewWindow = new ViewReportWindow(reportDto);
        viewWindow.Owner = Window.GetWindow(this);

        if (viewWindow.ShowDialog() == true)
        {
            await viewModel.CallRemoveReport(reportDto.Report);

            // Update the UI report list
            viewModel.Reports.Remove(item);
        }
    }

    private async void RemoveMenuItem_Click(object sender, RoutedEventArgs e)
    {
        var menuItem = (MenuItem)sender;
        var contextMenu = (ContextMenu)menuItem.Parent;
        var button = contextMenu.PlacementTarget as Button;
        var item = button?.Tag as ReportDTO;

        var viewModel = DataContext as ReportsViewModel;
        await viewModel.CallRemoveReport(item.Report);

        // Update the UI report list
        viewModel.Reports.Remove(item);
    }
}