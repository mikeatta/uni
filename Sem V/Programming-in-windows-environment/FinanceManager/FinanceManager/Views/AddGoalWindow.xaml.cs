using System.Windows;
using FinanceManager.Database.EntityModels;
using FinanceManager.ViewModels;

namespace FinanceManager.Views;

public partial class AddGoalWindow : Window
{
    private readonly SummaryViewModel _viewModel;

    public AddGoalWindow(SummaryViewModel viewModel)
    {
        InitializeComponent();
        _viewModel = viewModel;
        DataContext = _viewModel;
    }

    private void AddButton_Click(object sender, RoutedEventArgs e)
    {
        FinancialGoal goal = new FinancialGoal
        {
            UserId = _viewModel.CurrentUser.Id,
            Description = _viewModel.GoalDescription,
            CurrentAmount = _viewModel.CurrentUser.Balance,
            TargetAmount = _viewModel.GoalTarget
        };

        DialogResult = true;
        FinancialGoal = goal;
        Close();
    }

    private void CancelButton_Click(object sender, RoutedEventArgs e)
    {
        DialogResult = false;
        Close();
    }

    public FinancialGoal FinancialGoal { get; set; }
}