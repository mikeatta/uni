import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';
import { CalendarEvent, CalendarTask, FormData } from '../types';
import Events from './Events';
import Tasks from './Tasks';
import { endOfDay, isSameDay, startOfDay } from 'date-fns';

type DailyEntryListProps = {
  date: string;
  entries: {
    events: CalendarEvent[];
    tasks: CalendarTask[];
  };
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

  const getEntriesInRange = () => {
    const selectedDate = new Date(date);

    if (isNaN(selectedDate.getDate())) {
      throw new Error('Invalid date string');
    }

    const eventsInRange = entries.events.filter((event) => {
      const startDate = startOfDay(new Date(event.start.dateTime));
      const endDate = endOfDay(new Date(event.end.dateTime));
      return startDate <= selectedDate && selectedDate <= endDate;
    });

    const tasksInRange = entries.tasks.filter((task) => {
      const dueDate = new Date(task.due);
      return isSameDay(selectedDate, dueDate);
    });

    return { eventsInRange, tasksInRange };
  };

  const getFoundEntriesOnDate = () => {
    const hasEvents = eventsInRange.length > 0;
    const hasTasks = tasksInRange.length > 0;
    return [hasEvents, hasTasks];
  };

  const { eventsInRange, tasksInRange } = getEntriesInRange();

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
          events={eventsInRange}
          styles={entryStyles}
          functions={entryFunctions}
        />
      )}
      {hasTasks && (
        <Tasks
          tasks={tasksInRange}
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
