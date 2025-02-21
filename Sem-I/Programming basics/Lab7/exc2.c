#include <stdio.h>
#include <string.h>

int contains(char character, char *arr)
{
    int i, char_present = 0;

    /* check entire string for presence of charcter, if present set variable to 1 */
    for(i=0; i<strlen(arr); i++)
    {
        if(character == arr[i])
            char_present = 1;
        else
            char_present;
    }

    /* if character was found, return true (1) */
    if(char_present == 1)
        return 1;
    else
        return 0;
}

/* function to clear '\n' char from user input */
void clear_stdin(void)
{
    int c = getchar();
    while (c!='\n' && c!=EOF)
        c = getchar();
}

int main()
{
    char string[100];
    char input;
    char *ptr = string;
    int i, y;
    int char_present = 0;
    
    puts("Enter a string:");
    fgets(string, 100, stdin);
    string[strcspn(string, "\n")] = 0; // Removing '\n' char from string

    do
    {
        int single_char = 0;
        puts("Enter a charactes to check for:");
        for(y=0; y<=(strlen(string))-1; y++)
        {
            input = getchar(); // Getting the character from user
            int result = contains(input, ptr);
            clear_stdin(); // Clearing input
            if(result==1)
            {
                single_char = 1;
                char_present = single_char;
            }
            else
                single_char = 0;
        }
        i = y;
    } while(i<=(strlen(string))-1);

    printf("Result: %d", char_present);
    return 0;
}