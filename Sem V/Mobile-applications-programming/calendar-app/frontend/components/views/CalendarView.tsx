import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { CalendarData, CalendarEvent, CalendarTask } from '../types';
import { DateData, MarkedDates } from 'react-native-calendars/src/types';
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
) => {
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

  return { eventsInRange, tasksInRange };
};

type EntriesInRange = {
  eventsInRange: CalendarEvent[];
  tasksInRange: CalendarTask[];
};

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
    useState<EntriesInRange>(initialEntries);

  const updateDisplayedEntries = (date: string) => {
    setEntriesInRange(getEntriesInRange(events, tasks, date));
  };

  const markedDates: MarkedDates = events.reduce((calendarMarks, event) => {
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
        calendarMarks[date] && !calendarMarks[date].startingDay && isStart;

      const endOverlap =
        calendarMarks[date] && !calendarMarks[date].endingDay && isEnd;

      const overlapping = startOverlap || endOverlap;

      const isAlreadyStart = isStart && calendarMarks[date];

      const multidayStartOverlap =
        !isSingleday &&
        calendarMarks[date] &&
        calendarMarks[date].startingDay &&
        !isStart;

      const multidayEndOverlap =
        !isSingleday &&
        calendarMarks[date] &&
        calendarMarks[date].endingDay &&
        !isEnd;

      const unsetStartEndMark = { startingDay: false, endingDay: false };

      calendarMarks[date] = {
        ...(calendarMarks[date] || { color: '#0091E6', textColor: 'white' }),
        ...(isStart && !startOverlap && { startingDay: true }),
        ...(isEnd && !endOverlap && { endingDay: true }),
        ...(isAlreadyStart && { dotColor: 'white', marked: true }),
        ...(multidayStartOverlap && { startingDay: false }),
        ...(multidayEndOverlap && { endingDay: false }),
        ...(overlapping && !isSingleday && { ...unsetStartEndMark }),
      };
    });

    return calendarMarks;
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
        markingType={'period'}
        markedDates={markedDates}
        onDayPress={(date: DateData) => {
          const pressedDate = date.dateString;
          updateDisplayedEntries(pressedDate);
          setClickedDate(pressedDate);
        }}
        firstDay={1}
        enableSwipeMonths={true}
      />
      <DailyEntryList
        date={clickedDate}
        entries={{ events, tasks }}
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
