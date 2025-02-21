#include <iostream>
#include <string>

std::string caesar_cipher(std::string to_cipher, int shift_amount)
{
    std::string ciphered_string;
    for(char c : to_cipher)
    {
        int val = c - 'a'; // Identifying next character index
        val = (val + shift_amount) % 26; // Getting right shift amount, wrapping around after Z index
        char shifted_char = 'a' + val; // Setting new index
        ciphered_string += shifted_char; // Placing char into string
    }
    return ciphered_string;
}

std::string decipher_caesar(std::string to_decipher, int shift_amount)
{
    std::string deciphered_string;
    for(char c : to_decipher)
    {
        int val = c - 'z';
        val = (val - shift_amount) % 26;
        char shifted_char = 'z' + val;
        deciphered_string += shifted_char;
    }
    return deciphered_string;
}

int main()
{
    // Cipher
    std::string cipher = caesar_cipher("zzz", 3);
    std::cout << cipher << std::endl;

    // Decipher
    std::string decipher = decipher_caesar(cipher, 3);
    std::cout << decipher << std::endl;
    return 0;
}