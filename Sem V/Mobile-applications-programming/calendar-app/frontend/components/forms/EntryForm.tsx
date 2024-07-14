import { StyleSheet, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { EntryFormProps, FormData } from '../types';
import moment from 'moment-timezone';
import DateTimePicker from '../common/DateTimePicker';
import DateOnlyPicker from '../common/DateOnlyPicker';

export default function EntryForm({ onSubmit }: EntryFormProps) {
  const deviceTimeZone: string = moment.tz.guess(true);
  const currentDayTime: Date = new Date();

  // For the purpose of comparing times when syncing events
  currentDayTime.setUTCMilliseconds(0);

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
      validDateTime.setHours(timestampHours + 1, validInterval, 0, 0);
    } else {
      validDateTime.setMinutes(validInterval, 0, 0);
    }

    return validDateTime;
  };

  const selectNextInterval = (timestamp: Date) => {
    const timestampHours = timestamp.getHours();
    const timestampMinutes = timestamp.getMinutes();

    const nextTimestamp = new Date(timestamp);

    // Set the time to the next interval past the 'start' timestamp interval
    if (timestampMinutes >= 45) {
      nextTimestamp.setHours(timestampHours + 1, 0, 0, 0);
    } else {
      nextTimestamp.setMinutes(timestampMinutes + 15, 0, 0);
    }

    const validNextDateTime = selectValidInterval(nextTimestamp);

    return validNextDateTime;
  };

  /*
   * Setting time to midnight due to Google API limitations and to properly
   * handle task syncing.
   *
   * Google API does not allow time-setting for task entries. The entries
   * pulled from the Google Calendar are automatically set to midnight on the
   * given date. To account for that during entry-syncing, we set the task time
   * to 'T00:00:00.000Z'.
   */
  const setTimeToMidnight = (date: Date) => new Date(date.setHours(0, 0, 0, 0));

  const minimumStartingTime = selectValidInterval(currentDayTime);
  const minimumEndingTime = selectNextInterval(currentDayTime);

  const [formData, setFormData] = useState<FormData>({
    id: '',
    title: '',
    description: '',
    start: {
      dateTime: minimumStartingTime,
      timeZone: deviceTimeZone,
    },
    end: {
      dateTime: minimumEndingTime,
      timeZone: deviceTimeZone,
    },
    type: 'event', // Default option
  });

  const handleInput = (name: string, value: string | Date) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(formData);
      // Reset the form fields
      setFormData({
        id: '',
        title: '',
        description: '',
        start: {
          dateTime: minimumStartingTime,
          timeZone: deviceTimeZone,
        },
        end: {
          dateTime: minimumEndingTime,
          timeZone: deviceTimeZone,
        },
        type: 'event',
      });
    } catch (error) {
      console.error('Error submitting form data', error);
    }
  };

  return (
    <View>
      <SelectList
        setSelected={(selection: string) => handleInput('type', selection)}
        data={[
          { key: 'event', value: 'Event' },
          { key: 'task', value: 'Task' },
        ]}
        defaultOption={{
          key: formData.type,
          value: formData.type === 'event' ? 'Event' : 'Task',
        }}
        search={false}
      />
      <TextInput
        placeholder='Title'
        style={styles.input}
        value={formData.title}
        onChangeText={(text) => handleInput('title', text)}
      />
      <TextInput
        placeholder='Description'
        style={styles.input}
        value={formData.description}
        onChangeText={(text) => handleInput('description', text)}
      />
      {formData.type === 'event' ? (
        // Date and time picker for creating event entries
        <View style={styles.picker}>
          <DateTimePicker
            title={'Select start time'}
            dateTime={formData.start.dateTime}
            dateTimeType='start'
            setDateTime={setFormData}
          />
          <DateTimePicker
            title={'Select end time'}
            dateTime={formData.end.dateTime}
            dateTimeType='end'
            setDateTime={setFormData}
          />
        </View>
      ) : (
        // Date-only picker for creating task entries
        <View style={styles.picker}>
          <DateOnlyPicker
            title={'Select due date'}
            dateTime={setTimeToMidnight(formData.start.dateTime)}
            dateTimeType='start'
            setDateTime={setFormData}
          />
        </View>
      )}
      <Button title='Submit' onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    paddingLeft: 22,
    borderColor: '#808080',
    borderRadius: 10,
    borderWidth: 1,
  },
  picker: {
    marginTop: 16,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
});
