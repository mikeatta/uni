#include <iostream>
#include <queue>
#include <string>

int main()
{
    std::queue <std::string> myQueue; // Creating the queue

    myQueue.push("person1");
    myQueue.push("person2");
    myQueue.push("person3"); // Adding elements to the queue

    std::cout << "First person in the queue is: " << myQueue.front() << "\n";
    std::cout << "Last person in the queue is: " << myQueue.back() << "\n";

    myQueue.front() = "person3";
    myQueue.back() = "person2";

    std::cout << "New first person in the queue is: " << myQueue.front() << "\n";
    std::cout << "New last person in the queue is: " << myQueue.back() << "\n";

    std::cout << "Queue size: " << myQueue.size() << "\n"; // Displaying queue length

    myQueue.pop();
    myQueue.pop();
    std::cout << "New queue size: " << myQueue.size() << "\n";

    myQueue.pop();
    if(myQueue.empty()) std::cout << "Queue is empty\n";
    return 0;
}