#include <iostream>

void hello_world() {

    std::cout << "Hello world!\n";
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

int least_common_multiple(int first_number, int second_number) {

    int lcm;

    lcm = (first_number * second_number) / greatest_common_divisor(first_number, second_number);
    return lcm;
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

int power_of_number(int base, int exponent) {

    int i;
    int power = 0;
    // std::cout << "Enter power base: ";
    // std::cout << "Enter power exponent: ";

    for(i=0; i<exponent; i++) {
        power += base * base;
    }
    return power;
}

int main() {

    // Exc 1 - Hello world
    hello_world();

    // Exc 2 - LCM & GCD
    std::cout << "LCM: " << least_common_multiple(120, 3);
    std::cout << '\n';

    std::cout << "GCM: " << greatest_common_divisor(270, 192);
    std::cout << "\n";

    // // Exc 3 - Factorials
    std::cout << "Factorial by iteration: " << factorial_iteration(4) << "\n";
    std::cout << "Factorial by recursion: " << factorial_recursion(7) << "\n";

    // Exc 4 - Power of a
    std::cout << "Power equals to: " << power_of_number(5, 5) << "\n";

    return 0;
}