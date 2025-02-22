/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : Main program body
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2022 STMicroelectronics.
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
#include "iwdg.h"
#include "tim.h"
#include "usart.h"
#include "gpio.h"

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
#include "stdio.h"
#include "stdlib.h"
#include "stdarg.h"
#include "math.h"
#include "string.h"
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */

/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */
#define BUFFER_LENGTH 100
/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/

/* USER CODE BEGIN PV */
uint8_t character;

// --- Reception buffer ---
uint8_t rx_buffer[BUFFER_LENGTH];
__IO uint8_t rx_empty = 0;
__IO uint8_t rx_busy = 0;

// --- Transmission buffer ---
uint8_t tx_buffer[BUFFER_LENGTH];
__IO uint8_t tx_empty = 0;
__IO uint8_t tx_busy = 0;

// --- Message buffer ---
char message[BUFFER_LENGTH];
__IO uint8_t message_length = 0;

// --- Frame details ---
__IO uint8_t sw_state = 0;
__IO uint8_t led_action;

// --- Blink function ---
__IO uint8_t blink_setup;
__IO uint8_t blink_delay;
__IO uint8_t delay;
__IO uint16_t blink_ms;

// --- Delay function ---
__IO uint16_t loop_delay = 0;
char temp[4];

// --- Command validation ---
char temp_command[BUFFER_LENGTH];
char single_command[BUFFER_LENGTH];
char *command_separator;
__IO uint8_t error_found;
__IO uint8_t temp_check;
/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
static void MPU_Config(void);
/* USER CODE BEGIN PFP */
// Print character to terminal
void uart_print(unsigned char x)
{
	USART3->TDR =(x);
	while(!((USART3->ISR)&USART_ISR_TC)){;}
}

uint8_t char_is_endmessage(char c)
{
	if (c == '\r' || c == '\n')
	{
		return 1;
	}
	else return 0;
}

// Reception
uint8_t rx_has_data()
{
	if(rx_empty == rx_busy)
	{
		return 0;
	}
	else return 1;
}

void increase_rx_empty()
{
	rx_empty++;
	if(rx_empty >= BUFFER_LENGTH)
	{
		rx_empty = 0;
	}
}

void increase_rx_busy()
{
	rx_busy++;
	if(rx_busy >= BUFFER_LENGTH)
	{
		rx_busy = 0;
	}
}

// Transmission
uint8_t tx_has_data()
{
	if(tx_empty == tx_busy)
	{
		return 0;
	}
	else return 1;
}

void increase_tx_empty()
{
	tx_empty++;
	if(tx_empty >= BUFFER_LENGTH)
	{
		tx_empty = 0;
	}
}

void increase_tx_busy()
{
	tx_busy++;
	if(tx_busy >= BUFFER_LENGTH)
	{
		tx_busy = 0;
	}
}

void timer_delay(uint16_t ms)
{
	// Reset timer counter
	__HAL_TIM_SET_COUNTER(&htim3,0);

	// Wait for set period to pass
	while (__HAL_TIM_GET_COUNTER(&htim3) < ms);
}

// Get single character from the reception buffer
uint8_t get_char()
{
	uint8_t tmp;

	tmp = rx_buffer[rx_busy];
	increase_rx_busy();
	return tmp;
}

// Get message from the reception buffer
uint16_t get_message(char *array)
{
	static uint8_t tmp_arr[BUFFER_LENGTH];
	static uint16_t idx = 0;
	__IO uint16_t message_length = 0;

	// Collect data from the reception buffer
	while(rx_has_data() == 1)
	{
		tmp_arr[idx] = get_char();

		if (char_is_endmessage(tmp_arr[idx]))
		{
			// Set character at endmessage index to null
			tmp_arr[idx] = '\0';

			// Assign collected data to passed array
			for (uint8_t i=0; i<idx; i++)
			{
				array[i] = tmp_arr[i];
			}

			message_length = idx;
			idx = 0;
			return message_length;
		}
		else
		{
			idx++;
			if(idx>BUFFER_LENGTH) return 0;
		}
	}
	return 0;
}

// Send response from STM
void send_response(char *message, ...)
{
	// Store STM return message
	char response[BUFFER_LENGTH];
	uint16_t idx;

	va_list arglist;
	va_start(arglist, message);
	vsprintf(response, message, arglist);
	va_end(arglist);

	// Set index to the first empty space in transmission buffer
	idx = tx_empty;

	// Send response to the transmission buffer
	for (uint16_t i=0; i<strlen(response); i++)
	{
		tx_buffer[idx] = response[i];
		idx++;

		if (idx >= BUFFER_LENGTH)
			idx = 0;
	}
	__disable_irq();

	// Check if there is no more data to transmit
	if (tx_has_data() == 0 && (__HAL_UART_GET_FLAG(&huart3, UART_FLAG_TXE) == SET))
	{
		tx_empty = idx;
		HAL_UART_Transmit_IT(&huart3, &tx_buffer[tx_busy], 1);
		increase_tx_busy();
	}
	else
		tx_empty = idx;

	__enable_irq();

	// Wait after re-enabling interrupts
	timer_delay(5);
}

void turn_on_led()
{
	HAL_GPIO_WritePin(LED_Blue_GPIO_Port, LED_Blue_Pin, GPIO_PIN_SET);
}

void turn_off_led()
{
	HAL_GPIO_WritePin(LED_Blue_GPIO_Port, LED_Blue_Pin, GPIO_PIN_RESET);
}

uint16_t calculate_delay(uint8_t blink_hz)
{
	float delay_f = 1800.0;

	if (blink_hz == 1)
		delay_f = delay_f / blink_hz;
	else
		delay_f = delay_f / (blink_hz * 1.8);

	delay_f = ceil(delay_f);
	uint16_t delay_ms = (uint16_t)delay_f;
	return delay_ms;
}

uint8_t validate_command(char *single_command_message)
{
	uint8_t command_valid = 0;

	// Command template arrays
	char led_on[] = "LED[ON]";
	char led_off[] = "LED[OFF]";
	char led_blink[] = "LED[BLINK,X]";
	char insert_delay[] = "INSERT[DELAY,XXXX]";

	// Compare command with templates
	if (strncmp(single_command_message, led_on, sizeof(led_on)) == 0)
	{
		command_valid = 1;
	}
	else if (strncmp(single_command_message, led_off, sizeof(led_off)) == 0)
	{
		command_valid = 1;
	}
	else if (strncmp(single_command_message, led_blink, sizeof(led_blink)-3) == 0)
	{
		if ((single_command_message[10] >= 0x30 && single_command_message[10] <= 0x39) && single_command[11] == ']')
			command_valid = 1;
	}
	else if (strncmp(single_command_message, insert_delay, sizeof(insert_delay)-6) == 0)
	{
		for (uint8_t y=0; y<4; y++)
			if ((single_command_message[12+y] >= 0x30 && single_command_message[12+y] <= 0x39) && single_command[17] == ']')
				command_valid = 1;
	}

	return command_valid;
}

void clear_array(char *array, uint16_t array_length)
{
	uint16_t idx = 0;
	while (idx < array_length)
	{
		array[idx] = '\0';
		idx++;
	}
	array_length = 0;
}
/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */

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

  /* Enable I-Cache---------------------------------------------------------*/
  SCB_EnableICache();

  /* Enable D-Cache---------------------------------------------------------*/
  SCB_EnableDCache();

  /* MCU Configuration--------------------------------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */

  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  MX_USART3_UART_Init();
  MX_TIM3_Init();
  MX_IWDG_Init();
  /* USER CODE BEGIN 2 */
  HAL_TIM_Base_Start(&htim3);
  HAL_UART_Receive_IT(&huart3, &character, 1);
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  // Parameter variables
  char *open_bracket;
  uint16_t open_idx;

  char *close_bracket;
  uint16_t close_idx;

  __IO uint16_t param_length;
  static uint16_t command_length;

  // LED command parameters
  __IO uint8_t led_action;
  char on_cmd[] = "ON";
  char off_cmd[] = "OFF";
  char blink_cmd[] = "BLINK,";

  // INSERT command parameters
  char delay_cmd[] = "DELAY,";

  // Error messages
  char invalid_command[] = "Error: Command not found\r\n";
  char missing_separator[] = "Error: No command separator found\r\n";

  while (1)
  {
	if (character == '\n' || character == '\r')
	{
		message_length = get_message(message);
	}

	if (message_length > 0)
	{
		for (uint8_t i=0; i<message_length; i++)
		{
			// Check for command separator character
			command_separator = strchr(message, ';');

			// If separator char was not found
			if (command_separator == NULL)
			{
				while (i < message_length)
					i++;
				send_response(missing_separator);
			}

			// Enter the switch statement when first character is found
			if ((sw_state == 0 && message[i] == 'L') || (sw_state == 0 && message[i] == 'I'))
				sw_state = 1;
			else if (sw_state == 0 && (message[i] != ';' && message[i] != '#' && message[i] != ','))
				error_found = 1;

			switch (sw_state)
			{
			case 1:
				// Check for remaining command characters
				if (message[i+1] == 'E' && message[i+2] == 'D')
				{
					i = i+2;
					sw_state = 2;
				}
				else if (message[i+1] == 'N' && message[i+2] == 'S' && message[i+3] == 'E' && message[i+4] == 'R' && message[i+5] == 'T')
				{
					i = i+5;
					sw_state = 2;
				}
				else
				{
					error_found = 1;
					sw_state = 0;
				}
				break;

			case 2:
				// Get opening bracket index
				open_bracket = strchr(message, '[');

				// Reset sw_state if opening bracket was not found
				if (open_bracket == NULL)
				{
					i = i+1;
					error_found = 1;
					sw_state = 0;
				}
				else
				{
					// Get index of the opening bracket
					open_idx = (uint16_t)(open_bracket - message);
					sw_state = 3;
				}
				break;

			case 3:
				// Get closing bracket index
				close_bracket = strchr(message, ']');

				// Reset sw_state if closing bracket was not found
				if (close_bracket == NULL)
				{
					i = i+1;
					error_found = 1;
					sw_state = 0;
				}
				else
				{
					// Get index of closing bracket
					close_idx = (uint16_t)(close_bracket - message);
					sw_state = 4;
				}
				break;

			case 4:
				// Calculate parameter length in chars - basic CRC
				param_length = (close_idx - open_idx) - 1;

				// Place chars between the brackets into temporary command array
				char command[BUFFER_LENGTH];
				command_length = 0;
				uint8_t j = 0;
				for (uint16_t y=open_idx+1; y<close_idx; y++)
				{
					command[j] = message[y];
					temp_command[j] = command[j];
					j++;
					command_length = j;
				}

				if (command_length == param_length)
					sw_state = 5;
				else
					sw_state = 0;
				break;

			case 5:
				// Check for command separator
				if (message[close_idx+1] != ';')
				{
					send_response(missing_separator);
					sw_state = 0;
					break;
				}

				// Print executed command
				char CMD[] = "COMMAND: ";
				char NEWLINE[] = "\r\n";

				send_response(CMD);
				send_response(temp_command);
				send_response(NEWLINE);

				// Clear temp array
				for (uint8_t y=0; y<command_length; y++)
					temp_command[y] = '\0';

				// Compare char arrays and execute the command
				__IO size_t len = param_length;
				if (strncmp(command, on_cmd, len) == 0)
				{
					// Store last command in a separate array
					for (uint8_t y=0; y<7; y++)
						single_command[y] = message[close_idx-6+y];

					// Validate last command
					temp_check = validate_command(single_command);
					if (temp_check == 1)
					{
						i = i+param_length;
						error_found = 0;

						// Turn on LED
						led_action = 1;
					}
					else
					{
						error_found = 1;
						sw_state = 0;
					}
				}
				else if (strncmp(command, off_cmd, len) == 0)
				{
					// Store last command in a separate array
					for (uint8_t y=0; y<8; y++)
						single_command[y] = message[close_idx-7+y];

					// Validate last command
					temp_check = validate_command(single_command);
					if (temp_check == 1)
					{
						i = i+param_length;
						error_found = 0;

						// Turn off LED
						led_action = 0;
					}
					else
					{
						error_found = 1;
						sw_state = 0;
					}
				}
				else if (strncmp(command, blink_cmd, len-1) == 0)
				{
					// Store last command in a separate array
					for (uint8_t y=0; y<12; y++)
						single_command[y] = message[close_idx-11+y];

					// Validate last command
					temp_check = validate_command(single_command);
					if (temp_check == 1)
					{
						i = i+param_length;
						error_found = 0;

						// Enable LED blink
						blink_setup = 1;
						led_action = 2;
					}
					else
					{
						error_found = 1;
						sw_state = 0;
					}
				}
				else if (strncmp(command, delay_cmd, len-4) == 0)
				{
					// Check if delay is a digit
					for (uint8_t y=0; y<4; y++)
						if (message[close_idx-4+y] >= 0x30 && message[close_idx-4+y] <= 0x39)
							// Assign delay to temporary array
							temp[y] = message[close_idx-4+y];
						else
							break;

					// Store last command in a separate array
					for (uint8_t y=0; y<18; y++)
						single_command[y] = message[close_idx-17+y];

					// Validate last command
					temp_check = validate_command(single_command);
					if (temp_check == 1)
					{
						i = i+param_length;
						error_found = 0;

						// Enable the delay
						led_action = 3;
					}
					else
					{
						error_found = 1;
						sw_state = 0;
					}
				}

				// Replace bracket chars at the current opening and closing indexes
				message[open_idx] = '#';
				message[close_idx] = '#';

				// Clear the single_command array
				for (uint8_t y=0; y<BUFFER_LENGTH; y++)
					single_command[y] = '\0';

				// Reset sw_state
				i = i-1;
				sw_state = 0;
				break;
			} /* sw_state switch end */

			// Display error alert
			if (error_found == 1)
			{
				while (message[i] != ';')
					i++;
				if (message[i] == ';')
					send_response(invalid_command);
				error_found = 0;
			}

			// Diode control switch
			switch (led_action)
			{
			case 0:
				// Turn off LED
				turn_off_led();
				break;

			case 1:
				// Turn on LED
				turn_on_led();
				break;

			case 2:
				// Set blink interval
				if (blink_setup == 1)
				{
					delay = message[close_idx-1] - '0';
					if (delay == 0)
						blink_ms = 0;
					else
						 blink_ms = calculate_delay(delay);
					blink_setup = 0;
				}
				break;

			case 3:
				// Set delay interval
				loop_delay = atoi(temp);
				break;
			} /* control switch end */

			// Set the delay
			timer_delay(loop_delay);

			// Refresh watchdog timer
			HAL_IWDG_Refresh(&hiwdg);
		} /* for loop end */

		// Clear the message array processing the commands
		clear_array(message, message_length);
	} /* if statement end */
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
	// Command: LED[BLINK,x]
	if (blink_ms != 0 && (led_action == 2 || led_action == 3))
	{
		// Blink LED with delay
		HAL_GPIO_TogglePin(LED_Blue_GPIO_Port, LED_Blue_Pin);
		timer_delay(blink_ms);
	}
	// Command: LED[ON] / LED[OFF]
	else if (led_action != 2 || led_action != 3)
		// Disable LED blink with other commands
		blink_ms = 0;

	// Set the delay
	timer_delay(loop_delay);

	// Refresh watchdog timer
	HAL_IWDG_Refresh(&hiwdg);
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
  __HAL_PWR_VOLTAGESCALING_CONFIG(PWR_REGULATOR_VOLTAGE_SCALE3);

  /** Initializes the RCC Oscillators according to the specified parameters
  * in the RCC_OscInitTypeDef structure.
  */
  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSI|RCC_OSCILLATORTYPE_LSI
                              |RCC_OSCILLATORTYPE_HSE;
  RCC_OscInitStruct.HSEState = RCC_HSE_ON;
  RCC_OscInitStruct.HSIState = RCC_HSI_ON;
  RCC_OscInitStruct.HSICalibrationValue = RCC_HSICALIBRATION_DEFAULT;
  RCC_OscInitStruct.LSIState = RCC_LSI_ON;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
  RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSE;
  RCC_OscInitStruct.PLL.PLLM = 25;
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
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV2;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV1;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV1;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_1) != HAL_OK)
  {
    Error_Handler();
  }
}

/* USER CODE BEGIN 4 */
// Reception callback
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
	// Send character to terminal
	uart_print(character);

	// Handle USART3 reception callback
	if(huart->Instance == USART3)
	{
		// Store character in reception buffer
		rx_buffer[rx_empty] = character;

		// Increase empty index
		increase_rx_empty();

		// Await next character
		HAL_UART_Receive_IT(&huart3, &character, 1);
	}
}

// Transmission callback
void HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart)
{
	if(huart->Instance == USART3)
	{
		if(tx_has_data() == 1)
		{
			static uint8_t tmp;
			tmp = tx_buffer[tx_busy];

			increase_tx_busy();
			HAL_UART_Transmit_IT(huart, &tmp, 1);
		}
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
