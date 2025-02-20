/*
 * am2320.h
 *
 *  Created on: Feb 22, 2024
 *      Author: mikeatta
 */

#ifndef INC_AM2320_H_
#define INC_AM2320_H_

#include "main.h"

#define AM2320_ADDRESS 0xB8

typedef struct
{
	I2C_HandleTypeDef *i2c_handle;
	uint8_t sensor_address;
	uint8_t data[8];
} Am2320_HandleTypeDef;

Am2320_HandleTypeDef am2320_Init(I2C_HandleTypeDef *i2c_handle, uint8_t sensor_address);
uint8_t am2320_ReadValue(Am2320_HandleTypeDef *am2320);
void am2320_GetTemperatureAndHumidity(Am2320_HandleTypeDef *am2320, float *temperature, float *humidity);

#endif /* INC_AM2320_H_ */
