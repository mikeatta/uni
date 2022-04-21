#include <iostream>

void merge(int arr[], int left, int middle, int right)
{
    int i = left; // staring index of left subarray
    int j = middle + 1; // starting index of right subarray
    int k = left; // starting index of temp array

    int temp[right+1];

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
    int arr[] = {19, 7, -33, 0, 34, 77, 103, -67, 88, 49};
    int arr_len = sizeof(arr) / sizeof(arr[0]);
    std::cout << "Length " << arr_len <<std::endl;

    // Displaying array elements
    std::cout << "Before merge sort: " << std::endl;
    for(int i = 0; i < arr_len; i++)
    {
        std::cout << arr[i] << " ";
        if(i == arr_len-1) std::cout << std::endl;
    }

    // Sorting the array
    merge_sort(arr, 0, arr_len-1);
    std::cout << "After merge sort: " << std::endl;
    for(int i = 0; i < arr_len; i++)
    {
        std::cout << arr[i] << " ";
    }

    return 0;
}