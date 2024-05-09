import axios from 'axios'
import { CalendarTask, FormData, ICalendarData } from '../components/types'

// Local development address
const LOCAL_URL = 'http://10.0.2.2:3001'

// Submit new entry
const handleFormSubmit = async (formData: FormData) => {
  try {
    await axios.post(`${LOCAL_URL}/api/v1/calendar/new-entry`, formData)
  } catch (error) {
    console.error('Error submitting form data:', error)
  }
}

// Modify existing entry data
const handleEntryEdit = async (formData: FormData) => {
  try {
    await axios.patch(`${LOCAL_URL}/api/v1/calendar/modify-entry`, formData)
  } catch (error) {
    console.error('Error editing the entry:', error)
  }
}

// Remove specified entry
const handleEntryRemoval = async (id: string, type: string) => {
  try {
    await axios.delete(`${LOCAL_URL}/api/v1/calendar/remove-entry`, {
      data: { id, type },
    })
  } catch (error) {
    console.error('Error removing the entry:', error)
  }
}

// Change the completion status of a task (completed / needsAction)
const handleTaskStatusUpdate = async (taskData: CalendarTask) => {
  try {
    await axios.patch(
      `${LOCAL_URL}/api/v1/calendar/update-task-status`,
      taskData,
    )
  } catch (error) {
    console.error('Error changing task status:', error)
  }
}

// Fetch calendar data
const fetchData = async (
  setCalendarData: React.Dispatch<React.SetStateAction<ICalendarData>>,
) => {
  try {
    const response = await axios.get(`${LOCAL_URL}/api/v1/calendar`)
    setCalendarData(response.data)
  } catch (error) {
    console.error('Error fetching calendar data:', error)
  }
}

export {
  handleFormSubmit,
  handleEntryEdit,
  handleEntryRemoval,
  handleTaskStatusUpdate,
  fetchData,
}
