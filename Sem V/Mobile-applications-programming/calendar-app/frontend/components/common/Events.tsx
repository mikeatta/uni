import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';
import { CalendarEvent } from '../types';

type CalendarEventProps = {
  events: CalendarEvent[];
  styles?: {
    entryTextHeader: StyleProp<TextStyle>;
    entryBody: StyleProp<TextStyle>;
  };
};

function Events({ events, styles }: CalendarEventProps) {
  return (
    <View>
      <Text style={styles?.entryTextHeader}>Events:</Text>
      {events.map((event, index) => {
        const { summary, description, start, end } = event;
        return (
          <View key={index} style={styles?.entryBody}>
            <Text>
              {new Date(start.dateTime).toLocaleString()} :{' '}
              {new Date(end.dateTime).toLocaleString()} | {summary}{' '}
              {description && `- ${description}`}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default Events;
