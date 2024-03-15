import { SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import ListView from './components/views/ListView';
import axios from 'axios';
import EntryForm from './components/forms/EntryForm';
import { FormData } from './components/types';

function App() {
  const [calendarData, setCalendarData] = useState({
    events: [],
    tasklists: [],
    tasks: [],
  });

  const handleFormSubmit = async (formData: FormData) => {
    try {
      const response = await axios.post(
        'http://192.168.0.114:3001/api/v1/calendar/new-entry',
        formData,
      );
    } catch (error) {
      console.error('Error submittng form data:', error);
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
        />
      </View>
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
