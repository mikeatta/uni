import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const [calendarData, setCalendarData] = useState({
    events: [],
    tasklists: [],
    tasks: [],
  });

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
});
