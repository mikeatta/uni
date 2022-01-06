#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void sum(int *p_int, float *p_flo)
{
    int sum_int = 0;
    float sum_flo = 0;
    int i, length = 1;
    for(i=0; i<length; i++)
    {
        sum_int += *p_int;
        p_int++;
    }
    printf("Arr_int sum: %d | ", sum_int);

    for(i=0; i<length; i++)
    {
        sum_flo += *p_flo;
        p_flo++;
    }
    printf("Arr_flo sum: %f", sum_flo);
}

void bs(int a, int b)
{
    if(a==b)
        printf("Both numbers are equal (%d == %d\n", a, b);
    else if(a>b)
        printf("Bigger: %d | Smaller: %d\n", a, b);
    else
        printf("Bigger: %d | Smaller: %d\n", b, a);
}

int main()
{
    srand(time(NULL));
    int arr_int[10];
    float arr_flo[10];
    int i;

    for(i=0; i<10; i++)
        arr_int[i] = (rand() % (100+1)); // Int 0 - 100

    for(i=0; i<10; i++)
        arr_flo[i] = ((float)rand() / (float)RAND_MAX); // Float 0 - 1

    for(i=0; i<10; i++)
        printf("(%d) INT: %d | FLO: %f\n", i+1, arr_int[i], arr_flo[i]); // Print array elements
    
    printf("\n----------------------\n");
    int *ptr_int = arr_int;
    float *ptr_flo = arr_flo;

    sum(ptr_int, ptr_flo);

    printf("\n----------------------\n");
    int *int_five = arr_int+4;
    int *int_ten = arr_int+9;
    float *flo_five = arr_flo+4;
    float *flo_ten = arr_flo+9;
    printf("Arr_int[5]: %d | Arr_flo[5]: %f\n", *int_five, *flo_five);
    printf("Arr_int[10]: %d | Arr_flo[10]: %f\n", *int_ten, *flo_ten);

    printf("\n----------------------\n");
    int num = (rand() % (10 + 1)); // Random number for selecting array element
    printf("Arr[%d]: ", num);
    bs(arr_int[num], *ptr_int); // Compare value of random array element and the value of fist array element
    return 0;
}