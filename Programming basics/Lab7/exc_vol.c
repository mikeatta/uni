#include <stdio.h>

#define LETTERS 26

void create_histogram(const char* str, int histogram[])
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

int main()
{
    const char* str = "Hello, world!";
    int histogram[LETTERS];

    create_histogram(str, histogram);

    printf("Character occurence histogram:\n");
    printf("------------------------------\n");
    for (int i = 0; i < LETTERS; i++)
    {
        if (histogram[i] > 0)
        {
            char ch = 'a' + i;
            printf("%c : %d\n", ch, histogram[i]);
        }
    }

    return 0;
}