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
    <SafeAreaView>
      <StatusBar />
      <View>
        <Text>Create New Entry</Text>
        <EntryForm onSubmit={handleFormSubmit} />
      </View>
      <View>
        <Text>Calendar Data</Text>
        <ListView
          events={calendarData.events}
          tasklists={calendarData.tasklists}
          tasks={calendarData.tasks}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
