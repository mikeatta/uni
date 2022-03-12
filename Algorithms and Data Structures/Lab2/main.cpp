#include <iostream>

void hello_world() {
    std::cout << "Hello world!\n";
}

int nww(int first_number, int second_number) {
    int nww = first_number * second_number;
    return nww;
}

int nwd(int first_number, int second_number);

int factorial_iteration(int number) {
    int factorial = 1;
    for(int i=number; i>0; i--) {
        factorial = factorial * i;
    }
    return factorial;
}

int factorial_recursion(int number) {
    if(number <= 1) return 1;
    else return number * factorial_recursion(number - 1);
}

int main() {
    int number;

    // Exc 1 - Hello world
    hello_world();

    // Exc 3 - Factorial
    std::cout << "Enter the number: ";
    std::cin >> number;

    std::cout << "Factorial by iteration: " << factorial_iteration(number) << "\n";
    std::cout << "Factorial by recursion: " << factorial_recursion(number) << "\n";

    return 0;
}