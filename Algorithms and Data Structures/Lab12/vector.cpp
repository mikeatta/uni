#include <iostream>
#include <vector>
#include <string>

int main()
{
    std::vector<std::string> myVector; // Creating a vector

    myVector.push_back("element1");
    myVector.push_back("element2");
    myVector.push_back("element3"); // Adding elements to the vector

    myVector.insert(myVector.begin() + 2, "element2.5"); // Inserting an element
    std::cout << "Displaying vector elements: \n";
    for(int i=0; i<myVector.size(); i++)
        std::cout << myVector[i] << "\n";

    myVector.front() = "element0";
    myVector.back() = "element4";
    std::cout << "Vector size: " << myVector.size() << "\n"; // Replacing elements at the front and back of vector

    std::cout << "New vector elements: \n";
    for(int i=0; i<myVector.size(); i++)
        std::cout << myVector[i] << "\n";

    myVector.pop_back();
    myVector.pop_back();
    myVector.pop_back();
    myVector.pop_back(); // Removing vector elements

    if(myVector.empty()) std::cout << "Vector is empty\n";
    return 0;
}