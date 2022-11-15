#!/usr/bin/env python

# Exc 1
def exceptions():
    print("Exc 1 - Throwing exceptions")
    inputString = "2,5"

    try:
        theNumber = 3/0 # Unknown error
        # theNumber = float(inputString) # Value / Unicode error
        # print(f"The number is {theNumber}") # Name error
    except (ValueError, UnicodeError) as ex1:
        print("Cannot execute action [Value / Unicode error]")
        print(ex1)
    except NameError:
        print("Name is not known [NameError]")
    except:
        print("Unknown error orrured")
    
    print("")

# Exc 2
def exceptionsRaisePass():
    print("Exc 2 - Testing raise & pass")

    try:
        x = -1 # Assign negative number
        assert x > 0 # Test if true
        pass
        print("Variable x is greater than zero.")
    except AssertionError:
        print("Negative numbers not accepted")

    print("")

# Exc 3
def exceptElseFinally():
    print("Exc 3")
    x = 3
    y = 0

    try: x / y
    except ZeroDivisionError: print("Error. [Zero division error]")
    else:
        try:
            y / x
            print(x / y)
        except ValueError: print("Error [Value error]")
    finally:
        y = 1
        print("Result : " + str(x / y))
        print("No errors found")

    print("")

def main():
    exceptions() # Exc 1 - Woking with exceptions
    exceptionsRaisePass() # Exc 2 - Working with raise and pass
    exceptElseFinally() # Exc 3 - Working with else and finally

if __name__ == "__main__":
    main()