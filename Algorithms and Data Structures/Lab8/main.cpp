#include <fstream>

int main()
{
    std::ofstream file;
    file.open("..\\test_file.txt");
    std::string line = "Line num: ";
    for(int i = 0; i < 5; i++)
    {
        file << line << i << "\n";
    }
    file.close();
    return 0;
}