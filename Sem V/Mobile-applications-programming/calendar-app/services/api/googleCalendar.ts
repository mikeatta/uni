import axios from 'axios'
import {
  CalendarEvent,
  CalendarTask,
  EntryTypes,
  FormData,
  ICalendarData,
} from '../../components/types'
import GoogleAuthService from '../auth/GoogleAuthService'
import {
  getDataType,
  toCalendarEntry,
} from '../../utils/helpers/dataTypeHelpers'

type PrimaryTasklistProps = {
  id: string | null | undefined
  title: string | null | undefined
}

const CURRENT_TIME = new Date().toISOString()
const PRIMARY_TASKLIST: PrimaryTasklistProps = {
  id: null,
  title: null,
}

const CALENDAR_ENDPOINT = 'https://www.googleapis.com/calendar/v3'
const TASKS_ENDPOINT = 'https://tasks.googleapis.com/tasks/v1'
const CALENDAR_ID = 'primary'

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

const addRemoteEvent = async (newEvent: CalendarEvent) => {
  try {
    const accessToken = GoogleAuthService.getAccessToken()

    if (!accessToken) {
      throw Error('No access token available')
    }

    const response = await axios.post(
      `${CALENDAR_ENDPOINT}/calendars/${CALENDAR_ID}/events`,
      newEvent,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.status
  } catch (error) {
    console.error('Failed to add remote event:', error)
  }
}

const formatDueDateToISO8601UTC = (task: CalendarTask) => {
  const formattedDueDate = new Date(task.due).toISOString()
  return { ...task, due: formattedDueDate }
}

const addRemoteTask = async (newTask: CalendarTask) => {
  try {
    const accessToken = GoogleAuthService.getAccessToken()

    if (!accessToken) {
      throw Error('No access token available')
    }

    const formattedDueDateTask = formatDueDateToISO8601UTC(newTask)

    const response = await axios.post(
      `${TASKS_ENDPOINT}/lists/${PRIMARY_TASKLIST.id}/tasks`,
      formattedDueDateTask,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.status
  } catch (error) {
    console.error('Failed to add remote task:', error)
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

const editRemoteEvent = async (event: CalendarEvent) => {
  try {
    const accessToken = GoogleAuthService.getAccessToken()
    const { id } = event
    const response = await axios.patch(
      `${CALENDAR_ENDPOINT}/calendars/${CALENDAR_ID}/events/${id}`,
      event,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.status
  } catch (error) {
    console.error('Failed to edit remote event:', error)
  }
}

const editRemoteTask = async (
  task: CalendarTask,
  taskStatus: 'needsAction' | 'completed',
) => {
  try {
    const accessToken = GoogleAuthService.getAccessToken()
    const { id } = task

    const editedTask = { ...task, status: taskStatus }
    const formattedDueDate = formatDueDateToISO8601UTC(editedTask)

    const response = await axios.patch(
      `${TASKS_ENDPOINT}/lists/${PRIMARY_TASKLIST.id}/tasks/${id}`,
      formattedDueDate,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.status
  } catch (error) {
    console.error('Failed to edit remote task:', error)
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

const removeRemoteEvent = async (id: string) => {
  try {
    const accessToken = GoogleAuthService.getAccessToken()
    const response = await axios.delete(
      `${CALENDAR_ENDPOINT}/calendars/${CALENDAR_ID}/events/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.status
  } catch (error) {
    console.error('Failed to delete remote event:', error)
  }
}

const removeRemoteTask = async (id: string) => {
  try {
    const accessToken = GoogleAuthService.getAccessToken()
    const response = await axios.delete(
      `${TASKS_ENDPOINT}/lists/${PRIMARY_TASKLIST.id}/tasks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.status
  } catch (error) {
    console.error('Failed to delete remote event:', error)
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

const toggleTaskStatus = (task: CalendarTask): CalendarTask =>
  task.status === 'needsAction'
    ? { ...task, status: 'completed' }
    : { ...task, status: 'needsAction' }

// Change the completion status of a task (completed / needsAction)
export const updateRemoteTaskStatus = async (taskData: CalendarTask) => {
  try {
    const accessToken = GoogleAuthService.getAccessToken()
    const { id } = taskData

    const updatedTaskStatus = toggleTaskStatus(taskData)
    const formattedDueDateTask = formatDueDateToISO8601UTC(updatedTaskStatus)

    const response = await axios.patch(
      `${TASKS_ENDPOINT}/lists/${PRIMARY_TASKLIST.id}/tasks/${id}`,
      formattedDueDateTask,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.status
  } catch (error) {
    console.error('Error changing task status:', error)
  }
}

const convertGoogleEventToCalendarEvent = (event: any): CalendarEvent => {
  return {
    id: event.id || '',
    summary: event.summary || '',
    description: event.description || '',
    start: {
      dateTime: event.start?.dateTime,
      timeZone: event.start?.timeZone,
    },
    end: {
      dateTime: event.end?.dateTime,
      timeZone: event.end?.timeZone,
    },
  }
}

const getCalendarEvents = async () => {
  try {
    const accessToken = GoogleAuthService.getAccessToken()

    if (!accessToken) {
      throw Error('No access token available')
    }

    const params = {
      timeMin: CURRENT_TIME,
      maxResults: 10,
      singleEvents: true,
    }

    const response = await axios.get(
      `${CALENDAR_ENDPOINT}/calendars/${CALENDAR_ID}/events`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: params,
      },
    )

    const events = response.data.items
    if (!events || events.length === 0) {
      return
    }

    const convertedEvents: CalendarEvent[] = events.map((event: any) =>
      convertGoogleEventToCalendarEvent(event),
    )

    return convertedEvents
  } catch (error) {
    console.error('Error getting calendar events:', error)
  }
}

const getCalendarTasklists = async () => {
  try {
    const accessToken = GoogleAuthService.getAccessToken()

    if (!accessToken) {
      throw Error('No access token available')
    }

    const params = {
      maxResults: 10,
    }

    const response = await axios.get(`${TASKS_ENDPOINT}/users/@me/lists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: params,
    })

    const tasklists = response.data.items
    if (!tasklists || tasklists.length === 0) {
      return
    }

    // Assign first found tasklist as the default
    let defaultTaskList = tasklists[0]
    if (tasklists.length > 1) {
      // Find the default tasklist with the title of 'My Tasks'
      for (const tasklist of tasklists) {
        if (tasklist.title === 'My Tasks') {
          defaultTaskList = tasklist
          break
        }
      }
    }

    // Update the primary tasklist properties
    PRIMARY_TASKLIST.id = defaultTaskList.id
    PRIMARY_TASKLIST.title = defaultTaskList.title

    // Return the first found tasklist as a fallback primary tasklist
    return defaultTaskList
  } catch (error) {
    console.error('Error getting calendar tasklists:', error)
  }
}

const getCalendarTasks = async () => {
  try {
    if (PRIMARY_TASKLIST.id === null || PRIMARY_TASKLIST.title === null) {
      throw Error('No primary tasklist found')
    }

    const accessToken = GoogleAuthService.getAccessToken()

    if (!accessToken) {
      throw Error('No access token available')
    }

    const params = {
      dueMin: CURRENT_TIME,
      maxResults: 10,
    }

    const response = await axios.get(
      `${TASKS_ENDPOINT}/lists/${PRIMARY_TASKLIST.id}/tasks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: params,
      },
    )

    const tasks = response.data.items
    if (!tasks || tasks.length === 0) {
      return
    }

    tasks.map((task: any) => {
      task.title = task.title ? task.title : null
      task.notes = task.notes ? task.notes : null
      return task
    })

    return tasks as CalendarTask[]
  } catch (error) {
    console.error('Error getting calendar tasks:', error)
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
