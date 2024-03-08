import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import Events from '../common/Events';
import CalendarTasks from '../common/Tasks';
import { CalendarData } from '../types';

export default function ListView({ events, tasks }: CalendarData) {
  return (
    <ScrollView>
      <Events events={events} />
      <CalendarTasks tasks={tasks} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
