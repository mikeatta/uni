#include <stdio.h>
#include <string.h>

void copy(char *arr1, char *arr2)
{
    int i;
    for(i=0; i<strlen(arr1); i++)
    {
        arr2[i] = arr1[i];
    }
    char *temp = arr2;
    puts("Enter some characters to add");
    fgets(temp+(strlen(arr1))-1, 100, stdin);
}

int main()
{
    char s1[100], s2[100], i;
    char s3[100] = "String";
    char cat_function; 
    char *ptr3 = &cat_function;
    ptr3 = "abc";
    char *ptr1 = s1, *ptr2 = s2;
    puts("Enter a string");
    fgets(s1, sizeof(s1), stdin);

    /* copy string and strcat functions */
    copy(ptr1, ptr2);
    strcat(s3, ptr3);

    /* output */
    puts("\n-----------------");
    puts("Copy function:");
    fputs(s2, stdout);
    puts("Strcat function:");
    fputs(s3, stdout);
    return 0; 
}