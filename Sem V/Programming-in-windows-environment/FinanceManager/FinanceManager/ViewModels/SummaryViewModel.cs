using System.ComponentModel;
using System.Runtime.CompilerServices;
using FinanceManager.Database.EntityModels;
using FinanceManager.Database.Repositories;

namespace FinanceManager.ViewModels;

public class SummaryViewModel : INotifyPropertyChanged
{
    private readonly UserRepository _userRepository;

    private User _currentUser;

    public SummaryViewModel(UserRepository userRepository)
    {
        _userRepository = userRepository;
        InitializeAsync();
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

    public User CurrentUser
    {
        get => _currentUser;
        private set
        {
            _currentUser = value;
            OnPropertyChanged();
            OnPropertyChanged(nameof(UserBalance));
        }
    }

    public string UserBalance => CurrentUser?.Balance.ToString("C2") ?? "N/A";
    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}