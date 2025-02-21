#!/usr/bin/env python

# Exc 1
def lineDetails():
    print("Exc 1 - Display line details")
    f = open("./inwokacja.txt", "r") # Read from the file

    lineContent = ""
    fileContent = ""
    rows = 0
    charsPerRow = 0
    wordsPerRow = 0
    totalCharAmount = 0
    totalWordAmount = 0

    printEveryLine = input("Print details for every line? [y/n]: ")

    for line in f:
        lineContent = line
        fileContent += line

        charsPerRow=0;wordsPerRow=0 # Reset counters in current row
        rows += 1
        charsPerRow = len(line) - 1
        wordsPerRow = len(line.split())
        
        if printEveryLine == "y" or printEveryLine == "Y":
            print(lineContent)
            print("Row: " + str(rows) + "\nChar in row: " + str(charsPerRow) + "\nWords in row: " + str(wordsPerRow) + "\n")

        totalCharAmount += charsPerRow
        totalWordAmount += wordsPerRow

    print("Rows: " + str(rows) + "\nTotal chars: " + str(totalCharAmount) + "\nTotal word count: " + str(totalWordAmount) + "\n")
    print("Processed text:\n" + fileContent.strip() + "!") # Display text and remove whitespaces from both sides
    f.close() # Close the file after operations

# Exc 2
def countSpecialCharacters():
    print("\nExc 2 - Count spaces, tabs and newline characters")
    f = open("./inwokacja.txt", "r")

    spaceAmount = 0
    tabAmount = 0
    newlineAmount = 0

    for line in f:
        spaceAmount += line.count(" ")
        tabAmount += line.count("\t")
        newlineAmount += line.count("\n")

    print("Found [" + str(spaceAmount) + " spaces], [" + str(tabAmount) + " tab signs] and [" + str(newlineAmount) + " newlines]")
    f.close()

# Exc 3
def replaceSymbols():
    print("\nExc 3 - Replace matching symbols")
    f = open("./inwokacja.txt", "r")

    keyword = input("Enter characters to look for: ")
    replacement = input(f"Now enter characters to replace the [{keyword}] with: ")
    fileContent = ""

    for line in f:
        if line.count(keyword) == 1:
            fileContent += line.replace(keyword, replacement)
        else:
            fileContent += line

    print("\nReplced the symbols.\n\nProcessed file content:\n" + fileContent)
    f.close()

def main():
    lineDetails() # Exc 1 - Remove whitespaces and count lines and characters
    countSpecialCharacters() # Exc 2 - Count specific special character occurences
    replaceSymbols() # Exc 3 - Replace matching symbols in text

if __name__ == "__main__":
    main()