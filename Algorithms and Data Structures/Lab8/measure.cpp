#include <iostream>
#include <fstream>
#include <string>
#include <chrono>
#define space "\n\n"

void selection_sort(int arr[], int array_size) // Selection sort algorithm
{
    int i, j, min, temp;

    for(i=0; i<array_size; i++)
    {
        min = i;
        for(j= i+1; j<array_size; j++)
            if(arr[min] > arr[j]) min = j;

        temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
}

int split_array(int arr[], int start, int end) // Quick sort splitting array
{
    int pivot = arr[end];
    int i = start - 1;

    for(int j = start; j <= end - 1; j++)
    {
        if(arr[j] < pivot)
        {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    i++;
    int temp = arr[i];
    arr[i] = arr[end];
    arr[end] = temp;

    return i;
}

void quick_sort(int arr[], int start, int end) // Quick sort algorithm
{
    if(end <= start) return;

    int pivot = split_array(arr, start, end);
    quick_sort(arr, start, pivot - 1);
    quick_sort(arr, pivot + 1, end);
}

void merge(int arr[], int left, int middle, int right)
{
    int i = left; // staring index of left subarray
    int j = middle + 1; // starting index of right subarray
    int k = left; // starting index of temp array

    int temp[right+1];

    while(i<=middle && j<=right)
    {
        if(arr[i]<=arr[j])
        {
            temp[k] = arr[i];
            i++;
            k++;
        }
        else
        {
            temp[k] = arr[j];
            j++;
            k++;
        }
    }
    while(i<=middle) // copying all elements from left arr to temp
    {
        temp[k] = arr[i];
        i++;
        k++;
    }
    while(j<=right) // copying all elements from right arr to temp
    {
        temp[k] = arr[j];
        j++;
        k++;
    }
    for(int s = left; s <= right; s++)
    {
        arr[s] = temp[s]; // copying elements from temp array
    }
}

void merge_sort(int arr[], int left, int right) // Merge sort algorithm
{
    if(left<right)
    {
        int middle = (left + right) / 2;
        merge_sort(arr, left, middle);
        merge_sort(arr, middle+1, right);
        merge(arr, left, middle, right);
    }
}

void write_to_array(std::string data_type, int arr10[], int arr20[], int arr30[], int arr50[], int arr75[],
                    int arr100[], int arr200[], int arr300[], int arr400[], int arr500[])
{
    if(data_type=="P" || data_type=="p") data_type = "_p";
    else if(data_type=="O" || data_type=="o") data_type = "_o";
    else data_type = "_r";

    int str_to_int; // Converting string from file line to int and passing to array
    int i; // Incrementing i to write to arrays

    std::string file_10 = "..\\data\\10" + data_type + ".txt"; // 10 number file

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

    std::string file_20 = "..\\data\\20" + data_type + ".txt"; // 20 number file

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

    std::string file_30 = "..\\data\\30" + data_type + ".txt"; // 30 number file

    std::fstream read_file_30;
    read_file_30.open(file_30);
    std::string line_30;
    i = 0;
    while(read_file_30.good())
    {
        getline(read_file_30, line_30);
        str_to_int = std::stoi(line_30);
        arr30[i] = str_to_int;
        i++;
    }

    std::string file_50 = "..\\data\\50" + data_type + ".txt"; // 50 number file

    std::fstream read_file_50;
    read_file_50.open(file_50);
    std::string line_50;
    i = 0;
    while(read_file_50.good())
    {
        getline(read_file_50, line_50);
        str_to_int = std::stoi(line_50);
        arr50[i] = str_to_int;
        i++;
    }

    std::string file_75 = "..\\data\\75" + data_type + ".txt"; // 75 number file

    std::fstream read_file_75;
    read_file_75.open(file_75);
    std::string line_75;
    i = 0;
    while(read_file_75.good())
    {
        getline(read_file_75, line_75);
        str_to_int = std::stoi(line_75);
        arr75[i] = str_to_int;
        i++;
    }

    std::string file_100 = "..\\data\\100" + data_type + ".txt"; // 100 number file

    std::fstream read_file_100;
    read_file_100.open(file_100);
    std::string line_100;
    i = 0;
    while(read_file_100.good())
    {
        getline(read_file_100, line_100);
        str_to_int = std::stoi(line_100);
        arr100[i] = str_to_int;
        i++;
    }

    std::string file_200 = "..\\data\\200" + data_type + ".txt"; // 200 number file

    std::fstream read_file_200;
    read_file_200.open(file_200);
    std::string line_200;
    i = 0;
    while(read_file_200.good())
    {
        getline(read_file_200, line_200);
        str_to_int = std::stoi(line_200);
        arr200[i] = str_to_int;
        i++;
    }

    std::string file_300 = "..\\data\\300" + data_type + ".txt"; // 300 number file

    std::fstream read_file_300;
    read_file_300.open(file_300);
    std::string line_300;
    i = 0;
    while(read_file_300.good())
    {
        getline(read_file_300, line_300);
        str_to_int = std::stoi(line_300);
        arr300[i] = str_to_int;
        i++;
    }

    std::string file_400 = "..\\data\\400" + data_type + ".txt"; // 400 number file

    std::fstream read_file_400;
    read_file_400.open(file_400);
    std::string line_400;
    i = 0;
    while(read_file_400.good())
    {
        getline(read_file_400, line_400);
        str_to_int = std::stoi(line_400);
        arr400[i] = str_to_int;
        i++;
    }

    std::string file_500 = "..\\data\\500" + data_type + ".txt"; // 500 number file

    std::fstream read_file_500;
    read_file_500.open(file_500);
    std::string line_500;
    i = 0;
    while(read_file_500.good())
    {
        getline(read_file_500, line_500);
        str_to_int = std::stoi(line_500);
        arr500[i] = str_to_int;
        i++;
    }
}

int main()
{
    int arr_10[10], arr_20[20], arr_30[30], arr_50[50], arr_75[75],
            arr_100[100], arr_200[200], arr_300[300], arr_400[400], arr_500[500];

    write_to_array("o", arr_10, arr_20, arr_30, arr_50, arr_75,
                   arr_100, arr_200, arr_300, arr_400, arr_500); // Reading from files of selected data type

    // 10 element data sets
    std::cout << "Selection sort (10):\n";
    auto start = std::chrono::high_resolution_clock::now();
    selection_sort(arr_10, 10); // Selecting algorithms and data files
    auto stop = std::chrono::high_resolution_clock::now();
    std::chrono::duration<float> duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Quick sort (10):\n";
    start = std::chrono::high_resolution_clock::now();
    quick_sort(arr_10, 0, 9);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Merge sort (10):\n";
    start = std::chrono::high_resolution_clock::now();
    merge_sort(arr_10, 0, 9);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

//    // 20 element data sets
    std::cout << "--------------------\n";
    std::cout << "Selection sort (20):\n";
    start = std::chrono::high_resolution_clock::now();
    selection_sort(arr_20, 20);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Quick sort (20):\n";
    start = std::chrono::high_resolution_clock::now();
    quick_sort(arr_20, 0, 19);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Merge sort (20):\n";
    start = std::chrono::high_resolution_clock::now();
    merge_sort(arr_20, 0, 19);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    // 30 element data sets
    std::cout << "--------------------\n";
    std::cout << "Selection sort (30):\n";
    start = std::chrono::high_resolution_clock::now();
    selection_sort(arr_30, 30);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Quick sort (30):\n";
    start = std::chrono::high_resolution_clock::now();
    quick_sort(arr_30, 0, 29);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Merge sort (30):\n";
    start = std::chrono::high_resolution_clock::now();
    merge_sort(arr_30, 0, 29);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    // 50 element data sets
    std::cout << "--------------------\n";
    std::cout << "Selection sort (50):\n";
    start = std::chrono::high_resolution_clock::now();
    selection_sort(arr_50, 50);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Quick sort (50):\n";
    start = std::chrono::high_resolution_clock::now();
    quick_sort(arr_50, 0, 49);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Merge sort (50):\n";
    start = std::chrono::high_resolution_clock::now();
    merge_sort(arr_50, 0, 49);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    // 75 element data sets
    std::cout << "--------------------\n";
    std::cout << "Selection sort (75):\n";
    start = std::chrono::high_resolution_clock::now();
    selection_sort(arr_75, 75);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Quick sort (75):\n";
    start = std::chrono::high_resolution_clock::now();
    quick_sort(arr_75, 0, 74);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Merge sort (75):\n";
    start = std::chrono::high_resolution_clock::now();
    merge_sort(arr_75, 0, 74);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    // 100 element data sets
    std::cout << "--------------------\n";
    std::cout << "Selection sort (100):\n";
    start = std::chrono::high_resolution_clock::now();
    selection_sort(arr_100, 100);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Quick sort (100):\n";
    start = std::chrono::high_resolution_clock::now();
    quick_sort(arr_100, 0, 99);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Merge sort (100):\n";
    start = std::chrono::high_resolution_clock::now();
    merge_sort(arr_100, 0, 99);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    // 200 element data sets
    std::cout << "--------------------\n";
    std::cout << "Selection sort (200):\n";
    start = std::chrono::high_resolution_clock::now();
    selection_sort(arr_200, 200);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Quick sort (200):\n";
    start = std::chrono::high_resolution_clock::now();
    quick_sort(arr_200, 0, 199);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Merge sort (200):\n";
    start = std::chrono::high_resolution_clock::now();
    merge_sort(arr_200, 0, 199);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    // 300 element data sets
    std::cout << "--------------------\n";
    std::cout << "Selection sort (300):\n";
    start = std::chrono::high_resolution_clock::now();
    selection_sort(arr_300, 300);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Quick sort (300):\n";
    start = std::chrono::high_resolution_clock::now();
    quick_sort(arr_300, 0, 299);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Merge sort (300):\n";
    start = std::chrono::high_resolution_clock::now();
    merge_sort(arr_300, 0, 299);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    // 400 element data sets
    std::cout << "--------------------\n";
    std::cout << "Selection sort (400):\n";
    start = std::chrono::high_resolution_clock::now();
    selection_sort(arr_400, 400);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Quick sort (400):\n";
    start = std::chrono::high_resolution_clock::now();
    quick_sort(arr_400, 0, 399);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Merge sort (400):\n";
    start = std::chrono::high_resolution_clock::now();
    merge_sort(arr_400, 0, 399);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    // 500 element data sets
    std::cout << "--------------------\n";
    std::cout << "Selection sort 500:\n";
    start = std::chrono::high_resolution_clock::now();
    selection_sort(arr_500, 500);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Quick sort (500):\n";
    start = std::chrono::high_resolution_clock::now();
    quick_sort(arr_500, 0, 499);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;

    std::cout << "Merge sort (500):\n";
    start = std::chrono::high_resolution_clock::now();
    merge_sort(arr_500, 0, 499);
    stop = std::chrono::high_resolution_clock::now();
    duration = stop - start;
    std::cout << duration.count() * 1000.0f << "ms" << space;
    return 0;
}