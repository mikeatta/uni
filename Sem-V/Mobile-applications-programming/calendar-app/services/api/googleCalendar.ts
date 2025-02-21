import {
  getCalendarEvents,
  getCalendarTasklists,
  getCalendarTasks,
} from '../api/entryHandlers'
import {
  CalendarEvent,
  CalendarTask,
  EntryTypes,
  FormData,
  ICalendarData,
} from '../../components/types'
import {
  getDataType,
  toCalendarEntry,
} from '../../utils/helpers/dataTypeHelpers'
import {
  addRemoteEvent,
  addRemoteTask,
  editRemoteEvent,
  editRemoteTask,
  removeRemoteEvent,
  removeRemoteTask,
} from './entryHandlers'

export const returnSubmittedEntry = (
  entryToReturn: FormData,
  updatedData: ICalendarData,
): CalendarEvent | CalendarTask => {
  try {
    const { id, title, description, start, end, type } = entryToReturn

    const normalizeEmptyString = (string: string | null | undefined) =>
      string === null || string === undefined || string === '' ? null : string

    const normalizeDateTime = (dateTime: Date) =>
      new Date(dateTime).toISOString()

    if (type === 'event') {
      const foundEvent = updatedData.events.find(
        (newEvent: CalendarEvent) =>
          newEvent.id !== id &&
          normalizeEmptyString(newEvent.summary) ===
            normalizeEmptyString(title) &&
          normalizeEmptyString(newEvent.description) ===
            normalizeEmptyString(description) &&
          normalizeDateTime(newEvent.start.dateTime) ===
            normalizeDateTime(start.dateTime) &&
          normalizeEmptyString(newEvent.start.timeZone) ===
            normalizeEmptyString(start.timeZone) &&
          normalizeDateTime(newEvent.end.dateTime) ===
            normalizeDateTime(end.dateTime) &&
          normalizeEmptyString(newEvent.end.timeZone) ===
            normalizeEmptyString(end.timeZone),
      )

      if (!foundEvent) {
        throw new Error('No outdated event found.')
      }

      return foundEvent
    } else if (type === 'task') {
      const foundTask = updatedData.tasks.find(
        (newTask: CalendarTask) =>
          newTask.id !== id &&
          normalizeEmptyString(newTask.title) === normalizeEmptyString(title) &&
          normalizeEmptyString(newTask.notes) ===
            normalizeEmptyString(description) &&
          normalizeEmptyString(newTask.due) === // ISOString format by default, no need to normalize
            normalizeEmptyString(normalizeDateTime(start.dateTime)),
      )

      if (!foundTask) {
        throw new Error('No outdated task found.')
      }

      return foundTask
    }

    throw Error('Invalid entry type')
  } catch (error) {
    console.error('Error getting entry ID', error)
    throw error
  }
}

// Submit new entry
export const addRemoteEntry = async (formData: FormData) => {
  try {
    const newEntry = toCalendarEntry(formData)
    const entryType = getDataType(newEntry)

    if (entryType === 'event') {
      await addRemoteEvent(newEntry as CalendarEvent)
    } else if (entryType === 'task') {
      await addRemoteTask(newEntry as CalendarTask)
    }
  } catch (error) {
    console.error('Error submitting form data:', error)
    throw error
  }
}

// Modify existing entry data
export const editRemoteEntry = async (
  formData: FormData,
  taskStatus?: 'needsAction' | 'completed',
) => {
  try {
    const newEntryData = toCalendarEntry(formData)
    const entryType = getDataType(newEntryData)

    if (entryType === 'event') {
      await editRemoteEvent(newEntryData as CalendarEvent)
    } else if (entryType === 'task') {
      if (!taskStatus) {
        throw new Error('Editing remote tasks requires the taskStatus')
      }
      await editRemoteTask(newEntryData as CalendarTask, taskStatus)
    }
  } catch (error) {
    console.error('Error editing the entry:', error)
  }
}

// Remove specified entry
export const removeRemoteEntry = async (id: string, type: EntryTypes) => {
  try {
    if (type === 'event') {
      await removeRemoteEvent(id)
    } else if (type === 'task') {
      await removeRemoteTask(id)
    }
  } catch (error) {
    console.error('Error removing the entry:', error)
  }
}

export const fetchGoogleCalendarData = async () => {
  try {
    const events = (await getCalendarEvents()) || []
    const tasklists = (await getCalendarTasklists()) || []
    const tasks = (await getCalendarTasks()) || []

    const calendarData: ICalendarData = { events, tasklists, tasks }

    return calendarData
  } catch (error) {
    console.error('Error fetching calendar data:', error)
    throw Error
  }
}
