#include <stdio.h>

struct Assembly {
    char *name;
    char *group;
    float price;
};

void makeStruct(char *name, char *group, float price)
{
    struct Assembly member = {
        name,
        group,
        price
    };
    printf("Name: %s, Group: %s, Price: %.2f\n", member.name, member.group, member.price);
}

int main()
{
    int members, i=0;
    char name[30];
    char group[50];
    float price;

    printf("Enter amount of members: ");
    scanf("%d", &members);

    while (i<members)
    {
        printf("Student [%d]: \n", i+1);
        printf("Enter students name: ");
        scanf("%s", &name);

        printf("Enter students group: ");
        scanf("%s", &group);

        printf("Enter price: ");
        scanf("%f", &price);

        makeStruct(name, group, price);
        i+=1;
    }
    return 0;
}