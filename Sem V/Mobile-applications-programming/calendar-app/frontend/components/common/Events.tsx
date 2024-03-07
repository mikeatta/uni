import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CalendarEvent } from '../types';

type CalendarEventProps = {
  events: CalendarEvent[];
};

function Events({ events }: CalendarEventProps) {
  return (
    <View>
      <Text>Events:</Text>
      {events.map((event, index) => {
        const { summary, description, start, end } = event;
        return (
          <View key={index}>
            <Text>
              {new Date(start.dateTime).toLocaleTimeString()} :{' '}
              {new Date(end.dateTime).toLocaleTimeString()} | {summary} -{' '}
              {description}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default Events;

const styles = StyleSheet.create({});
