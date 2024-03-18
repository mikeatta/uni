import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import Events from '../common/Events';
import Tasks from '../common/Tasks';
import { CalendarData } from '../types';

export default function ListView({ events, tasks }: CalendarData) {
  return (
    <View>
      <ScrollView>
        <Events events={events} styles={styles} />
        <Tasks tasks={tasks} styles={styles} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  entryTextHeader: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  entryBody: {
    fontSize: 12,
    padding: 10,
    marginBottom: 10,
    borderColor: '#808080',
    borderRadius: 10,
    borderWidth: 1,
  },
});
