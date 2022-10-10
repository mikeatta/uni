#!/usr/bin/python3

# Imports
import sys # For Exc 2
import datetime as dt # For Exc 3
from math import pi # For Exc 4

# Variable declarations
# Exc 1
HW = 'Hello world!' # Prints 'Hello world!'
# Exc 5
a = 10
A = 10

# --- Program Code ---
# Exc 1
def main():
    print('Exc 1:')
    print(HW + '\n')

    displayPythonVersion() # Exc 2 - Prints Py Version
    displayDateAndTime() # Exc 3 - Prints Date and time
    calculateCircAndField() # Exc 4 - Calculate based on user input
    testVariableOutput() # Exc 5 - Test global and local variable output
    reverseUserInput() # Exc 6 - Reverse user name

    return

# Exc 2
def displayPythonVersion():
    print('Exc 2:')
    print(sys.version + '\n')

# Exc 3
def displayDateAndTime():
    print('Exc 3:')
    now = dt.datetime.now()
    print('Current date & time:')
    print(now.strftime('I\n %Y-%m-%d %H:%M:%S')) # YY-MM-DD H:M:S
    print(now.strftime('II\n %X %x')) # Locale accurate format
    print(now.strftime('III\n %A, %B %-d %I:%M %Y\n')) # Day, month day
    return

# Exc 4
def calculateCircAndField():
    print('Exc 4:')
    r = input('Enter circle radius: ')

    O = (float(2) * pi * float(r))
    A = (pi * (float(r) * float(r)))

    print('Circle circumference: ' + str(O))
    print('Circle field: ' + str(A) + '\n')
    return

# Exc 5
def testVariableOutput():
    print('Exc 5:')
    a = 20

    print(a)
    print(type(a))

    print(A)
    print(type(A))

    print('')
    return

# Exc 6
def reverseUserInput():
    print('Exc 6:')
    firstName = input('Enter first name: ')
    lastName = input('Enter last name: ')
    print(lastName + ' ' + firstName + '\n')
    return

if __name__ == '__main__':
    main()