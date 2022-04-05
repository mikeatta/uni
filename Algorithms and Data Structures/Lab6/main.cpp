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


int main()
{
    int array[10] = {9, 8, 7, 6, 5, 4, 3, 2, 1, 0};
    int array_size = sizeof(array) / sizeof(array[0]);

    std::cout << "Selection sort: ";
    selection_sort(array, array_size);

    return 0;
}