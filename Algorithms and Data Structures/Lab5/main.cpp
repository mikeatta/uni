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

void insertion_sort(int *arr, int arr_size)
{
    int i;

    for(i=0; i<arr_size; i++)
    {
        int check = arr[i];
        int j = i - 1;

        while(check<arr[j] && j >= 0)
        {
            arr[j+1] = arr[j];
            --j;
        }
        arr[j+1] = check;
    }
}

void display(int *arr, int size, std::string sort_type)
{
    if(sort_type=="bubble")
        bubble_sort(arr, size);
    else if(sort_type=="insertion")
        insertion_sort(arr, size);

    print_array(arr, size);
    std::cout << std::endl;
}

int main()
{
    std::string sort_type;

    int arr_bubble[] = {9, 13, -32, 3, 0, 123, -78};
    int size = sizeof(arr_bubble) / sizeof(arr_bubble[0]);
    sort_type = "bubble";
    std::cout << "Bubble sort\n";
    display(arr_bubble, size, sort_type);

    int arr_insertion[] = {123, 9, -654, -3, 14, 14478, 102, 1, 3, -86};
    size = sizeof(arr_insertion) / sizeof(arr_insertion[0]);
    sort_type = "insertion";
    std::cout << "Insertion sort\n";
    display(arr_insertion, size, sort_type);
    return 0;
}