import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';
import { CalendarEvent, CalendarTask, FormData } from '../types';
import Events from './Events';
import Tasks from './Tasks';

type DailyEntryListProps = {
  date: string;
  entries: [CalendarEvent[], CalendarTask[]];
  entryStyles?: {
    textHeader: StyleProp<TextStyle>;
    contentContainer: StyleProp<TextStyle>;
    content: StyleProp<TextStyle>;
    icon: StyleProp<TextStyle>;
  };
  entryFunctions: {
    onStatusChange: (task: CalendarTask) => Promise<void>;
    onEdit: (formData: FormData) => Promise<void>;
    onRemove: (id: string, type: 'event' | 'task') => Promise<void>;
  };
};

function DailyEntryList({
  date,
  entries,
  entryStyles,
  entryFunctions,
}: DailyEntryListProps) {
  const getFormattedDate = () => {
    return new Date(date).toDateString();
  };

  const getFoundEntriesOnDate = () => {
    const hasEvents = entries[0].length > 0;
    const hasTasks = entries[1].length > 0;
    return [hasEvents, hasTasks];
  };

  const [hasEvents, hasTasks] = getFoundEntriesOnDate();

  if (!hasEvents && !hasTasks) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          Calendar entries for{' '}
          <Text style={styles.boldText}>{getFormattedDate()}</Text>
        </Text>
        <Text>No entries on selected date</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Calendar entries for{' '}
        <Text style={styles.boldText}>{getFormattedDate()}</Text>
      </Text>
      {hasEvents && (
        <Events
          events={entries[0]}
          styles={entryStyles}
          functions={entryFunctions}
        />
      )}
      {hasTasks && (
        <Tasks
          tasks={entries[1]}
          styles={entryStyles}
          functions={entryFunctions}
        />
      )}
    </View>
  );
}

export default DailyEntryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
