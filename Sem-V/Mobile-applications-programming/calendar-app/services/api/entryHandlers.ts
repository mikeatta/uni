import axios from 'axios'
import GoogleAuthService from '../auth/GoogleAuthService'
import {
  CALENDAR_ENDPOINT,
  CALENDAR_ID,
  CURRENT_TIME,
  PRIMARY_TASKLIST,
  TASKS_ENDPOINT,
} from './apiConstants'
import { CalendarEvent, CalendarTask } from '../../components/types'
import { formatDueDateToISO8601UTC } from '../../utils/helpers/dateTimeHelpers'

export const addRemoteEvent = async (newEvent: CalendarEvent) => {
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

export const addRemoteTask = async (newTask: CalendarTask) => {
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

export const editRemoteEvent = async (event: CalendarEvent) => {
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

export const editRemoteTask = async (
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

const toggleTaskStatus = (task: CalendarTask): CalendarTask =>
  task.status === 'needsAction'
    ? { ...task, status: 'completed' }
    : { ...task, status: 'needsAction' }

// Update the completion status of a task (completed / needsAction)
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

export const removeRemoteEvent = async (id: string) => {
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

export const removeRemoteTask = async (id: string) => {
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

// TODO: Get the returned entry type with TypeScript features
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

export const getCalendarEvents = async () => {
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

export const getCalendarTasklists = async () => {
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

export const getCalendarTasks = async () => {
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
