import { StyleProp, Text, TextStyle, View } from 'react-native';
import React from 'react';
import { CalendarEvent } from '../types';
import Icon from 'react-native-vector-icons/Ionicons';

type CalendarEventProps = {
  events: CalendarEvent[];
  styles?: {
    textHeader: StyleProp<TextStyle>;
    contentContainer: StyleProp<TextStyle>;
    content: StyleProp<TextStyle>;
    icon: StyleProp<TextStyle>;
  };
  functions: {
    onEdit: (formData: CalendarEvent) => Promise<void>;
    onRemove: (id: string, type: 'event') => Promise<void>;
  };
};

function Events({ events, styles, functions }: CalendarEventProps) {
  return (
    <View>
      <Text style={styles?.textHeader}>Events:</Text>
      {events.map((event, index) => {
        const { summary, description, start, end } = event;
        return (
          <View key={index} style={styles?.contentContainer}>
            <Text style={styles?.content}>
              {new Date(start.dateTime).toLocaleString()} :{' '}
              {new Date(end.dateTime).toLocaleString()} | {summary}{' '}
              {description && `- ${description}`}
            </Text>
            <Icon
              name='create-outline'
              style={styles?.icon}
              size={24}
              color='blue'
            />
            <Icon
              name='trash-outline'
              style={styles?.icon}
              size={24}
              color='red'
              onPress={() => functions.onRemove(event.id, 'event')}
            />
          </View>
        );
      })}
    </View>
  );
}

export default Events;
