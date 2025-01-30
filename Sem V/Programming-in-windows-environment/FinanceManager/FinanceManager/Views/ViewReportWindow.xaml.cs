using System.Windows;

namespace FinanceManager.Views;

public partial class ViewReportWindow : Window
{
    public ViewReportWindow(object item)
    {
        InitializeComponent();
        DataContext = item;
    }

    private void DeleteButton_Click(object sender, RoutedEventArgs e)
    {
        DialogResult = true;
        Close();
    }

    private void CloseButton_Click(object sender, RoutedEventArgs e)
    {
        DialogResult = false;
        Close();
    }
}