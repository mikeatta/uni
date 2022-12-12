#!/usr/bin/env python

# Imports

import numpy as np

# Exc 1 - Replace zeros in matrix
# Define starting matrix
mat = np.array([[0,2,3],[4,0,6],[7,8,0,]])

def replace_zeros(matrix, x):
    print("Exc 1 - Replace zeroes in matrix")
    matrix[matrix == 0] = x
    print(str(matrix) + "\n")

# Exc 4 - Test reshape function
def test_reshape_function(matrix_first_param, matrix_second_param, x):
    print("Exc 4 - Test reshape function")
    matrix_first_param = matrix_first_param.reshape(x, 3)
    print(str(matrix_first_param) + "\n")

    matrix_second_param = matrix_second_param.reshape(3, x)
    print(str(matrix_second_param) + "\n")

def main():
    # replace_zeros(mat, 77) # Exc 1 - Replace zeroes in matrix with given number
    test_reshape_function(mat, mat, -1) # Exc 4 - Test reshape functionality

if __name__ == "__main__":
    main()