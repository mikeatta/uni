import { Button, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { DateTimeSelector } from '../types';

function DateTimePicker({
  title,
  dateTime,
  dateTimeType,
  minimumDateTime,
  setDateTime,
}: DateTimeSelector) {
  const [open, setOpen] = useState(false);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${hours}:${minutesStr} ${period}`;
  };

  const formattedTime = formatTime(dateTime);

  const selectedTimestamp =
    dateTimeType === 'start'
      ? `🚩 ${dateTime.toLocaleDateString()} | ${formattedTime}`
      : `🏁 ${dateTime.toLocaleDateString()} | ${formattedTime}`;

  return (
    <View>
      <Button title={selectedTimestamp} onPress={() => setOpen(true)} />
      <DatePicker
        modal
        title={title}
        open={open}
        date={dateTime}
        minimumDate={minimumDateTime}
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
