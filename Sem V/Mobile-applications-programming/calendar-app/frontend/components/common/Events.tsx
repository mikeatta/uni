import { StyleProp, Text, TextStyle, View } from 'react-native';
import React, { useState } from 'react';
import { CalendarEvent } from '../types';
import Icon from 'react-native-vector-icons/Ionicons';
import ConfirmationBox from '../overlays/ConfirmationBox';

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
  const [isBoxVisible, setIsBoxVisible] = useState<boolean>(false);

  const handleConfirmationBox = () => setIsBoxVisible(!isBoxVisible);

  const handleEventRemoval = (eventId: string) => {
    functions.onRemove(eventId, 'event');
    handleConfirmationBox(); // Close ConfirmationBox
  };

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
              onPress={handleConfirmationBox}
            />
            <ConfirmationBox
              isVisible={isBoxVisible}
              alertMessage='delete the task'
              onPressFunctions={{
                confirm: () => handleEventRemoval(event.id),
                cancel: handleConfirmationBox,
              }}
            />
          </View>
        );
      })}
    </View>
  );
}

export default Events;
