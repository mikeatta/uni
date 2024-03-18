import { StyleProp, Text, TextStyle, View } from 'react-native';
import React from 'react';
import { CalendarTask } from '../types';

type CalendarTaskProps = {
  tasks: CalendarTask[];
  styles?: {
    entryTextHeader: StyleProp<TextStyle>;
    entryBody: StyleProp<TextStyle>;
  };
};

function Tasks({ tasks, styles }: CalendarTaskProps) {
  return (
    <View>
      <Text style={styles?.entryTextHeader}>Tasks:</Text>
      {tasks.map((task, index) => {
        const { title, notes, due } = task;
        return (
          <View key={index} style={styles?.entryBody}>
            <Text>
              {new Date(due).toLocaleDateString()} | {title}{' '}
              {notes && `- ${notes}`}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default Tasks;
