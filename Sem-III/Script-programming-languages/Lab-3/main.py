#!/usr/bin/python3

# Exc 2
def getAverageFromInput():
    print('Exc 2 - Fill list with user input')
    userInputList = [] # Creating the list
    numberSum = 0 # Store sum of odd numbers from user input
    numberCount = 0 # Amount of odd numbers entered

    # Filling list with user input
    for i in range(10):
        addListElement = input('Enter el. ' + str(i) + ' : ')
        userInputList.append(int(addListElement))

    print('')

    # Sorting the list
    userInputList.sort()
    print('Smallest element entered: ' + str(userInputList[0])) # Smallest number
    userInputList.reverse()
    print('Largest number entered: ' + str(userInputList[0]) + '\n') # Largest number

    # For each non-negative real number
    for i in range(len(userInputList)):
        if (userInputList[i] >= 0):
            numberSum =+ i # Add up values of all the elements
            numberCount += 1 # Increment count by one

    average = numberSum / numberCount # Get element average
    print('Average : ' + str(average) + '\n')

# Exc 3
def displayUniqueNumbers():
    print('Exc 3 - Display numbers unique to the first list')

    list = [1,2,3,4,5,6,7,8,9,10]
    list2 = [1,4,4,6,543,-31,0,10,-65,-2]
    displayList = []

    for i in range(10):
        if (i in list and i not in list2):
            displayList.append(i)

    print('Unique list elements: ' + str(displayList) + '\n')

# Exc 4
def displayOddNumbers():
    print('Exc 4 - Display odd numbers')

    list = [1,2,3,4,5,6,7,8,9,10]
    catchElement = []

    # Catch odd numbers and store them in another list
    for i in list:
        if (i % 2 != 0):
            catchElement.append(i)

    print('Found elements: ' + str(catchElement))
    catchElement.sort()
    print('Smallest element: ' + str(catchElement[0]) + '\n')

# Main func
def main():
    getAverageFromInput() # Exc 2 - Fill list with user input, get average of non-negative numbers 
    displayUniqueNumbers() # Exc 3 - Display elements present in list1 and not present in list2
    displayOddNumbers() # Exc 4 - Display only odd numbers, print smallest number

if __name__ == '__main__':
    main()
