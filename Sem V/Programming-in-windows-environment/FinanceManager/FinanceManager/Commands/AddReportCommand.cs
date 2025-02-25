using System.Collections.ObjectModel;
using FinanceManager.Database.EntityModels;
using FinanceManager.DTOs;
using FinanceManager.ViewModels;

namespace FinanceManager.Commands;

public class AddReportCommand : CommandBase
{
    private readonly ReportsViewModel _viewModel;
    private readonly ObservableCollection<TransactionDTO> _transactions;
    private readonly ObservableCollection<TransactionCategory> _transactionCategories;

    public AddReportCommand(ReportsViewModel viewModel, ObservableCollection<TransactionDTO> transactions,
        ObservableCollection<TransactionCategory> transactionCategories)
    {
        _viewModel = viewModel;
        _transactions = transactions;
        _transactionCategories = transactionCategories;
    }

    public override async void Execute(object? parameter)
    {
        var user = await _viewModel.GetDefaultUser();

        var reportCriteria = new ReportCriteria
        {
            StartDate = _viewModel.ReportForm.StartDate,
            EndDate = _viewModel.ReportForm.EndDate,
            CategoryId = _viewModel.ReportForm.Category?.Id,
            Type = _viewModel.ReportForm.Type,
            Content = _viewModel.ReportForm.ContainsText,
            MinAmount = _viewModel.ReportForm.MinAmount == (decimal)0.00 ? null : _viewModel.ReportForm.MinAmount,
            MaxAmount = _viewModel.ReportForm.MaxAmount == (decimal)0.00 ? null : _viewModel.ReportForm.MaxAmount,
        };

        // Submit the report criteria to the database
        await _viewModel.CallAddReportCriteria(reportCriteria);

        // Fetch the submitted record with the ID auto-generated by the database
        var submittedReportCriteria = await _viewModel.CallGetRecentReportCriteria();

        // Add the auto-generated ReportCriteria ID to the new report object
        reportCriteria.Id = submittedReportCriteria.Id;

        var report = new Report
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            DateCreated = DateTime.Now,
            CriteriaId = reportCriteria.Id
        };

        // Pre-generate the report data
        GenerateReport(report, reportCriteria);

        // Add the report to the Reports table
        await _viewModel.CallAddReport(report);

        // Clear the form
        ClearFormfields();
    }

    private void GenerateReport(Report report, ReportCriteria reportCriteria)
    {
        // Get the start and end dates for the report date range
        var dateFrom = reportCriteria.StartDate;
        var dateTo = reportCriteria.EndDate;

        // Get all transactions within the date range (inclusive)
        var filteredTransactions =
            _transactions.Select(t => t.Transaction).Where(t => t.Date >= dateFrom && t.Date <= dateTo);

        // Apply the other filters
        if (reportCriteria.CategoryId != null)
            filteredTransactions = filteredTransactions.Where(t => t.CategoryId == reportCriteria.CategoryId);

        if (reportCriteria.Type != null)
            filteredTransactions = filteredTransactions.Where(t => t.Type == reportCriteria.Type);

        if (reportCriteria.Content != null)
            filteredTransactions = filteredTransactions.Where(t => t.Description.Contains(reportCriteria.Content));

        if (reportCriteria.MinAmount != null)
            filteredTransactions = filteredTransactions.Where(t => t.Amount >= reportCriteria.MinAmount);

        if (reportCriteria.MaxAmount != null)
            filteredTransactions = filteredTransactions.Where(t => t.Amount <= reportCriteria.MaxAmount);

        // Get total income and expenses for selected date range
        var totalIncome = filteredTransactions.Where(t => t.Type == TransactionType.Income).Sum(t => t.Amount);

        var totalExpenses = filteredTransactions.Where(t => t.Type == TransactionType.Expense).Sum(t => t.Amount);

        // Get net balance for the selected date range
        var netSavings = totalIncome - totalExpenses;

        // Group the income and expenses by categories
        var incomeByCategory = filteredTransactions
            .Where(t => t.Type == TransactionType.Income)
            .Join(
                _transactionCategories,
                transaction => transaction.CategoryId,
                category => category.Id,
                (transaction, category) => new { Transaction = transaction, Category = category }
            )
            .GroupBy(x => x.Category.Name)
            .ToDictionary(
                g => g.Key,
                g => g.Sum(x => x.Transaction.Amount)
            );

        var expensesByCategory = filteredTransactions
            .Where(t => t.Type == TransactionType.Expense)
            .Join(_transactionCategories,
                transaction => transaction.CategoryId,
                category => category.Id,
                (transaction, category) => new { Transaction = transaction, Category = category }
            )
            .GroupBy(x => x.Category.Name)
            .ToDictionary(
                g => g.Key,
                g => g.Sum(t => t.Transaction.Amount));

        // Assign the calculated values to the report
        report.TotalIncome = totalIncome;
        report.TotalExpenses = totalExpenses;
        report.NetSavings = netSavings;
        report.IncomeByCategory = incomeByCategory;
        report.ExpensesByCategory = expensesByCategory;
    }

    private void ClearFormfields()
    {
        _viewModel.ReportForm.StartDate = DateTime.Now;
        _viewModel.ReportForm.EndDate = DateTime.Now + TimeSpan.FromDays(30);
        _viewModel.ReportForm.Category = null;
        _viewModel.ReportForm.Type = null;
        _viewModel.ReportForm.ContainsText = string.Empty;
        _viewModel.ReportForm.MinAmount = Decimal.Zero;
        _viewModel.ReportForm.MaxAmount = Decimal.Zero;
    }
}