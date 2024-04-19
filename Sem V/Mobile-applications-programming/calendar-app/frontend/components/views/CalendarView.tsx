import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { CalendarEvent, CalendarTask, ICalendarData } from '../types';
import { MarkedDates } from 'react-native-calendars/src/types';
import { addDays, endOfDay, format, isSameDay, startOfDay } from 'date-fns';
import DailyEntryList from '../common/DailyEntryList';

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

const getDateRangeOverlap = (dateRangeArray: string[]): string[] => {
  return dateRangeArray.filter(
    (value, index) => dateRangeArray.indexOf(value) !== index,
  );
};

const getEntriesInRange = (
  events: CalendarEvent[],
  tasks: CalendarTask[],
  dateString: string,
): EntriesArray => {
  const date = new Date(dateString);

  if (isNaN(date.getDate())) {
    throw new Error('Invalid date string');
  }

  const eventsInRange = events.filter((event) => {
    const startDate = startOfDay(new Date(event.start.dateTime));
    const endDate = endOfDay(new Date(event.end.dateTime));
    return startDate <= date && date <= endDate;
  });

  const tasksInRange = tasks.filter((task) => {
    const dueDate = new Date(task.due);
    return isSameDay(date, dueDate);
  });

  return [eventsInRange, tasksInRange];
};

type EntriesArray = [CalendarEvent[], CalendarTask[]];

export default function CalendarView({ events, tasks }: ICalendarData) {
  const [entriesInRange, setEntriesInRange] = useState<EntriesArray>([[], []]);

  const [clickedDate, setClickedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  console.log(clickedDate);

  let eventDateRanges: string[][] = [];
  const markedEventDates: MarkedDates = events.reduce((acc, event) => {
    const startDate = event.start.dateTime.toString().split('T')[0];
    const endDate = event.end.dateTime.toString().split('T')[0];
    const multidayEventStart = new Date(event.start.dateTime);
    const multidayEventEnd = new Date(event.end.dateTime);

    if (startDate === endDate) {
      if (acc[startDate]) {
        acc[startDate] = { ...acc[startDate], marked: true, dotColor: 'white' };
      } else {
        acc[startDate] = { marked: true };
      }
    } else {
      // Create multi-day period marker
      const eventDateSpan = getDatesBetween(
        multidayEventStart,
        multidayEventEnd,
      );

      eventDateRanges.push(eventDateSpan);

      // Add starting marker
      if (acc[startDate]) {
        acc[startDate] = {
          color: '#0091E6',
          textColor: 'white',
          marked: true,
          dotColor: 'white',
        };
      } else {
        acc[startDate] = {
          startingDay: true,
          color: '#0091E6',
          textColor: 'white',
        };
      }

      // Fill in marked days
      eventDateSpan.forEach((date) => {
        acc[date] = { ...acc[date], color: '#0091E6', textColor: 'white' };
      });

      // Add ending marker
      acc[endDate] = { endingDay: true, color: '#0091E6', textColor: 'white' };
    }

    return acc;
  }, {} as MarkedDates);

  let overlappingEventDates: string[] = getDateRangeOverlap(
    eventDateRanges.flatMap((array) => array),
  );

  const markedTaskDates: MarkedDates = tasks.reduce((acc, task) => {
    const dueDate = task.due.split('T')[0];

    if (acc[dueDate]) {
      acc[dueDate] = { ...acc[dueDate], marked: true, dotColor: 'white' };
    } else {
      acc[dueDate] = { marked: true };
    }

    return acc;
  }, {} as MarkedDates);

  let combinedMarkedDates: MarkedDates = {};
  let eventCount = 0;
  const totalEventKeys = Object.keys(markedEventDates).length;

  for (const key in markedEventDates) {
    eventCount++;

    if (markedTaskDates[key]) {
      combinedMarkedDates[key] = {
        ...markedEventDates[key],
        ...markedTaskDates[key],
      };
    } else if (
      // Overlapping event with the same ending day
      markedEventDates[key].endingDay === true &&
      eventCount === totalEventKeys &&
      overlappingEventDates.includes(key)
    ) {
      combinedMarkedDates[key] = { ...markedEventDates[key], endingDay: true };
    } else if (
      // Overlapping ending day within another event
      markedEventDates[key].endingDay === true &&
      overlappingEventDates.includes(key)
    ) {
      combinedMarkedDates[key] = { ...markedEventDates[key], endingDay: false };
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
        onDayPress={(date) => {
          const pressedDate = date.dateString;
          console.log('Pressed date:', pressedDate);
          setEntriesInRange(getEntriesInRange(events, tasks, pressedDate));
          setClickedDate(pressedDate);
        }}
        firstDay={1}
        enableSwipeMonths={true}
      />
      <DailyEntryList date={clickedDate} entries={entriesInRange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
});
