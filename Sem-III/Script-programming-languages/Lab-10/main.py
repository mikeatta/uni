#!/usr/bin/env python

# Imports

import matplotlib.pyplot as plt
import numpy as np

# Exc 1 - Add information the example line chart
def alterLineChart():
    # Define x and y's
    x = np.linspace(-np.pi, np.pi, 100)
    y1 = np.sin(x)
    y2 = 2 * np.cos(x)

    # Add line chart info
    plt.title("sin(x) & 2cos(x)")
    plt.xlabel("X axis")
    plt.ylabel("Y axis")

    # Plot x and y's
    plt.plot(x,y1)
    plt.plot(x,y2)

    # Add legend and display the chart
    plt.legend(["sin(x)", "2cos(x)"], loc="lower right")
    plt.show()

# Exc 2 - Add info to pie chart
def alterPieChart():
    # Add 'birds' to the label list
    labels = ["Frogs", "Cats", "Dogs", "Birds"]
    sizes = [25, 30, 45, 60]
    explode = (0, 0, 0, 0.1)
    fig, ax = plt.subplots()

    # Create pie chart
    ax.pie(
        sizes,
        explode=explode,
        labels=labels,
        autopct="%1.1f%%",
        shadow=False,
        startangle=90
    )

    # Display the chart
    plt.show()

# Exc 3 - Add info to bar chart
def alterBarChart():
    fig, ax = plt.subplots()

    # Define bar chart content lists
    fruits = ["apple", "blueberry", "cherry", "orange", "watermelon"]
    counts = ["40", "100", "30", "55", "20"]
    bar_labels = ["red", "blue", "red", "orange", "pink"]
    bar_colors = ["red", "blue", "red", "orange", "pink"]

    # Place elements on the bar chart
    ax.bar(fruits, counts, label=bar_labels, color=bar_colors)
    ax.set_xlabel("Fruit")
    ax.set_ylabel("Amount")
    ax.set_title("Fruit chart")
    ax.legend(title="Legend")

    # Display the chart
    plt.show()

# Exc 5 - Generate, count and display numbers in a chart
def generate_random_number_chart():
    # Generate random number list using numpy
    random_list = np.random.randint(10, size=100)

    print(f"{random_list}\n")

    # Create a dictionary for storing number occurrences
    number_occurrence_dict = {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0
    }

    # Assign number occurrences to dictionary indexes
    for occurrence in range(10):
        number_occurrence_dict[str(occurrence)] = np.count_nonzero(random_list == occurrence)

    # Define bar content
    number_labels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    number_values = []
    for occurrence in range(10):
        number_values.append(number_occurrence_dict[str(occurrence)])
        print(f"[{occurrence}]: {number_occurrence_dict[str(occurrence)]}")
    bar_colors = ["lightblue", "blue"]

    # Define frame size
    plt.figure(figsize=(10,5))

    # Create bar chart
    ax1 =  plt.subplot(1,2,1)
    ax1.bar(number_labels, number_values, color=bar_colors)
    ax1.set_ylabel("Number occurrences")
    ax1.set_title("Number")

    # Create histogram
    ax2 = plt.subplot(1,2,2)
    ax2.hist(random_list, range=(0,9), edgecolor="steelblue")
    ax2.set_ylabel("Number occurrences")
    ax2.set_title("Number")
    ax2.set_xlim(0,9)

    # Display result
    plt.show()

def main():
    # alterLineChart() # Exc 1 - Alter example line chart
    # alterPieChart() # Exc 2 - Add info to example pie chart
    # alterBarChart() # Exc 3 - Add info to example bar chart
    generate_random_number_chart() # Exc 5 - Create random number chart

if __name__ == '__main__':
    main()