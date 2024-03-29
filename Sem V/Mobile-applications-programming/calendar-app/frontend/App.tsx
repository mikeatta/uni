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

function App() {
  const [calendarData, setCalendarData] = useState<ICalendarData>({
    events: [],
    tasklists: [],
    tasks: [],
  });

  useEffect(() => {
    fetchData(setCalendarData);
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
