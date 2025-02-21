#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void trim(char *arr[], int trim_amount)
{
    char trimmed[trim_amount+1];
    strncpy(trimmed, *arr, trim_amount);
    fputs(trimmed, stdout);
}

int main()
{
    char string[100], string2[100];
    char input[4];
    char *p;
    char *ptr = string;

    puts("Enter a string:");
    fgets(string, 100, stdin);
    puts("How many characters to display?");
    fgets(input, 4, stdin);
    puts("\n----------------");

    puts("Output:");
    int to_trim = strtol(input, &p, 10);
    trim(&ptr, to_trim);
    return 0;
}