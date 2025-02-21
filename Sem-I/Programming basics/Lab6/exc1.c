#include <stdio.h>
#define num_amount 5

int main()
{
    int arr[num_amount], i, y;
    printf("Please input the numbers:\n");

    for(i=0; i<num_amount; i++)
    {
        printf("Number %d:", i+1);
        scanf("%d", &arr[i]);
    }

    for(y=num_amount-1; y>=0; y--)
    {
        printf("%d\n", arr[y]);
    }
    return 0;
}