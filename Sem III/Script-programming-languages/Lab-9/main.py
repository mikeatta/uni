#!/usr/bin/env python

# Imports

import numpy as np

# Exc 1 - Replace zeros in matrix
# Define starting matrix
mat = np.array([[0,2,3],[4,0,6],[7,8,0,]])

def replace_zeros(matrix, x):
    matrix[matrix == 0] = x
    print(matrix)

def main():
    replace_zeros(mat, 77) # Exc 1 - Replace zeroes in matrix with given number

if __name__ == "__main__":
    main()