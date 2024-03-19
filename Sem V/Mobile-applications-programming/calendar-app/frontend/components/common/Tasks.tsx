import { StyleProp, Text, TextStyle, View } from 'react-native';
import React from 'react';
import { CalendarTask } from '../types';
import Icon from 'react-native-vector-icons/Ionicons';

type CalendarTaskProps = {
  tasks: CalendarTask[];
  styles?: {
    textHeader: StyleProp<TextStyle>;
    contentContainer: StyleProp<TextStyle>;
    content: StyleProp<TextStyle>;
    icon: StyleProp<TextStyle>;
  };
};

function Tasks({ tasks, styles }: CalendarTaskProps) {
  return (
    <View>
      <Text style={styles?.textHeader}>Tasks:</Text>
      {tasks.map((task, index) => {
        const { title, notes, due } = task;
        return (
          <View key={index} style={styles?.contentContainer}>
            <Text style={styles?.content}>
              {new Date(due).toLocaleDateString()} | {title}{' '}
              {notes && `- ${notes}`}
            </Text>
            <Icon
              name={
                task.status === 'completed'
                  ? 'checkbox-outline'
                  : 'square-outline'
              }
              style={styles?.icon}
              size={24}
              color='green'
            />
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
            />
          </View>
        );
      })}
    </View>
  );
}

export default Tasks;
