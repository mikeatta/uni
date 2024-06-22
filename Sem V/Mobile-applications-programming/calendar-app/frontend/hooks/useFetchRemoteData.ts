import { useEffect, useState } from 'react'
import { ICalendarData } from '../components/types'
import { fetchRemoteData } from '../services/api/googleCalendar'

export const useFetchRemoteData = () => {
  const [calendarData, setCalendarData] = useState<ICalendarData>({
    events: [],
    tasklists: [],
    tasks: [],
  })

  const fetchCalendarData = async () => {
    const data = await fetchRemoteData()

    if (data === undefined) {
      return
    }

    setCalendarData(data)
  }

  useEffect(() => {
    fetchCalendarData()
  }, [])

  return { calendarData, refetchRemoteData: fetchCalendarData }
}
