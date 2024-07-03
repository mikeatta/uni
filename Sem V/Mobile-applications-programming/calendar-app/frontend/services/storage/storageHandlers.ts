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
  offlineEntry: CalendarEvent | CalendarTask,
  submittedEntry: CalendarEvent | CalendarTask,
  setData: React.Dispatch<React.SetStateAction<ICalendarData>>,
) => {
  try {
    const entryType = getDataType(submittedEntry)

    const normalizeDateTime = (dateTime: Date) =>
      new Date(dateTime).toISOString()

    if (entryType === 'event') {
      const offlineEvent = offlineEntry as CalendarEvent
      const googleEvent = submittedEntry as CalendarEvent

      setData((prevData) => {
        const isMatchingEntry = (
          eventToMatch: CalendarEvent,
          eventToCheck: CalendarEvent,
        ) => {
          return Object.keys(eventToMatch).every((key) => {
            if (key === 'start' || key === 'end') {
              return (
                normalizeDateTime(eventToMatch[key].dateTime) ===
                  normalizeDateTime(eventToCheck[key].dateTime) &&
                eventToMatch[key].timeZone === eventToCheck[key].timeZone
              )
            }
            return (
              eventToMatch[key as keyof typeof eventToCheck] ===
              eventToCheck[key as keyof typeof eventToCheck]
            )
          })
        }

        const offlineEventIndex = prevData.events.findIndex((event) =>
          isMatchingEntry(offlineEvent, event),
        )

        // Overwrite the offline entry
        if (offlineEventIndex !== -1) {
          const updatedEvents = [...prevData.events]
          updatedEvents[offlineEventIndex] = googleEvent

          return { ...prevData, events: updatedEvents }
        }


        return prevData
      })
    } else if (entryType === 'task') {
      const offlineTask = offlineEntry as CalendarTask
      const googleTask = submittedEntry as CalendarTask

      setData((prevData) => {
        const isMatchingEntry = (
          taskToMatch: CalendarTask,
          taskToCheck: CalendarTask,
        ) => {
          return Object.keys(taskToMatch).every(
            (key) =>
              taskToMatch[key as keyof typeof taskToCheck] ===
              taskToCheck[key as keyof typeof taskToCheck],
          )
        }

        const offlineTaskIndex = prevData.tasks.findIndex((task) =>
          isMatchingEntry(offlineTask, task),
        )

        if (offlineTaskIndex !== -1) {
          const updatedTasks = [...prevData.tasks]
          updatedTasks[offlineTaskIndex] = googleTask

          return { ...prevData, tasks: updatedTasks }
        }


        return prevData
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
