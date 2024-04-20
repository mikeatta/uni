import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CalendarEvent, CalendarTask } from '../types';

type DailyEntryListProps = {
  date: string;
  entries: [CalendarEvent[], CalendarTask[]];
};

function DailyEntryList({ date, entries }: DailyEntryListProps) {
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
      <View>
        <Text>No entries on selected date / No date selected</Text>
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
        <View style={styles.eventContainer}>
          <Text style={styles.subheaderText}>Events ({entries[0].length})</Text>
          {entries[0].map((event, index) => {
            const startTime = new Date(event.start.dateTime)
              .toTimeString()
              .split(' ')[0];
            const summary = event.summary ?? 'No summary found';
            return (
              <View key={index}>
                <Text>
                  {startTime} | {summary}
                </Text>
              </View>
            );
          })}
        </View>
      )}
      {hasTasks && (
        <View style={styles.taskContainer}>
          <Text style={styles.subheaderText}>Tasks ({entries[1].length})</Text>
          {entries[1].map((task, index) => {
            const title = task.title ?? 'No title found';
            const status = task.status;
            return (
              <View key={index}>
                <Text>
                  {status} | {title}
                </Text>
              </View>
            );
          })}
        </View>
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
  eventContainer: {
    marginBottom: 10,
  },
  taskContainer: {},
  subheaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 1,
  },
});
