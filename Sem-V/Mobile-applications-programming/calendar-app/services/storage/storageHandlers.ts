import React from 'react'
import {
  CalendarEvent,
  CalendarTask,
  ICalendarData,
} from '../../components/types'
import { getDataType } from '../../utils/helpers/dataTypeHelpers'

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

export const editLocalEntry = async (
  submittedEntry: CalendarEvent | CalendarTask,
  setData: React.Dispatch<React.SetStateAction<ICalendarData>>,
) => {
  try {
    const entryType = await getDataType(submittedEntry)

    const matchEntryById = (
      entryToMatch: CalendarEvent | CalendarTask,
      entryToCheck: CalendarEvent | CalendarTask,
    ) => entryToMatch.id === entryToCheck.id

    if (entryType === 'event') {
      const updatedEvent = submittedEntry as CalendarEvent

      setData((prevData) => {
        const outdatedEventIndex = prevData.events.findIndex((event) =>
          matchEntryById(updatedEvent, event),
        )

        if (outdatedEventIndex !== -1) {
          const updatedEvents = [...prevData.events]
          updatedEvents[outdatedEventIndex] = updatedEvent
          return { ...prevData, events: updatedEvents }
        }

        return prevData
      })
    } else if (entryType === 'task') {
      const updatedTask = submittedEntry as CalendarTask

      setData((prevData) => {
        const outdatedTaskIndex = prevData.tasks.findIndex((task) =>
          matchEntryById(updatedTask, task),
        )

        if (outdatedTaskIndex !== -1) {
          const updatedTasks = [...prevData.tasks]
          updatedTasks[outdatedTaskIndex] = updatedTask
          return { ...prevData, tasks: updatedTasks }
        }

        return prevData
      })
    }
  } catch (error) {
    console.error('Error modifying local entry:', error)
  }
}

export const updateLocalTaskStatus = async (
  taskToUpdate: CalendarTask,
  setData: React.Dispatch<React.SetStateAction<ICalendarData>>,
) => {
  try {
    const matchEntryById = (
      entryToMatch: CalendarTask,
      entryToCheck: CalendarTask,
    ) => entryToMatch.id === entryToCheck.id

    const toggleTaskStatus = (taskStatus: 'needsAction' | 'completed') =>
      taskStatus === 'needsAction' ? 'completed' : 'needsAction'

    setData((prevData) => {
      const outdatedTaskIndex = prevData.tasks.findIndex((task) =>
        matchEntryById(taskToUpdate, task),
      )

      if (outdatedTaskIndex !== -1) {
        const updatedTasks = prevData.tasks.map((task, index) =>
          index === outdatedTaskIndex
            ? { ...task, status: toggleTaskStatus(task.status) }
            : task,
        ) as CalendarTask[]

        return { ...prevData, tasks: updatedTasks }
      }

      return prevData
    })
  } catch (error) {
    console.error('Error updating local task status:', error)
  }
}
