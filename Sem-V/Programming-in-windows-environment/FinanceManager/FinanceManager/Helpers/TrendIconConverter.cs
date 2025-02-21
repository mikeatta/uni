using System.Globalization;
using System.Windows.Data;

namespace FinanceManager.Helpers;

public class TrendIconConverter : IValueConverter
{
    public object? Convert(object? value, Type targetType, object? parameter, CultureInfo culture)
    {
        return value switch
        {
            "Up" => "\ud83d\udd3c", // Unicode for "up-pointing" triangle
            "Down" => "\ud83d\udd3d", // Unicode for "down-pointing" triangle
            "None" => "\u2796", // Unicode for a horizontal line
            _ => string.Empty
        };
    }

    public object? ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}