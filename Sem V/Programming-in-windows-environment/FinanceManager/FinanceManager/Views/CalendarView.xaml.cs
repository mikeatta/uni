using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Threading;
using FinanceManager.ViewModels;

namespace FinanceManager.Views;

public partial class CalendarView : UserControl
{
    public CalendarView()
    {
        InitializeComponent();
        this.Loaded += CalendarView_Loaded;
        this.SizeChanged += CalendarView_SizeChanged;
        this.Unloaded += CalendarView_Unloaded;
    }

    private void CalendarView_Unloaded(object sender, RoutedEventArgs e)
    {
        this.SizeChanged -= CalendarView_SizeChanged; // Unsubscribe from SizeChanged
        this.Loaded -= CalendarView_Loaded; // Unsubscribe from Loaded
        this.Unloaded -= CalendarView_Unloaded; // Unsubscribe from Unloaded
    }

    private void CalendarView_SizeChanged(object sender, SizeChangedEventArgs e)
    {
        CalculateListViewColumnWidths();
    }

    private void CalendarView_Loaded(object sender, RoutedEventArgs e)
    {
        CalculateListViewColumnWidths();
    }

    private void CalculateListViewColumnWidths()
    {
        if (TransactionsListView.View is GridView gridView) // TransactionsListView is the name of the ListView element
        {
            int gridColumnCount = gridView.Columns.Count;
            if (gridColumnCount == 0) return;

            double maxCategoryWidth = CalculateMaxColumnWidth();

            // Calculate the available space across the X axis
            double availableSpace = TransactionsListView.ActualWidth -
                                    TransactionsListView.Padding.Left -
                                    TransactionsListView.Padding.Right -
                                    TransactionsListView.BorderThickness.Left -
                                    TransactionsListView.BorderThickness.Right;

            availableSpace -=
                24; // Remove margins, hardcoded into the element (default margin: (6, 0, 6, 0)), and the maxCategoryWidth

            // Return if the width is not yet available
            if (availableSpace <= 0) return;

            double descriptionWidth = 0;
            double noteWidth = 0;

            // Calculate the available space remaining after subtracting the columns' widths
            for (int i = 0; i < gridColumnCount; i++)
            {
                // Skip the description and note columns, they should fill the remaining space
                if (i is 1 or 2) continue;

                if (i is 3)
                {
                    availableSpace -= maxCategoryWidth;
                    continue;
                }

                availableSpace -= gridView.Columns[i].ActualWidth;
            }

            // Assign the remaining width to the desired column(s)
            if (availableSpace > 0)
            {
                descriptionWidth = availableSpace / 2;
                noteWidth = availableSpace / 2;
            }

            if (gridView.Columns.Count >= gridColumnCount)
            {
                gridView.Columns[1].Width = descriptionWidth; // Description
                gridView.Columns[2].Width = noteWidth; // Note (field could be empty)
                gridView.Columns[3].Width = maxCategoryWidth; // Category name
            }
        }
    }

    private double CalculateMaxColumnWidth()
    {
        double maxWidth = 0;

        if (DataContext is CalendarViewModel calendarViewModel)
        {
            var longestCategoryName = calendarViewModel.Transactions
                .Select(t => t.Transaction.TransactionCategory.Name)
                .Where(name => !string.IsNullOrEmpty(name))
                .OrderByDescending(name => name.Length)
                .FirstOrDefault();

            if (!string.IsNullOrEmpty(longestCategoryName))
            {
                FormattedText formattedText = new FormattedText(
                    longestCategoryName,
                    System.Globalization.CultureInfo.CurrentCulture,
                    FlowDirection.LeftToRight,
                    new Typeface("Arial"),
                    12,
                    Brushes.Black);

                maxWidth = formattedText.Width + 12; // Add width of default left and right margins
            }
        }

        return maxWidth;
    }
}