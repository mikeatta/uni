#include <iostream>
#include <stack>
#include <string>

int main()
{
    std::stack<std::string> myStack; // Creating the stack

    std::cout << "Placing items on the stack...\n";
    myStack.push("this");
    myStack.push("is");
    myStack.push("a test");
    std::cout << "Top stack element is: " << myStack.top() << "\n"; // Adding elements to the stack

    myStack.top() = "New top element";
    std::cout << "This is the new top element: " << myStack.top() << "\n"; // Replacing stack top element value

    std::cout << "Amount of elements in myStack: " << myStack.size() << "\n"; // Displaying stack size

    myStack.pop();
    myStack.pop();
    std::cout << "Top element after popping 2 elements: ['" << myStack.top() << "']\n"; // Taking elements off the stack
    std::cout << "Amount of elements in myStack: " << myStack.size() << "\n";

    myStack.pop();
    if(myStack.empty()) std::cout << "Stack is empty\n";
    return 0;
}