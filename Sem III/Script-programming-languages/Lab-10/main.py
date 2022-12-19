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

def main():
    alterLineChart() # Exc 1 - Alter example line chart
    alterPieChart() # Exc 2 - Add info to example pie chart

if __name__ == '__main__':
    main()