/*
 * buffer.c
 *
 *  Created on: Oct 3, 2023
 *      Author: zorin
 */

#include "buffer.h"

#define BUFFER_LENGTH 100

volatile uint8_t rx_buffer[BUFFER_LENGTH];
volatile uint8_t tx_buffer[BUFFER_LENGTH];
volatile uint8_t rx_empty = 0;
volatile uint8_t rx_busy  = 0;
volatile uint8_t tx_empty = 0;
volatile uint8_t tx_busy  = 0;

void increase_rx_empty()
{
	rx_empty++;
	if (rx_empty >= BUFFER_LENGTH)
	{
		rx_empty = 0;
	}
}

void increase_rx_busy()
{
	rx_busy++;
	if (rx_busy >= BUFFER_LENGTH)
	{
		rx_busy = 0;
	}
}

uint8_t rx_has_data()
{
	if (rx_empty == rx_busy)
	{
		return 0;
	}

	return 1;
}

void increase_tx_empty()
{
	tx_empty++;
	if (tx_empty >= BUFFER_LENGTH)
	{
		tx_empty = 0;
	}
}

void increase_tx_busy()
{
	tx_busy++;
	if (tx_busy >= BUFFER_LENGTH)
	{
		tx_busy= 0;
	}
}

uint8_t tx_has_data()
{
	if (tx_empty == tx_busy)
	{
		return 0;
	}

	return 1;
}
