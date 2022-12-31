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

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */

#include <stdarg.h>
#include <string.h>
#include <stdio.h>

/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */

/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */

// Length == 300 + 10% margin
#define buffer_length 330

/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/

UART_HandleTypeDef huart3;

/* USER CODE BEGIN PV */

// Amount of characters in the frame
__IO uint8_t frame_length;

// Array for received characters
__IO uint8_t frame[buffer_length];

__IO uint8_t frame_idx;

// Transmission buffer
uint8_t buffer_rx[buffer_length];
__IO uint16_t rx_empty;
__IO uint16_t rx_busy;

// Collection buffer
uint8_t buffer_tx[buffer_length];
__IO uint16_t tx_empty;
__IO uint16_t tx_busy;

__IO uint8_t test_char;
/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
static void MX_GPIO_Init(void);
static void MX_USART3_UART_Init(void);
/* USER CODE BEGIN PFP */

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */

/* --- TRANSMISSION --- */

// Check transmission buffer state
uint8_t tx_has_data()
{
	if(tx_empty == tx_busy)
		return 0;
	else
		return 1;
}

void increment_tx_empty()
{
	tx_empty++;

	// Reset tx_empty back to idx 0, if value >= buffer_length
	if(tx_empty >= buffer_length)
		tx_empty = 0;
}

void increment_tx_busy()
{
	tx_busy++;

	// Reset tx_busy back to idx 0, if value >= buffer_length
	if(tx_busy >= buffer_length)
		tx_busy = 0;
}

/* --- COLLECTION --- */

// Check collection buffer state
uint8_t rx_has_data()
{
	if(rx_empty == rx_busy)
		return 0;
	else
		return 1;
}

void increment_rx_empty()
{
	rx_empty++;

	// Reset rx_empty back to idx 0, if value >= buffer_length
	if(rx_empty >= buffer_length)
		rx_empty = 0;
}

void increment_rx_busy()
{
	rx_busy++;

	// Reset rx_busy back to idx 0, if value >= buffer_length
	if(rx_busy >= buffer_length)
		rx_busy = 0;
}

// Check for end-of-line characters
uint8_t is_end_of_line(char c)
{
	// If char is LF or CR
	if(c == 13 || c == 10)
		return 1;
	else
		return 0;
}

// Get single character from collection buffer
uint8_t get_char()
{
	// Temporary char storage
	uint8_t tmp;

	// Check, if buffer has any data to collect
	if(rx_has_data() == 1)
	{
		// Store character in tmp variable, increment busy idx
		tmp = buffer_rx[rx_busy];
		increment_rx_busy();
		return tmp;
	}
	else
	{
		return 0;
	}
}

// Get entire frame
uint8_t get_frame(char *arr)
{
	// Temporary chars storage array
	uint8_t tmp_arr[buffer_length];
	uint8_t idx = 0;
	uint8_t frame_length;
	int i;

	// Check, if buffer has any data to collect
	if(rx_has_data() == 1)
	{
		// Assign character to tmp array
		tmp_arr[idx] = buffer_rx[rx_busy];

		// Check if current char is an end of line character
		if(is_end_of_line(tmp_arr[idx]) == 1)
		{
			tmp_arr[idx] = 0;

			for(i=0; i<=idx; i++)
			{
				arr[i] = tmp_arr[i];
			}

			// Amount of characters stored
			frame_length = idx;

			// Reset idx
			idx = 0;

			return frame_length;
		}
		else
		{
			idx++;

			if(idx >= buffer_length)
				return 0;
		}
	}
	return 0;
}

// Sending a frame
void send_frame(char *input, ...)
{
	// Data array
	char tmp_arr[buffer_length];

	uint16_t idx;
	int i;

	va_list arglist;
	va_start(arglist, input);
	vsprintf(tmp_arr, input, arglist);
	va_end(arglist);

	// Set pointer to the first empty idx of collection buffer
	idx = rx_empty;

	for(i=0; i<strlen(input); i++)
	{
		buffer_tx[idx] = input[i];
		idx++;
		idx %= buffer_length;
	}
	__disable_irq();

	if(tx_has_data() == 0 && (__HAL_UART_GET_FLAG(&huart3, UART_FLAG_TXE) == SET))
	{
		// Set idx to first empty field in transmission array == there is new data to send
		tx_empty = idx;

		// Transmit data
		HAL_UART_Transmit_IT(&huart3, &buffer_tx[tx_busy], 1);

		// Increment tx_busy idx
		increment_tx_busy();
	}
	else
	{
		tx_empty = idx;
	}

	// Enable interrupts
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
  /* USER CODE BEGIN 2 */

  for(int i=0; i<100; i++)
  {
	  buffer_rx[rx_empty] = i;
	  rx_empty++;
  }

  HAL_UART_Receive_IT(&huart3, &buffer_rx[rx_empty], 1);

  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
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
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV4;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV2;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_7) != HAL_OK)
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
  huart3.Init.BaudRate = 9600;
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

  /* GPIO Ports Clock Enable */
  __HAL_RCC_GPIOC_CLK_ENABLE();
  __HAL_RCC_GPIOB_CLK_ENABLE();
  __HAL_RCC_GPIOA_CLK_ENABLE();
  __HAL_RCC_GPIOD_CLK_ENABLE();

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(GPIOD, GPIO_PIN_5, GPIO_PIN_RESET);

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(LED_Blue_GPIO_Port, LED_Blue_Pin, GPIO_PIN_RESET);

  /*Configure GPIO pin : B1_button_Pin */
  GPIO_InitStruct.Pin = B1_button_Pin;
  GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  HAL_GPIO_Init(B1_button_GPIO_Port, &GPIO_InitStruct);

  /*Configure GPIO pin : PD5 */
  GPIO_InitStruct.Pin = GPIO_PIN_5;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(GPIOD, &GPIO_InitStruct);

  /*Configure GPIO pin : PD6 */
  GPIO_InitStruct.Pin = GPIO_PIN_6;
  GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  HAL_GPIO_Init(GPIOD, &GPIO_InitStruct);

  /*Configure GPIO pin : LED_Blue_Pin */
  GPIO_InitStruct.Pin = LED_Blue_Pin;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(LED_Blue_GPIO_Port, &GPIO_InitStruct);

}

/* USER CODE BEGIN 4 */

// Transmission callback
void HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart)
{
	// Check for correct huart port
	if(huart == &huart3)
	{
		// Check, if collection buffer had and data to transmit
		if(tx_has_data() == 1)
		{
			static uint8_t tmp;
			tmp = buffer_tx[tx_busy];

			// Increment busy idx
			increment_tx_busy();

			// Send character
			HAL_UART_Transmit_IT(huart, &tmp, 1);
		}
	}
}

// Collection callback
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
	// Check for correct huart port
	if(huart == &huart3)
	{
		increment_rx_empty();

		// Continue data collection
		HAL_UART_Receive_IT(huart, &buffer_rx[rx_empty], 1);
	}
}

/* USER CODE END 4 */

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
