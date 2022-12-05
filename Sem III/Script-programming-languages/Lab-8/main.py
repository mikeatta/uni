#!/usr/bin/env python

# Imports

import re

# Exc 1 - Test regex quantifier functionality
def test_regex_uantifiers():
    print("Exc 1 - Testing quantifiers\n")

    example_text = "aaabbb123aacc"

    print(re.findall("a+", example_text))
    print(re.findall("a+?", example_text))
    print(re.findall("a*", example_text))
    print(re.findall("a*?", example_text))
    print(re.findall("a?", example_text))
    print(str(re.findall("a??", example_text)) + "\n")

def main():
    test_regex_uantifiers() # Exc 1

if __name__ == "__main__":
    main()