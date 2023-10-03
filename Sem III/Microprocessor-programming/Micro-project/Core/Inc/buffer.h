/*
 * buffer.h
 *
 *  Created on: Oct 3, 2023
 *      Author: zorin
 */

#ifndef INC_BUFFER_H_
#define INC_BUFFER_H_

#include <stdint.h>

extern uint8_t rx_empty;
extern uint8_t rx_busy;
extern uint8_t tx_empty;
extern uint8_t tx_busy;

void increase_rx_empty();
void increase_rx_busy();
uint8_t rx_has_data();
void increase_tx_empty();
void increase_tx_busy();
uint8_t tx_has_data();

#endif /* INC_BUFFER_H_ */
