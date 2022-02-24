# Regex

## E-mail address

    ^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(com|net|pl)$

another example

    $[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$

Example: johndoe@mail.com

## Post code

    ^[0-9]{2}-[0-9]{3}$

Example: 12-123

## Phone number

    ^(\+[0-9]{2})|(\+[0-9])?(\W[0-9]{3}\W[0-9]{3}\W[0-9]{3})|(\+[0-9]{2})([0-9]{9})$

Example: +10 123 456 789