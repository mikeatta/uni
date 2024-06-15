import React from 'react'
import {
  CalendarEvent,
  CalendarTask,
  ICalendarData,
} from '../../components/types'
import { getDataType } from '../../utils/helpers'

export const addLocalEntry = async (
  submittedEntry: CalendarEvent | CalendarTask,
  setCalendarData: React.Dispatch<React.SetStateAction<ICalendarData>>,
) => {
  try {
    const entryType = getDataType(submittedEntry)

    if (entryType === 'event') {
      setCalendarData((prevLocalData) => {
        const updatedEvents = [
          ...prevLocalData.events,
          submittedEntry as CalendarEvent,
        ]

        return {
          ...prevLocalData,
          events: updatedEvents,
        }
      })
    } else if (entryType === 'task') {
      setCalendarData((prevLocalData) => {
        const updatedTasks = [
          ...prevLocalData.tasks,
          submittedEntry as CalendarTask,
        ]

        return {
          ...prevLocalData,
          tasks: updatedTasks,
        }
      })
    }
  } catch (error) {
    console.error('Error adding entry:', error)
  }
}

export const removeLocalEntry = (
  id: string,
  type: string,
  setCalendarData: React.Dispatch<React.SetStateAction<ICalendarData>>,
) => {
  try {
    if (type === 'event') {
      setCalendarData((prevLocalData) => {
        const updatedEvents = [
          ...prevLocalData.events.filter(
            (eventToRemove) => id !== eventToRemove.id,
          ),
        ]

        return {
          ...prevLocalData,
          events: updatedEvents,
        }
      })
    } else if (type === 'task') {
      setCalendarData((prevLocalData) => {
        const updatedTasks = [
          ...prevLocalData.tasks.filter(
            (taskToRemove) => id !== taskToRemove.id,
          ),
        ]

        return {
          ...prevLocalData,
          tasks: updatedTasks,
        }
      })
    }
  } catch (error) {
    console.error('Error removing local entry:', error)
  }
}
