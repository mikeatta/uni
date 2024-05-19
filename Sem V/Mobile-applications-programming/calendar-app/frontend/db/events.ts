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

export const removeEvent = async (db: SQLiteDatabase, event: CalendarEvent) => {
  const deleteQuery = 'DELETE FROM Events WHERE id = ?'
  const values = [event.id]

  try {
    return await db.executeSql(deleteQuery, values)
  } catch (error) {
    console.error(error)
    throw Error('Failed to remove event')
  }
}

export const getEvents = async (
  db: SQLiteDatabase,
): Promise<CalendarEvent[]> => {
  try {
    const events: CalendarEvent[] = []
    const results = await db.executeSql('SELECT * FROM Events')

    for (let index = 0; index < results[0].rows.length; index++) {
      const row = results[0].rows.item(index)

      const parsedStart = JSON.parse(row.start)
      const parsedEnd = JSON.parse(row.end)

      const event: CalendarEvent = {
        id: row.id,
        summary: row.summary,
        description: row.description,
        start: parsedStart,
        end: parsedEnd,
      }

      events.push(event)
    }
    return events
  } catch (error) {
    console.error(error)
    throw Error('Failed to get events')
  }
}
