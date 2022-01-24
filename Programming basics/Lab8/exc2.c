#include <stdio.h>

void within_range(float x, float x_center, float y, float y_center, float r, char *name);

void initialisation ();

struct Circle
{
    int number;
    char name[20];
    float a, b;
    float r1;
};

int main()
{
    float input_a, input_b;

    struct Circle One = {
        1,
        "Circle one",
        12.0, 13.1,
        30.0
    };

    struct Circle Two = {
        2,
        "Circle two",
        38.1, 19.7,
        72
    };

    struct Circle Three = {
        3,
        "Circle three",
        12.5, 17.8,
        16.8
    };

    void initialisation ();

    puts("Enter a");
    scanf("%f", &input_a);
    puts("Enter b");
    scanf("%f", &input_b);
    puts("\n------------------");

    within_range(input_a, One.a, input_b, One.b, One.r1, One.name);
    within_range(input_a, Two.a, input_b, Two.b, Two.r1, Two.name);
    within_range(input_a, Three.a, input_b, Three.b, Three.r1, Three.name);
    return 0;
}

void within_range(float x, float x_center, float y, float y_center, float r, char *name)
{
    float center = (x - x_center) + (y - y_center);
    double P = 3.14 * (r*r);
    if(center<=r)
    {
        printf("%s\n", name);
        printf("[Within range]\n");
        printf("%.2f\n", P);
    }
}