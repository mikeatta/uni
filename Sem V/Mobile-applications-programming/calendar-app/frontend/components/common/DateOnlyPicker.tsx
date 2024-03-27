import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { DateTimeSelector } from '../types';

function DateOnlyPicker({ title, dateTime, setDateTime }: DateTimeSelector) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Button title='Open' onPress={() => setOpen(true)} />
      <DatePicker
        modal
        title={title}
        open={open}
        mode='date'
        date={dateTime}
        onConfirm={(date) => {
          setOpen(false);
          setDateTime((prev) => ({
            ...prev,
            start: { ...prev.start, dateTime: date },
          }));
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
}

export default DateOnlyPicker;

const styles = StyleSheet.create({});
