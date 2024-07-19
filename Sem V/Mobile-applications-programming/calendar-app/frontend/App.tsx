import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import {
  addRemoteEntry,
  editRemoteEntry,
  fetchGoogleCalendarData,
  removeRemoteEntry,
  returnSubmittedEntry,
  updateRemoteTaskStatus,
} from './services/api/googleCalendar';
import ListView from './components/views/ListView';
import EntryForm from './components/forms/EntryForm';
import Slider from './components/controls/Slider';
import CalendarView from './components/views/CalendarView';
import { useFetchLocalData } from './hooks/useFetchLocalData';
import { useSetupDatabase } from './hooks/useSetupDatabase';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { useSyncChanges } from './hooks/useSyncChanges';
import { fillTempEntryId, toCalendarEntry } from './utils/helpers';
import {
  addLocalEntry,
  removeLocalEntry,
} from './services/storage/storageHandlers';
import { FormData } from './components/types';

function App() {
  const [displayMode, setDisplayMode] = useState<string>('list');

  const isConnected = useNetworkStatus();
  const isDatabaseSetup = useSetupDatabase();
  const { localData, setLocalData, refreshLocalEntryList } =
    useFetchLocalData(isDatabaseSetup);

  useSyncChanges(localData, isConnected, setLocalData, refreshLocalEntryList);


  const handleSliderChange = async (value: 'list' | 'calendar') => {
    setDisplayMode(value);
  };

  const handleFormSubmit = async (formData: FormData) => {
    if (isConnected) {
      await addRemoteEntry(formData);
      const updatedData = await fetchGoogleCalendarData();
      const submittedEntry = await returnSubmittedEntry(formData, updatedData);
      await addLocalEntry(submittedEntry, setLocalData);
    } else {
      let tempOfflineEntry = await toCalendarEntry(formData);
      tempOfflineEntry = fillTempEntryId(tempOfflineEntry);
      await addLocalEntry(tempOfflineEntry, setLocalData);
    }
  };

  const handleEntryRemoval = async (id: string, type: string) => {
    if (isConnected) {
      await removeRemoteEntry(id, type);
    }

    await removeLocalEntry(id, type, setLocalData);
  };

  const handleEntryEdit = async (formData: FormData) => {
    if (isConnected) {
      await editRemoteEntry(formData);
    }

    const editedEntry = toCalendarEntry(formData);
    await editLocalEntry(editedEntry, setLocalData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Create New Entry</Text>
          <EntryForm onSubmit={handleFormSubmit} />
            />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Calendar Data</Text>
          <Slider onValueChange={handleSliderChange} />
          {displayMode === 'list' ? (
            <ListView
              events={localData.events}
              tasklists={localData.tasklists}
              tasks={localData.tasks}
              onStatusChange={updateRemoteTaskStatus}
              onEdit={handleEntryEdit}
              onRemove={handleEntryRemoval}
            />
          ) : (
            <CalendarView
              events={localData.events}
              tasklists={localData.tasklists}
              tasks={localData.tasks}
              onStatusChange={updateRemoteTaskStatus}
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
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollView: {
    width: '96%',
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
