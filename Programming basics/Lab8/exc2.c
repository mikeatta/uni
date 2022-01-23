#include <stdio.h>

void initialisation ();

struct Circle
{
    int number;
    char name[20];
    float a, b;
    float r1;
};

// void is_within(float p1, float p2, float input_p1, float input_p2);

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

    puts("Enter a:");
    scanf("%f", &input_a);
    puts("Enter b:");
    scanf("%f", &input_b);
    puts("\n------------------");

    float circle_center = (input_a - One.a) + (input_b - One.b);
    if(circle_center<=One.r1)
    {
        fputs(One.name, stdout);
        puts("\n[Within range]");
        printf("Distance to center: %.2f\n", circle_center);
    }

    circle_center = (input_a - Two.a) + (input_b - Two.b);
    if(circle_center<=Two.r1)
    {
        fputs(Two.name, stdout);
        puts("\n[Within range]");
        printf("Distance to center: %.2f\n", circle_center);
    }

    circle_center = (input_a - Three.a) + (input_b - Three.b);
    if(circle_center<=Three.r1)
    {
        fputs(Three.name, stdout);
        puts("\n[Within range]");
        printf("Distance to center: %.2f\n", circle_center);
    }
    return 0;
}

// void is_within(float p1, float p2, float input_p1, float input_p2)
// {
//     float circle_center = (p1 - input_p1) + (p2 - input_p2);
//     if(circle_center>=0)
//         printf("Distance from center: %.2f", circle_center);
// }