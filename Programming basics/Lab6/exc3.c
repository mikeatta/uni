#include <stdio.h>

int main()
{
    int a, b, sum;

    printf("Sum of numbers\n");
    printf("Enter the 1st number: ");
    scanf("%d", &a);
    printf("Enter the 2nd number: ");
    scanf("%d", &b);

    int *pa = &a;
    int *pb = &b;
    sum = *pa + *pb;

    printf("The sum is: %d", sum);
    return 0;
}