#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
#include <ctime>

int number_gen()
{
    return rand() % ((1000+1-0) + 0) - 500; // Rand up to 1,000 with negative numbers
}

void make_file(int amount_of_files, const std::string& data_type)
{
    int i = 0, j = 0;
    int set_number_amount;
    std::string selected_data_type;
    while(i<amount_of_files) // How many files to make
    {
        std::cout << "How many sets of numbers for set " << i+1 << "?" <<std::endl;
        std::cin >> set_number_amount;

        // Optimistic Data
        if(data_type=="O" || data_type=="o") // Half of numbers in file already sorted
        {
            selected_data_type = "_o";
            std::string set_name;
            set_name = std::to_string(set_number_amount);
            set_name = "..\\" + set_name + selected_data_type + ".txt"; // Setting path and filename

            std::ofstream write_file; // Creating files
            write_file.open(set_name);
            for (; j < set_number_amount; j++)
            {
                if(j < (set_number_amount / 2))
                    write_file << j << "\n"; // Filling half of file with sorted numbers
                else if (j == set_number_amount - 1) write_file << number_gen(); // Skip newline on last number
                else write_file << number_gen() << "\n"; // Filling rest of file with random numbers
            }
            write_file.close();
            i++;
        }

        // Random Data
        if(data_type=="R" || data_type=="r") // Randomly generated numbers
        {
            selected_data_type = "_r";
            std::string set_name;
            set_name = std::to_string(set_number_amount);
            set_name = "..\\" + set_name + selected_data_type + ".txt"; // Setting path and filename

            std::ofstream write_file; // Creating files
            write_file.open(set_name);
            for (; j < set_number_amount; j++)
            {
                if (j == set_number_amount - 1) write_file << number_gen(); // Skip newline on last number
                else write_file << number_gen() << "\n";
            }
            write_file.close();
            i++;
        }

        // Pessimistic Data
        if(data_type=="P" || data_type=="p") // File sorted in wrong order
        {
            selected_data_type = "_p";
            std::string set_name;
            set_name = std::to_string(set_number_amount);
            set_name = "..\\" + set_name + selected_data_type + ".txt"; // Setting path and filename

            std::ofstream write_file; // Creating files
            write_file.open(set_name);
            for (j = set_number_amount; j > 0; j--)
            {
                if (j == 1) write_file << j; // Skip newline on last number
                else write_file << j << "\n";
            }
            write_file.close();
            i++;
        }
    }
}

int main()
{
    int file_count;
    std::string file_type;
    srand(time(0));

    // Writing to file
    std::cout << "How many files to make?\n";
    std::cin >> file_count;

    std::cout << "Which type of data to generate?\n";
    std::cout << "Optimistic [O]\nPessimistic [P]\nRandom[R]" <<std::endl;
    std::cin >> file_type;

    make_file(file_count, file_type);

    return 0;
}