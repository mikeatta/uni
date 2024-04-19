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
    <View>
      <Text>Entries on {getFormattedDate()}</Text>
      {hasEvents && (
        <View>
          <Text>Events:</Text>
          {entries[0].map((event, index) => {
            const startTime = new Date(event.start.dateTime)
              .toTimeString()
              .split(' ')[0];
            const summary = event.summary;
            return (
              <View key={index}>
                <Text>
                  #{index + 1} {startTime} | {summary}
                </Text>
              </View>
            );
          })}
        </View>
      )}
      {hasTasks && (
        <View>
          <Text>Tasks:</Text>
          {entries[1].map((task, index) => {
            const title = task.title;
            const status = task.status;
            return (
              <View key={index}>
                <Text>
                  #{index + 1} {status} | {title}
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

const styles = StyleSheet.create({});
