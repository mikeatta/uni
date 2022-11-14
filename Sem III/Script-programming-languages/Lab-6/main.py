#!/usr/bin/env python

# Exc 1
def exceptions():
    print("Exc 1 - Throwing exceptions")
    inputString = "2,5"

    try:
        theNumber = 3/0
        # theNumber = float(inputString)
        # print(f"The number is {theNumber}")
    except (ValueError, UnicodeError) as ex1:
        print("Cannot execute action [Value / Unicode error]\n")
        print(ex1)
    except NameError:
        print("Name is not known [NameError]\n")
    except:
        print("Unknown error orrured\n")

def main():
    exceptions() # Exc 1 - Woking with exceptions

if __name__ == "__main__":
    main()