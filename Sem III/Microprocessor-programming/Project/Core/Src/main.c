/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : Main program body
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2023 STMicroelectronics.
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
#include "usart.h"
#include "gpio.h"

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
#include "stm32f7xx_hal.h"
#include "string.h"

#include <string.h>
#include <stdio.h>
#include <stdarg.h>
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */

/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */
#define USART_TXBUF_LEN 2048
#define USART_RXBUF_LEN 1578
#define MAX_FRAME_LEN 526
/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/

/* USER CODE BEGIN PV */
uint8_t device_address[4] = "STM";

uint8_t USART_TxBuf[USART_TXBUF_LEN];
uint8_t USART_RxBuf[USART_RXBUF_LEN];

__IO int USART_Tx_Empty = 0;
__IO int USART_Tx_Busy  = 0;
__IO int USART_Rx_Empty = 0;
__IO int USART_Rx_Busy  = 0;
/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
/* USER CODE BEGIN PFP */

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
uint8_t USART_kbhit()
{
	if (USART_Rx_Empty == USART_Rx_Busy)
	{
		return 0;
	}
	else
	{
		return 1;
	}
}

int16_t USART_getchar()
{
	int16_t tmp;
	if (USART_Rx_Empty != USART_Rx_Busy)
	{
		tmp = USART_RxBuf[USART_Rx_Busy];
		USART_Rx_Busy++;

		if (USART_Rx_Busy >= USART_RXBUF_LEN)
		{
			USART_Rx_Busy = 0;
		}
		return tmp;
	}
	else
	{
		return -1;
	}
}

uint8_t USART_getline(char *buf)
{
	static uint8_t bf[1578];
	static uint8_t idx = 0;

	int i;
	uint8_t ret;

	while (USART_kbhit())
	{
		bf[idx] = USART_getchar();
		/* Checking for newline characters */
		if(((bf[idx] == 10) || (bf[idx] ==13)))
		{
			bf[idx] = 0;
			for (i = 0; i <= idx; i++)
			{
				/* Copy chars to buffer */
				buf[i] = bf[i];
			}
			ret = idx;
			idx = 0;
			return ret;
		}
		else
		{
			idx++;
			if (idx >= 1578)
			{
				idx = 0;
			}
		}
	}
	return 0;
}

void USART_fsend(char* format, ...)
{
	char tmp_rs[1578];
	int i;
	__IO int idx;

	va_list arglist;
	va_start(arglist, format);
	vsprintf(tmp_rs, format, arglist);
	va_end(arglist);

	idx = USART_Tx_Empty;
	for (i = 0; i < strlen(tmp_rs); i++)
	{
		USART_TxBuf[idx] = tmp_rs[i];
		idx++;
		if (idx >= USART_TXBUF_LEN)
		{
			idx = 0;
		}
	}
	__disable_irq();
	if ((USART_Tx_Empty == USART_Tx_Busy) && (__HAL_UART_GET_FLAG(&huart3, UART_FLAG_TXE) == SET))
	{
		USART_Tx_Empty = idx;
		uint8_t tmp = USART_TxBuf[USART_Tx_Busy];
		USART_Tx_Busy++;
		if (USART_Tx_Busy >= USART_TXBUF_LEN)
		{
			USART_Tx_Busy = 0;
		}
		HAL_UART_Transmit_IT(&huart3, &tmp, 1);
	}
	else
	{
		USART_Tx_Empty = idx;
	}
	__enable_irq();
}

void frame_send(uint8_t address[], uint8_t command[])
{
	uint8_t tmp[526];
	uint16_t index = 0;

	/* Fill device address */
	tmp[index++] = device_address[0];
	tmp[index++] = device_address[1];
	tmp[index++] = device_address[2];

	/* Fill original sender address */
	tmp[index++] = address[0];
	tmp[index++] = address[1];
	tmp[index++] = address[2];

	/* Fill command length */
	uint16_t cmd_len = sizeof(command) + 1;
	tmp[index++] = cmd_len / 100 + '0'; cmd_len %= 100;
	tmp[index++] = cmd_len / 10 + '0'; cmd_len %= 10;
	tmp[index++] = cmd_len + '0';

	/* Copy command to tmp array */
	uint16_t index_cmd = 0;
	while (command[index_cmd])
	{
		tmp[index++] = command[index_cmd++];
	}

	/* Calculating checksum */
	uint16_t crc = 0;
	for (uint16_t i = 0; i < cmd_len; i++)
	{
		crc += command[i];
	}
	crc %= 1000;

	/* Placing the checksum within the frame */
	tmp[index++] = crc / 100 + '0'; crc %= 100;
	tmp[index++] = crc / 10 + '0'; crc %= 10;
	tmp[index++] = crc + '0';

	uint8_t result[526];
	uint16_t length = 0;
	result[length++] = '#';
	for (uint16_t i = 0; i < index; i++)
	{
		switch(tmp[i])
		{
		case '\\':
			result[length++] = '\\';
			result[length++] = '\\';
			break;
		case '#':
			result[length++] = '\\';
			result[length++] = '@';
			break;
		case ';':
			result[length++] = '\\';
			result[length++] = ':';
			break;
		default:
			result[length++] = tmp[i];
		}
	}
	result[length++] = ';';
	result[length++] = '\r';
	result[length++] = '\n';

	__IO uint16_t idx = USART_Tx_Empty;
	for (uint16_t i = 0; i < length; i++)
	{
		USART_TxBuf[idx] = result[i];
		if (++idx >= USART_TXBUF_LEN)
		{
			idx = 0;
		}
	}
	__disable_irq();
	if (USART_Tx_Empty == USART_Tx_Busy && __HAL_UART_GET_FLAG(&huart3, UART_FLAG_TXE == SET))
	{
		USART_Tx_Empty = idx;
		uint8_t tmp = USART_TxBuf[USART_Tx_Busy];
		if (++USART_Tx_Busy >= USART_TXBUF_LEN)
		{
			USART_Tx_Busy = 0;
		}
		HAL_UART_Transmit_IT(&huart3, &tmp, 1);
	}
	else
	{
		USART_Tx_Empty = idx;
	}
	__enable_irq();
}

uint8_t frame_get(uint8_t address[], uint8_t command[])
{
	static uint8_t tmp[526];
	static uint16_t index = 0;
	static uint8_t escape = 0;

	/* While there's data in the RX buffer */
	while (USART_Rx_Busy != USART_Rx_Empty)
	{
		tmp[index] = USART_RxBuf[USART_Rx_Busy];
		if (++USART_Rx_Busy >= USART_RXBUF_LEN)
		{
			USART_Rx_Busy = 0;
		}

		/* Check for a frame start char */
		if (tmp[index] == '#')
		{
			tmp[0] = '#';
			index = 1;
			escape = 0;
			continue;
		}

		/* If received char was not a frame start char */
		if (!index)
		{
			continue;
		}

		/* Check for escape characters */
		if (escape)
		{
			if (tmp[index] == '\\')
			{
				tmp[index++] = '\\';
			}
			else if (tmp[index] == '@')
			{
				tmp[index++] = '#';
			}
			else if (tmp[index++] == ':')
			{
				tmp[index++] = ';';
			}
			else
			{
				index = 0;
			}
			/* Disable escape character sequence */
			escape = 0;
		}
		else if (tmp[index] == '\\')
		{
			/* Enable escape character sequence */
			escape = 1;
		}
		else if (tmp[index] == ';')
		{
			/* Store current message length */
			uint16_t length = index + 1;
			index = 0;

			/* If frame length is shorter than minimum allowed length */
			if (length < 14)
			{
				continue;
			}

			/* If device address does not match */
			if (tmp[4] != device_address[0] || tmp[5] != device_address[1] || tmp[6] != device_address[2])
			{
				continue;
			}

			/* Check if command length contains invalid characters */
			if (tmp[7] < '0' || tmp[7] > '9' || tmp[8] < '0' || tmp[8] > '9' || tmp[9] < '0' || tmp[9] > '9')
			{
				continue;
			}

			/* Check if checksum contains invalid characters */
			if (tmp[length - 4] < '0' || tmp[length - 4] > '9' || tmp[length - 3] < '0' || tmp[length - 3] > '9' || tmp[length - 2] < '0' || tmp[length - 2] > '9')
			{
				continue;
			}

			/* Read command length */
			uint16_t param_command_length = ((tmp[7] - '0') * 100) + ((tmp[8] - '0') * 10) + (tmp[9] - '0');

			/* Read command and validate length */
			uint16_t command_length = 0;
			for (uint16_t i = 10; i < length - 4; i++)
			{
				command[command_length++] = tmp[i];
			}

			command[command_length] = 0;

			/* Compare declared command length against actual command length */
			if (command_length != param_command_length)
			{
				continue;
			}

			/* Calculate command checksum */
			uint32_t crc = 0;
			for (uint16_t i = 0; i < command_length; i++)
			{
				crc += command[i];
			}
			crc %= 1000;

			uint16_t fcrc = ((tmp[length - 4] - '0') * 100) + ((tmp[length - 3] - '0') * 10) + (tmp[length - 2] - '0');

			/* If checksums do not match */
			if (crc != fcrc)
			{
				continue;
			}

			/* Fill in sender address */
			address[0] = tmp[1];
			address[1] = tmp[2];
			address[2] = tmp[3];

			return 1;
		}
		else if (++index >= 526)
		{
			index = 0;
		}
	}
	return 0;
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
  HAL_UART_Receive_IT(&huart3, &USART_RxBuf[USART_Rx_Empty], 1);

  uint8_t sender_address[4] = "";
  uint8_t command[512], tmp[512];
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
	  if (frame_get(sender_address, command))
	  {
		  frame_send(sender_address, command);
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

/* USER CODE BEGIN 4 */
void HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart)
{
	if (huart == &huart3)
	{
		if (USART_Tx_Empty != USART_Tx_Busy)
		{
			uint8_t tmp = USART_TxBuf[USART_Tx_Busy];
			USART_Tx_Busy++;
			if (USART_Tx_Busy >= USART_TXBUF_LEN)
			{
				USART_Tx_Busy = 0;
			}
			HAL_UART_Transmit_IT(&huart3, &tmp, 1);
		}
	}
}

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
	if (huart == &huart3)
	{
		USART_Rx_Empty++;
		if (USART_Rx_Empty >= USART_RXBUF_LEN)
		{
			USART_Rx_Empty = 0;
		}
		HAL_UART_Receive_IT(&huart3, &USART_RxBuf[USART_Rx_Empty], 1);
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
