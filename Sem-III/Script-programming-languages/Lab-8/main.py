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

# Exc 3 - Match parts of an address
def match_address():
    print("Exc 2 - Match parts of an address\n")

    # Open and read from file
    with open("./adresy.txt") as f:
        file_content = f.read()
        print(file_content)
        regex_street = re.findall(r"[a-z]{2}\.[ X]\w+", file_content) # Street name match
        regex_postcode = re.findall(r"[0-9]{2}.[0-9]{3}", file_content) # Postcode match
        regex_number = re.findall(r"(\d{1,2}\/\d{1,2}|\s\d{1,2}\s)", file_content) # House number match

    print(str(regex_street) + "\n" + str(regex_postcode) + "\n" + str(regex_number) + "\n")

def main():
    test_regex_uantifiers() # Exc 1 - Test different regex guantifiers
    match_address() # Exc 3 - Match street name, postcode and house number

if __name__ == "__main__":
    main()