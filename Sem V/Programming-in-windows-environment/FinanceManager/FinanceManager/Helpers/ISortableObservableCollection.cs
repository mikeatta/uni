using System.Windows.Data;

namespace FinanceManager.Helpers;

public interface ISortableObservableCollection
{
    string DataSortPropertyName { get; }

    void SortCollection(ListCollectionView collection)
    {
        collection.Refresh();
    }
}