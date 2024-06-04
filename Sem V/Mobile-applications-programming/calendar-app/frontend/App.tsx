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
  handleFormSubmit,
  handleEntryEdit,
  handleEntryRemoval,
  handleTaskStatusUpdate,
} from './services/api/googleCalendar';
import ListView from './components/views/ListView';
import EntryForm from './components/forms/EntryForm';
import Slider from './components/controls/Slider';
import CalendarView from './components/views/CalendarView';
import { useSyncStatus } from './hooks/useSyncStatus';
import { useFetchRemoteData } from './hooks/useFetchRemoteData';
import { useFetchLocalData } from './hooks/useFetchLocalData';
import { useSetupDatabase } from './hooks/useSetupDatabase';
import { withFunction } from './utils/helpers';

function App() {
  const [displayMode, setDisplayMode] = useState<string>('list');

  const isDatabaseSetup = useSetupDatabase();
  const { calendarData, refetchRemoteData } = useFetchRemoteData();
  const { localData, refetchLocalData } = useFetchLocalData(
    isDatabaseSetup,
    calendarData,
  );

  useSyncStatus(localData, calendarData, isDatabaseSetup, refetchLocalData);

  const handleSliderChange = async (value: 'list' | 'calendar') => {
    setDisplayMode(value);
  };

  const withRefetch = withFunction(refetchRemoteData);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Create New Entry</Text>
          <EntryForm onSubmit={withRefetch(handleFormSubmit)} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Calendar Data</Text>
          <Slider onValueChange={handleSliderChange} />
          {displayMode === 'list' ? (
            <ListView
              events={calendarData.events}
              tasklists={calendarData.tasklists}
              tasks={calendarData.tasks}
              onStatusChange={withRefetch(handleTaskStatusUpdate)}
              onEdit={withRefetch(handleEntryEdit)}
              onRemove={withRefetch(handleEntryRemoval)}
            />
          ) : (
            <CalendarView
              events={calendarData.events}
              tasklists={calendarData.tasklists}
              tasks={calendarData.tasks}
              onStatusChange={withRefetch(handleTaskStatusUpdate)}
              onEdit={withRefetch(handleEntryEdit)}
              onRemove={withRefetch(handleEntryRemoval)}
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
