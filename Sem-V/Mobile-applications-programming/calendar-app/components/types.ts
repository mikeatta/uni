import React from 'react'

export type CalendarEvent = {
  id: string
  summary: string
  description?: string
  start: {
    dateTime: Date
    timeZone: string
  }
  end: {
    dateTime: Date
    timeZone: string
  }
}

export type CalendarTasklist = {
  id: string
  title: string
}

export type CalendarTask = {
  id: string
  title: string
  notes?: string
  status: 'needsAction' | 'completed'
  due: string
}

export interface ICalendarData {
  events: CalendarEvent[]
  tasklists: CalendarTasklist[]
  tasks: CalendarTask[]
}

export type CalendarData = {
  events: CalendarEvent[]
  tasklists: CalendarTasklist[]
  tasks: CalendarTask[]
  onStatusChange: (taskData: CalendarTask) => Promise<void>
  onEdit: (formData: FormData) => Promise<void>
  onRemove: (id: string, type: 'event' | 'task') => Promise<void>
}

export type DateTimeSelector = {
  title: string
  dateTime: Date
  minimumDateTime: Date
  dateTimeType: 'start' | 'end'
  setDateTime: React.Dispatch<React.SetStateAction<FormData>>
}

export type FormData = {
  id: string
  title: string
  description?: string
  start: {
    dateTime: Date
    timeZone: string
  }
  end: {
    dateTime: Date
    timeZone: string
  }
  type: 'event' | 'task'
}

export type EntryFormProps = {
  onSubmit: (formData: FormData) => Promise<void>
}

export type EntryTypes = 'event' | 'task'

export type Table = 'Settings' | 'Events' | 'Tasks'
