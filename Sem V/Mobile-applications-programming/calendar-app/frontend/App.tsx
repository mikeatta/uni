import { connectToDatabase, createTables } from './db/db';
import { addEvent, getEvents } from './db/events';
import { addTask, getTasks } from './db/tasks';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  handleFormSubmit,
  handleEntryEdit,
  handleEntryRemoval,
  handleTaskStatusUpdate,
  fetchData,
} from './utils/api';
import { CalendarEvent, ICalendarData } from './components/types';
import ListView from './components/views/ListView';
import EntryForm from './components/forms/EntryForm';
import Slider from './components/controls/Slider';
import CalendarView from './components/views/CalendarView';

function App() {
  const [localData, setLocalData] = useState<ICalendarData>({
    events: [],
    tasklists: [],
    tasks: [],
  });

  const [calendarData, setCalendarData] = useState<ICalendarData>({
    events: [],
    tasklists: [],
    tasks: [],
  });

  interface ISyncStatusRef {
    eventsToAdd: CalendarEvent[];
    eventsToRemove: CalendarEvent[];
    eventsToUpdate: CalendarEvent[];
  }

  const syncStatusRef = useRef<ISyncStatusRef>({
    eventsToAdd: [],
    eventsToRemove: [],
    eventsToUpdate: [],
  });

  const [displayMode, setDisplayMode] = useState<string>('list');
  const [isDatabaseSetup, setIsDatabaseSetup] = useState<boolean>(false);
  const [isDatabaseInSync, setIsDatabaseInSync] = useState<boolean>(false);

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

      for (const event of syncStatusRef.current.eventsToAdd) {
        await addEvent(db, event);
      }

      for (const task of calendarData.tasks) {
        await addTask(db, task);
      }
    } catch (error) {
      console.error(error);
      throw Error('Failed to update the database');
    }
  }, [calendarData]);

  const fetchLocalData = useCallback(async () => {
    try {
      const db = await connectToDatabase();

      const tempLocalData: ICalendarData = {
        events: await getEvents(db),
        tasklists: [],
        tasks: await getTasks(db),
      };

      setLocalData(tempLocalData);
    } catch (error) {
      console.error(error);
    }
  }, [updateLocalData]);

  const getDatabaseSyncStatus = useCallback(async () => {
    const eventsToAdd = calendarData.events.filter(
      (remoteEvent) =>
        !localData.events.some(
          (localEvent) => localEvent.id === remoteEvent.id,
        ),
    );

    const eventsToRemove = localData.events.filter(
      (localEvent) =>
        !calendarData.events.some(
          (remoteEvent) => localEvent.id === remoteEvent.id,
        ),
    );

    const eventsToUpdate = calendarData.events.filter((remoteEvent) =>
      localData.events.some((localEvent) => {
        return (
          localEvent.id === remoteEvent.id &&
          (localEvent.summary !== remoteEvent.summary ||
            localEvent.description !== remoteEvent.description ||
            localEvent.start.dateTime !== remoteEvent.start.dateTime ||
            localEvent.start.timeZone !== remoteEvent.end.timeZone ||
            localEvent.end.dateTime !== remoteEvent.end.dateTime ||
            localEvent.end.timeZone !== remoteEvent.end.timeZone)
        );
      }),
    );

    syncStatusRef.current.eventsToAdd = eventsToAdd;
    syncStatusRef.current.eventsToRemove = eventsToRemove;
    syncStatusRef.current.eventsToUpdate = eventsToUpdate;

    return (
      eventsToAdd.length === 0 &&
      eventsToRemove.length === 0 &&
      eventsToUpdate.length === 0
    );
  }, [updateLocalData]);

  useEffect(() => {
    setupLocalDatabase();
  }, []);

  useEffect(() => {
    fetchData(setCalendarData);
  }, []);

  useEffect(() => {
    if (isDatabaseSetup) {
      fetchLocalData();
    }
  }, [isDatabaseSetup]);

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
