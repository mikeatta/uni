import axios from 'axios'
import {
  CalendarEvent,
  CalendarTask,
  FormData,
  ICalendarData,
} from '../../components/types'

// Local development address
const LOCAL_URL = 'http://10.0.2.2:3001'

export const returnSubmittedEntry = async (
  entryToReturn: FormData,
  updatedData: ICalendarData,
): Promise<CalendarEvent | CalendarTask> => {
  try {
    const { id, title, description, type } = entryToReturn

    const normalizeEmptyString = (string: string | null | undefined) =>
      string === null || string === undefined || string === '' ? null : string

    if (type === 'event') {
      const foundEvent = updatedData.events.find(
        (newEvent: CalendarEvent) =>
          newEvent.id !== id &&
          normalizeEmptyString(newEvent.summary) ===
            normalizeEmptyString(title) &&
          normalizeEmptyString(newEvent.description) ===
            normalizeEmptyString(description),
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
            normalizeEmptyString(description),
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
    await axios.post(`${LOCAL_URL}/api/v1/calendar/new-entry`, formData)
  } catch (error) {
    console.error('Error submitting form data:', error)
    throw error
  }
}

// Modify existing entry data
export const editRemoteEntry = async (formData: FormData) => {
  try {
    await axios.patch(`${LOCAL_URL}/api/v1/calendar/modify-entry`, formData)
  } catch (error) {
    console.error('Error editing the entry:', error)
  }
}

// Remove specified entry
export const removeRemoteEntry = async (id: string, type: string) => {
  try {
    await axios.delete(`${LOCAL_URL}/api/v1/calendar/remove-entry`, {
      data: { id, type },
    })
  } catch (error) {
    console.error('Error removing the entry:', error)
  }
}

// Change the completion status of a task (completed / needsAction)
export const updateRemoteTaskStatus = async (taskData: CalendarTask) => {
  try {
    await axios.patch(
      `${LOCAL_URL}/api/v1/calendar/update-task-status`,
      taskData,
    )
  } catch (error) {
    console.error('Error changing task status:', error)
  }
}

export const fetchGoogleCalendarData = async () => {
  try {
    const response = await axios.get(`${LOCAL_URL}/api/v1/calendar`)
    const calendarData: ICalendarData = response.data
    return calendarData
  } catch (error) {
    console.error('Error fetching calendar data:', error)
    throw Error
  }
}
