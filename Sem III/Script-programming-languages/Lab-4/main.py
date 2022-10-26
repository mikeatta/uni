#!/usr/bin/python3

# Exc 1 - Defining a class
class student:
    def __init__ (self):
        self.name = ""
        self.lastname = ""
        self.marks = []
        self.id = ""
    
    # Passing data
    def giveName(self, name, lastName):
        self.name = name
        self.lastName = lastName

    def giveMark(self, mark):
        self.marks.append(mark)

    def giveId(self, id):
        self.id = id # Assigning an id

    # Retrieving & printing data
    def getMarks(self):
        return self.marks

    def getAverage(self):
        # Function variables
        markSum = 0 # Value of all marks
        markCount = 0 # Count of all marks

        # Print message if list empty
        if (len(self.marks) == 0):
            print("Marks are empty!")

        # Else calculate and return average
        else:
            for i in self.marks:
                markSum += self.marks[i] # Sum up every mark
                markCount += 1 # Increment by one

            average = markSum / markCount
            return average

    def sayHello(self):
        print("Hello, I'm " + self.name + " " + self.lastName + " " + str(self.id))

# Exc 2 Classes
class vehicle:
    def getSound(self):
        print("*Vehicle skrrrr*")

    def getOwner(self, owner):
        self.owner = owner

class car (vehicle):
    def __init__ (self, owner, plate):
        self.owner = owner
        self.plate = plate

        # Setters
        def setOwner(self, owner):
            self.owner = owner

        def setPlate(self, plate):
            self.plate = plate

        # Getters
        def getSound(slef):
            print("Other *skrrrr*")

        def getOwner(self):
            return self.owner

class item:
    def getSound(self):
        print("*Item's sound*")

class element:
    def getSound(self):
        print("*Element's sound*")

class thing(element, item):
    def sayHello(self):
        print("Hello")

# Exc 1 - Adding new functions to code example
def workingWithClasses():
    print("Exc 1 - Working with classes")
    s = student()
    s.giveName('mic', 'sik')
    s.giveId(118854)
    for i in range(5):
        student.giveMark(s, i) # Assign marks 1 through (n) to the student

    s.sayHello() # Print name, lastName and id
    print("Average : " + str(s.getAverage()) + "\n") # Get average of all marks

# Exc 2 - Working with inheritance
def workingWithInheritance():
    print("Exc 2 - Working with inheritance")
    v = vehicle()
    c = car("me", "98P1Az")

    print("From v : " + str(v.getSound()))
    print("From c : " + str(c.getSound()) + "\n")

    v.getOwner("me")
    c.getOwner("me")

def main():
    workingWithClasses() # Exc 1 - Modyfying the class example code
    workingWithInheritance() # Exc 2 - Working with class inheritance

if __name__ == '__main__':
    main()
