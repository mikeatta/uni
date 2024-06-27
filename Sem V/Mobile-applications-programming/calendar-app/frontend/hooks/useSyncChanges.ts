import { useCallback, useEffect, useRef, useState } from 'react'
import { CalendarEvent, CalendarTask, ICalendarData } from '../components/types'
import { connectToDatabase } from '../db/db'
import { addEvent, removeEvent } from '../db/events'
import { addTask, removeTask } from '../db/tasks'
import { fetchGoogleCalendarData } from '../services/api/googleCalendar'

export const useSyncChanges = async (
  localData: ICalendarData,
  isConnected: boolean,
  refreshLocalEntryList: () => Promise<void>,
) => {
  const [lastSyncedLocalData, setLastSyncedLocalData] =
    useState<ICalendarData>(localData)

  const localDataNeedsUpdates = useRef<boolean>(false)

  type DataStatus = {
    eventsToAdd: CalendarEvent[]
    eventsToRemove: CalendarEvent[]
    eventsToUpdate: CalendarEvent[]
    tasksToAdd: CalendarTask[]
    tasksToRemove: CalendarTask[]
    tasksToUpdate: CalendarTask[]
  }

  const compareCalendarData = useCallback(
    async (newObj: ICalendarData, prevObj: ICalendarData) => {
      const eventsToAdd = newObj.events.filter(
        (newEvent) =>
          !prevObj.events.some((prevEvent) => newEvent.id === prevEvent.id),
      )

      const eventsToRemove = prevObj.events.filter(
        (prevEvent) =>
          !newObj.events.some((newEvent) => newEvent.id === prevEvent.id),
      )

      const eventsToUpdate = newObj.events.filter((newEvent) =>
        prevObj.events.some((prevEvent) => {
          return (
            newEvent.id === prevEvent.id &&
            (newEvent.summary !== prevEvent.summary ||
              newEvent.description !== prevEvent.description ||
              newEvent.start.dateTime !== prevEvent.start.dateTime ||
              newEvent.start.timeZone !== prevEvent.end.timeZone ||
              newEvent.end.dateTime !== prevEvent.end.dateTime ||
              newEvent.end.timeZone !== prevEvent.end.timeZone)
          )
        }),
      )

      const tasksToAdd = newObj.tasks.filter(
        (newTask) =>
          !prevObj.tasks.some((prevTask) => newTask.id === prevTask.id),
      )

      const tasksToRemove = prevObj.tasks.filter(
        (prevTask) =>
          !newObj.tasks.some((newTask) => newTask.id === prevTask.id),
      )

      const tasksToUpdate = newObj.tasks.filter((newTask) =>
        prevObj.tasks.some((prevTask) => {
          return (
            newTask.id === prevTask.id &&
            (newTask.title !== prevTask.title ||
              newTask.notes !== prevTask.notes ||
              newTask.due !== prevTask.due ||
              newTask.status !== prevTask.status)
          )
        }),
      )

      return {
        eventsToAdd,
        eventsToRemove,
        eventsToUpdate,
        tasksToAdd,
        tasksToRemove,
        tasksToUpdate,
      }
    },
    [localData],
  )

  const calendarUpdatesNeeded = useCallback(
    (calendarChanges: DataStatus) => {
      const allChanges = Object.values(calendarChanges).flat()
      const needsUpdates = allChanges.length > 0
      localDataNeedsUpdates.current = needsUpdates
      return needsUpdates
    },
    [compareCalendarData],
  )

  const updateLocalDatabase = useCallback(
    async ({
      eventsToAdd,
      eventsToRemove,
      eventsToUpdate,
      tasksToAdd,
      tasksToRemove,
      tasksToUpdate,
    }: DataStatus) => {
      const db = await connectToDatabase()

      const eventsToAddOrUpdate = [...eventsToAdd, ...eventsToUpdate]
      const tasksToAddOrUpdate = [...tasksToAdd, ...tasksToUpdate]

      for (const event of eventsToAddOrUpdate) {
        await addEvent(db, event)
      }

      for (const event of eventsToRemove) {
        await removeEvent(db, event)
      }

      for (const task of tasksToAddOrUpdate) {
        await addTask(db, task)
      }

      for (const task of tasksToRemove) {
        await removeTask(db, task)
      }
    },
    [calendarUpdatesNeeded],
  )

  const updateLocalData = useCallback(async () => {
    if (localDataNeedsUpdates.current === true) {
      await refreshLocalEntryList()
    }
  }, [calendarUpdatesNeeded])

  useEffect(() => {
    const syncChangesWithLocalDatabase = async () => {
      const changesToUpdate = await compareCalendarData(
        localData,
        lastSyncedLocalData,
      )

      if (calendarUpdatesNeeded(changesToUpdate)) {
        await updateLocalDatabase(changesToUpdate)
        await updateLocalData()
        await setLastSyncedLocalData(localData)
      }
    }

    syncChangesWithLocalDatabase()
  }, [compareCalendarData])

  useEffect(() => {
    const syncLocalDatabaseWithGoogleCalendar = async () => {
      const updatedGoogleData = await fetchGoogleCalendarData()
      const changesToUpdate = await compareCalendarData(
        updatedGoogleData,
        localData,
      )

      if (calendarUpdatesNeeded(changesToUpdate)) {
        await updateLocalDatabase(changesToUpdate)
        await updateLocalData()
        await setLastSyncedLocalData(localData)
      }
    }

    if (isConnected) {
      syncLocalDatabaseWithGoogleCalendar()
    }
  }, [isConnected, compareCalendarData])
}
