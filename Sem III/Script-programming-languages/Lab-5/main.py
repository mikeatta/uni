#!/usr/bin/env python

# Exc 1
def displayConvertedNumbers(numberToConver):
    # Display result from 2nd char onward to hide base id
    print("\nBinary : " + bin(numberToConver)[2:])
    print("Octal : " + oct(numberToConver)[2:])
    print("Decimal : " + str(int(numberToConver)))
    print("Hexadecimal : " + hex(numberToConver)[2:] + "\n")

def convertNumber():
    print("Exc 1 - Convert numbers")
    numberBase = input("Enter the number base [bin/oct/dec/hex]: ")

    # Accepted input range arrays
    binary = ["0", "1"]

    # Match selected system base
    match numberBase:

        case "bin":
            num = int(input("Enter a binary number: "), 2)
            # Validate input
            for i in (str(num)):
                if i not in binary: print("Input out of range"); break

        case "oct":
            num = int(input("Enter an octal number: "), 8)

        case "dec":
            num = int(input("Enter a decimal number: "), 10)

        case "hex":
            num = int(input("Enter a hexadecimal number: "), 16)

        case _:
            print("\nIncorrect input\n\nExiting...")

    # Convert and display numbers
    displayConvertedNumbers(num)

def main():
    convertNumber() # Exc 1 - Convert number from selected base

if __name__ == "__main__":
    main()