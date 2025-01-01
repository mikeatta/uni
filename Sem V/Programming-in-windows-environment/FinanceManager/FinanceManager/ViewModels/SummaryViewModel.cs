using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using FinanceManager.Database.EntityModels;
using FinanceManager.Database.Repositories;
using FinanceManager.DTOs;

namespace FinanceManager.ViewModels;

public class SummaryViewModel : INotifyPropertyChanged
{
    private readonly UserRepository _userRepository;
    private ObservableCollection<TransactionDTO> _recentTransactions = new();
    private User _currentUser;

    public User CurrentUser
    {
        get => _currentUser;
        private set
        {
            _currentUser = value;
            OnPropertyChanged(nameof(UserBalance));
        }
    }

    public ObservableCollection<TransactionDTO> RecentTransactions
    {
        get => _recentTransactions;
        private set
        {
            _recentTransactions = value;
            OnPropertyChanged();
        }
    }

    public SummaryViewModel(UserRepository userRepository, ObservableCollection<TransactionDTO> allTransactions)
    {
        _userRepository = userRepository;
        allTransactions.CollectionChanged += (s, e) => UpdateRecentTransactions(allTransactions);
        InitializeAsync();

        // Populate ObservableConnection on app init
        UpdateRecentTransactions(allTransactions);
    }

    private async void InitializeAsync()
    {
        try
        {
            CurrentUser = await EnsureUserExists();

            var users = await _userRepository.GetAllUsersAsync();
            CurrentUser = users.FirstOrDefault() ?? throw new InvalidOperationException();
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"Initialization error: ", ex.Message);
        }
    }

    private async Task<User> EnsureUserExists()
    {
        var users = await _userRepository.GetAllUsersAsync();

        if (users.Count == 0)
        {
            var defaultUser = new User
            {
                Id = Guid.NewGuid(),
                Balance = 0.00m
            };

            await _userRepository.AddUserAsync(defaultUser);
            return defaultUser;
        }

        return users.First();
    }

    private void UpdateRecentTransactions(ObservableCollection<TransactionDTO> allTransactions)
    {
        var recentTransactions = allTransactions
            .OrderByDescending(t => t.Date)
            .Take(5)
            .ToList();

        RecentTransactions.Clear();

        foreach (var transaction in recentTransactions)
        {
            RecentTransactions.Add(transaction);
        }
    }

    public string UserBalance => CurrentUser.Balance.ToString("C2");
    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}