using System.Globalization;
using System.Windows.Controls;
using System.Windows.Data;

namespace FinanceManager.Helpers;

public class IndexConverter : IValueConverter
{

    public object? Convert(object? value, Type targetType, object? parameter, CultureInfo culture)
    {
        var item = (ContentPresenter)value;
        var itemsControl = ItemsControl.ItemsControlFromItemContainer(item);
        var index = itemsControl.ItemContainerGenerator.IndexFromContainer(item);
        return index % 2 == 0;
    }

    public object? ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}