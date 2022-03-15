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

    switch(exponent) {
        case 0:
            return 1;
            break;
        case 1:
            return base;
            break;
        default:
            for(i=0; i<exponent-1; i++) {
                base *= base;
                return base;
            }
    }
}

//     if(exponent==0) {
//         return 1;
//     }
//     else if(exponent==1) {
//         return base;
//     }
//     else
//     power = base * base;
//     // exponent-1 since base has already been raised to the power of 2 above
//     // exponent-2 since loop has to run one time less than value of exponent
//     for(i=0; i<exponent-2; i++) {
//         power *= base;
//     }
//     return power;

int sum_all_below_number(int number) {

    int i;
    int sum = 0;

    for(i=number-1; i>0; i--) {
        sum += i;
    }
    return sum;
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
    int base, exponent;

    std::cout << "Enter the base: ";
    std::cin >> base;
    std:: cout << "Enter the exponent: ";
    std::cin >> exponent;
    std::cout << "Power equals to: " << power_of_number(base, exponent) << "\n";

    // Exc 5 - Sum all numbers below sum_all_below
    int sum_numbers_below;

    std::cout << "Enter your number: ";
    std::cin >> sum_numbers_below;

    std::cout << "Sum of all numbers below " << sum_numbers_below << ": " << sum_all_below_number(sum_numbers_below);

    return 0;
}