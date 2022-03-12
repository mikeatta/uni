#include <iostream>

void hello_world() {
    std::cout << "Hello world!\n";
}

int nww(int first_number, int second_number) {
    int nww = first_number * second_number;
    return nww;
}

int greatest_common_divisor(int first_number, int second_number) {
    int gcd, division_remainder;

    if(first_number == 0) {
        return second_number;
    }
    else if (second_number == 0) {
        return first_number;
    }
    else {
        gcd =  (first_number / second_number);
        division_remainder = (first_number % second_number);
    }
    return greatest_common_divisor(second_number, division_remainder);
}

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

    // Exc 2 - & GCD
    std::cout << greatest_common_divisor(270, 192);
    std::cout << "\n";


    // // Exc 3 - Factorial
    std::cout << "Enter the number: ";
    std::cin >> number;

    std::cout << "Factorial by iteration: " << factorial_iteration(number) << "\n";
    std::cout << "Factorial by recursion: " << factorial_recursion(number) << "\n";

    return 0;
}