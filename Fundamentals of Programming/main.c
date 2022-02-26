#include <stdio.h>

int main() {
    unsigned int t[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    unsigned char *w;
    w = (unsigned char*) &t[3];
    printf("%d ", *w++);
    printf("%d ", *w++);
    printf("%d ", *w++);
    return 0;
}