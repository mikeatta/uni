import { CalendarEvent, CalendarTask, FormData } from '../../components/types'

/**
 * Determines the type of a calendar entry.
 *
 * @param entry The calendar entry to check, which can be either a CalendarEvent or CalendarTask.
 * @returns The type of the calendar entry, either 'event' or 'task'.
 * @throws {Error} If the provided entry is of an unknown type.
 */
export const getDataType = (entry: CalendarEvent | CalendarTask) => {
  if (isCalendarEvent(entry)) {
    return 'event'
  } else if (isCalendarTask(entry)) {
    return 'task'
  } else {
    throw Error('Unknown type of submitted entry')
  }
}

/**
 * Type guard to check if a calendar entry is a CalendarEvent.
 *
 * @param entry The calendar entry to check.
 * @returns True if the entry is a CalendarEvent, false otherwise.
 */
function isCalendarEvent(
  entry: CalendarEvent | CalendarTask,
): entry is CalendarEvent {
  return (entry as CalendarEvent).summary !== undefined
}

/**
 * Type guard to check if a calendar entry is a CalendarTask.
 *
 * @param entry The calendar entry to check.
 * @returns True if the entry is a CalendarTask, false otherwise.
 */
function isCalendarTask(
  entry: CalendarEvent | CalendarTask,
): entry is CalendarTask {
  return (entry as CalendarTask).title !== undefined
}

/**
 * Converts form data into a calendar entry object.
 *
 * Converts a FormData object (likely from a form) into either a CalendarEvent or CalendarTask.
 * For tasks, the status is initialized to 'needsAction'.
 *
 * @param formData The form data to convert.
 * @returns A CalendarEvent or CalendarTask object.
 * @throws {Error} If the form data type is undefined.
 */
export const toCalendarEntry = (
  formData: FormData,
): CalendarEvent | CalendarTask => {
  const { id, title, description, start, end, type } = formData

  if (type === 'event') {
    return {
      id: id,
      summary: title,
      description: description,
      start: {
        dateTime: start.dateTime,
        timeZone: start.timeZone,
      },
      end: {
        dateTime: end.dateTime,
        timeZone: end.timeZone,
      },
    }
  } else if (type === 'task') {
    return {
      id: id,
      title: title,
      notes: description,
      status: 'needsAction', // Set status to 'needsAction' for new tasks
      due: start.dateTime.toString(),
    }
  } else {
    throw Error('Undefined type of formData object')
  }
}

/**
 * Converts a calendar entry into form data.
 *
 * Transforms a CalendarEvent or CalendarTask object into a FormData object, suitable for use in a form.
 *
 * @param calendarEntry The calendar entry to convert.
 * @returns A FormData object representing the calendar entry.
 * @throws {Error} If the calendar entry type cannot be converted.
 */
export const toFormData = (
  calendarEntry: CalendarEvent | CalendarTask,
): FormData => {
  const entryType = getDataType(calendarEntry)

  if (entryType === 'event') {
    const tempEntry = calendarEntry as CalendarEvent

    return {
      id: tempEntry.id,
      title: tempEntry.summary,
      description: tempEntry.description || '',
      start: {
        dateTime: new Date(tempEntry.start.dateTime),
        timeZone: tempEntry.start.timeZone,
      },
      end: {
        dateTime: new Date(tempEntry.end.dateTime),
        timeZone: tempEntry.end.timeZone,
      },
      type: 'event' as const,
    }
  } else if (entryType === 'task') {
    const tempEntry = calendarEntry as CalendarTask

    const startPropertyFromDue = {
      dateTime: new Date(tempEntry.due),
      timeZone: new Date().getTimezoneOffset().toString(),
    }

    return {
      id: tempEntry.id,
      title: tempEntry.title,
      description: tempEntry.notes || '',
      start: startPropertyFromDue,
      end: startPropertyFromDue,
      type: 'task' as const,
    }
  } else {
    throw Error('Failed to convert entry to FormData type')
  }
}
