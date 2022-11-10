#!/usr/bin/env python

# Imports
import sys
import random
from os import system, name

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

# Exc 2
def returnBitIndex(number, index):
    # Validate input range
    if number > 255:
        sys.exit("Number out of range")

    else:
        bitIndex = (number >> index) & 1
        print("Bit at index [" + str(index) + "] : " + str(bitIndex))

# Exc 4
def clearScreen():
    if name == "nt":
        # Clear screen for Windows
        _ = system("cls")

    else:
        # Clear screen for Mac & Linux
        _ = system("clear")

def convertInput(userSelection):
    # Get and convert user input
    if userSelection == "h" or "H": userSelection = True
    elif userSelection == "t" or "T": userSelection = False
    return userSelection

def coinFlip():
    # Control variables
    endGame = False
    userChoice = ""
    flipResult = ""

    # Counter variables
    coinFlips = 0
    wins = 0

    print("Heads or Tails? [h/t]\nEnter 'q' to exit")
    while endGame != True:

        # Perform coin flip
        flipResult = bool(random.getrandbits(1))

        # Compate input with flip result
        userChoice = input("\nChoice: ")
        match userChoice:
            case "h": 
                userChoice = convertInput(userChoice)
                if userChoice == flipResult: wins += 1; coinFlips += 1
                elif userChoice != flipResult: coinFlips += 1

            case "H":
                userChoice = convertInput(userChoice)
                if userChoice == flipResult: wins += 1; coinFlips += 1
                elif userChoice != flipResult: coinFlips += 1

            case "t":
                userChoice = convertInput(userChoice)
                if userChoice == flipResult: wins += 1; coinFlips += 1
                elif userChoice != flipResult: coinFlips += 1

            case "T":
                userChoice = convertInput(userChoice)
                if userChoice == flipResult: wins += 1; coinFlips += 1
                elif userChoice != flipResult: coinFlips += 1

            case "q":
                clearScreen()
                print("Bye!")
                endGame = True

            case "Q":
                clearScreen()
                print("Bye!")
                endGame = True
                sys.exit(0)

            case _:
                sys.exit("\nIncorrect input\nExiting...")

        if endGame != True:
            # Display game statistics
            clearScreen()
            print("----------")
            print("Flips : " + str(coinFlips) + "\nWins : " + str(wins))

def main():
    convertNumber() # Exc 1 - Convert number from selected base
    returnBitIndex(255, 7) # Exc 2 - Return bit from specified index
    coinFlip() # Exc 4 - Coin flip game

if __name__ == "__main__":
    main()