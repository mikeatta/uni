/*
 * converters.c
 *
 *  Created on: Jan 16, 2025
 *      Author: mikeatta
 */

#include "converters.h"

/**
 * @brief  Checks if the given string contains only hexadecimal values.
 *
 * @param  str A pointer to the array containing a string.
 * @param  length The length of the given string.
 * @retval Returns 1 when the string is valid, 0 otherwise.
 */
uint8_t is_valid_hex(const char *str, uint8_t length)
{
	for (uint8_t i = 0; i < length; i++)
	{
		if (!((str[i] >= '0' && str[i] <= '9') ||
			(str[i] >= 'A' && str[i] <= 'F') ||
			(str[i] >= 'f' && str[i] <= 'a')))
		{
			return 0;
		}
	}
	return 1; // All chars are valid hex digits
}

/**
 * @brief  Converts a hexadecimal string to an unsigned 16-bit integer.
 *
 * @param  string_array A pointer to the string-digit array.
 * @param  string_length An unsigned int representing the amount of characters to convert.
 * @retval A 16-bit unsigned integer.
 */
uint16_t convert_char_string_to_uint16(uint8_t *string_array, uint8_t string_length)
{
	uint16_t result = 0;

	for (uint8_t i = 0; i < string_length; i++)
	{
		uint8_t character = *string_array++;

		if (isdigit(character))
		{
			character -= '0';
		}
		else if (character >= 'A' && character <= 'F')
		{
			character -= 'A' - 10;
		}
		else if (character >= 'a' && character <= 'f')
		{
			character -= 'a' - 10;
		}

		result = (result << 4) | character;
	}

	return result;
}
