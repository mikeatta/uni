export type CalendarEvent = {
  id: string
  summary: string
  description?: string
  start: {
    date: Date
    dateTime: Date
    timeZone: string
  }
  end: {
    date: Date
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

export type CalendarData = {
  events: CalendarEvent[]
  tasklists: CalendarTasklist[]
  tasks: CalendarTask[]
}
