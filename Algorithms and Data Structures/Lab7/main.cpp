#include <iostream>

void merge(int arr[], int left, int middle, int right)
{
    int i = left; // staring index of left subarray
    int j = middle + 1; // starting index of right subarray
    int k = left; // starting index of temp array

    int temp[10];

    while(i<=middle && j<=right)
    {
        if(arr[i]<=arr[j])
        {
            temp[k] = arr[i];
            i++;
            k++;
        }
        else
        {
            temp[k] = arr[j];
            j++;
            k++;
        }
    }
    while(i<=middle) // copying all elements from left arr to temp
    {
        temp[k] = arr[i];
        i++;
        k++;
    }
    while(j<=right) // copying all elements from right arr to temp
    {
        temp[k] = arr[j];
        j++;
        k++;
    }
    for(int s = left; s <= right; s++)
    {
        arr[s] = temp[s]; // copying elements from temp array
    }
}

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
        if(i == 9) std::cout << std::endl;
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