import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage'

SQLite.enablePromise(true)

export const connectToDatabase = async (): Promise<SQLiteDatabase> => {
  try {
    const db = await SQLite.openDatabase({
      name: 'calendarDatabase.db',
      location: 'default',
    })
    return db
  } catch (error) {
    console.error(error)
    throw Error('Could not connect to database')
  }
}

export const createTables = async (db: SQLiteDatabase) => {
  const settingsQuery = `
    CREATE TABLE IF NOT EXISTS Settings (
      id INTEGER PRIMARY KEY,
      defaultView TEXT
    );
    `

  const eventsQuery = `
    CREATE TABLE IF NOT EXISTS Events (
      id TEXT PRIMARY KEY,
      summary TEXT,
      description TEXT,
      start JSON,
      end JSON
    );
    `

  const tasksQuery = `
      CREATE TABLE IF NOT EXISTS Tasks (
        id TEXT PRIMARY KEY,
        title TEXT,
        notes TEXT,
        status TEXT CHECK (status IN ('needsAction', 'completed')),
        due TEXT
      );
    `

  try {
    await db.executeSql(settingsQuery)
    await db.executeSql(eventsQuery)
    await db.executeSql(tasksQuery)
  } catch (error) {
    console.error(error)
    throw Error('Failed to create tables')
  }
}
