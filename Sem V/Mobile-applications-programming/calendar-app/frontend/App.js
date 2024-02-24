import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  ScrollView,
} from 'react-native';
import CustomDatePicker from './components/CustomDatePicker.js';
import EditEntryWindow from './components/EditEntryWindow.js';
import { Ionicons } from '@expo/vector-icons';
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

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleEdit = (entry, type) => {
    const editedEntry = { ...entry, type };
    setSelectedEntry(editedEntry);
    setEditModalVisible(true);
  };

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
      // Refetch calendar data after submission
      fetchData();
    } catch (error) {
      console.error('Error submitting new entry:', error);
    }
  };

  const handleEditSubmit = async (editedData) => {
    try {
      const response = await axios.patch(
        'http://localhost:3001/api/v1/calendar/modify-entry',
        editedData
      );
      // Refetch calendar data after modification
      fetchData();
    } catch (error) {
      console.error('Error editing entry', error);
    }
  };

  const handleRemoval = async (id, type) => {
    try {
      const response = await axios.delete(
        'http://localhost:3001/api/v1/calendar/remove-entry',
        {
          data: { id, type },
        }
      );
      // Refetch calendar data after removal
      fetchData();
    } catch (error) {
      console.error('Error removing entry', error);
    }
  };

  // Fetch calendar data
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/calendar');
      setCalendarData(response.data);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* New Entry Form */}
      <View style={styles.form}>
        <Text>Create New Entry</Text>

        {/* Input fields for a new entry */}
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

      <ScrollView style={{ width: '100%' }}>
        {/* Display Events */}
        <View>
          <Text style={styles.headerText}>Events:</Text>
          {calendarData.events.map((event, index) => (
            <View key={index} style={styles.itemContainer}>
              {/* Event content */}
              <Text style={styles.entry}>
                {event.start.dateTime} | {event.summary}
              </Text>
              {/* Edit icon for event */}
              <Ionicons
                name='create-outline'
                style={styles.icon}
                size={24}
                color='blue'
                onPress={() => handleEdit(event, 'event')}
              />
              {/* Delete icon for event */}
              <Ionicons
                name='trash-outline'
                style={styles.icon}
                size={24}
                color='red'
                onPress={() => handleRemoval(event.id, 'event')}
              />
            </View>
          ))}
        </View>

        {/* Display tasks */}
        <View>
          <Text style={styles.headerText}>Tasks:</Text>
          {calendarData.tasks.map((task, index) => (
            <View key={index} style={styles.itemContainer}>
              {/* Task content */}
              <Text style={styles.entry}>
                {task.due} | {task.title} - {task.notes}
              </Text>
              {/* Edit icon for task */}
              <Ionicons
                name='create-outline'
                style={styles.icon}
                size={24}
                color='blue'
                onPress={() => handleEdit(task, 'task')}
              />
              {/* Delete icon for task */}
              <Ionicons
                name='trash-outline'
                style={styles.icon}
                size={24}
                color='red'
                onPress={() => handleRemoval(task.id, 'task')}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Edit Entry Window */}
      {editModalVisible && (
        <EditEntryWindow
          entryData={selectedEntry} // Pass the selected entry to the EditEntryWindow
          onClose={() => setEditModalVisible(false)}
          onSubmit={(editedData) => {
            handleEditSubmit(editedData);
            setEditModalVisible(false);
          }}
        />
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
  headerText: {
    textAlign: 'center',
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  entry: {
    flex: 1,
    marginRight: 8,
  },
  icon: {
    marginLeft: 8,
  },
});
