#include <iostream>

int main()
{
    // Exc 1 - Perfect number
    int i, j, divider;

    for(i=2; i<=30; i++)
    {
        std::cout << "i: " << i << "\n";

        for(j=i; j>0; j--)
        {
            if(i % j == 0)
                std::cout << j << "\n";
        }

        std::cout << "\n";
    }

    return 0;
}