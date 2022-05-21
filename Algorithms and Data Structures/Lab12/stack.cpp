#include <iostream>
#include <stack>
#include <string>

int main()
{

    std::stack<std::string> myStack; // Creating the stack

    int store_menu_choice;
    std::string store_user_input;
    bool display_menu = true;

    while(display_menu)
    {
        std::cout << "What do you want to do?\n";
        std::cout << "[ 1] Add element\n[ 2] Remove element\n[ 3] Check if empty\n[ 4] Display amount of elements\n[ 5] Exit\n";
        std::cin >> store_menu_choice;

        switch (store_menu_choice) {
            case 1:
                std::cout << "Place element: ";
                std::cin >> store_user_input;
                myStack.push(store_user_input);
                break;

            case 2:
                std::cout << "Take element off\n";
                myStack.pop();
                break;

            case 3:
                std::cout << "Checking if stack is empty...\n";
                if (myStack.empty()) std::cout << "Stack is empty\n";
                else std::cout << "Stack is NOT empty\n";

            case 4:
                std::cout << "There are [" << myStack.size() << "] elements in the stack\n";
                break;

            case 5:
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