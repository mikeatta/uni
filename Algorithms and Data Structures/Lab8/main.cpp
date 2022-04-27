#include <iostream>
#include <fstream>

int main()
{
    // Writing to file
    std::ofstream file_write;
    file_write.open("..\\test_file.txt");
    std::string line = "Line num: ";
    for(int i = 0; i < 5; i++)
    {
        file_write << line << i << "\n";
    }
    file_write.close();

    // Reading from file
    std::fstream file_read;
    file_read.open("..\\test_file.txt");
//    std::string line;
    while(file_read.good())
    {
        getline(file_read, line);
        std::cout << line << "\n";
    }
    return 0;
}