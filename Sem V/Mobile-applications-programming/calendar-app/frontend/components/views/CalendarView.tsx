import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { CalendarData, CalendarEvent, CalendarTask } from '../types';
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

export default function CalendarView({
  events,
  tasks,
  onStatusChange,
  onEdit,
  onRemove,
}: CalendarData) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [clickedDate, setClickedDate] = useState<string>(today);

  const initialEntries = getEntriesInRange(events, tasks, clickedDate);
  const [entriesInRange, setEntriesInRange] =
    useState<EntriesArray>(initialEntries);

  const updateDisplayedEntries = (date: string) => {
    setEntriesInRange(getEntriesInRange(events, tasks, date));
  };

  const markedDates: MarkedDates = events.reduce((markedDates, event) => {
    const startDate = format(new Date(event.start.dateTime), 'yyyy-MM-dd');
    const endDate = format(new Date(event.end.dateTime), 'yyyy-MM-dd');

    const isSingleday = startDate === endDate;
    const dateRange = getDatesBetween(
      new Date(event.start.dateTime),
      new Date(event.end.dateTime),
    );

    dateRange.forEach((date) => {
      const isStart = date === startDate;
      const isEnd = date === endDate;

      const startOverlap =
        markedDates[date] && !markedDates[date].startingDay && isStart;
      const endOverlap =
        markedDates[date] && !markedDates[date].endingDay && isEnd;
      const overlapping = startOverlap || endOverlap;

      const isAlreadyStart = isStart && markedDates[date];

      const multidayStartOverlap =
        !isSingleday &&
        markedDates[date] &&
        markedDates[date].startingDay &&
        !isStart;
      const multidayEndOverlap =
        !isSingleday &&
        markedDates[date] &&
        markedDates[date].endingDay &&
        !isEnd;

      const unsetStartEndMark = { startingDay: false, endingDay: false };

      markedDates[date] = {
        ...(markedDates[date] || { color: '#0091E6', textColor: 'white' }),
        ...(isStart && !startOverlap && { startingDay: true }),
        ...(isEnd && !endOverlap && { endingDay: true }),
        ...(isAlreadyStart && { dotColor: 'white', marked: true }),
        ...(multidayStartOverlap && { startingDay: false }),
        ...(multidayEndOverlap && { endingDay: false }),
        ...(overlapping && !isSingleday && { ...unsetStartEndMark }),
      };
    });

    return markedDates;
  }, {} as MarkedDates);

  tasks.forEach((task) => {
    const dueDate = format(task.due, 'yyyy-MM-dd');

    markedDates[dueDate] = {
      ...(markedDates[dueDate] || {}),
      marked: true,
    };
  });

  return (
    <View style={styles.container}>
      <Calendar
        markingType='period'
        markedDates={markedDates}
        onDayPress={(date) => {
          const pressedDate = date.dateString;
          updateDisplayedEntries(pressedDate);
          setClickedDate(pressedDate);
        }}
        firstDay={1}
        enableSwipeMonths={true}
      />
      <DailyEntryList
        date={clickedDate}
        entries={entriesInRange}
        entryStyles={entryStyles}
        entryFunctions={{ onStatusChange, onEdit, onRemove }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
});

const entryStyles = StyleSheet.create({
  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  icon: {
    margin: 8,
  },
});
