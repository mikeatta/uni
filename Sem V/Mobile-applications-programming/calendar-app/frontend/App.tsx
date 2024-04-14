import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  handleFormSubmit,
  handleEntryEdit,
  handleEntryRemoval,
  handleTaskStatusUpdate,
  fetchData,
} from './utils/api';
import { ICalendarData } from './components/types';
import ListView from './components/views/ListView';
import EntryForm from './components/forms/EntryForm';
import Slider from './components/controls/Slider';
import CalendarView from './components/views/CalendarView';

function App() {
  const [calendarData, setCalendarData] = useState<ICalendarData>({
    events: [],
    tasklists: [],
    tasks: [],
  });

  const [displayMode, setDisplayMode] = useState<string>('list');

  useEffect(() => {
    fetchData(setCalendarData);
  }, []);

  const handleSliderChange = async (value: 'list' | 'calendar') => {
    setDisplayMode(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Create New Entry</Text>
          <EntryForm onSubmit={handleFormSubmit} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Calendar Data</Text>
          <Slider onValueChange={handleSliderChange} />
          {displayMode === 'list' ? (
            <ListView
              events={calendarData.events}
              tasklists={calendarData.tasklists}
              tasks={calendarData.tasks}
              onStatusChange={handleTaskStatusUpdate}
              onEdit={handleEntryEdit}
              onRemove={handleEntryRemoval}
            />
          ) : (
            <CalendarView
              events={calendarData.events}
              tasklists={calendarData.tasklists}
              tasks={calendarData.tasks}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
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
