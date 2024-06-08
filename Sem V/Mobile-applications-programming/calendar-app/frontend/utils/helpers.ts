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
