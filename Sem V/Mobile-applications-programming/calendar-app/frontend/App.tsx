import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ListView from './components/views/ListView';
import axios from 'axios';
import EntryForm from './components/forms/EntryForm';
import { CalendarEvent, CalendarTask, FormData } from './components/types';

function App() {
  const [calendarData, setCalendarData] = useState({
    events: [],
    tasklists: [],
    tasks: [],
  });

  const handleFormSubmit = async (formData: FormData) => {
    try {
      await axios.post(
        'http://192.168.0.114:3001/api/v1/calendar/new-entry',
        formData,
      );
    } catch (error) {
      console.error('Error submittng form data:', error);
    }
  };

  const handleEntryEdit = async (formData: FormData) => {
    try {
      await axios.patch(
        'http://192.168.0.114:3001/api/v1/calendar/modify-entry',
        formData,
      );
    } catch (error) {
      console.error('Error editing the entry:', error);
    }
  };

  const handleEntryRemoval = async (id: string, type: string) => {
    try {
      await axios.delete(
        'http://192.168.0.114:3001/api/v1/calendar/remove-entry',
        {
          data: { id, type },
        },
      );
    } catch (error) {
      console.error('Error removing the entry:', error);
    }
  };

  const handleTaskStatusUpdate = async (taskData: CalendarTask) => {
    try {
      await axios.patch(
        'http://192.168.0.114:3001/api/v1/calendar/update-task-status',
        taskData,
      );
    } catch (error) {
      console.error('Error changing task status:', error);
    }
  };

  // Fetch calendar data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://192.168.0.114:3001/api/v1/calendar',
      );
      setCalendarData(response.data);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Create New Entry</Text>
          <EntryForm onSubmit={handleFormSubmit} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Calendar Data</Text>
          <ListView
            events={calendarData.events}
            tasklists={calendarData.tasklists}
            tasks={calendarData.tasks}
            onStatusChange={handleTaskStatusUpdate}
            onEdit={handleEntryEdit}
            onRemove={handleEntryRemoval}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    maxWidth: '100%',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default App;
