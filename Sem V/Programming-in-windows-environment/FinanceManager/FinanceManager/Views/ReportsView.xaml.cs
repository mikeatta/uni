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
        this.Loaded += ReportsView_Loaded;
        this.SizeChanged += ReportsView_SizeChanged;
        this.Unloaded += ReportsView_Unloaded;
    }

    private void ReportsView_Unloaded(object sender, RoutedEventArgs e)
    {
        this.SizeChanged -= ReportsView_SizeChanged; // Unsubscribe from SizeChanged
        this.Loaded -= ReportsView_Loaded; // Unsubscribe from Loaded
        this.Unloaded -= ReportsView_Unloaded; // Unsubscribe from Unloaded
    }

    private void ReportsView_Loaded(object sender, RoutedEventArgs e)
    {
        CalculateListViewColumnWidths();
    }

    private void ReportsView_SizeChanged(object sender, SizeChangedEventArgs e)
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
                if (i is 0 or 1)
                    continue; // Skip the ID and date columns, they should fill the remaining space

                availableSpace -= gridView.Columns[i].ActualWidth;
            }

            // Assign the remaining width to the desired column(s)
            if (availableSpace > 0)
            {
                gridView.Columns[0].Width = availableSpace * 0.8; // Report ID
                gridView.Columns[1].Width = availableSpace * 0.2; // Date created
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

            // Re-sort the Reports collection by descending date
            viewModel.SortCollection(viewModel.ReportsCollectionView);
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

        // Re-sort the Reports collection by descending date
        viewModel.SortCollection(viewModel.ReportsCollectionView);
    }
}