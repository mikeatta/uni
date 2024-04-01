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
  const selectedDate =
    dateTimeType === 'start'
      ? `🚩 ${dateTime.toLocaleDateString()} | ${dateTime.toLocaleTimeString()}`
      : `🏁 ${dateTime.toLocaleDateString()} | ${dateTime.toLocaleTimeString()}`;

  return (
    <View>
      <Button title={selectedDate} onPress={() => setOpen(true)} />
      <DatePicker
        modal
        title={title}
        open={open}
        date={dateTime}
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
