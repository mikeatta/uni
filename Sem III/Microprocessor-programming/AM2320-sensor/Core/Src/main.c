/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : Main program body
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2024 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */
/* USER CODE END Header */
/* Includes ------------------------------------------------------------------*/
#include "main.h"

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
#include <stdio.h>

#include "string.h"
#include "math.h"
#include "am2320_it.h"
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */
AM2320_HandleTypeDef am2320;

typedef struct {
	float temperature;
	float humidity;
} AM2320_Data;
/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */
#define MAX_FRAME_LEN 513
#define MIN_FRAME_LEN 13 // Frame length of a valid frame with an empty body
#define UART3_TX_BUF_LEN 2052
#define UART3_RX_BUF_LEN 2052
/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/

I2C_HandleTypeDef hi2c1;

TIM_HandleTypeDef htim6;

UART_HandleTypeDef huart3;

/* USER CODE BEGIN PV */
uint8_t UART3_Tx_Buf[UART3_TX_BUF_LEN];   // TX buffer for UART3
uint8_t UART3_Rx_Buf[UART3_RX_BUF_LEN];   // RX buffer for UART3

volatile uint16_t UART3_Tx_Empty = 0;     // TX buffer complete index
volatile uint16_t UART3_Tx_Busy = 0;      // TX buffer in progress index
volatile uint16_t UART3_Rx_Empty = 0;     // RX buffer complete index
volatile uint16_t UART3_Rx_Busy = 0;      // RX buffer in progress index

const uint8_t DEVICE_ADDRESS[4] = "STM";

AM2320_State am2320_state = AM2320_STATE_IDLE;
HAL_StatusTypeDef ret;
uint32_t tick_delay = 0;
uint8_t data_ready = 0;

volatile uint8_t delay_elapsed = 1;
volatile uint8_t sensor_active = 0;
volatile uint8_t sensor_read_data = 0;
volatile uint16_t sensor_read_interval = 2000;

AM2320_Data AM2320_Data_Buf[300];
volatile uint16_t AM2320_Buf_Idx = 0;
/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
static void MPU_Config(void);
static void MX_GPIO_Init(void);
static void MX_USART3_UART_Init(void);
static void MX_I2C1_Init(void);
static void MX_TIM6_Init(void);
/* USER CODE BEGIN PFP */

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
/**
 * @brief  Receives and validates a communication frame from the UART buffer.
 *
 * This function processes the incoming UART data, checks for valid frame format,
 * applies escape character sequences, verifies if the frame is meant for this
 * device based on the address, and validates the CRC checksum. If the frame is
 * valid, it extracts the sender's address and the data payload into the provided
 * arrays. Invalid frames are skipped.
 *
 * @param  sender_address Pointer to a buffer for storing the sender's address from the frame.
 * @param  data Pointer to a buffer for storing the extracted data payload from the frame.
 * @retval 1 if the frame is valid and processed successfully, 0 otherwise
 */
uint8_t receive_frame(uint8_t *sender_address, uint8_t *data)
{
	static uint8_t tmp[MAX_FRAME_LEN];
	static uint16_t index = 0;
	static uint8_t escape = 0; // Marker for the special '\' escape character sequence

	// When there's data to collect from the reception buffer
	while (UART3_Rx_Empty != UART3_Rx_Busy)
	{
		// Store new data in temporary buffer
		tmp[index] = UART3_Rx_Buf[UART3_Rx_Busy];
		if (++UART3_Rx_Busy >= UART3_RX_BUF_LEN)
		{
			UART3_Rx_Busy = 0;
		}

		// Collect & decode received frame
		if (tmp[index] == '[')
		{
			tmp[0] = '[';
			index = 1;
			escape = 0;
			continue;
		}

		// If received character was not the frame starting character ('[')
		if (!index)
		{
			continue;
		}

		// If the current character is the escape character, encode the following characters
		if (escape)
		{
			if (tmp[index] == '\\' && index < MAX_FRAME_LEN)
			{
				tmp[index++] = '\\';
			}
			else if (tmp[index] == '{' && index < MAX_FRAME_LEN)
			{
				tmp[index++] = '[';
			}
			else if (tmp[index] == '}' && index < MAX_FRAME_LEN)
			{
				tmp[index++] = ']';
			}
			else
			{
				index = 0; // Incorrect character in the escape sequence -- reset the frame
			}
			escape = 0; // Turn off special character encoding
		}
		// If character at index is the escape character
		else if (tmp[index] == '\\')
		{
			escape = 1;
		}
		// Frame ending character found, move to data checks & collection
		else if (tmp[index] == ']')
		{
			uint16_t frame_length = index + 1; // Add frame end to the length
			index = 0;

			// Run checks before frame data collection
			// Skip frame, if the length is too short
			if (frame_length < MIN_FRAME_LEN)
			{
				continue;
			}

			// Skip frame if the recipient is NOT this device ('STM')
			if (tmp[4] != DEVICE_ADDRESS[0] || tmp[5] != DEVICE_ADDRESS[1] || tmp[6] != DEVICE_ADDRESS[2])
			{
				continue;
			}

			// Skip the frame on invalid CRC value
			uint8_t *crc_value_ptr = &tmp[frame_length - 6]; // CRC value length (5) + frame end character (1)

			// Compute the CRC value based on received frame's data
			uint8_t *data_value_ptr = &tmp[7];
			uint16_t data_part_length = frame_length - 13;
			uint16_t computed_crc = compute_CRC(data_value_ptr, data_part_length);

			// Convert computed CRC to char array for value comparison
			uint8_t crc_string[6];
			sprintf((char *)crc_string, "%05d", computed_crc);

			for (uint8_t i = 0; i < 5; i++)
			{
				if (*crc_value_ptr < '0' || *crc_value_ptr > '9')
				{
					continue; // Skip the frame if CRC character is not a number
				}
				else if (*crc_value_ptr != crc_string[i])
				{
					continue; // Skip the frame if the CRC doesn't match
				}
				crc_value_ptr++;
			}

			// Copy the frame's data part to the data array
			for (uint16_t i = 0; i < data_part_length; i++)
			{
				data[i] = *data_value_ptr; // Assign value at the memory address to the data array
				data_value_ptr++; // Move to the next memory address
			}
			data[data_part_length] = '\0'; // Null-terminate the char array at the last index of the data

			// Copy the frame's sender address
			for (uint8_t i = 0; i < 4; i++)
			{
				*sender_address = tmp[i + 1];
				sender_address++;
			}
			return 1;
		}
		else if (++index >= MAX_FRAME_LEN)
		{
			index = 0;
		}
	}
	return 0;
}

/**
 * @brief  Sends a formatted communication frame over UART from the STM32 device.
 *
 * This function creates a communication frame that includes the sender address,
 * recipient address, data payload, and CRC value, encapsulated within start ('[')
 * and end (']') characters. It also appends the carriage return and newline characters
 * at the end of the frame for line termination. The frame is then transferred to the
 * UART TX buffer, and the UART transmission is initiated using interrupt communication.
 *
 * @param  recipient_address Pointer to the buffer containing the recipient address.
 * @param  data Pointer to the buffer containing the data payload to be sent.
 * @param  crc_value The 16-bit CRC value.
 * @retval None
 */
void send_frame(uint8_t *recipient_address, uint8_t *data, uint16_t crc_value)
{
	uint16_t frame_length = strlen((char *)data) + MIN_FRAME_LEN; // Data length + other frame characters (13)
	uint8_t frame[frame_length + 3]; // Add (3) indexes for the special characters at the end of the frame
	uint16_t index = 0;

	// Cast the uint16_t CRC value to a uint8_t array
	uint8_t crc_string[6];
	sprintf((char *)crc_string, "%05d", crc_value);

	// Define pointers for easier data assignment in arrays
	const uint8_t *device_address_ptr = DEVICE_ADDRESS;
	uint8_t *crc_string_ptr = crc_string;

	// Create the communication frame
	frame[index++] = '['; // Add frame start character
	while (index < frame_length - 1) // Subtract (1) to omit copying the '\0' from the CRC string
	{
		if (index < 4) // Fill the sender address (STM)
		{
			frame[index++] = *device_address_ptr;
			device_address_ptr++;
		}
		else if (index < 7) // Fill the recipient address
		{
			frame[index++] = *recipient_address;
			recipient_address++;
		}
		else if (index < (frame_length - 6)) // Fill the data part
		{
			frame[index++] = *data;
			data++;
		}
		else // Fill the CRC value
		{
			frame[index++] = *crc_string_ptr;
			crc_string_ptr++;
		}
	}
	frame[index++] = ']'; // Add frame end character
	frame[index++] = '\r'; // Add the carriage return character
	frame[index++] = '\n'; // Add the newline character
	frame[index++] = '\0'; // Null-terminate the frame

	// Push the frame to the UART TX buffer
	volatile uint16_t copy_index = UART3_Tx_Empty;
	for (uint16_t i = 0; i < index; i++)
	{
		UART3_Tx_Buf[copy_index] = frame[i];
		if (++copy_index >= UART3_TX_BUF_LEN)
		{
			copy_index= 0;
		}
	}
	__disable_irq();

	// Transmit the frame from the TX buffer
	if (UART3_Tx_Empty == UART3_Tx_Busy && __HAL_UART_GET_FLAG(&huart3, UART_FLAG_TXE == SET))
	{
		UART3_Tx_Empty = copy_index;
		uint8_t tmp = UART3_Tx_Buf[UART3_Tx_Busy];
		if (++UART3_Tx_Busy >= UART3_TX_BUF_LEN)
		{
			UART3_Tx_Busy = 0;
		}
		HAL_UART_Transmit_IT(&huart3, &tmp, 1);
	}
	else
	{
		UART3_Tx_Empty = copy_index;
	}
	__enable_irq();
}

/**
 * @brief  Prepares and sends the formatted sensor reads.
 *
 * The function formats the read temperature and humidity values, constructs
 * and sends the frame with the formatted AM2320 sensor read values to the original
 * frame sender.
 *
 * @param  recipient A pointer to the original frame sender.
 * @param  temperature A float storing the temperature read value.
 * @param  humidity A float storing the humidity read value.
 * @retval None
 */
void AM2320_SendSensorDataFrame(uint8_t *recipient, uint16_t *read_idx, float temperature, float humidity)
{
	// Descriptions for the sensor data
	uint8_t tmp_temp_desc[7] = "TEMP: ";
	uint8_t tmp_hum_desc[6] = "HUM: ";

	// Sensor output buffers for the 'X.XX' format
	uint8_t tmp_char_temp[5];
	uint8_t tmp_char_hum[5];

	// Manually convert the float values to integers
	int16_t int_temp = (int16_t)floor(temperature);
	int16_t frac_temp = (int16_t)((temperature - int_temp) * 10);

	int16_t int_hum = (int16_t)floor(humidity);
	int16_t frac_hum = (int16_t)((humidity - int_hum) * 10);

	// Check if 'snprintf()' returned encoding errors or had written an invalid amount of characters
	uint8_t char_array_length = 5;
	uint8_t ret;

	ret = snprintf((char *)tmp_char_temp, char_array_length, "%d.%d", int_temp, frac_temp);
	if (ret < 0 || ret >= char_array_length) return;

	ret = snprintf((char *)tmp_char_hum, char_array_length, "%d.%d", int_hum, frac_hum);
	if (ret < 0 || ret >= char_array_length) return;

	uint8_t sensor_read_output[30]; // Total size of tmp arrays - x4 skipped '\0's + final '\0' at the end of the array
	uint8_t index = 0;

	// TODO: Validate passed indexes -- 000 would return false, but is a valid index
	// FIX: Processing stops at 'TEMP: 0.0' for empty data buffers
	// If requested, prepare the 'IDX' output string
	if (read_idx != NULL)
	{
		uint8_t tmp_idx_desc[6] = "IDX: ";
		uint8_t tmp_char_idx[4];
		uint8_t idx_array_length = 4;

		ret = snprintf((char *)tmp_char_idx, idx_array_length, "%03d", *read_idx);
		if (ret < 0 || ret >= idx_array_length) return;

		// Construct the final output array by concatenating the string arrays
		memcpy(&sensor_read_output[index], tmp_idx_desc, sizeof(tmp_idx_desc) - 1); // Skip the null terminator
		index += sizeof(tmp_idx_desc) - 1;

		memcpy(&sensor_read_output[index], tmp_char_idx, sizeof(tmp_char_idx) - 1); // Skip the null terminator
		index += sizeof(tmp_char_idx) - 1;

		sensor_read_output[index++] = ' '; // Add a space separator
	}

	// Construct the final output array by concatenating the string arrays
	memcpy(&sensor_read_output[index], tmp_temp_desc, sizeof(tmp_temp_desc) - 1); // Skip the null terminator
	index += sizeof(tmp_temp_desc) - 1;

	memcpy(&sensor_read_output[index], tmp_char_temp, sizeof(tmp_char_temp) - 1); // Skip the null terminator
	index += sizeof(tmp_char_temp) - 1;

	sensor_read_output[index++] = ' '; // Add a space separator

	memcpy(&sensor_read_output[index], tmp_hum_desc, sizeof(tmp_hum_desc) - 1); // Skip the null terminator
	index += sizeof(tmp_hum_desc) - 1;

	memcpy(&sensor_read_output[index], tmp_char_hum, sizeof(tmp_char_hum)); // Copy the null terminator
	index += sizeof(tmp_char_hum);

	uint16_t crc_value = compute_CRC(sensor_read_output, index);
	send_frame(recipient, sensor_read_output, crc_value);
}

/**
 * @brief  Converts the string representation of a digit into an unsigned 16-bit integer.
 *
 * @param  string_array A pointer to the string-digit array.
 * @param  string_length An unsigned int representing the amount of characters to convert.
 * @retval A 16-bit unsigned integer.
 */
uint16_t convert_char_string_to_uint16(uint8_t *string_array, uint8_t string_length)
{
	uint16_t decimal_multiplier = 1 * pow(10, (string_length - 1));
	uint16_t result = 0;

	while (decimal_multiplier != 0)
	{
		result += (*string_array++ - '0') * decimal_multiplier;
		decimal_multiplier /= 10;
	}

	return result;
}

/**
 * @brief  Reads and executes the command sent in the data part of the frame.
 *
 * This function searches for available command substrings within the passed data array.
 * If a command is found it is immediately executed within the loop. After command execution,
 * the function continues to look for the next command until it reaches the end of data array.
 *
 * @param  recipient_address A pointer to the array containing the frame sender's address.
 * @param  frame_data A pointer to the array containing the commands.
 * @param  data_length Amount of characters to read from the data array.
 * @retval None
 */
void process_command(uint8_t *recipient_address, uint8_t *frame_data, uint16_t data_length)
{
	// Define available commands in char array format for string value comparison
	const char *available_commands[] = { "START", "STOP", "READ", "INTV" };
	uint8_t command_count = sizeof(available_commands) / sizeof(available_commands[0]);

	uint8_t tmp_command[data_length]; // Temporary array for processing commands in FIFO order
	uint16_t tmp_command_idx = 0;

	const char *index = (const char *)&tmp_command; // Checkpoint index for command processing

	// Exit early without processing data
	if (data_length < 5)
	{
		return; // Shortest valid command needs at least 5 characters
	}
	else if (!strstr((const char *)frame_data, (const char *)";"))
	{
		return; // No command end character found -- no valid command in data array
	}

	while (tmp_command_idx <= data_length)
	{
		// Compare every available command with the current content of tmp_command array
		for (uint8_t i = 0; i < command_count; i++)
		{
			// Look for a matching command string from the previous index, onwards
			const char *match = strstr(index, available_commands[i]);
			const char *char_after_command_string = match + strlen((const char *)available_commands[i]);
			if (match && *char_after_command_string == ';')
			{
				// Save the index of the last found command -- prevents from 'finding' the same command twice
				index = match + strlen((const char *)available_commands[i]) + 1; // Shift the index past the ';' char
				if (strncmp(available_commands[i], "START", strlen("START")) == 0)
				{
					HAL_GPIO_WritePin(LED_RED_GPIO_Port, LED_RED_Pin, 0); // Debug: Turn OFF RED LED
					sensor_active = 1;
					uint16_t crc_value = compute_CRC((uint8_t *)"SENSOR: STARTED", strlen("SENSOR: STARTED"));
					send_frame(recipient_address, (uint8_t *)"SENSOR: STARTED", crc_value);
				}
				else if (strncmp(available_commands[i], "STOP", strlen("STOP")) == 0)
				{
					HAL_GPIO_WritePin(LED_RED_GPIO_Port, LED_RED_Pin, 1); // Debug: Turn ON RED LED
					sensor_active = 0;
					uint16_t crc_value = compute_CRC((uint8_t *)"SENSOR: STOPPED", strlen("SENSOR: STOPPED"));
					send_frame(recipient_address, (uint8_t *)"SENSOR: STOPPED", crc_value);
				}
				else if (strncmp(available_commands[i], "READ", strlen("READ")) == 0)
				{
					HAL_GPIO_TogglePin(LED_GREEN_GPIO_Port, LED_GREEN_Pin); // Debug: Toggle GREEN LED
					sensor_read_data = !sensor_read_data; // Toggle displaying the data
				}
				else if (strncmp(available_commands[i], "INTV", strlen("INTV")) == 0)
				{
					uint8_t interval_ret_message[16] = "INTERVAL: ";
					uint8_t tmp_interval_value_array[6];
					sprintf((char *)tmp_interval_value_array, "%05d", sensor_read_interval);

					// Concatenate the arrays to form the message
					size_t interval_array_size = sizeof(interval_ret_message) + sizeof(interval_ret_message[0]);
					size_t concat_char_limit = interval_array_size - strlen((const char *)tmp_interval_value_array) - 1;
					strncat((char *)interval_ret_message, (const char *)tmp_interval_value_array, concat_char_limit);

					// Send return message
					uint16_t crc_value = compute_CRC(interval_ret_message, interval_array_size);
					send_frame(recipient_address, interval_ret_message, crc_value);
				}
			}
			else if (match && *char_after_command_string == '|')
			{
				if (strncmp(available_commands[i], "READ", strlen("READ")) == 0 && *(char_after_command_string + 4) == ';')
				{
					uint8_t tmp_read_param[4];
					for (uint8_t i = 0; i <= 3; i++)
					{
						if ((*(char_after_command_string + 1 - i) > '9') || (*(char_after_command_string + 1 - i) < '0'))
						{
							index = char_after_command_string + 6; // Shift the index to move the next command
							tmp_command_idx += 6;
							frame_data += 6;
							break;
						}
						tmp_read_param[i] = *(char_after_command_string++ + 1);
						if (i == 3)
						{
							tmp_read_param[i] = '\0'; // Null-terminate the array
						}
					}

					// Get data from AM2320 buffer
					uint16_t buffer_index = convert_char_string_to_uint16(tmp_read_param, strlen((const char *)tmp_read_param));
					AM2320_Data archived_data = AM2320_Data_Buf[buffer_index];

					AM2320_SendSensorDataFrame(recipient_address, &buffer_index, archived_data.temperature, archived_data.humidity);
				}
				else if (strncmp(available_commands[i], "READ", strlen("READ")) == 0 && *(char_after_command_string + 4) == '-' && *(char_after_command_string + 8) == ';')
				{
					uint8_t tmp_read_param_start[4];
					uint8_t tmp_read_param_stop[4];
					for (uint8_t i = 0; i <= 3; i++)
					{
						if ((*(char_after_command_string + 1 - i) > '9') || (*(char_after_command_string + 1 - i) < '0'))
						{
							index = char_after_command_string + 6; // Shift the index to move the next command
							tmp_command_idx += 6;
							frame_data += 6;
							break;
						}
						else if ((*(char_after_command_string + 5 - i) > '9') || (*(char_after_command_string + 5 - i) < '0'))
						{
							index = char_after_command_string + 6; // Shift the index to move the next command
							tmp_command_idx += 6;
							frame_data += 6;
							break;
						}
						tmp_read_param_start[i] = *(char_after_command_string + 1);
						tmp_read_param_stop[i] = *(char_after_command_string + 5);
						char_after_command_string++;
						if (i == 3)
						{
							// Null-terminate the arrays
							tmp_read_param_start[i] = '\0';
							tmp_read_param_stop[i] = '\0';
						}
					}

					// Get data from AM2320 buffer
					uint16_t buffer_start_index = convert_char_string_to_uint16(tmp_read_param_start, strlen((const char*)tmp_read_param_start));
					uint16_t buffer_stop_index = convert_char_string_to_uint16(tmp_read_param_stop, strlen((const char*)tmp_read_param_stop));

					// Validate the index start and stop values
					if (buffer_start_index > buffer_stop_index)
					{
						index = char_after_command_string + 6; // Shift the index to move the next command
						tmp_command_idx += 6;
						frame_data += 6;
						uint16_t crc_value = compute_CRC((uint8_t *)"IDX_ERROR", strlen((const char *)"IDX_ERROR"));
						send_frame(recipient_address, (uint8_t *)"IDX_ERROR", crc_value);
						continue;
					}

					AM2320_Data archived_data;
					while (buffer_start_index <= buffer_stop_index)
					{
						archived_data = AM2320_Data_Buf[buffer_start_index];
						AM2320_SendSensorDataFrame(recipient_address, &buffer_start_index, archived_data.temperature, archived_data.humidity);
						buffer_start_index++;
					}
				}
				else if (strncmp(available_commands[i], "INTV", strlen("INTV")) == 0 && *(char_after_command_string + 6) == ';')
				{
					uint8_t tmp_intv_param[6];
					for (uint8_t i = 0; i <= 5; i++)
					{
						// TODO: Validate the function shifts indexes properly
						// If any character in parameters' part is not a digit
						if ((*(char_after_command_string + 1 - i) > '9') || (*(char_after_command_string + 1 - i) < '0'))
						{
							index = char_after_command_string + 6; // Shift the index to move the next command
							tmp_command_idx += 6;
							frame_data += 6;
							break;
						}
						tmp_intv_param[i] = *(char_after_command_string++ + 1);
						if (i == 5)
						{
							tmp_intv_param[i] = '\0'; // Null-terminate the array
						}
					}

					// TODO: Validate new interval values (2000- 65535)
					// Assign new interval value
					sensor_read_interval = convert_char_string_to_uint16(tmp_intv_param, strlen((const char *)tmp_intv_param));

					// Prepare the return command message
					uint8_t tmp_interval_array[20] = "NEW INTERVAL: ";
					uint8_t tmp_interval_value_array[6];
					sprintf((char *)tmp_interval_value_array, "%05d", sensor_read_interval);

					// Concatenate the arrays to form the message
					size_t interval_array_size = sizeof(tmp_interval_array) / sizeof(tmp_interval_array[0]);
					size_t concat_char_limit = interval_array_size - strlen((const char *)tmp_interval_value_array) - 1;
					strncat((char *)tmp_interval_array, (const char *)tmp_interval_value_array, concat_char_limit);

					// Send return message
					uint16_t crc_value = compute_CRC(frame_data, interval_array_size);
					send_frame(recipient_address, tmp_interval_array, crc_value);
				}
			}
		}
		tmp_command[tmp_command_idx++] = *(frame_data++); // Copy next character to the temporary array
	}

	// Reset the temporary array -- ensures no data is left over from the last read
	memset(tmp_command, 0, sizeof(tmp_command));
}
/* USER CODE END 0 */

/**
  * @brief  The application entry point.
  * @retval int
  */
int main(void)
{

  /* USER CODE BEGIN 1 */

  /* USER CODE END 1 */

  /* MPU Configuration--------------------------------------------------------*/
  MPU_Config();

  /* MCU Configuration--------------------------------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */
  uint8_t sender_address[4];
  uint8_t data[MAX_FRAME_LEN];

  float temperature = 0.0;
  float humidity = 0.0;

  AM2320_Data read_data;
  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  MX_USART3_UART_Init();
  MX_I2C1_Init();
  MX_TIM6_Init();
  /* USER CODE BEGIN 2 */
  HAL_UART_Receive_IT(&huart3, &UART3_Rx_Buf[UART3_Rx_Empty], 1);
  AM2320_Init(&am2320, &hi2c1, AM2320_ADDRESS);
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
	  uint8_t frame_received = receive_frame(sender_address, data);
	  if (frame_received)
	  {
		  // TODO: Add sensor functions
		  process_command(sender_address, data, strlen((const char *)data));
	  }

	  // Return to the beginning of the loop if the sensor is idle
	  if (sensor_active == 0)
	  {
		  continue;
	  }

	  // AM2320 sensor reads
	  if (delay_elapsed == 1)
	  {
		  AM2320_InitSensorRead(&am2320);

		  AM2320_ReadSensorData(&am2320);

		  if (data_ready == 1)
		  {
			  // Sensor data successfully read, process the data
			  AM2320_ProcessSensorData(&am2320, &temperature, &humidity);

			  // Assign read data to a temporary data storage variable
			  read_data.temperature = temperature;
			  read_data.humidity = humidity;

			  // Place processed data in the AM2320 data buffer
			  AM2320_Data_Buf[AM2320_Buf_Idx] = read_data;

			  if (++AM2320_Buf_Idx >= 300)
			  {
				  AM2320_Buf_Idx = 0;
			  }

			  // Send the sensor data back
			  if (sensor_read_data == 1)
			  {
				  AM2320_SendSensorDataFrame(sender_address, NULL, temperature, humidity);
			  }

			  data_ready = 0;
			  am2320_state = AM2320_STATE_IDLE;

			  if (htim6.State != HAL_TIM_STATE_READY)
			  {
				  HAL_TIM_Base_Stop_IT(&htim6); // Manually stop the timer
			  }
			  TIM_StartDelay(sensor_read_interval); // Start the delay between sensor reads
		  }
	  }
  }
  /* USER CODE END 3 */
}

/**
  * @brief System Clock Configuration
  * @retval None
  */
void SystemClock_Config(void)
{
  RCC_OscInitTypeDef RCC_OscInitStruct = {0};
  RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

  /** Configure the main internal regulator output voltage
  */
  __HAL_RCC_PWR_CLK_ENABLE();
  __HAL_PWR_VOLTAGESCALING_CONFIG(PWR_REGULATOR_VOLTAGE_SCALE1);

  /** Initializes the RCC Oscillators according to the specified parameters
  * in the RCC_OscInitTypeDef structure.
  */
  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSI;
  RCC_OscInitStruct.HSIState = RCC_HSI_ON;
  RCC_OscInitStruct.HSICalibrationValue = RCC_HSICALIBRATION_DEFAULT;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
  RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSI;
  RCC_OscInitStruct.PLL.PLLM = 8;
  RCC_OscInitStruct.PLL.PLLN = 216;
  RCC_OscInitStruct.PLL.PLLP = RCC_PLLP_DIV2;
  RCC_OscInitStruct.PLL.PLLQ = 2;
  RCC_OscInitStruct.PLL.PLLR = 2;
  if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
  {
    Error_Handler();
  }

  /** Activate the Over-Drive mode
  */
  if (HAL_PWREx_EnableOverDrive() != HAL_OK)
  {
    Error_Handler();
  }

  /** Initializes the CPU, AHB and APB buses clocks
  */
  RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK|RCC_CLOCKTYPE_SYSCLK
                              |RCC_CLOCKTYPE_PCLK1|RCC_CLOCKTYPE_PCLK2;
  RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV8;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV2;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_7) != HAL_OK)
  {
    Error_Handler();
  }
}

/**
  * @brief I2C1 Initialization Function
  * @param None
  * @retval None
  */
static void MX_I2C1_Init(void)
{

  /* USER CODE BEGIN I2C1_Init 0 */

  /* USER CODE END I2C1_Init 0 */

  /* USER CODE BEGIN I2C1_Init 1 */

  /* USER CODE END I2C1_Init 1 */
  hi2c1.Instance = I2C1;
  hi2c1.Init.Timing = 0x00606A9B;
  hi2c1.Init.OwnAddress1 = 0;
  hi2c1.Init.AddressingMode = I2C_ADDRESSINGMODE_7BIT;
  hi2c1.Init.DualAddressMode = I2C_DUALADDRESS_DISABLE;
  hi2c1.Init.OwnAddress2 = 0;
  hi2c1.Init.OwnAddress2Masks = I2C_OA2_NOMASK;
  hi2c1.Init.GeneralCallMode = I2C_GENERALCALL_DISABLE;
  hi2c1.Init.NoStretchMode = I2C_NOSTRETCH_DISABLE;
  if (HAL_I2C_Init(&hi2c1) != HAL_OK)
  {
    Error_Handler();
  }

  /** Configure Analogue filter
  */
  if (HAL_I2CEx_ConfigAnalogFilter(&hi2c1, I2C_ANALOGFILTER_ENABLE) != HAL_OK)
  {
    Error_Handler();
  }

  /** Configure Digital filter
  */
  if (HAL_I2CEx_ConfigDigitalFilter(&hi2c1, 0) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN I2C1_Init 2 */

  /* USER CODE END I2C1_Init 2 */

}

/**
  * @brief TIM6 Initialization Function
  * @param None
  * @retval None
  */
static void MX_TIM6_Init(void)
{

  /* USER CODE BEGIN TIM6_Init 0 */

  /* USER CODE END TIM6_Init 0 */

  TIM_MasterConfigTypeDef sMasterConfig = {0};

  /* USER CODE BEGIN TIM6_Init 1 */

  /* USER CODE END TIM6_Init 1 */
  htim6.Instance = TIM6;
  htim6.Init.Prescaler = 54000-1;
  htim6.Init.CounterMode = TIM_COUNTERMODE_UP;
  htim6.Init.Period = 1000-1;
  htim6.Init.AutoReloadPreload = TIM_AUTORELOAD_PRELOAD_ENABLE;
  if (HAL_TIM_Base_Init(&htim6) != HAL_OK)
  {
    Error_Handler();
  }
  sMasterConfig.MasterOutputTrigger = TIM_TRGO_RESET;
  sMasterConfig.MasterSlaveMode = TIM_MASTERSLAVEMODE_DISABLE;
  if (HAL_TIMEx_MasterConfigSynchronization(&htim6, &sMasterConfig) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN TIM6_Init 2 */

  /* USER CODE END TIM6_Init 2 */

}

/**
  * @brief USART3 Initialization Function
  * @param None
  * @retval None
  */
static void MX_USART3_UART_Init(void)
{

  /* USER CODE BEGIN USART3_Init 0 */

  /* USER CODE END USART3_Init 0 */

  /* USER CODE BEGIN USART3_Init 1 */

  /* USER CODE END USART3_Init 1 */
  huart3.Instance = USART3;
  huart3.Init.BaudRate = 115200;
  huart3.Init.WordLength = UART_WORDLENGTH_8B;
  huart3.Init.StopBits = UART_STOPBITS_1;
  huart3.Init.Parity = UART_PARITY_NONE;
  huart3.Init.Mode = UART_MODE_TX_RX;
  huart3.Init.HwFlowCtl = UART_HWCONTROL_NONE;
  huart3.Init.OverSampling = UART_OVERSAMPLING_16;
  huart3.Init.OneBitSampling = UART_ONE_BIT_SAMPLE_DISABLE;
  huart3.AdvancedInit.AdvFeatureInit = UART_ADVFEATURE_NO_INIT;
  if (HAL_UART_Init(&huart3) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN USART3_Init 2 */

  /* USER CODE END USART3_Init 2 */

}

/**
  * @brief GPIO Initialization Function
  * @param None
  * @retval None
  */
static void MX_GPIO_Init(void)
{
  GPIO_InitTypeDef GPIO_InitStruct = {0};
/* USER CODE BEGIN MX_GPIO_Init_1 */
/* USER CODE END MX_GPIO_Init_1 */

  /* GPIO Ports Clock Enable */
  __HAL_RCC_GPIOB_CLK_ENABLE();
  __HAL_RCC_GPIOD_CLK_ENABLE();
  __HAL_RCC_GPIOA_CLK_ENABLE();

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(GPIOB, LED_GREEN_Pin|LED_RED_Pin|LED_BLUE_Pin, GPIO_PIN_RESET);

  /*Configure GPIO pins : LED_GREEN_Pin LED_RED_Pin LED_BLUE_Pin */
  GPIO_InitStruct.Pin = LED_GREEN_Pin|LED_RED_Pin|LED_BLUE_Pin;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(GPIOB, &GPIO_InitStruct);

/* USER CODE BEGIN MX_GPIO_Init_2 */
/* USER CODE END MX_GPIO_Init_2 */
}

/* USER CODE BEGIN 4 */
void HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart)
{
	if (huart == &huart3)
	{
		if (UART3_Tx_Empty != UART3_Tx_Busy)
		{
			uint8_t tmp = UART3_Tx_Buf[UART3_Tx_Busy];
			UART3_Tx_Busy++;
			if (UART3_Tx_Busy >= UART3_TX_BUF_LEN)
			{
				UART3_Tx_Busy = 0;
			}
			HAL_UART_Transmit_IT(&huart3, &tmp, 1);
		}
	}
}

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
	if (huart == &huart3)
	{
		UART3_Rx_Empty++;
		if (UART3_Rx_Empty >= UART3_RX_BUF_LEN)
		{
			UART3_Rx_Empty = 0;
		}
		HAL_UART_Receive_IT(&huart3, &UART3_Rx_Buf[UART3_Rx_Empty], 1);
	}
}

void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
{
	if (htim == &htim6)
	{
		HAL_GPIO_TogglePin(LED_BLUE_GPIO_Port, LED_BLUE_Pin);
		delay_elapsed = 1;
		HAL_TIM_Base_Stop_IT(htim);
	}
}

void HAL_I2C_MasterTxCpltCallback(I2C_HandleTypeDef *hi2c)
{
	if (hi2c == &hi2c1)
	{
		if (am2320_state == AM2320_STATE_SEND_COMMAND)
		{
			am2320_state = AM2320_STATE_READ_DATA;
		}
		else
		{
			am2320_state = AM2320_STATE_IDLE;
		}
	}
}

void HAL_I2C_MasterRxCpltCallback(I2C_HandleTypeDef *hi2c)
{
    if (hi2c == &hi2c1)
    {
    	static uint8_t read_retries = 0;

		if (am2320_state == AM2320_STATE_READ_DATA && (am2320.sensor_data[0] == 0x03 && am2320.sensor_data[1] == 0x04))
		{
			data_ready = 1;
		}
		else if (read_retries < 3)
		{
			read_retries++; // Retry 3 times
			return;
		}
		read_retries = 0;
		am2320_state = AM2320_STATE_IDLE;
	}
}
/* USER CODE END 4 */

 /* MPU Configuration */

void MPU_Config(void)
{
  MPU_Region_InitTypeDef MPU_InitStruct = {0};

  /* Disables the MPU */
  HAL_MPU_Disable();

  /** Initializes and configures the Region and the memory to be protected
  */
  MPU_InitStruct.Enable = MPU_REGION_ENABLE;
  MPU_InitStruct.Number = MPU_REGION_NUMBER0;
  MPU_InitStruct.BaseAddress = 0x0;
  MPU_InitStruct.Size = MPU_REGION_SIZE_4GB;
  MPU_InitStruct.SubRegionDisable = 0x87;
  MPU_InitStruct.TypeExtField = MPU_TEX_LEVEL0;
  MPU_InitStruct.AccessPermission = MPU_REGION_NO_ACCESS;
  MPU_InitStruct.DisableExec = MPU_INSTRUCTION_ACCESS_DISABLE;
  MPU_InitStruct.IsShareable = MPU_ACCESS_SHAREABLE;
  MPU_InitStruct.IsCacheable = MPU_ACCESS_NOT_CACHEABLE;
  MPU_InitStruct.IsBufferable = MPU_ACCESS_NOT_BUFFERABLE;

  HAL_MPU_ConfigRegion(&MPU_InitStruct);
  /* Enables the MPU */
  HAL_MPU_Enable(MPU_PRIVILEGED_DEFAULT);

}

/**
  * @brief  This function is executed in case of error occurrence.
  * @retval None
  */
void Error_Handler(void)
{
  /* USER CODE BEGIN Error_Handler_Debug */
  /* User can add his own implementation to report the HAL error return state */
  __disable_irq();
  while (1)
  {
  }
  /* USER CODE END Error_Handler_Debug */
}

#ifdef  USE_FULL_ASSERT
/**
  * @brief  Reports the name of the source file and the source line number
  *         where the assert_param error has occurred.
  * @param  file: pointer to the source file name
  * @param  line: assert_param error line source number
  * @retval None
  */
void assert_failed(uint8_t *file, uint32_t line)
{
  /* USER CODE BEGIN 6 */
  /* User can add his own implementation to report the file name and line number,
     ex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */
  /* USER CODE END 6 */
}
#endif /* USE_FULL_ASSERT */
