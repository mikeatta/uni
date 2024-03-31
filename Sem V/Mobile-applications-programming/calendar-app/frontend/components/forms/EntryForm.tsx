import { StyleSheet, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { EntryFormProps, FormData } from '../types';
import moment from 'moment-timezone';
import DateTimePicker from '../common/DateTimePicker';
import DateOnlyPicker from '../common/DateOnlyPicker';

export default function EntryForm({ onSubmit }: EntryFormProps) {
  const currentDayTime: Date = new Date();
  const deviceTimeZone: string = moment.tz.guess(true);

  const [formData, setFormData] = useState<FormData>({
    id: '',
    title: '',
    description: '',
    start: {
      dateTime: currentDayTime,
      timeZone: deviceTimeZone,
    },
    end: {
      dateTime: currentDayTime,
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
          dateTime: currentDayTime,
          timeZone: deviceTimeZone,
        },
        end: {
          dateTime: currentDayTime,
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
            dateTime={formData.start.dateTime}
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
