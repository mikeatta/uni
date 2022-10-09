#include <iostream>
#include <vector>
#include <string>

int main()
{
    std::vector<std::string> myVector; // Creating the vector

    int store_menu_choice, lookup_vector_element;
    std::string store_user_input, lookup_vector_value;
    bool display_menu = true;

    // User menu
    std::cout << "What do you want to do?\n";
    std::cout <<
        "[ 1] Add element\n"
        "[ 2] Remove element\n"
        "[ 3] Pull nth element\n"
        "[ 4] Check for element\n"
        "[ 5] Pull front and back elements\n"
        "[ 6] Display structure size\n"
        "[ 7] Check if empty\n"
        "[ 8] Display menu\n"
        "[ 9] Exit\n\n";

    while(display_menu)
    {
        std::cout << "Select: ";
        std::cin >> store_menu_choice;

        switch (store_menu_choice)
        {
            case 1: // Add element
                std::cout << "Placing element: ";
                std::cin >> store_user_input;
                myVector.push_back(store_user_input);
                break;

            case 2: // Remove back element
                std::cout << "Taking an element off...\n";
                myVector.pop_back();
                break;

            case 3: // Get nth element
                std::cout << "Which element to pull?\nElement: ";
                std::cin >> lookup_vector_element;
                if(lookup_vector_element <= 0 || lookup_vector_element > myVector.size())
                {
                    std::cout << "Element out of range\n";
                    break;
                }
                else
                {
                    std::cout << "Element at index " << lookup_vector_element << ": " << myVector[lookup_vector_element - 1] << "\n";
                    break;
                }

            case 4: // Check if element exists within the vector
                bool element_found;
                element_found = false;
                std::cout << "Which element to check for?\nElement :";
                std::cin >> lookup_vector_value;
                for(int i=0; i<myVector.size(); i++) if(myVector[i] == lookup_vector_value) element_found = true;
                if(element_found == true) std::cout << "Element present\n";
                else std::cout << "No element present\n";
                break;

            case 5: // Display front and back elements
                std::cout << "Front element: " << myVector.front() << "\n";
                std::cout << "Back element: " << myVector.back() << "\n";
                break;

            case 6: // Display size
                std::cout << "Vector size is: " << myVector.size() << "\n";
                break;

            case 7: // Check if the vector is empty
                std::cout << "Checking if vector is empty...\n";
                if (myVector.empty()) std::cout << "Vector is empty\n";
                else std::cout << "Vector is NOT empty\n";
                break;

            case 8: // Display menu
                std::cout << "What do you want to do?\n";
                std::cout <<
                    "[ 1] Add element\n"
                    "[ 2] Remove element\n"
                    "[ 3] Check for element\n"
                    "[ 4] Pull nth element\n"
                    "[ 5] Pull front and back elements\n"
                    "[ 6] Display structure size\n"
                    "[ 7] Check if empty\n"
                    "[ 8] Display menu\n"
                    "[ 9] Exit\n\n";
                break;

            case 9: // Exit
                std::cout << "Exiting...\n";
                display_menu = false;
                break;

            default:
                std::cout << "Incorrect input\n";
                break;
        }
    }
    return 0;
}