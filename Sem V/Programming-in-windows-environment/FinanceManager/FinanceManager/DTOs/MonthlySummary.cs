namespace FinanceManager.DTOs;

public record MonthlySummary(
    decimal TotalIncome,
    decimal TotalExpenses,
    decimal IncomeChangePercentage,
    decimal ExpensesChangePercentage,
    string IncomeTrend,
    string ExpensesTrend
);