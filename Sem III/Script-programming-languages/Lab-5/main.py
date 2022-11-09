#!/usr/bin/env python

# Imports
import sys

# Exc 1
# Accepted input range arrays
binary = ["0", "1"]
octal = ["0", "1", "2", "3", "4", "5", "6", "7"]
decimal = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
hexadecimal = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]

def validateInput(base, input):
    match base: # Match rangeArray with input
        case "bin": rangeArray = binary
        case "oct": rangeArray = octal
        case "dec": rangeArray = decimal
        case "hex": rangeArray = hexadecimal

    for i in str(input): # For each character
        if i not in rangeArray: # Validate input
            sys.exit("Input out of range")
        else: return input

def displayConvertedNumbers(numberToConver):
    # Display result from 2nd char onward to hide base id
    print("\nBinary : " + bin(numberToConver)[2:])
    print("Octal : " + oct(numberToConver)[2:])
    print("Decimal : " + str(int(numberToConver)))
    print("Hexadecimal : " + hex(numberToConver)[2:] + "\n")

def convertNumber():
    print("Exc 1 - Convert numbers")
    numberBase = input("Enter the number base [bin/oct/dec/hex]: ")

    # Match selected system base
    match numberBase:

        case "bin":
            num = input("Enter a binary number: ")
            num = int(validateInput(numberBase, num), base=2)

        case "oct":
            num = input("Enter an octal number: ")
            num = int(validateInput(numberBase, num), base=8)

        case "dec":
            num = input("Enter a decimal number: ")
            num = int(validateInput(numberBase, num), base=10)

        case "hex":
            num = input("Enter a hexadecimal number: ")
            num = int(validateInput(numberBase, num), base=16)

        case _:
            print("\nIncorrect input\n\nExiting...")

    # Convert and display numbers
    displayConvertedNumbers(num)

def main():
    convertNumber() # Exc 1 - Convert number from selected base

if __name__ == "__main__":
    main()