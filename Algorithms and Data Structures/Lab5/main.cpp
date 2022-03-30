#include <iostream>

void print_array(int *arr, int arr_size)
{
    for(int i=0; i<arr_size; i++)
        std::cout << arr[i] << " ";
}

void swap_arr(int *arr_one, int *arr_two)
{
    int carry = *arr_one;
    *arr_one = *arr_two;
    *arr_two = carry;
}

void bubble_sort(int *arr, int arr_size)
{
    int i, j;

    for(i=0; i<arr_size-1; i++)
    {
        for(j=0; j<arr_size-1; j++)
            if(arr[j] > arr[j+1]) swap_arr(&arr[j], &arr[j+1]);
    }
}

void display(int *arr, int size)
{
    bubble_sort(arr, size);
    print_array(arr, size);
}

int main()
{
    int arr[] = {9, 13, -32, 3, 0, 123, -78};
    int size = sizeof(arr) / sizeof(arr[0]);
    display(arr, size);
    return 0;
}