#include <iostream>

void merge(int arr[], int left, int middle, int right);

void merge_sort(int arr[], int left, int right)
{
    if(left<right)
    {
        int middle = (left + right) / 2;
        merge_sort(arr, left, middle);
        merge_sort(arr, middle+1, right);
        merge(arr, left, middle, right);
    }
}

int main()
{
    int arr[10] = {19, 7, -33, 0, 34, 77, 103, -67, 88, 49};

    // Displaying array elements
    std::cout << "Before merge sort: ";
    for(int i = 0; i < 10; i++)
    {
        std::cout << arr[i] << " ";
    }

    // Sorting the array
    merge_sort(arr, 0, 9);
    std::cout << "After merge sort: ";
    for(int i = 0; i < 10; i++)
    {
        std::cout << arr[i] << " ";
    }

    return 0;
}