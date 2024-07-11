import { Button, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { DateTimeSelector } from '../types';

function DateTimePicker({
  title,
  dateTime,
  dateTimeType,
  setDateTime,
}: DateTimeSelector) {
  const [open, setOpen] = useState(false);

  const selectValidInterval = (timestamp: Date) => {
    const timestampHours = timestamp.getHours();
    const timestampMinutes = timestamp.getMinutes();

    const minuteIntervals = [0, 15, 30, 45];

    const validInterval =
      minuteIntervals.find((interval) => interval > timestampMinutes) || 0;

    if (validInterval === undefined) {
      throw Error('Error setting valid timestamp interval');
    }

    const validDateTime = new Date(timestamp);

    // For intervals above 45, set the hour to next hour
    if (validInterval === 0 && timestampMinutes >= 45) {
      validDateTime.setUTCHours(timestampHours + 1, validInterval, 0, 0);
    } else {
      validDateTime.setUTCMinutes(validInterval, 0, 0);
    }

    return validDateTime;
  };

  const selectNextInterval = (timestamp: Date) => {
    const timestampHours = timestamp.getHours();
    const timestampMinutes = timestamp.getMinutes();

    const nextTimestamp = new Date(timestamp);

    // Set the time to the next interval past the 'start' timestamp interval
    if (timestampMinutes >= 45) {
      nextTimestamp.setUTCHours(timestampHours + 1, 0, 0, 0);
    } else {
      nextTimestamp.setUTCMinutes(timestampMinutes + 15, 0, 0);
    }

    const validNextDateTime = selectValidInterval(nextTimestamp);

    return validNextDateTime;
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${hours}:${minutesStr} ${period}`;
  };

  const minimumDate =
    dateTimeType === 'start'
      ? selectValidInterval(dateTime)
      : selectNextInterval(dateTime);

  const formattedTime = formatTime(minimumDate);

  const selectedTimestamp =
    dateTimeType === 'start'
      ? `🚩 ${minimumDate.toLocaleDateString()} | ${formattedTime}`
      : `🏁 ${minimumDate.toLocaleDateString()} | ${formattedTime}`;

  return (
    <View>
      <Button title={selectedTimestamp} onPress={() => setOpen(true)} />
      <DatePicker
        modal
        title={title}
        open={open}
        date={minimumDate}
        minimumDate={minimumDate}
        minuteInterval={15}
        onConfirm={(date) => {
          setOpen(false);
          setDateTime((prev) => ({
            ...prev,
            [dateTimeType]: { ...prev[dateTimeType], dateTime: date },
          }));
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
}

export default DateTimePicker;

const styles = StyleSheet.create({});
