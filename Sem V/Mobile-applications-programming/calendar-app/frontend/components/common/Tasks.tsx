import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CalendarTask } from '../types';

type CalendarTaskProps = {
  tasks: CalendarTask[];
};

function Tasks({ tasks }: CalendarTaskProps) {
  return (
    <View>
      <Text>Tasks:</Text>
      {tasks.map((task, index) => {
        const { title, notes, due } = task;
        return (
          <View key={index}>
            <Text>
              {new Date(due).toLocaleDateString()} | {title} - {notes}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default Tasks;

const styles = StyleSheet.create({});
