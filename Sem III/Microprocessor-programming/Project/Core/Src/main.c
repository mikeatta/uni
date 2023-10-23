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

#include <string.h>
#include <stdio.h>
#include <stdarg.h>
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */

/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */
#define USART_TX_BUF_LEN 100
#define USART_RX_BUF_LEN 100
/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/
/* USER CODE BEGIN PV */
uint8_t USART_TxBuf[USART_TX_BUF_LEN];
uint8_t USART_RxBuf[USART_RX_BUF_LEN];

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

		if (USART_Rx_Busy >= USART_RX_BUF_LEN)
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
	static uint8_t bf[128];
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
			if (idx >= 128)
			{
				idx = 0;
			}
		}
	}
	return 0;
}

void USART_fsend(char* format, ...)
{
	char tmp_rs[128];
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
		if (idx >= USART_TX_BUF_LEN)
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
		if (USART_Tx_Busy >= USART_TX_BUF_LEN)
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
  HAL_UART_Receive_IT(&huart3, &USART_RxBuf[0], 1);

  USART_fsend("Hello world!\r\n");

  int len = 0;
  char bx[200];
  uint32_t cntr = 0;
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
	  cntr++;
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
	  if ((len = USART_getline(bx)) > 0)
	  {
		  USART_fsend("REC[%d]> %s\r\n", len, bx);
		  switch(bx[0])
		  {
		  	  case 'l':
		  	  case 'L':
		  		  HAL_GPIO_TogglePin(GPIOB, GPIO_PIN_14);
		  		  USART_fsend("LED STATE CHANGE\r\n");
		  		  break;
		  	  case 's':
		  	  case 'S':
		  		  USART_fsend("LED PIN STATE %d\r\n", HAL_GPIO_ReadPin(GPIOB, GPIO_PIN_14));
		  		  break;
		  	  case '?':
		  		  USART_fsend("LOOP CNT %ld\r\n", cntr);
		  		  break;
		  }
	  }
	/* USER CODE END 3 */
  }
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
			if (USART_Tx_Busy >= USART_TX_BUF_LEN)
			{
				USART_Tx_Busy = 0;
			}
			HAL_UART_Transmit_IT(huart, &tmp, 1);
		}
	}
}

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
	if (huart == &huart3)
	{
		USART_Rx_Empty++;
		if (USART_Rx_Empty >= USART_RX_BUF_LEN)
		{
			USART_Tx_Empty = 0;
		}
		HAL_UART_Receive_IT(huart, &USART_RxBuf[USART_Rx_Empty], 1);
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
