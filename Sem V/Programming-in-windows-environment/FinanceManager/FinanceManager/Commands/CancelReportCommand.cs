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
        ClearFormfields();
    }

    private void ClearFormfields()
    {
        _reportsViewModel.ReportForm.StartDate = DateTime.Now;
        _reportsViewModel.ReportForm.EndDate = DateTime.Now + TimeSpan.FromDays(30);
        _reportsViewModel.ReportForm.Category = null;
        _reportsViewModel.ReportForm.Type = null;
        _reportsViewModel.ReportForm.ContainsText = string.Empty;
        _reportsViewModel.ReportForm.MinAmount = Decimal.Zero;
        _reportsViewModel.ReportForm.MaxAmount = Decimal.Zero;
    }
}