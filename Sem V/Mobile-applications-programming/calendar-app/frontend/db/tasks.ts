import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage'
import { CalendarTask } from '../components/types'

SQLite.enablePromise(true)

export const addTask = async (db: SQLiteDatabase, task: CalendarTask) => {
  const insertQuery = `
    INSERT OR REPLACE INTO Tasks (id, title, notes, status, due)
    VALUES (?, ?, ?, ?, ?)
    `

  const values = [task.id, task.title, task.notes, task.status, task.due]

  try {
    return await db.executeSql(insertQuery, values)
  } catch (error) {
    console.error(error)
    throw Error('Failed to add task')
  }
}

export const getTasks = async (db: SQLiteDatabase): Promise<CalendarTask[]> => {
  try {
    const tasks: CalendarTask[] = []
    const results = await db.executeSql('SELECT * FROM Tasks')
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        tasks.push(result.rows.item(index))
      }
    })
    return tasks
  } catch (error) {
    console.error(error)
    throw Error('Failed to get tasks')
  }
}
