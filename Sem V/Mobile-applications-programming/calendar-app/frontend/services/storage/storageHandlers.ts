import React from 'react'
import {
  CalendarEvent,
  CalendarTask,
  ICalendarData,
} from '../../components/types'
import { getDataType } from '../../utils/helpers'

export const addLocalEntry = async (
  submittedEntry: CalendarEvent | CalendarTask,
  setData: React.Dispatch<React.SetStateAction<ICalendarData>>,
) => {
  try {
    const entryType = getDataType(submittedEntry)

    if (entryType === 'event') {
      setData((prevData) => {
        const updatedEvents = [
          ...prevData.events,
          submittedEntry as CalendarEvent,
        ]

        return {
          ...prevData,
          events: updatedEvents,
        }
      })
    } else if (entryType === 'task') {
      setData((prevData) => {
        const updatedTasks = [...prevData.tasks, submittedEntry as CalendarTask]

        return {
          ...prevData,
          tasks: updatedTasks,
        }
      })
    }
  } catch (error) {
    console.error('Error adding entry:', error)
  }
}

export const overwriteOfflineEntry = async (
  submittedEntry: CalendarEvent | CalendarTask,
  setData: React.Dispatch<React.SetStateAction<ICalendarData>>,
) => {
  try {
    const entryType = getDataType(submittedEntry)

    if (entryType === 'event') {
      const updatedEvent = submittedEntry as CalendarEvent

      setData((prevData) => {
        const prevDataWithoutOfflineEvent = prevData.events.filter(
          (events) =>
            !(
              events.id.startsWith('offline') &&
              events.summary === updatedEvent.summary &&
              events.description === updatedEvent.description &&
              events.start.dateTime === updatedEvent.start.dateTime &&
              events.start.timeZone === updatedEvent.start.timeZone &&
              events.end.dateTime === updatedEvent.end.dateTime &&
              events.end.timeZone === updatedEvent.end.timeZone
            ),
        )

        prevDataWithoutOfflineEvent[0] = updatedEvent

        const updatedEvents = [...prevDataWithoutOfflineEvent]

        return { ...prevData, events: updatedEvents }
      })
    } else if (entryType === 'task') {
      const updatedTask = submittedEntry as CalendarTask

      setData((prevData) => {
        const prevDataWithoutOfflineTask = prevData.tasks.filter(
          (tasks) =>
            !(
              tasks.id.startsWith('offline') &&
              tasks.title === updatedTask.title &&
              tasks.notes === updatedTask.notes &&
              tasks.due === updatedTask.due &&
              tasks.status === updatedTask.status
            ),
        )

        prevDataWithoutOfflineTask[0] = updatedTask

        const updatedTasks = [...prevDataWithoutOfflineTask]

        return { ...prevData, tasks: updatedTasks }
      })
    }
  } catch (error) {
    console.error('Error overwriting offline entry:', error)
  }
}

export const removeLocalEntry = (
  id: string,
  type: string,
  setData: React.Dispatch<React.SetStateAction<ICalendarData>>,
) => {
  try {
    if (type === 'event') {
      setData((prevData) => {
        const updatedEvents = [
          ...prevData.events.filter((eventToRemove) => id !== eventToRemove.id),
        ]

        return {
          ...prevData,
          events: updatedEvents,
        }
      })
    } else if (type === 'task') {
      setData((prevData) => {
        const updatedTasks = [
          ...prevData.tasks.filter((taskToRemove) => id !== taskToRemove.id),
        ]

        return {
          ...prevData,
          tasks: updatedTasks,
        }
      })
    }
  } catch (error) {
    console.error('Error removing local entry:', error)
  }
}
