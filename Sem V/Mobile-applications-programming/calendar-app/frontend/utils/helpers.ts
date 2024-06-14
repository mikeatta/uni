import { CalendarEvent, CalendarTask, FormData } from '../components/types'

/*
 * Function: 'withFunction'
 *
 * A higher-order function used for executing the specified function (passed as
 * an argument) with other functions.
 */
export const withFunction = <T extends (...args: any[]) => any>(
  finalFunction: () => void,
) => {
  return (mainFunction: T): ((...args: Parameters<T>) => Promise<void>) => {
    return async (...args: Parameters<T>) => {
      await mainFunction(...args)
      await finalFunction()
    }
  }
}

/*
 * Function: 'getDataType'
 *
 * A function returning the calendar entry data type.
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

function isCalendarEvent(
  entry: CalendarEvent | CalendarTask,
): entry is CalendarEvent {
  return (entry as CalendarEvent).summary !== undefined
}

function isCalendarTask(
  entry: CalendarEvent | CalendarTask,
): entry is CalendarTask {
  return (entry as CalendarTask).title !== undefined
}

/*
 * Function: 'toCalendarEntry'
 *
 * Converts the formData object obtained from the 'EntryForm.tsx' component
 * into a calendar entry object.
 *
 * For task entries, the 'status' field is set to 'needsAction' (incomplete).
 *
 * Return type varies based on the entry type.
 */
export const toCalendarEntry = (
  formData: FormData,
): CalendarEvent | CalendarTask => {
  const { id, title, description, start, end } = formData
  const type = formData.type

  if (type === 'event') {
    return {
      id: id,
      summary: title,
      description: description,
      start: {
        date: new Date(start.dateTime),
        dateTime: start.dateTime,
        timeZone: start.timeZone,
      },
      end: {
        date: new Date(end.dateTime),
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

/*
 * Function: 'toFormData'
 *
 * Converts and returns the provided calendar entry as a 'FormData' object.
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

/*
 * Function: 'fillTempEntryId'
 *
 * Fills the entry's ID property with a temporary ID and returns the modified
 * entry.
 *
 * The function is used for handling the creation of entries in offline mode.
 */
export const fillTempEntryId = (tempEntry: CalendarEvent | CalendarTask) => {
  tempEntry.id = generateEntryId()
  return tempEntry
}

function generateEntryId() {
  const timestamp = Date.now()
  const randomPart = Math.floor(Math.random() * 10000)
  return `offline-${randomPart}-${timestamp}`
}
