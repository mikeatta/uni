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
#define AM2320_DATA_LENGTH 11

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
extern volatile uint8_t delay_elapsed;
extern TIM_HandleTypeDef htim6;

// Function declarations
void AM2320_Init(AM2320_HandleTypeDef *am2320, I2C_HandleTypeDef *hi2c, uint8_t sensor_address);
void AM2320_InitSensorRead(AM2320_HandleTypeDef *am2320);
void AM2320_ReadSensorData(AM2320_HandleTypeDef *am2320);
void AM2320_ProcessSensorData(AM2320_HandleTypeDef *am2320, uint16_t *temperature, uint16_t *humidity);
void AM2320_ReadSensorInfo(AM2320_HandleTypeDef *am2320);
void AM2320_ProcessSensorInfo(AM2320_HandleTypeDef *am2320, uint32_t *am2320_id, uint16_t *am2320_model, uint8_t *am2320_version);
uint16_t compute_CRC(uint8_t *frame_data, uint16_t data_length);
void TIM_StartDelay(uint16_t milliseconds);

#endif /* INC_AM2320_IT_H_ */
