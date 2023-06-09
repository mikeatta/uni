#include <stdio.h>

#define LETTERS 26
#define NUMBERS 10

void create_letter_histogram(const char* str, int histogram[])
{
    int i = 0;

    for (i = 0; i < LETTERS; i++)
    {
        histogram[i] = 0;
    }

    while (*str)
    {
        char ch = *str;
        if (ch >= 'a' && ch <= 'z')
        {
            histogram[ch - 'a']++;
        }
        str++;
    }
}

void create_number_histogram(const char* str, int histogram[])
{
    int i = 0;

    for (i = 0; i < NUMBERS; i++)
    {
        histogram[i] = 0;
    }

    while (*str)
    {
        char ch = *str;
        if (ch >= '0' && ch <= '9')
        {
            histogram[ch - '0']++;
        }
        str++;
    }
}

int main()
{
    const char* str = "Hello, world! 123";
    int letter_arr[LETTERS];
    int number_arr[NUMBERS];

    create_letter_histogram(str, letter_arr);
    create_number_histogram(str, number_arr);

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

    return 0;
}