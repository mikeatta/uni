#include <iostream>
#include <fstream>
#include <string>

void write_to_array(std::string data_type, int arr10[], int arr20[], int arr30[], int arr50[], int arr75[],
                    int arr100[], int arr200[], int arr300[], int arr400[], int arr500[])
{
    if(data_type=="P" || data_type=="p") data_type = "_p";
    else if(data_type=="O" || data_type=="o") data_type = "_o";
    else data_type = "_r";

    int str_to_int; // Converting string from file line to int and passing to array
    int i; // Incrementing i to write to arrays

    std::string file_10 = "..\\10" + data_type + ".txt"; // 10 number file

    std::fstream read_file_10;
    read_file_10.open(file_10);
    std::string line_10;
    i = 0; // Resetting incrementation back to 0
    while(read_file_10.good())
    {
        getline(read_file_10, line_10);
        str_to_int = std::stoi(line_10);
        arr10[i] = str_to_int;
        i++;
    }

    std::string file_20 = "..\\20" + data_type + ".txt"; // 20 number file

    std::fstream read_file_20;
    read_file_20.open(file_20);
    std::string line_20;
    i = 0;
    while(read_file_20.good())
    {
        getline(read_file_20, line_20);
        str_to_int = std::stoi(line_20);
        arr20[i] = str_to_int;
        i++;
    }

//    std::string file_30 = "..\\30" + data_type + ".txt"; // 30 number file
//
//    std::fstream read_file_30;
//    read_file_30.open(file_30);
//    std::string line_30;
//    while(read_file_30.good())
//    {
//        getline(read_file_30, line_30);
//        std::cout << line_30 << "\n";
//    }
//
//    std::string file_50 = "..\\50" + data_type + ".txt"; // 50 number file
//
//    std::fstream read_file_50;
//    read_file_50.open(file_50);
//    std::string line_50;
//    while(read_file_50.good())
//    {
//        getline(read_file_50, line_50);
//        std::cout << line_50 << "\n";
//    }
//
//    std::string file_75 = "..\\75" + data_type + ".txt"; // 75 number file
//
//    std::fstream read_file_75;
//    read_file_75.open(file_75);
//    std::string line_75;
//    while(read_file_75.good())
//    {
//        getline(read_file_75, line_75);
//        std::cout << line_75 << "\n";
//    }
//
//    std::string file_100 = "..\\100" + data_type + ".txt"; // 100 number file
//
//    std::fstream read_file_100;
//    read_file_100.open(file_100);
//    std::string line_100;
//    while(read_file_100.good())
//    {
//        getline(read_file_100, line_100);
//        std::cout << line_100 << "\n";
//    }
//
//    std::string file_200 = "..\\200" + data_type + ".txt"; // 200 number file
//
//    std::fstream read_file_200;
//    read_file_200.open(file_200);
//    std::string line_200;
//    while(read_file_200.good())
//    {
//        getline(read_file_200, line_200);
//        std::cout << line_200 << "\n";
//    }
//
//    std::string file_300 = "..\\300" + data_type + ".txt"; // 300 number file
//
//    std::fstream read_file_300;
//    read_file_300.open(file_300);
//    std::string line_300;
//    while(read_file_300.good())
//    {
//        getline(read_file_300, line_300);
//        std::cout << line_300 << "\n";
//    }
//
//    std::string file_400 = "..\\400" + data_type + ".txt"; // 400 number file
//
//    std::fstream read_file_400;
//    read_file_400.open(file_400);
//    std::string line_400;
//    while(read_file_400.good())
//    {
//        getline(read_file_400, line_400);
//        std::cout << line_400 << "\n";
//    }
//
//    std::string file_500 = "..\\500" + data_type + ".txt"; // 500 number file
//
//    std::fstream read_file_500;
//    read_file_500.open(file_500);
//    std::string line_500;
//    while(read_file_500.good())
//    {
//        getline(read_file_500, line_500);
//        std::cout << line_500 << "\n";
//    }
}

int main()
{
    int arr_10[10], arr_20[20], arr_30[30], arr_50[50], arr_75[75],
        arr_100[100], arr_200[200], arr_300[300], arr_400[400], arr_500[500];

    write_to_array("p", arr_10, arr_20, arr_30, arr_50, arr_75,
                   arr_100, arr_200, arr_300, arr_400, arr_500); // Reading from files of selected data type

    std::cout << "Arr 10\n";
    for(int i = 0; i < 10; i++)
        std::cout << arr_10[i] << " ";

    std::cout << "\nArr 20\n";
    for(int i = 0; i < 20; i++)
        std::cout << arr_20[i] << " ";

    return 0;
}