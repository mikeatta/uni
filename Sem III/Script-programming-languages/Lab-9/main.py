#!/usr/bin/env python

# Imports

import numpy as np

# Exc 1 - Replace zeros in matrix
# Define starting matrix
mat = np.array([[0,2,3],[4,0,6],[7,8,0]])

def replace_zeros(matrix, x):
    print("Exc 1 - Replace zeroes in matrix")
    matrix[matrix == 0] = x
    print(str(matrix) + "\n")

# Exc 2 - Medianize matrix
def medianize_matrix(matrix):
    print("Exc 2 - Medianize matrix")
    mat_mean = matrix.mean()

    # Raise starting matrix to the power of 2
    mat_power = matrix ** 2
    print(str(mat_power) + "\n")
    print("Mean: " + str(mat_mean) + "\n")
    
    # Subtract mean from every element
    matrix = mat_power - mat_mean
    print(str(matrix) + "\n")

# Exc 4 - Test reshape function
def test_reshape_function(matrix_first_param, matrix_second_param, x):
    print("Exc 4 - Test reshape function")
    matrix_first_param = matrix_first_param.reshape(x, 3)
    print(str(matrix_first_param) + "\n")

    matrix_second_param = matrix_second_param.reshape(9, x)
    print(str(matrix_second_param) + "\n")

# Exc 8 - Sum matrix & count occurances
def sum_and_count_matrix():
    print("Exc 8 - Sum elements and count occurances")

    matrix = np.random.randint(10, size=(10,10))
    print(str(matrix) + "\n")

    print("Sum: " + str(matrix.sum()))

    print("Occurances: ")
    for occurance in range(10):
        print(f"[{str(occurance)}] : {str(np.count_nonzero(matrix == occurance))}")
        
def main():
    replace_zeros(mat, 77) # Exc 1 - Replace zeroes in matrix with given number
    medianize_matrix(mat) # Exc 2 - Medianize matrix
    test_reshape_function(mat, mat, -1) # Exc 4 - Test reshape functionality
    sum_and_count_matrix() # Exc 8 - Sum elements and count occurances

if __name__ == "__main__":
    main()