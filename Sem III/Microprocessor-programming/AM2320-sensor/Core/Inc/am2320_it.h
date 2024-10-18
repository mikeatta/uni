/*
 * am2320_it.h
 *
 *  Created on: Oct 18, 2024
 *      Author: mikeatta
 */

#ifndef INC_AM2320_IT_H_
#define INC_AM2320_IT_H_

#include "main.h"

// Sensor constants
#define AM2320_ADDRESS 0xB8
#define AM2320_DATA_LENGTH 8

// Sensor structure
typedef struct {
	I2C_HandleTypeDef *hi2c;
	uint8_t sensor_address;
	uint8_t sensor_data[AM2320_DATA_LENGTH];
} AM2320_HandleTypeDef;

// Enum representing AM2320 states
typedef enum {
	AM2320_STATE_IDLE,
	AM2320_STATE_SEND_COMMAND,
	AM2320_STATE_READ_DATA,
} AM2320_State;

// External declarations for variables
extern AM2320_State am2320_state;
extern HAL_StatusTypeDef ret;
extern uint32_t tick_delay;

// Function declarations
AM2320_HandleTypeDef AM2320_Init(I2C_HandleTypeDef *hi2c, uint8_t sensor_address);
void AM2320_InitSensorRead(AM2320_HandleTypeDef *am2320);
void AM2320_ReadSensorData(AM2320_HandleTypeDef *am2320);
void AM2320_ProcessSensorData(AM2320_HandleTypeDef *am2320, float *temperature, float *humidity);
uint16_t compute_CRC(uint8_t *frame_data, uint16_t data_length);

#endif /* INC_AM2320_IT_H_ */
