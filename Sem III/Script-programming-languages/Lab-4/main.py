#!/usr/bin/python3

# Defining a class
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

def main():
    workingWithClasses() # Modyfying class example code

# Exc 1 - Adding new functions to code example
def workingWithClasses():
    s = student()
    s.giveName('mic', 'sik')
    s.giveId(118854)
    for i in range(5):
        student.giveMark(s, i)

    s.sayHello() # Print name, lastName and id
    print("Average : " + str(s.getAverage())) # Get average of all marks

if __name__ == '__main__':
    main()
