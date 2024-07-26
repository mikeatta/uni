import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Events from '../common/Events';
import Tasks from '../common/Tasks';
import { CalendarData } from '../types';

export default function ListView({
  events,
  tasks,
  onStatusChange,
  onEdit,
  onRemove,
}: CalendarData) {
  const getEntryCounts = () => {
    const hasEvents = events.length > 0;
    const hasTasks = tasks.length > 0;
    return [hasEvents, hasTasks];
  };

  const [hasEvents, hasTasks] = getEntryCounts();

  if (!hasEvents && !hasTasks) {
    return (
      <View style={styles.contentContainer}>
        <Text>No entries found in the calendar</Text>
      </View>
    );
  }

  return (
    <View style={styles.contentContainer}>
      {hasEvents && (
        <Events
          events={events}
          styles={entryStyles}
          functions={{ onEdit, onRemove }}
        />
      )}
      {hasTasks && (
        <Tasks
          tasks={tasks}
          styles={entryStyles}
          functions={{ onStatusChange, onEdit, onRemove }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

const entryStyles = StyleSheet.create({
  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  icon: {
    margin: 8,
  },
});
