import { useCallback, useRef } from 'react'
import { CalendarEvent, CalendarTask, ICalendarData } from '../components/types'

export const useSyncStatus = (
  localData: ICalendarData,
  calendarData: ICalendarData,
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

  const getDatabaseSyncStatus = useCallback(async () => {
    const eventsToAdd = calendarData.events.filter(
      (remoteEvent) =>
        !localData.events.some(
          (localEvent) => localEvent.id === remoteEvent.id,
        ),
    )

    const eventsToRemove = localData.events.filter(
      (localEvent) =>
        !calendarData.events.some(
          (remoteEvent) => localEvent.id === remoteEvent.id,
        ),
    )

    const eventsToUpdate = calendarData.events.filter((remoteEvent) =>
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

    const tasksToAdd = calendarData.tasks.filter(
      (remoteTask) =>
        !localData.tasks.some((localTask) => localTask.id === remoteTask.id),
    )

    const tasksToRemove = localData.tasks.filter(
      (localTask) =>
        !calendarData.tasks.some(
          (remoteTask) => localTask.id === remoteTask.id,
        ),
    )

    const tasksToUpdate = calendarData.tasks.filter((remoteTask) =>
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

    syncStatusRef.current.eventsToAdd = eventsToAdd
    syncStatusRef.current.eventsToRemove = eventsToRemove
    syncStatusRef.current.eventsToUpdate = eventsToUpdate
    syncStatusRef.current.tasksToAdd = tasksToAdd
    syncStatusRef.current.tasksToRemove = tasksToRemove
    syncStatusRef.current.tasksToUpdate = tasksToUpdate

    return (
      eventsToAdd.length === 0 &&
      eventsToRemove.length === 0 &&
      eventsToUpdate.length === 0 &&
      tasksToAdd.length === 0 &&
      tasksToRemove.length === 0 &&
      tasksToUpdate.length === 0
    )
  }, [calendarData])

  return { syncStatusRef, getDatabaseSyncStatus }
}
