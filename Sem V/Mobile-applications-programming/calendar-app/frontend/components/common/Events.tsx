import { StyleProp, Text, TextStyle, View } from 'react-native';
import React, { useState } from 'react';
import { CalendarEvent, FormData } from '../types';
import Icon from 'react-native-vector-icons/Ionicons';
import ConfirmationBox from '../overlays/ConfirmationBox';
import EditBox from '../overlays/EditBox';

type CalendarEventProps = {
  events: CalendarEvent[];
  styles?: {
    textHeader: StyleProp<TextStyle>;
    contentContainer: StyleProp<TextStyle>;
    content: StyleProp<TextStyle>;
    icon: StyleProp<TextStyle>;
  };
  functions: {
    onEdit: (formData: FormData) => Promise<void>;
    onRemove: (id: string, type: 'event') => Promise<void>;
  };
};

function Events({ events, styles, functions }: CalendarEventProps) {
  const [isEditVisible, setIsEditVisible] = useState<{
    [key: string]: boolean;
  }>({});

  const [isConfirmationVisible, setisConfirmationVisible] = useState<{
    [key: string]: boolean;
  }>({});

  const handleEditBox = (eventId: string) => {
    setIsEditVisible((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const handleConfirmationBox = (eventId: string) => {
    setisConfirmationVisible((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const convertToFormData = (event: CalendarEvent): FormData => {
    return {
      id: event.id,
      title: event.summary,
      description: event.description,
      start: event.start,
      end: event.end,
      type: 'event',
    };
  };

  const handleEventEdit = (event: FormData) => {
    functions.onEdit(event);
    handleEditBox(event.id); // Close specified EditBox
  };

  const handleEventRemoval = (eventId: string) => {
    functions.onRemove(eventId, 'event');
    handleConfirmationBox(eventId); // Close ConfirmationBox
  };

  return (
    <View>
      <Text style={styles?.textHeader}>Events:</Text>
      {events.map((event, index) => {
        const { id, summary, description, start, end } = event;
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
              onPress={() => handleEditBox(id)}
            />
            <Icon
              name='trash-outline'
              style={styles?.icon}
              size={24}
              color='red'
              onPress={() => handleConfirmationBox(id)}
            />
            {isEditVisible[id] && (
              <EditBox
                key={id}
                entry={convertToFormData(event)}
                isVisible={isEditVisible[id]}
                onPressFunctions={{
                  submit: handleEventEdit,
                  cancel: () => handleEditBox(id),
                }}
              />
            )}
            {isConfirmationVisible[id] && (
              <ConfirmationBox
                isVisible={isConfirmationVisible[id]}
                alertMessage='delete the task'
                onPressFunctions={{
                  confirm: () => handleEventRemoval(id),
                  cancel: () => handleConfirmationBox(id),
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

export default Events;
