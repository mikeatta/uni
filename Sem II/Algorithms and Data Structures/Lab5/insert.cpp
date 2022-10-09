#include <iostream>
#include <cstdlib>
#include <ctime>

void insertion_sort_array(int *arr, int arr_length)
{

    // for(int i=0; i<arr_length; i++)
    // {
    //     std::cout << arr[i] << " ";
    // }

    for(int i=1; i<arr_length; i++)
    {
        int temp = arr[i]; // Stores currently compared element
        int j = i-1; // Checks element to the left of i

        while(arr[j] > temp && j >= 0) // If arr[j] > ar[i] && j >= 0
        {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = temp;
    }
}

int main()
{
    srand(time(0));
    int array_to_sort[10];
    int *ptr = array_to_sort;
    int array_length;
    array_length = sizeof(array_to_sort) / sizeof(array_to_sort[0]);

    for(int i=0; i<array_length; i++)
    {
        array_to_sort[i] = rand() % 10 + 1;
    }

    std::cout << "Unsorted array: \n";
    for(int i=0; i<array_length; i++)
    {
        std::cout << array_to_sort[i] << " ";
    }

    insertion_sort_array(ptr, array_length);

    std::cout << "\nSorted array: \n";
    for(int i=0; i<array_length; i++)
    {
        std::cout << array_to_sort[i] << " ";
    }
    return 0;
}