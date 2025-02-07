using System.Globalization;
using System.Windows;
using System.Windows.Data;

namespace FinanceManager.Helpers;

public class NullToBooleanConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        return value != null;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}

public class NullToVisibilityConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        return value == null ? Visibility.Visible : Visibility.Collapsed;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}

public class NotNullToVisibilityConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        return value != null ? Visibility.Visible : Visibility.Collapsed;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}

public class StringToNullableDecimalConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        string stringValue = value as string;

        // Format the TextBox string is input is valid (number, greater than zero)
        if (decimal.TryParse(stringValue, NumberStyles.Any, culture, out decimal decimalValue) && decimalValue > 0)
        {
            return decimalValue.ToString("N2", culture);
        }

        return stringValue; // Leave the TextBox string as-is, if input is invalid
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        string strValue = value as string;

        // Convert to null on empty TextBox input
        if (string.IsNullOrEmpty(strValue))
        {
            return null;
        }

        // Convert to decimal on valid numeric input (even if lesser than zero)
        if (decimal.TryParse(strValue, NumberStyles.Any, culture, out decimal result))
        {
            return result;
        }

        return strValue; // Leave input as-is
    }
}