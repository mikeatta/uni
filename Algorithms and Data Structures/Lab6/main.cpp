#include "iostream"

void selection_sort(int arr[], int array_size)
{
    int i, j, min, temp;

    for(i=0; i<array_size; i++)
    {
        min = i;
        for(j= i+1; j<array_size; j++)
            if(arr[min] > arr[j]) min = j;

        temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }

    for(i=0; i<array_size; i++)
    {
        if(i==9)
            std::cout << arr[i];
        else
            std::cout << arr[i] << ", ";
    }
}

int split_array(int arr[], int start, int end)
{
    int pivot = arr[end];
    int i = start - 1;

    for(int j = start; j <= end - 1; j++)
    {
        if(arr[j] < pivot)
        {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    i++;
    int temp = arr[i];
    arr[i] = arr[end];
    arr[end] = temp;

    return i;
}

void quick_sort(int arr[], int start, int end)
{
    if(end <= start) return;

    int pivot = split_array(arr, start, end);
    quick_sort(arr, start, pivot - 1);
    quick_sort(arr, pivot + 1, end);
}

int main()
{
    int array[10] = {9, 8, 7, 6, 5, 4, 3, 2, 1, 0};
    int array_size = sizeof(array) / sizeof(array[0]);

    std::cout << "Selection sort: ";
    selection_sort(array, array_size);

    std::cout << "\nQuick sort: ";
    quick_sort(array, 0, array_size-1);

    for(int i=0; i<array_size; i++)
    {
        if(i==9) std::cout << array[i];
        else std::cout << array[i] << ", ";
    }
    return 0;
}