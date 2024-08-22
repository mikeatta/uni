export type PrimaryTasklistProps = {
  id: string | null | undefined
  title: string | null | undefined
}

export const CURRENT_TIME = new Date().toISOString()
export const PRIMARY_TASKLIST: PrimaryTasklistProps = {
  id: null,
  title: null,
}

export const CALENDAR_ENDPOINT = 'https://www.googleapis.com/calendar/v3'
export const TASKS_ENDPOINT = 'https://tasks.googleapis.com/tasks/v1'
export const CALENDAR_ID = 'primary'
