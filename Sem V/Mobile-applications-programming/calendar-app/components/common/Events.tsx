import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { CalendarEvent, FormData } from '../types';
import Icon from 'react-native-vector-icons/Ionicons';
import ConfirmationBox from '../overlays/ConfirmationBox';
import EditBox from '../overlays/EditBox';
import DetailsBox from '../overlays/DetailsBox';

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
  const [visibility, setVisibility] = useState<{
    [key: string]: { edit: boolean; confirm: boolean; details: boolean };
  }>({});

  const toggleVisibility = (
    eventId: string,
    type: 'edit' | 'confirm' | 'details',
  ) => {
    setVisibility((prevState) => ({
      ...prevState,
      [eventId]: {
        ...prevState[eventId],
        [type]: !prevState[eventId]?.[type],
      },
    }));
  };

  const convertToFormData = (event: CalendarEvent): FormData => {
    return {
      id: event.id,
      title: event.summary,
      description: event.description,
      start: {
        dateTime: new Date(event.start.dateTime),
        timeZone: event.start.timeZone,
      },
      end: {
        dateTime: new Date(event.end.dateTime),
        timeZone: event.end.timeZone,
      },
      type: 'event',
    };
  };

  const handleEventEdit = (event: FormData) => {
    functions.onEdit(event);
    toggleVisibility(event.id, 'edit');
  };

  const handleEventRemoval = (eventId: string) => {
    functions.onRemove(eventId, 'event');
    toggleVisibility(eventId, 'confirm');
  };

  return (
    <View>
      <Text style={styles?.textHeader}>Events:</Text>
      {events.map((event, index) => {
        const { id, summary, start } = event;
        return (
          <View key={index} style={styles?.contentContainer}>
            <TouchableOpacity
              style={styles?.content}
              activeOpacity={0.6}
              onLongPress={() => toggleVisibility(id, 'details')}
            >
              <Text>
                {new Date(start.dateTime).toLocaleDateString()} |{' '}
                {summary ? summary : 'No summary found'}
              </Text>
            </TouchableOpacity>
            <Icon
              name={'create-outline'}
              style={styles?.icon}
              size={24}
              color={'blue'}
              onPress={() => toggleVisibility(id, 'edit')}
            />
            <Icon
              name={'trash-outline'}
              style={styles?.icon}
              size={24}
              color={'red'}
              onPress={() => toggleVisibility(id, 'confirm')}
            />
            {visibility[id]?.edit && (
              <EditBox
                key={id}
                entry={convertToFormData(event)}
                isVisible={visibility[id]?.edit}
                onPressFunctions={{
                  submit: handleEventEdit,
                  cancel: () => toggleVisibility(id, 'edit'),
                }}
              />
            )}
            {visibility[id]?.confirm && (
              <ConfirmationBox
                isVisible={visibility[id]?.confirm}
                alertMessage={'delete the event'}
                onPressFunctions={{
                  confirm: () => handleEventRemoval(id),
                  cancel: () => toggleVisibility(id, 'confirm'),
                }}
              />
            )}
            {visibility[id]?.details && (
              <DetailsBox
                entry={convertToFormData(event)}
                isVisible={visibility[id]?.details}
                onPressFunctions={{
                  close: () => toggleVisibility(id, 'details'),
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
