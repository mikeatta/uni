import { useEffect, useState } from 'react'
import { ICalendarData } from '../components/types'
import { fetchData } from '../services/api/googleCalendar'

export const useFetchRemoteData = () => {
  const [calendarData, setCalendarData] = useState<ICalendarData>({
    events: [],
    tasklists: [],
    tasks: [],
  })

  useEffect(() => {
    fetchData(setCalendarData)
  }, [])

  return calendarData
}
