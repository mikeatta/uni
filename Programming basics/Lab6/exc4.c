#include <stdio.h>
#define array_length(x) (sizeof(x) / sizeof(int))

void swap(int a[], int b[])
{
    int temp = *a;
    *a = *b;
    *b = temp;
}

void sort(int a[], int length);

int main()
{
    int arr[10] = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
    int i, j;
    int arr_len = array_length(arr);

    sort(arr, arr_len);

    for(i=0; i<arr_len; i++)
    {
        printf("Arr[%d]: %d\n", i+1, arr[i]);
    }
    return 0;
}

void sort(int a[], int length)
{
    int i = 0;
    int sorted;
    do
    {
        sorted = 0;
        for(int j=0; j<(length-i-1); j++)
        {
            if(a[j]>a[j+1])
            {
                swap(&a[j], &a[j+1]);
                sorted = 1;
            }
        }
        i++;
    } while (sorted!=0);
}