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
