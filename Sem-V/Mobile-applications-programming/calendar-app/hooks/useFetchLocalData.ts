import { useEffect, useState } from 'react'
import { ICalendarData } from '../components/types'
import { connectToDatabase } from '../db/db'
import { getEvents } from '../db/events'
import { getTasks } from '../db/tasks'

export const useFetchLocalData = (isDatabaseSetup: boolean) => {
  const [localData, setLocalData] = useState<ICalendarData>({
    events: [],
    tasklists: [],
    tasks: [],
  })

  const fetchLocalData = async () => {
    try {
      const db = await connectToDatabase()

      const fetchedData: ICalendarData = {
        events: await getEvents(db),
        tasklists: [],
        tasks: await getTasks(db),
      }

      if (!fetchedData) {
        throw Error('Local data returned undefined')
      }

      return fetchedData
    } catch (error) {
      console.error(error)
      throw Error('Error fetching local data')
    }
  }

  const assignLocalData = async () => {
    try {
      const fetchedData = await fetchLocalData()
      setLocalData(fetchedData)
    } catch (error) {
      console.error('Failed to refresh local data:', error)
    }
  }

  useEffect(() => {
    if (isDatabaseSetup) {
      assignLocalData()
    }
  }, [isDatabaseSetup])

  return {
    localData,
    setLocalData,
    refreshLocalEntryList: assignLocalData,
  }
}
