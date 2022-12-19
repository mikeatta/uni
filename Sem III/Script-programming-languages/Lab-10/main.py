#!/usr/bin/env python

# Imports

import matplotlib.pyplot as plt
import numpy as np

# Exc 1 - Alter diagram
def alterDiagram():
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

def main():
    alterDiagram() # Exc 1 - Alter example diagram

if __name__ == '__main__':
    main()