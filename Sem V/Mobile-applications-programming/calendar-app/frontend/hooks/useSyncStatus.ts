import { useCallback, useRef } from 'react'
import { CalendarEvent, CalendarTask, ICalendarData } from '../components/types'
import { connectToDatabase } from '../db/db'
import { addEvent, removeEvent } from '../db/events'
import { addTask, removeTask } from '../db/tasks'

export const useSyncStatus = (
  localData: ICalendarData,
  calendarData: ICalendarData,
  refetchLocalData: () => Promise<void>,
) => {
  interface ISyncStatusRef {
    eventsToAdd: CalendarEvent[]
    eventsToRemove: CalendarEvent[]
    eventsToUpdate: CalendarEvent[]
    tasksToAdd: CalendarTask[]
    tasksToRemove: CalendarTask[]
    tasksToUpdate: CalendarTask[]
  }

  const syncStatusRef = useRef<ISyncStatusRef>({
    eventsToAdd: [],
    eventsToRemove: [],
    eventsToUpdate: [],
    tasksToAdd: [],
    tasksToRemove: [],
    tasksToUpdate: [],
  })

  let {
    eventsToAdd,
    eventsToRemove,
    eventsToUpdate,
    tasksToAdd,
    tasksToRemove,
    tasksToUpdate,
  } = syncStatusRef.current

  const getDatabaseSyncStatus = useCallback(async () => {
    const getEventsToAdd = calendarData.events.filter(
      (remoteEvent) =>
        !localData.events.some(
          (localEvent) => localEvent.id === remoteEvent.id,
        ),
    )

    const getEventsToRemove = localData.events.filter(
      (localEvent) =>
        !calendarData.events.some(
          (remoteEvent) => localEvent.id === remoteEvent.id,
        ),
    )

    const getEventsToUpdate = calendarData.events.filter((remoteEvent) =>
      localData.events.some((localEvent) => {
        return (
          localEvent.id === remoteEvent.id &&
          (localEvent.summary !== remoteEvent.summary ||
            localEvent.description !== remoteEvent.description ||
            localEvent.start.dateTime !== remoteEvent.start.dateTime ||
            localEvent.start.timeZone !== remoteEvent.end.timeZone ||
            localEvent.end.dateTime !== remoteEvent.end.dateTime ||
            localEvent.end.timeZone !== remoteEvent.end.timeZone)
        )
      }),
    )

    const getTasksToAdd = calendarData.tasks.filter(
      (remoteTask) =>
        !localData.tasks.some((localTask) => localTask.id === remoteTask.id),
    )

    const getTasksToRemove = localData.tasks.filter(
      (localTask) =>
        !calendarData.tasks.some(
          (remoteTask) => localTask.id === remoteTask.id,
        ),
    )

    const getTasksToUpdate = calendarData.tasks.filter((remoteTask) =>
      localData.tasks.some((localTask) => {
        return (
          localTask.id === remoteTask.id &&
          (localTask.title !== remoteTask.title ||
            localTask.notes !== remoteTask.notes ||
            localTask.status !== remoteTask.status ||
            localTask.due !== remoteTask.due)
        )
      }),
    )

    eventsToAdd = getEventsToAdd
    eventsToRemove = getEventsToRemove
    eventsToUpdate = getEventsToUpdate
    tasksToAdd = getTasksToAdd
    tasksToRemove = getTasksToRemove
    tasksToUpdate = getTasksToUpdate

    const summariesOfEventsToAdd = eventsToAdd.map((event) => event.summary)
    const summariesOfEventsToRemove = eventsToRemove.map(
      (event) => event.summary,
    )
    const summariesOfEventsToUpdate = eventsToUpdate.map(
      (event) => event.summary,
    )

    const summariesOfTasksToAdd = tasksToAdd.map((task) => task.title)
    const summariesOfTasksToRemove = tasksToRemove.map((task) => task.title)
    const summariesOfTasksToUpdate = tasksToUpdate.map((task) => task.title)

    console.log('Unsynced remote events (to add):', summariesOfEventsToAdd)
    console.log(
      'Unsynced remote events (to remove):',
      summariesOfEventsToRemove,
    )
    console.log(
      'Unsynced remote events (to update):',
      summariesOfEventsToUpdate,
    )

    console.log('Unsynced remote tasks (to add):', summariesOfTasksToAdd)
    console.log('Unsynced remote tasks (to remove):', summariesOfTasksToRemove)
    console.log('Unsynced remote tasks (to update):', summariesOfTasksToUpdate)

    return (
      getEventsToAdd.length === 0 &&
      getEventsToRemove.length === 0 &&
      getEventsToUpdate.length === 0 &&
      getTasksToAdd.length === 0 &&
      getTasksToRemove.length === 0 &&
      getTasksToUpdate.length === 0
    )
  }, [calendarData])

  const updateLocalData = useCallback(async () => {
    try {
      const db = await connectToDatabase('updateLocalData')

      const eventsToAddAndUpdate = [...eventsToAdd, ...eventsToUpdate]

      const tasksToAddAndUpdate = [...tasksToAdd, ...tasksToUpdate]

      for (const event of eventsToAddAndUpdate) {
        await addEvent(db, event)
      }

      for (const event of eventsToRemove) {
        await removeEvent(db, event)
      }

      for (const task of tasksToAddAndUpdate) {
        await addTask(db, task)
      }

      for (const task of tasksToRemove) {
        await removeTask(db, task)
      }
    } catch (error) {
      console.error(error)
      throw Error('Failed to update the database')
    }
  }, [refetchLocalData])

  return { getDatabaseSyncStatus, updateLocalData }
}
