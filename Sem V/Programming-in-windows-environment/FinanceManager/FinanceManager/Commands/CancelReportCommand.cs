using System.Windows.Controls;
using FinanceManager.ViewModels;

namespace FinanceManager.Commands;

public class CancelReportCommand : CommandBase
{
    private ReportsViewModel _reportsViewModel;

    public CancelReportCommand(ReportsViewModel reportsViewModel)
    {
        _reportsViewModel = reportsViewModel;
    }

    public override void Execute(object? parameter)
    {
        ClearFormfields(parameter);
    }

    private void ClearFormfields(object? parameter)
    {
        // Unselect and clear input on the category ComboBox
        if (parameter is ComboBox comboBox)
        {
            comboBox.SelectedItem = null;
            comboBox.Text = string.Empty;
        }

        // Reset the class' properties
        _reportsViewModel.ReportForm.StartDate = DateTime.Now;
        _reportsViewModel.ReportForm.EndDate = DateTime.Now + TimeSpan.FromDays(30);
        _reportsViewModel.ReportForm.ContainsText = string.Empty;
        _reportsViewModel.ReportForm.MinAmount = Decimal.Zero;
        _reportsViewModel.ReportForm.MaxAmount = Decimal.Zero;
    }
}