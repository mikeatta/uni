using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
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
        if (TransactionsListView.View is GridView gridView)
        {
            int gridColumnCount = gridView.Columns.Count;
            if (gridColumnCount == 0) return;

            // Calculate the available space across the X axis
            double availableSpace = TransactionsListView.ActualWidth -
                                    TransactionsListView.Padding.Left -
                                    TransactionsListView.Padding.Right -
                                    TransactionsListView.BorderThickness.Left -
                                    TransactionsListView.BorderThickness.Right;

            availableSpace -= 12; // Remove margins

            // Return if the width is not yet available
            if (availableSpace <= 0) return;

            // Calculate and reserve the amount column width
            double maxAmountWidth = CalculateMaxAmountColumnWidth();
            availableSpace -= maxAmountWidth;

            if (availableSpace > 0 && gridView.Columns.Count >= gridColumnCount)
            {
                // Calculate minimum width needed for the note column
                double minNoteWidth = 60;
                availableSpace -= minNoteWidth;

                // Divide remaining space in 2:1 ratio between description and category
                double partWidth = availableSpace / 3;

                gridView.Columns[0].Width = maxAmountWidth; // Amount (maximum width)
                gridView.Columns[1].Width = partWidth * 2; // Description (2 parts)
                gridView.Columns[2].Width = minNoteWidth; // Note (minimum width)
                gridView.Columns[3].Width = partWidth; // Category (1 part)
            }
        }
    }

    private double CalculateMaxAmountColumnWidth()
    {
        double maxWidth = 0;

        if (DataContext is CalendarViewModel calendarViewModel)
        {
            decimal? longestAmount = calendarViewModel.Transactions
                .Select(t => t.Transaction.Amount)
                .OrderDescending()
                .FirstOrDefault();

            if (longestAmount != null)
            {
                FontFamily systemFontFamily = SystemFonts.MessageFontFamily;

                FormattedText formattedText = new FormattedText(
                    longestAmount.Value.ToString("C"),
                    System.Globalization.CultureInfo.CurrentCulture,
                    FlowDirection.LeftToRight,
                    new Typeface(systemFontFamily, FontStyles.Normal, FontWeights.Normal, FontStretches.Normal),
                    12,
                    Brushes.Black);

                maxWidth = formattedText.Width + 36; // Add width of default left and right margins
            }
        }

        return maxWidth;
    }
}