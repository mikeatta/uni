/*
 * converters.h
 *
 *  Created on: Jan 16, 2025
 *      Author: mike
 */

#ifndef INC_CONVERTERS_H_
#define INC_CONVERTERS_H_

#include "main.h"
#include <ctype.h>
#include <string.h>

uint8_t is_valid_hex(const char *str, uint8_t length);
uint16_t convert_char_string_to_uint16(uint8_t *string_array, uint8_t string_length);

#endif /* INC_CONVERTERS_H_ */
