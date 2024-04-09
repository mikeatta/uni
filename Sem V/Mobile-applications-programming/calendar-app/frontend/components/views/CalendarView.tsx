import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Calendar } from 'react-native-calendars';
import { ICalendarData } from '../types';
import { MarkedDates } from 'react-native-calendars/src/types';
import { addDays, endOfDay, format, startOfDay } from 'date-fns';

const getDatesBetween = (startDate: Date, endDate: Date): string[] => {
  const normalizedStart = startOfDay(startDate);
  const normalizedEnd = endOfDay(endDate);

  if (normalizedStart > normalizedEnd) {
    throw new Error('Event start date cannot be greater than the end date');
  }

  const dates: string[] = [];
  let currentDate = normalizedStart;

  while (currentDate <= normalizedEnd) {
    dates.push(format(currentDate, 'yyyy-MM-dd'));
    currentDate = addDays(currentDate, 1); // Move to the next day
  }

  return dates;
};

export default function CalendarView({ events, tasks }: ICalendarData) {
  const markedEventDates: MarkedDates = events.reduce((acc, event) => {
    const startDate = event.start.dateTime.toString().split('T')[0];
    const endDate = event.end.dateTime.toString().split('T')[0];
    const multidayEventStart = new Date(event.start.dateTime);
    const multidayEventEnd = new Date(event.end.dateTime);

    if (startDate === endDate) {
      acc[startDate] = { marked: true };
    } else {
      // Create multi-day period marker
      const eventDateSpan = getDatesBetween(
        multidayEventStart,
        multidayEventEnd,
      );

      // Add starting marker
      acc[startDate] = {
        startingDay: true,
        color: '#0091E6',
        textColor: 'white',
      };

      // Fill in marked days
      eventDateSpan.forEach((date) => {
        acc[date] = { ...acc[date], color: '#0091E6', textColor: 'white' };
      });

      // Add ending marker
      acc[endDate] = { endingDay: true, color: '#0091E6', textColor: 'white' };
    }

    return acc;
  }, {} as MarkedDates);

  const markedTaskDates: MarkedDates = tasks.reduce((acc, task) => {
    const dueDate = task.due.split('T')[0];

    if (acc[dueDate]) {
      acc[dueDate] = { ...acc[dueDate], marked: true };
    } else {
      acc[dueDate] = { marked: true };
    }

    return acc;
  }, {} as MarkedDates);

  let combinedMarkedDates: MarkedDates = {};

  for (const key in markedEventDates) {
    if (markedTaskDates[key]) {
      combinedMarkedDates[key] = {
        ...markedEventDates[key],
        ...markedTaskDates[key],
      };
    } else {
      combinedMarkedDates[key] = markedEventDates[key];
    }
  }

  for (const key in markedTaskDates) {
    if (!combinedMarkedDates[key]) {
      combinedMarkedDates[key] = markedTaskDates[key];
    }
  }

  return (
    <View style={styles.container}>
      <Calendar
        markingType='period'
        markedDates={combinedMarkedDates}
        firstDay={1}
        enableSwipeMonths={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
});
