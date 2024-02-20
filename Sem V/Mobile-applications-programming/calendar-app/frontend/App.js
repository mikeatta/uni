import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
} from 'react-native';
import CustomDatePicker from './components/CustomDatePicker.js';
import axios from 'axios';

export default function App() {
  const [calendarData, setCalendarData] = useState({
    events: [],
    tasklists: [],
    tasks: [],
  });

  const [newEntry, setNewEntry] = useState({
    title: '',
    description: '',
    dateTime: new Date(),
    type: 'event', // Type of entry: (default) 'event' or 'task'
  });

  const handleInputChange = (name, value) => {
    setNewEntry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/calendar/new-entry',
        newEntry
      );
      // Reset the form after submission
      setNewEntry({
        title: '',
        description: '',
        dateTime: new Date(),
        type: 'event',
      });
    } catch (error) {
      console.error('Error submitting new entry:', error);
    }
  };

  // Fetch calendar data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/v1/calendar'
        );
        setCalendarData(response.data);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* New Entry Form */}
      <View style={styles.form}>
        <Text>Create New Entry</Text>

        <TextInput
          style={styles.input}
          placeholder='Title'
          value={newEntry.title}
          onChangeText={(text) => handleInputChange('title', text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Description'
          value={newEntry.description}
          onChangeText={(text) => handleInputChange('description', text)}
        />
        <CustomDatePicker
          selected={newEntry.dateTime}
          onChange={(date) => handleInputChange('dateTime', date)}
        />
        <Picker
          style={styles.input}
          selectedValue={newEntry.type}
          onValueChange={(value) => handleInputChange('type', value)}
        >
          <Picker.Item label='Event' value='event' />
          <Picker.Item label='Task' value='task' />
        </Picker>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>

      {/* Calendar Data Display */}
      <Text>Calendar Data</Text>

      <Text>Events:</Text>
      {calendarData.events.length === 0 ? (
        <Text>No events found.</Text>
      ) : (
        <View>
          {calendarData.events.map((event, index) => {
            const start = () => {
              return new Date(
                event.start.dateTime || event.start.date
              ).toLocaleString();
            };

            return (
              <Text key={index}>
                {start()} - {event.summary}
              </Text>
            );
          })}
        </View>
      )}

      <Text>Tasklists:</Text>
      {calendarData.tasklists.length === 0 ? (
        <Text>No tasklists found.</Text>
      ) : (
        <View>
          {calendarData.tasklists.map((tasklist, index) => {
            const title = tasklist.title;
            const id = tasklist.id;

            return (
              <Text key={index}>
                {index + 1}. {title} - ID: {id}
              </Text>
            );
          })}
        </View>
      )}

      <Text>Tasks:</Text>
      {calendarData.tasks.length === 0 ? (
        <Text>No tasks found.</Text>
      ) : (
        <View>
          {calendarData.tasks.map((task, index) => {
            const due = new Date(task.due).toISOString().split('T')[0];
            const title = task.title;
            const notes = task.notes !== undefined ? task.notes : '';

            // Conditional rendering based on the presence of notes
            return (
              <Text key={index}>
                {notes ? `${due} - ${title}: ${notes}` : `${due} - ${title}`}
              </Text>
            );
          })}
        </View>
      )}

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
