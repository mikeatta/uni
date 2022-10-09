#include <stdio.h>

int main()
{
    int arr[3][3], i, y;
    for(i=0; i<3; i++)
    {
        for(y=0; y<3; y++)
        {
            printf("Number: ");
            scanf("%d", &arr[i][y]);
        }
    }
    
    for(i=0; i<3; i++)
    {
        for(y=0; y<3; y++)
        {
            printf("%d", arr[i][y]);
        }
        printf("\n");
    }
    return 0;
}