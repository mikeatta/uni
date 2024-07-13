import { Button, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { DateTimeSelector } from '../types';

function DateOnlyPicker({ title, dateTime, setDateTime }: DateTimeSelector) {
  const [open, setOpen] = useState(false);
  const selectedDate = `⏰ ${dateTime.toLocaleDateString()}`;

  /*
   * Setting time to midnight due to Google API limitations and to properly
   * handle task syncing.
   *
   * Google API does not allow time-setting for task entries. The entries
   * pulled from the Google Calendar are automatically set to midnight on the
   * given date. To account for that during entry-syncing, we set the task time
   * to 'T00:00:00.000Z'.
   */
  const setTimeToMidnight = (date: Date) =>
    new Date(date.setUTCHours(0, 0, 0, 0));

  return (
    <View>
      <Button title={selectedDate} onPress={() => setOpen(true)} />
      <DatePicker
        modal
        title={title}
        open={open}
        mode='date'
        date={dateTime}
        minimumDate={dateTime}
        onConfirm={(date) => {
          setOpen(false);
          setDateTime((prev) => ({
            ...prev,
            start: { ...prev.start, dateTime: setTimeToMidnight(date) },
          }));
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
}

export default DateOnlyPicker;

const styles = StyleSheet.create({});
