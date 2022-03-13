#include <stdio.h>
#include <conio.h>

void value() {
    unsigned char a;
    a = ~(128 && 130);
    printf("Val: %d", a);
}

void func1() {
    unsigned int a = 129;
    unsigned int b = 128;
    if (a > b) printf("aaa");
    else printf("bbb");
}

void func2() {
    unsigned int t[10] = {0, 1, 2, 1000000, 4, 5, 6, 7, 8, 9};
    unsigned char *w;
    w = (unsigned char*) &t[3];
    printf("%d ", *w++);
    printf("%d ", *w++);
    printf("%d \n", *w++);
}

void func3() {
    unsigned char t[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    unsigned short *w;
    w = (unsigned short*) &t[3];
    printf("%d ", *w++);
    printf("%d ", *w++);
    printf("%d ", *w++);
}

int max(int a, int b) {
    return (a>b) ? a : b;

    // if (a>b) return a;
    // else return b;
}

int main() {
    unsigned char c = 256;
    // value > 255 resets to 0
    printf("%d - overflow\n", c);
    c = 255;
    // max value for char = 255
    printf("%d - max value\n", c);

    func1();
    printf("\n");

    func2();
    printf("\n");

    func3();
    printf("\n");

    int a = 3;
    int b = 5;
    printf("Max: %d\n", max(a, b));

    value();
    return 0;
}