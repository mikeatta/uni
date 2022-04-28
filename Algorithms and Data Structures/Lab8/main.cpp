#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
#include <ctime>

int number_gen()
{
    return rand() % (10000+1-0) + 0;
}

void make_file(int amount_of_files)
{

    int i = 0, j = 0;
    int set_number_amount;
    while(i<amount_of_files) // How many files to make
    {
        std::cout << "How many sets of numbers for set " << i+1 << "?" <<std::endl;
        std::cin >> set_number_amount;


        std::string set_name;
        set_name = std::to_string(set_number_amount);
        set_name = "..\\" + set_name + ".txt";

        std::ofstream write_file; // Creating files
        write_file.open(set_name);
        for(;j<set_number_amount;j++)
        {
            write_file << number_gen() << "\n";
        }
        write_file.close();
        i++;
    }
}

int main()
{
    int file_count;
    srand(time(0));

    // Writing to file
    std::cout << "How many files to make?\n";
    std::cin >> file_count;
    make_file(file_count);
    return 0;
}