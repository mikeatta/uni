import { useCallback, useEffect, useState } from 'react'
import { ICalendarData } from '../components/types'
import { connectToDatabase } from '../db/db'
import { getEvents } from '../db/events'
import { getTasks } from '../db/tasks'

export const useFetchLocalData = (
  isDatabaseSetup: boolean,
  calendarData: ICalendarData,
) => {
  const [localData, setLocalData] = useState<ICalendarData>({
    events: [],
    tasklists: [],
    tasks: [],
  })

  const fetchLocalData = useCallback(async () => {
    try {
      const db = await connectToDatabase()

      const tempLocalData: ICalendarData = {
        events: await getEvents(db),
        tasklists: [],
        tasks: await getTasks(db),
      }

      setLocalData(tempLocalData)
    } catch (error) {
      console.error(error)
    }
  }, [calendarData])

  useEffect(() => {
    if (isDatabaseSetup) {
      fetchLocalData()
    }
  }, [isDatabaseSetup])

  return { localData, refetchLocalData: fetchLocalData }
}
