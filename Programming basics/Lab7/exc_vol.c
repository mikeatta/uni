#include <stdio.h>
#include <string.h>
#include <ctype.h>

int count_occurance(char *text, int *letters, int *numbers)
{
    int i;
    char temp[strlen(text)]; // temp array to store 'text' value
    char *ptr = temp; // pointer to value of text
    char *ptr_text = text; // pointer to text input
    char symbol;
    for(i=0; i<(strlen(text)-1); i++)
    {
        *ptr = *ptr_text; // assigning value of text to temp pointer
        symbol = *ptr;
        if(islower(symbol))
        {
            *letters = 1;
            letters++;
        }
        else if(isdigit(symbol))
        {
            *numbers = 1;
            numbers++;
        }
        else break;
        puts(ptr);
        printf("Letter: %d\n", *letters);
        printf("Number: %d\n", *numbers);
        ptr_text++;
    }
    // int let = len(letters);
    // int num = len(numbers);
    // return let, num;
}

int main()
{
    char text[100];
    char *ptr = text;
    int letters_arr[100], numbers_arr[100]; // arrays holding occurances
    int *ptr_letters = letters_arr;
    int *ptr_numbers = numbers_arr;

    puts("Enter text");
    fgets(ptr, 100, stdin);

    count_occurance(ptr, ptr_letters, ptr_numbers);

    fputs(ptr, stdout);
    printf("%d", letters_arr);
    printf("%d", numbers_arr);
}