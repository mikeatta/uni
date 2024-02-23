/*
 * am2320.c
 *
 *  Created on: Feb 22, 2024
 *      Author: mikeatta
 */

#include "am2320.h"

Am2320_HandleTypeDef am2320_Init(I2C_HandleTypeDef *i2c_handle, uint8_t sensor_address)
{
	Am2320_HandleTypeDef AM2320_;
	AM2320_.i2c_handle = i2c_handle;
	AM2320_.sensor_address = sensor_address;
	return AM2320_;
}

uint8_t am2320_ReadValue(Am2320_HandleTypeDef *am2320)
{
	uint8_t registers[3] = { 0x03, 0x00, 0x04 };
	HAL_I2C_Master_Transmit_IT(am2320->i2c_handle, am2320->sensor_address, 0x00, 0);
	/* Use a blocking delay to ensure the sensor has enough time to wake up */
	while (HAL_I2C_GetState(am2320->i2c_handle) != HAL_I2C_STATE_READY);
	if (HAL_I2C_Master_Transmit_IT(am2320->i2c_handle, am2320->sensor_address, registers, 3) != HAL_OK)
	{
		/* Error code #1 - Problem with sending read request */
		return 1;
	}
	/* Use a blocking delay to ensure the sensor has enough time to read the data */
	while (HAL_I2C_GetState(am2320->i2c_handle) != HAL_I2C_STATE_READY);
	if (HAL_I2C_Master_Receive_IT(am2320->i2c_handle, am2320->sensor_address, am2320->data, 8) != HAL_OK)
	{
		/* Error code #2 - Problem with receiving data */
		return 2;
	}
	if (am2320->data[1] != 0x04 && am2320->data[0] != 0x03)
	{
		/* Error code #3 - Invalid data received from the sensor */
		return 3;
	}
	return 0;
}

void am2320_GetTemperatureAndHumidity(Am2320_HandleTypeDef *am2320, float *temperature, float *humidity)
{
	int read = am2320_ReadValue(am2320);
	if (read)
	{
		/* Handle errors */
	}
	uint16_t temp_temperature = (am2320->data[5] | am2320->data[4] << 8);
	if (temp_temperature & 0x8000)
	{
		temp_temperature = -(int16_t)(temp_temperature & 0x7FFF);
	}
	else
	{
		temp_temperature = (int16_t)temp_temperature;
	}
	uint16_t temp_humidity = (am2320->data[3] | am2320->data[2] << 8);
	*temperature = (float)temp_temperature / 10.0;
	*humidity = (float)temp_humidity / 10.0;
}
