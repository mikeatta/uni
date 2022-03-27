#include <iostream>
#include <math.h> // For pow function [Exc2]
#include <string.h>

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

    // Exc 3

    // Dec -> Hex
    std::string hex_tab[99];
    decimal_number_to_convert = 0;
    rem = 0;

    std::cout << "Decimal number (to hex): ";
    std::cin >> decimal_number_to_convert;
    dec = decimal_number_to_convert;

    for(i=0; dec>0; i++)
    {
        rem = dec % 16;
        if(rem>9)
        {
            switch (rem)
            {
                case 10: hex_tab[i] = "A"; break;
                case 11: hex_tab[i] = "B"; break;
                case 12: hex_tab[i] = "C"; break;
                case 13: hex_tab[i] = "D"; break;
                case 14: hex_tab[i] = "E"; break;
                case 15: hex_tab[i] = "F"; break;
            }
        }
        else
        {
            std::string s = std::to_string(rem);
            hex_tab[i] = s;
        }
        dec = dec / 16;
    }
    std::cout << "Hex: ";

    for(i-1; i>=0; i--)
    {
        std::cout << hex_tab[i];   
    }
    std::cout << "\n";

    return 0;
}