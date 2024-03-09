import { StyleSheet, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { EntryFormProps } from '../types';
import DateTimePicker from '../common/DateTimePicker';

export default function EntryForm({ onSubmit }: EntryFormProps) {
  const currentDayTime: Date = new Date();
  const deviceTimeZone: string = currentDayTime.getTimezoneOffset().toString();

  const [formData, setFormData] = useState({
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
    type: 'event' as const,
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
        type: 'event' as const,
      });
    } catch (error) {
      console.error('Error submitting form data', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder='Title'
        value={formData.title}
        onChangeText={(text) => handleInput('title', text)}
      />
      <TextInput
        placeholder='Description'
        value={formData.description}
        onChangeText={(text) => handleInput('description', text)}
      />
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
      <SelectList
        setSelected={(selection: string) => handleInput('type', selection)}
        data={[
          { key: 'event', value: 'Event' },
          { key: 'task', value: 'Task' },
        ]}
        search={false}
      />
      <Button title='Submit' onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({});
