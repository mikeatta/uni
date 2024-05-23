import { connectToDatabase, createTables } from './db/db';
import { addEvent, removeEvent } from './db/events';
import { addTask, removeTask } from './db/tasks';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import {
  handleFormSubmit,
  handleEntryEdit,
  handleEntryRemoval,
  handleTaskStatusUpdate,
} from './utils/api';
import ListView from './components/views/ListView';
import EntryForm from './components/forms/EntryForm';
import Slider from './components/controls/Slider';
import CalendarView from './components/views/CalendarView';
import { useSyncStatus } from './hooks/useSyncStatus';
import { useFetchRemoteData } from './hooks/useFetchRemoteData';
import { useFetchLocalData } from './hooks/useFetchLocalData';

function App() {
  const [displayMode, setDisplayMode] = useState<string>('list');
  const [isDatabaseSetup, setIsDatabaseSetup] = useState<boolean>(false);
  const [isDatabaseInSync, setIsDatabaseInSync] = useState<boolean>(false);

  const calendarData = useFetchRemoteData();
  const { localData, refetchLocalData } = useFetchLocalData(
    isDatabaseSetup,
    calendarData,
  );

  const { syncStatusRef, getDatabaseSyncStatus } = useSyncStatus(
    localData,
    calendarData,
  );


  const setupLocalDatabase = async () => {
    try {
      const db = await connectToDatabase();
      await createTables(db);
      setIsDatabaseSetup(true);
    } catch (error) {
      console.error(error);
    }
  };

  const updateLocalData = useCallback(async () => {
    try {
      const db = await connectToDatabase();

      const eventsToAddAndUpdate = [
        ...syncStatusRef.current.eventsToAdd,
        ...syncStatusRef.current.eventsToUpdate,
      ];

      const tasksToAddAndUpdate = [
        ...syncStatusRef.current.tasksToAdd,
        ...syncStatusRef.current.tasksToUpdate,
      ];

      for (const event of eventsToAddAndUpdate) {
        await addEvent(db, event);
      }

      for (const event of syncStatusRef.current.eventsToRemove) {
        await removeEvent(db, event);
      }

      for (const task of tasksToAddAndUpdate) {
        await addTask(db, task);
      }

      for (const task of syncStatusRef.current.tasksToRemove) {
        await removeTask(db, task);
      }
    } catch (error) {
      console.error(error);
      throw Error('Failed to update the database');
    }
  }, [calendarData]);

  useEffect(() => {
    setupLocalDatabase();
  }, []);

  useEffect(() => {
    if (isDatabaseSetup) {
      const checkForRemoteChanges = async () => {
        const databaseSyncStatus = await getDatabaseSyncStatus();
        setIsDatabaseInSync(databaseSyncStatus);
      };

      checkForRemoteChanges().catch((error) => console.error(error));
    }
  }, [getDatabaseSyncStatus]);

  useEffect(() => {
    if (isDatabaseSetup && !isDatabaseInSync) {
      const updateAndFetchLocalData = async () => {
        await updateLocalData();
        await fetchLocalData();
      };

      updateAndFetchLocalData().catch((error) => console.log(error));
    }
  }, [fetchLocalData, updateLocalData]);

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
              onStatusChange={handleTaskStatusUpdate}
              onEdit={handleEntryEdit}
              onRemove={handleEntryRemoval}
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
