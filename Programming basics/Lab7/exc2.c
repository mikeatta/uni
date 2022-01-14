#include <stdio.h>
#include <string.h>

int contains(char character, char *arr)
{
    int i, char_present = 0;
    for(i=0; i<strlen(arr); i++) // Check entire string for presence of charcter, if present set variable to 1
    {
        if(character == arr[i])
            char_present = 1;
        else
            char_present;
    }

    if(char_present == 1) // If character was found, return true (1)
        return 1;
    else
        return 0;
}

int main()
{
    char string[100];
    char input;
    char *ptr = string;
    
    puts("Enter a string:");
    fgets(string, 100, stdin);
    puts("Enter a character to check for:");
    input = getchar();

    // puts("\n--------------");
    // fputs(string, stdout);
    // printf("%c", input);

    // USE THE 'CONTAINS' FUNCTION IN A LOOP

    int result = contains(input, ptr);
    printf("Result: %d", result);
    return 0;
}