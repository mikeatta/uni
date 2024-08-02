import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  CalendarEvent,
  CalendarTask,
  FormData,
  ICalendarData,
} from '../components/types'
import { connectToDatabase } from '../db/db'
import { addEvent, removeEvent } from '../db/events'
import { addTask, removeTask } from '../db/tasks'
import {
  addRemoteEntry,
  editRemoteEntry,
  fetchGoogleCalendarData,
  removeRemoteEntry,
  returnSubmittedEntry,
} from '../services/api/googleCalendar'
import {
  getDataType,
  toCalendarEntry,
  toFormData,
} from '../utils/helpers/dataTypeHelpers'
import { overwriteOfflineEntry } from '../services/storage/storageHandlers'

export const useSyncChanges = async (
  localData: ICalendarData,
  isConnected: boolean,
  setLocalData: React.Dispatch<React.SetStateAction<ICalendarData>>,
  refreshLocalEntryList: () => Promise<void>,
) => {
  const [lastSyncedLocalData, setLastSyncedLocalData] =
    useState<ICalendarData>(localData)

  const localDataNeedsUpdates = useRef<boolean>(false)
  const isFirstLoad = useRef<boolean>(true)

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

  type SubmittableEntries = {
    eventsToAdd: FormData[]
    eventsToRemove: string[][]
    eventsToUpdate: FormData[]
    tasksToAdd: FormData[]
    tasksToRemove: string[][]
    tasksToUpdate: FormData[]
  }

  const updateSubmittedEntryDetails = async (submittedEntries: FormData[]) => {
    const updatedData = await fetchGoogleCalendarData()
    const entryPairs = []

    for (const entry of submittedEntries) {
      const offlineEntry = toCalendarEntry(entry)
      const submittedEntry = await returnSubmittedEntry(entry, updatedData)
      entryPairs.push([offlineEntry, submittedEntry])
    }

    for (const entry of entryPairs) {
      const [offlineEntry, submittedEntry] = entry
      await overwriteOfflineEntry(offlineEntry, submittedEntry, setLocalData)
    }
  }

  const updateGoogleCalendar = useCallback(
    async ({
      eventsToAdd,
      eventsToRemove,
      eventsToUpdate,
      tasksToAdd,
      tasksToRemove,
      tasksToUpdate,
    }: SubmittableEntries) => {
      const entriesToAdd = [...eventsToAdd, ...tasksToAdd]
      const entriesToRemove = [...eventsToRemove, ...tasksToRemove]
      const entriesToUpdate = [...eventsToUpdate, ...tasksToUpdate]

      for (const entry of entriesToAdd) {
        await addRemoteEntry(entry)
      }

      await updateSubmittedEntryDetails(entriesToAdd)

      for (const [id, type] of entriesToRemove) {
        await removeRemoteEntry(id, type)
      }

      for (const entry of entriesToUpdate) {
        await editRemoteEntry(entry)
      }
    },
    [calendarUpdatesNeeded],
  )

  const updateLocalData = useCallback(async () => {
    if (localDataNeedsUpdates.current === true) {
      await refreshLocalEntryList()
    }
  }, [calendarUpdatesNeeded])

  const convertToSubmittableEntries = (
    calendarChanges: DataStatus,
  ): SubmittableEntries => {
    const convertEntries = (
      entries: (CalendarEvent | CalendarTask)[],
      operation: 'add' | 'remove' | 'update',
    ) => {
      return entries.map((entry) => {
        if (operation === 'add' || operation === 'update') {
          return toFormData(entry)
        } else if (operation === 'remove') {
          const id = entry.id
          const type = getDataType(entry)
          return [id, type]
        }
        throw Error('Unidentified type of entry operation')
      })
    }

    const eventsToAdd = convertEntries(calendarChanges.eventsToAdd, 'add')
    const eventsToRemove = convertEntries(
      calendarChanges.eventsToRemove,
      'remove',
    )
    const eventsToUpdate = convertEntries(
      calendarChanges.eventsToUpdate,
      'update',
    )

    const tasksToAdd = convertEntries(calendarChanges.tasksToAdd, 'add')
    const tasksToRemove = convertEntries(
      calendarChanges.tasksToRemove,
      'remove',
    )
    const tasksToUpdate = convertEntries(
      calendarChanges.tasksToUpdate,
      'update',
    )

    return {
      eventsToAdd,
      eventsToRemove,
      eventsToUpdate,
      tasksToAdd,
      tasksToRemove,
      tasksToUpdate,
    } as SubmittableEntries
  }

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

    if (isConnected && isFirstLoad.current.valueOf()) {
      syncLocalDatabaseWithGoogleCalendar()
    }
  }, [compareCalendarData])

  useEffect(() => {
    const syncGoogleCalendarWithLocalDatabase = async () => {
      const currentGoogleData = await fetchGoogleCalendarData()
      const changesToUpdate = await compareCalendarData(
        localData,
        currentGoogleData,
      )

      if (calendarUpdatesNeeded(changesToUpdate)) {
        const submittableEntries = convertToSubmittableEntries(changesToUpdate)
        await updateGoogleCalendar(submittableEntries)
        await setLastSyncedLocalData(localData)
      }
    }

    if (isConnected && !isFirstLoad.current.valueOf()) {
      syncGoogleCalendarWithLocalDatabase()
    } else if (!isConnected) {
      isFirstLoad.current = false
    }
  }, [isConnected])
}
