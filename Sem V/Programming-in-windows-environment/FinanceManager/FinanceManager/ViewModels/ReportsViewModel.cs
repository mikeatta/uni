using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Data;
using System.Windows.Input;
using FinanceManager.Commands;
using FinanceManager.Database.EntityModels;
using FinanceManager.Database.Repositories;
using FinanceManager.DTOs;
using FinanceManager.Helpers;

namespace FinanceManager.ViewModels;

public class ReportsViewModel : INotifyPropertyChanged, ISortableObservableCollection
{
    private readonly ReportRepository _reportRepository;
    private readonly ReportCriteriaRepository _reportCriteriaRepository;
    private readonly UserRepository _userRepository;

    public string DataSortPropertyName
    {
        get => "Report.DateCreated";
    }

    private ListCollectionView _reportsCollectionView;
    public ListCollectionView ReportsCollectionView => _reportsCollectionView;

    private ObservableCollection<ReportDTO> _reports = new();

    public ObservableCollection<ReportDTO> Reports
    {
        get => _reports;
        set
        {
            _reports = value;
            _reportsCollectionView = new ListCollectionView(_reports);

            _reportsCollectionView.SortDescriptions.Add(new SortDescription(DataSortPropertyName,
                ListSortDirection.Descending));

            OnPropertyChanged();
            OnPropertyChanged(nameof(ReportsCollectionView));
        }
    }

    private ReportDTO _reportForm;

    public ReportDTO ReportForm
    {
        get => _reportForm;
        set
        {
            _reportForm = value;
            OnPropertyChanged();
        }
    }

    private ObservableCollection<TransactionCategory?> _transactionCategories;

    public ObservableCollection<TransactionCategory?> TransactionCategories
    {
        get => _transactionCategories;
        set
        {
            _transactionCategories = value;
            OnPropertyChanged();
        }
    }

    private ObservableCollection<TransactionType?> _transactionTypes;

    public ObservableCollection<TransactionType?> TransactionTypes
    {
        get => _transactionTypes;
        set
        {
            _transactionTypes = value;
            OnPropertyChanged();
        }
    }

    public ICommand AddReportCommand { get; set; }
    public ICommand CancelReportCommand { get; set; }

    public ReportsViewModel(ReportRepository reportRepository, ReportCriteriaRepository reportCriteriaRepository,
        UserRepository userRepository,
        ObservableCollection<ReportDTO> reports, ObservableCollection<TransactionDTO> transactions,
        ObservableCollection<TransactionCategory> transactionCategories)
    {
        _reportRepository = reportRepository;
        _reportCriteriaRepository = reportCriteriaRepository;
        _userRepository = userRepository;
        Reports = reports;
        TransactionCategories = transactionCategories;

        ReportForm = new ReportDTO();
        AddReportCommand = new AddReportCommand(this, transactions, transactionCategories);
        CancelReportCommand = new CancelReportCommand(this);
    }

    public async Task<User> GetDefaultUser()
    {
        return await _userRepository.GetDefaultUserAsync();
    }

    public async Task CallAddReportCriteria(ReportCriteria reportCriteria)
    {
        await _reportCriteriaRepository.AddReportCriteriaAsync(reportCriteria);
    }

    public async Task<ReportCriteria> CallGetRecentReportCriteria()
    {
        var reportCriteriaList = await _reportCriteriaRepository.GetReportCriteriaAsync();
        return reportCriteriaList.LastOrDefault() ?? throw new NullReferenceException();
    }

    public async Task<ReportCriteria> CallGetReportCriteriaById(int id)
    {
        return await _reportCriteriaRepository.GetReportCriteriaByIdAsync(id);
    }

    public async Task CallAddReport(Report report)
    {
        await _reportRepository.AddReportAsync(report);

        // Update the UI report list
        Reports.Add(new ReportDTO(report));

        // Sort the Reports collection by descending date
        SortCollection(ReportsCollectionView);
    }

    public async Task CallRemoveReport(Report report)
    {
        await _reportRepository.RemoveReportAsync(report);
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }

    public void SortCollection(ListCollectionView collection)
    {
        collection.Refresh();
    }
}