import { useCallback, useEffect, useRef, useState } from 'react'
import { CalendarEvent, CalendarTask, ICalendarData } from '../components/types'
import { connectToDatabase } from '../db/db'
import { addEvent, removeEvent } from '../db/events'
import { addTask, removeTask } from '../db/tasks'

export const useSyncChanges = async (
  localData: ICalendarData,
  calendarData: ICalendarData,
  isDatabaseSetup: boolean,
  refetchLocalData: () => Promise<void>,
) => {
  const [isLocalDatabaseSynced, setIsLocalDatabaseSynced] =
    useState<boolean>(true)

  type LocalDatabaseRef = {
    eventsToAdd: CalendarEvent[]
    eventsToRemove: CalendarEvent[]
    eventsToUpdate: CalendarEvent[]
    tasksToAdd: CalendarTask[]
    tasksToRemove: CalendarTask[]
    tasksToUpdate: CalendarTask[]
  }

  const localDatabaseChanges = useRef<LocalDatabaseRef>({
    eventsToAdd: [],
    eventsToRemove: [],
    eventsToUpdate: [],
    tasksToAdd: [],
    tasksToRemove: [],
    tasksToUpdate: [],
  })

  const getLocalDatabaseStatus = useCallback(async () => {
    localDatabaseChanges.current.eventsToAdd = calendarData.events.filter(
      (remoteEvent) =>
        !localData.events.some(
          (localEvent) => localEvent.id === remoteEvent.id,
        ),
    )

    localDatabaseChanges.current.eventsToRemove = localData.events.filter(
      (localEvent) =>
        !calendarData.events.some(
          (remoteEvent) => localEvent.id === remoteEvent.id,
        ),
    )

    localDatabaseChanges.current.eventsToUpdate = calendarData.events.filter(
      (remoteEvent) =>
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

    localDatabaseChanges.current.tasksToAdd = calendarData.tasks.filter(
      (remoteTask) =>
        !localData.tasks.some((localTask) => localTask.id === remoteTask.id),
    )

    localDatabaseChanges.current.tasksToRemove = localData.tasks.filter(
      (localTask) =>
        !calendarData.tasks.some(
          (remoteTask) => localTask.id === remoteTask.id,
        ),
    )

    localDatabaseChanges.current.tasksToUpdate = calendarData.tasks.filter(
      (remoteTask) =>
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

    return (
      localDatabaseChanges.current.eventsToAdd.length === 0 &&
      localDatabaseChanges.current.eventsToRemove.length === 0 &&
      localDatabaseChanges.current.eventsToUpdate.length === 0 &&
      localDatabaseChanges.current.tasksToAdd.length === 0 &&
      localDatabaseChanges.current.tasksToRemove.length === 0 &&
      localDatabaseChanges.current.tasksToUpdate.length === 0
    )
  }, [calendarData])

  const updateLocalDatabase = useCallback(async () => {
    const db = await connectToDatabase()

    const eventsToAddOrUpdate = [
      ...localDatabaseChanges.current.eventsToAdd,
      ...localDatabaseChanges.current.eventsToUpdate,
    ]

    const tasksToAddOrUpdate = [
      ...localDatabaseChanges.current.tasksToAdd,
      ...localDatabaseChanges.current.tasksToUpdate,
    ]

    for (const event of eventsToAddOrUpdate) {
      await addEvent(db, event)
    }

    for (const event of localDatabaseChanges.current.eventsToRemove) {
      await removeEvent(db, event)
    }

    for (const task of tasksToAddOrUpdate) {
      await addTask(db, task)
    }

    for (const task of localDatabaseChanges.current.tasksToRemove) {
      await removeTask(db, task)
    }
  }, [getLocalDatabaseStatus])

  useEffect(() => {
    const updateLocalDatabaseStatus = async () => {
      const isSynced = await getLocalDatabaseStatus()
      setIsLocalDatabaseSynced(isSynced)
    }

    if (isDatabaseSetup) {
      updateLocalDatabaseStatus()
    }
  }, [getLocalDatabaseStatus])

  useEffect(() => {
    const syncLocalDatabase = async () => {
      await updateLocalDatabase()
      await refetchLocalData()
    }

    if (isDatabaseSetup && !isLocalDatabaseSynced) {
      syncLocalDatabase()
    }
  }, [isLocalDatabaseSynced, updateLocalDatabase, refetchLocalData])
}
