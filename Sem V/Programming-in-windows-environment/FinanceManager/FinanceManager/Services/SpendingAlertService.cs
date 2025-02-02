using System.Windows;

namespace FinanceManager.Services
{
    public class SpendingAlertService
    {
        private decimal _monthlyLimit;
        private string? _alertMessage;
        private decimal _currentlySpent;

        public SpendingAlertService(decimal monthlyLimit, string? alertMessage)
        {
            _monthlyLimit = monthlyLimit;
            _alertMessage = alertMessage;
        }

        public void UpdateLimit(decimal newLimit)
        {
            _monthlyLimit = newLimit;
        }

        public void UpdateSpending(decimal spentAmount)
        {
            _currentlySpent = spentAmount;
            CheckSpendingStatus();
        }

        private void CheckSpendingStatus()
        {
            if (_currentlySpent > _monthlyLimit)
            {
                ShowSpendingAlert();
            }
        }

        private void ShowSpendingAlert()
        {
            MessageBox.Show(
                $"Warning: You have exceeded your monthly spending limit of {_monthlyLimit:C}!\nAlert message: {_alertMessage}",
                "Spending Alert", MessageBoxButton.OK, MessageBoxImage.Warning);
        }
    }
}