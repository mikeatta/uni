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
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */

/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */
#define MAX_FRAME_LEN 50
#define MIN_FRAME_LEN 13 // Frame length of a valid frame with an empty body
#define UART3_TX_BUF_LEN 50
#define UART3_RX_BUF_LEN 50
/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/

UART_HandleTypeDef huart3;

/* USER CODE BEGIN PV */
uint8_t UART3_Tx_Buf[UART3_TX_BUF_LEN];   // TX buffer for UART3
uint8_t UART3_Rx_Buf[UART3_RX_BUF_LEN];   // RX buffer for UART3

volatile uint16_t UART3_Tx_Empty = 0;     // TX buffer complete index
volatile uint16_t UART3_Tx_Busy = 0;      // TX buffer in progress index
volatile uint16_t UART3_Rx_Empty = 0;     // RX buffer complete index
volatile uint16_t UART3_Rx_Busy = 0;      // RX buffer in progress index

const uint8_t DEVICE_ADDRESS[4] = "STM";
/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
static void MPU_Config(void);
static void MX_GPIO_Init(void);
static void MX_USART3_UART_Init(void);
/* USER CODE BEGIN PFP */

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
/**
 * Computes the MODBUS CRC-16 value for a given frame data.
 *
 * This function calculates a 16-bit CRC checksum for the frame data part
 * using the MODBUS CRC-16 algorithm with the polynomial 0xA001.
 *
 * @param frame_data A pointer to the data to compute the CRC on.
 * @param data_length The length of the data over which to compute the CRC.
 * @returns A 16-bit CRC value computed over the input data.
 */
uint16_t compute_CRC(uint8_t *frame_data, uint16_t data_length)
{
	uint16_t crc = 0xffff;
	uint16_t byte_index = 0;

	while (byte_index != data_length)
	{
		crc ^= *frame_data;
		for (uint8_t i = 0; i < 8; i++) // For each bit of the byte
		{
			if (crc & 0x0001)
			{
				crc >>= 1;
				crc ^= 0xA001;
			}
			else
			{
				crc >>= 1;
			}
		}
		frame_data++; // Move to next byte
		byte_index++;
	}

	return crc;
}

/**
 * Receives and validates a communication frame from the UART buffer.
 *
 * This function processes the incoming UART data, checks for valid frame format,
 * applies escape character sequences, verifies if the frame is meant for this
 * device based on the address, and validates the CRC checksum. If the frame is
 * valid, it extracts the sender's address and the data payload into the provided
 * arrays. Invalid frames are skipped.
 *
 * @param sender_address A pointer to a buffer for storing the sender's address from the frame.
 * @param data A pointer to a buffer for storing the extracted data payload from the frame.
 * @returns 1 if the frame is valid and processed successfully, 0 otherwise.
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
			if (tmp[index] == '\\')
			{
				tmp[index++] = '\\';
			}
			else if (tmp[index] == '{')
			{
				tmp[index++] = '[';
			}
			else if (tmp[index] == '}')
			{
				tmp[index++] = ']';
			}
			else
			{
				// Incorrect character in the escape sequence -- reset the frame
				index = 0;
			}
			// Turn off special character encoding
			escape = 0;
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
+void send_frame(uint8_t *recipient_address, uint8_t *data, uint16_t crc_value)
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
  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  MX_USART3_UART_Init();
  /* USER CODE BEGIN 2 */
  HAL_UART_Receive_IT(&huart3, &UART3_Rx_Buf[UART3_Rx_Empty], 1);
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
	  receive_frame(sender_address, data);
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
  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSI;
  RCC_OscInitStruct.HSIState = RCC_HSI_ON;
  RCC_OscInitStruct.HSICalibrationValue = RCC_HSICALIBRATION_DEFAULT;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_NONE;
  if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
  {
    Error_Handler();
  }

  /** Initializes the CPU, AHB and APB buses clocks
  */
  RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK|RCC_CLOCKTYPE_SYSCLK
                              |RCC_CLOCKTYPE_PCLK1|RCC_CLOCKTYPE_PCLK2;
  RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_HSI;
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV1;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV1;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_0) != HAL_OK)
  {
    Error_Handler();
  }
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
  __HAL_RCC_GPIOD_CLK_ENABLE();
  __HAL_RCC_GPIOB_CLK_ENABLE();

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(LED_BLUE_GPIO_Port, LED_BLUE_Pin, GPIO_PIN_RESET);

  /*Configure GPIO pin : LED_BLUE_Pin */
  GPIO_InitStruct.Pin = LED_BLUE_Pin;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(LED_BLUE_GPIO_Port, &GPIO_InitStruct);

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
