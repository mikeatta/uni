/*
 * am2320_it.c
 *
 *  Created on: Oct 18, 2024
 *      Author: mikeatta
 */

#include <string.h>
#include "am2320_it.h"

/**
 * @brief  Creates a handle instance for the AM2320 sensor.
 * @param  hi2c Pointer to a I2C_HandleTypeDef structure to be used
 * 				to communicate with the sensor.
 * @param  sensor_address A uint8_t value representing the sensor's address.
 * @retval AM2320_HandleTypeDef handle
 */
void AM2320_Init(AM2320_HandleTypeDef *am2320, I2C_HandleTypeDef *hi2c, uint8_t sensor_address)
{
	am2320->hi2c = hi2c;
	am2320->sensor_address = sensor_address;
}

/**
 * @brief  Initiate the AM2320 sensor read via I2C.
 *
 * The function is used to start the communication with the sensor. It sends
 * an empty frame to wake up the sensor, sets a short delay to let the sensor
 * wake up, and changes the sensor state machine value.
 *
 * @param  am2320 Pointer to the AM2320_HandleTypeDef handle.
 * @retval None
 */
void AM2320_InitSensorRead(AM2320_HandleTypeDef *am2320)
{
	if (am2320_state == AM2320_STATE_IDLE)
	{
		ret = HAL_I2C_Master_Transmit_IT(am2320->hi2c, am2320->sensor_address, 0x00, 0); // Send empty frame to wake the sensor
		if (ret != HAL_OK)
		{
			HAL_I2C_Master_Abort_IT(am2320->hi2c, am2320->sensor_address);
			am2320_state = AM2320_STATE_IDLE;
			tick_delay = HAL_GetTick() + 1;
			return;
		}
		tick_delay = HAL_GetTick() + 1;
		am2320_state = AM2320_STATE_SEND_COMMAND;
		return;
	}
}

/**
 * @brief  Handles obtaining the data read by the sensor.
 *
 * This function manages the states of the sensor. Depending on the
 * state, it sends read commands to the sensor or reads the received data.
 *
 * @param  am2320 Pointer to the AM2320_HandleTypeDef handle.
 * @retval None
 */
void AM2320_ReadSensorData(AM2320_HandleTypeDef *am2320)
{
	if (am2320_state == AM2320_STATE_SEND_COMMAND && (HAL_GetTick() >= tick_delay))
	{
		uint8_t registers[3] = { 0x03, 0x00, 0x04 };
		ret = HAL_I2C_Master_Transmit_IT(am2320->hi2c, am2320->sensor_address, registers, 3);
		if (ret != HAL_OK)
		{
			HAL_I2C_Master_Abort_IT(am2320->hi2c, am2320->sensor_address);
			am2320_state = AM2320_STATE_IDLE;
			return;
		}
		tick_delay = HAL_GetTick() + 3;
		return;
	}
	else if (am2320_state == AM2320_STATE_READ_DATA && (HAL_GetTick() >= tick_delay))
	{
		ret = HAL_I2C_Master_Receive_IT(am2320->hi2c, am2320->sensor_address, am2320->sensor_data, 8);
		if (ret != HAL_OK)
		{
			HAL_I2C_Master_Abort_IT(am2320->hi2c, am2320->sensor_address);
			am2320_state = AM2320_STATE_IDLE;
			return;
		}
		tick_delay = HAL_GetTick() + 3;
		return;
	}
}

/**
 * @brief  Converts the sensor data to a human-readable format.
 *
 * This function validates the received data by checking if the CRC values
 * match, shifts and sets the bits written to the data array, and converts
 * the negative values, if necessary.
 *
 * @param  am2320 Pointer to the AM2320_HandleTypeDef handle.
 * @param  temperature Pointer to the temperature variable.
 * @param  humidity Pointer to the humidity variable.
 * @retval None
 */
void AM2320_ProcessSensorData(AM2320_HandleTypeDef *am2320, float *temperature, float *humidity)
{
	uint16_t rcrc = am2320->sensor_data[7] << 8 | am2320->sensor_data[6];
	uint16_t sensor_data_crc = compute_CRC(am2320->sensor_data, 6); // Compute the CRC based on the first 6 bytes of data

	// Verify the received data is correct
	if (sensor_data_crc != rcrc)
	{
		return;
	}

	// Begin processing the data
	uint16_t tmp_temp = am2320->sensor_data[5] | am2320->sensor_data[4] << 8;
	uint16_t tmp_hum = am2320->sensor_data[3] | am2320->sensor_data[2] << 8;

	// For negative temperature reads
	if (tmp_temp & 0x8000)
	{
		// MSB set means that the temperature is negative -- convert the value
		tmp_temp = -(int16_t)tmp_temp & 0x7FFF;
	}
	else
	{
		tmp_temp = (int16_t)tmp_temp;
	}

	// Pass the sensor data to the function parameters
	*temperature = (float)tmp_temp / 10.0f;
	*humidity = (float)tmp_hum / 10.0f;
}

/**
 * @brief  Computes the MODBUS CRC-16 value for a given frame data.
 *
 * This function calculates a 16-bit CRC checksum for the frame data part
 * using the MODBUS CRC-16 algorithm with the polynomial 0xA001.
 *
 * @param  frame_data Pointer to the data to compute the CRC on.
 * @param  data_length Length of the data over which to compute the CRC.
 * @retval A 16-bit CRC value
 */
uint16_t compute_CRC(uint8_t *frame_data, uint16_t data_length)
{
	uint16_t crc = 0xFFFF;
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
