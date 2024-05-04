import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage'
import { CalendarEvent } from '../components/types'

SQLite.enablePromise(true)

export const addEvent = async (db: SQLiteDatabase, event: CalendarEvent) => {
  const insertQuery = `
    INSERT OR REPLACE INTO Events (id, summary, description, start, end)
    VALUES (?, ?, ?, ?, ?)
    `

  const values = [
    event.id,
    event.summary,
    event.description,
    JSON.stringify(event.start),
    JSON.stringify(event.end),
  ]

  try {
    return await db.executeSql(insertQuery, values)
  } catch (error) {
    console.error(error)
    throw Error('Failed to add event')
  }
}

export const getEvents = async (
  db: SQLiteDatabase,
): Promise<CalendarEvent[]> => {
  try {
    const events: CalendarEvent[] = []
    const results = await db.executeSql('SELECT * FROM Events')
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        events.push(result.rows.item(index))
      }
    })
    return events
  } catch (error) {
    console.error(error)
    throw Error('Failed to get events')
  }
}
