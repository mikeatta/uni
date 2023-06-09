#include <stdio.h>

#define ASCII_CHARS 256

void create_histogram(const char* str, int histogram[])
{
    int i = 0;

    for (i = 0; i < ASCII_CHARS; i++)
    {
        histogram[i] = 0;
    }

    while (*str)
    {
        histogram[(int)*str]++;
        str++;
    }
}

int main()
{
    const char* str = "Hello world!";
    int histogram[ASCII_CHARS];

    create_histogram(str, histogram);

    printf("Character occurence histogram:\n");
    printf("------------------------------\n");
    for (int i = 0; i < ASCII_CHARS; i++)
    {
        if (histogram[i] > 0)
        {
            printf("%c : %d\n", (char)i, histogram[i]);
        }
    }

    return 0;
}