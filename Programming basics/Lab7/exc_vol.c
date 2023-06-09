#include <stdio.h>

#define LETTERS 26
#define NUMBERS 10

void create_histogram(const char* str, int* letter_arr, int* number_arr)
{
    int i = 0;

    for (i = 0; i < LETTERS; i++)
    {
        letter_arr[i] = 0;
    }

    for (i = 0; i < NUMBERS; i++)
    {
        number_arr[i] = 0;
    }

    while (*str)
    {
        char ch = *str;
        if (ch >= 'a' && ch <= 'z')
        {
            letter_arr[ch - 'a']++;
        }
        else if (ch >= '0' && ch <= '9')
        {
            number_arr[ch - '0']++;
        }
        str++;
    }
}

void display_histogram(int letter_arr[], int number_arr[], char histogram_selection)
{
    switch (histogram_selection)
    {
    case 'L':
    case 'l':
        printf("Letter histogram:\n");
        printf("------------------------------\n");
        for (int i = 0; i < LETTERS; i++)
        {
            if (letter_arr[i] > 0)
            {
                char ch = 'a' + i;
                printf("%c : %d\n", ch, letter_arr[i]);
            }
        }
        break;

    case 'N':
    case 'n':
    case 'D':
    case 'd':
        printf("\nNumber histogram:\n");
        printf("------------------------------\n");
        for (int i = 0; i < NUMBERS; i++)
        {
            if (number_arr[i] > 0)
            {
                char ch = '0' + i;
                printf("%c : %d\n", ch, number_arr[i]);
            }
        }
        break;
    
    default:
        printf("Incorrect input. Please provide: 'l', 'n' or 'd'.\n");
        break;
    }
}

int main()
{
    const char* str = "Hello, world! 123";
    int letter_arr[LETTERS];
    int* letter_ptr = letter_arr;
    int number_arr[NUMBERS];
    int* number_ptr = number_arr;

    create_histogram(str, letter_ptr, number_ptr);
    display_histogram(letter_arr, number_arr, 'l');
    return 0;
}