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
import AlertBox from './components/overlays/AlertBox';
import { fillTempEntryId } from './utils/helpers/other';
import {
  addLocalEntry,
  editLocalEntry,
  removeLocalEntry,
  updateLocalTaskStatus,
} from './services/storage/storageHandlers';
import { CalendarTask, EntryTypes, FormData } from './components/types';
import { UserTimeInfoProvider } from './contexts/UserTimeInfoProvider';
import { toCalendarEntry } from './utils/helpers/dataTypeHelpers';

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
      const submittedEntry = returnSubmittedEntry(formData, updatedData);
      await addLocalEntry(submittedEntry, setLocalData);
    } else {
      let tempOfflineEntry = await toCalendarEntry(formData);
      tempOfflineEntry = fillTempEntryId(tempOfflineEntry);
      await addLocalEntry(tempOfflineEntry, setLocalData);
    }
  };

  const handleEntryRemoval = async (id: string, type: EntryTypes) => {
    if (isConnected) {
      await removeRemoteEntry(id, type);
    }

    await removeLocalEntry(id, type, setLocalData);
  };

  const handleEntryEdit = async (formData: FormData) => {
    const { type } = formData;

    if (isConnected && type === 'task') {
      const editedTaskStatus = localData.tasks.find(
        (task) => task.id === formData.id,
      )?.status;

      if (!editedTaskStatus) {
        throw new Error('Could not find currently edited task status');
      }

      await editRemoteEntry(formData, editedTaskStatus);
    } else if (isConnected && type === 'event') {
      await editRemoteEntry(formData);
    }

    const editedEntry = toCalendarEntry(formData);
    await editLocalEntry(editedEntry, setLocalData);
  };

  const handleTaskStatusChange = async (task: CalendarTask) => {
    if (isConnected) {
      await updateRemoteTaskStatus(task);
    }

    await updateLocalTaskStatus(task, setLocalData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView style={styles.scrollView}>
        <UserTimeInfoProvider>
          <View style={styles.contentContainer}>
            <Text style={styles.headerText}>Create New Entry</Text>
            <EntryForm onSubmit={handleFormSubmit} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.headerText}>Calendar Data</Text>
            <Slider onValueChange={handleSliderChange} />
            {displayMode === 'list' ? (
              <ListView
                events={localData.events}
                tasklists={localData.tasklists}
                tasks={localData.tasks}
                onStatusChange={handleTaskStatusChange}
                onEdit={handleEntryEdit}
                onRemove={handleEntryRemoval}
              />
            ) : (
              <CalendarView
                events={localData.events}
                tasklists={localData.tasklists}
                tasks={localData.tasks}
                onStatusChange={handleTaskStatusChange}
                onEdit={handleEntryEdit}
                onRemove={handleEntryRemoval}
              />
            )}
          </View>
        </UserTimeInfoProvider>
      </ScrollView>
      {!isConnected && (
        <AlertBox
          title={'No internet connection!'}
          message={'Offline mode enabled.'}
        />
      )}
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
