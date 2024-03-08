import { SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import ListView from './components/views/ListView';
import axios from 'axios';

function App() {
  const [calendarData, setCalendarData] = useState({
    events: [],
    tasklists: [],
    tasks: [],
  });

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
