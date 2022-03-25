#include <iostream>
#include <math.h> // For pow function [Exc2]

int main() 
{
    int i;

    // Exc 2
    // Dec -> bin
    int dec_tab[99];
    int decimal_number_to_convert;

    // Bin -> dec
    int binary_number;
    int dec = 0, rem;

    std::cout << "Decimal number (to bin): ";
    std::cin >> decimal_number_to_convert;

    for(i=0; decimal_number_to_convert>0; i++)
    {
        dec_tab[i] = decimal_number_to_convert % 2;
        decimal_number_to_convert = decimal_number_to_convert / 2;
    }

    std::cout << "Binary: ";

    for(i=i-1; i>=0; i--)
    {
        std::cout << dec_tab[i];
    }

    std::cout << "\n";

    i = 0;
    std::cout << "Binary number (to dec): ";
    std::cin >> binary_number;
    
    while(binary_number!=0)
    {
        rem = binary_number % 10;
        binary_number /= 10;
        dec += rem * pow(2, i);
        ++i;
    }

    std::cout << "Binary: " << dec << "\n";

    return 0;
}