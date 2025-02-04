using System.ComponentModel;
using System.Runtime.CompilerServices;
using FinanceManager.Database.EntityModels;
using FinanceManager.ViewModels;

namespace FinanceManager.DTOs;

public class ReportDTO : INotifyPropertyChanged
{
    private readonly ReportsViewModel _viewModel;

    private Report _report;

    public Report Report
    {
        get => _report;
        set
        {
            _report = value;
            OnPropertyChanged();
        }
    }

    private DateTime _startDate;

    public DateTime StartDate
    {
        get => _startDate;
        set
        {
            _startDate = value;
            OnPropertyChanged();
        }
    }

    private DateTime _endDate;

    public DateTime EndDate
    {
        get => _endDate;
        set
        {
            _endDate = value;
            OnPropertyChanged();
        }
    }

    private TransactionCategory? _category;

    public TransactionCategory? Category
    {
        get => _category;
        set
        {
            _category = value;
            OnPropertyChanged();
        }
    }

    private TransactionType? _type;

    public TransactionType? Type
    {
        get => _type;
        set
        {
            _type = value;
            OnPropertyChanged();
        }
    }

    private string _containsText;

    // The 'content' field in the database
    public string ContainsText
    {
        get => _containsText;
        set
        {
            _containsText = value;
            OnPropertyChanged();
        }
    }

    private decimal _minAmount;

    public decimal MinAmount
    {
        get => _minAmount;
        set
        {
            _minAmount = value;
            OnPropertyChanged();
        }
    }

    private decimal _maxAmount;

    public decimal MaxAmount
    {
        get => _maxAmount;
        set
        {
            _maxAmount = value;
            OnPropertyChanged();
        }
    }

    public ReportDTO(Report report, ReportsViewModel viewModel)
    {
        Report = report;
        _viewModel = viewModel;

        InitializeDateSpanInfo(report);
    }

    private async void InitializeDateSpanInfo(Report report)
    {
        // Return the StartDate and EndDate from the matching Criteria row in the database
        var criteriaId = report.CriteriaId;
        var criteria = await GetReportDateSpanInfo(criteriaId);

        // Initialize the StartDate and the EndDate
        StartDate = criteria.StartDate;
        EndDate = criteria.EndDate;
    }

    private async Task<ReportCriteria> GetReportDateSpanInfo(int criteriaId)
    {
        return await _viewModel.CallGetReportCriteriaById(criteriaId);
    }

    public ReportDTO(Report report)
    {
        Report = report;
    }

    public ReportDTO()
    {
        // Initialize the class with a 30-day date span
        StartDate = DateTime.Now;
        EndDate = DateTime.Now + TimeSpan.FromDays(30);
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}