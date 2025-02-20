import { useEffect, useState } from 'react'
import { connectToDatabase, createTables } from '../db/db'

export const useSetupDatabase = () => {
  const [isDatabaseSetup, setIsDatabaseSetup] = useState<boolean>(false)

  const setupLocalDatabase = async () => {
    try {
      const db = await connectToDatabase()
      await createTables(db)
      setIsDatabaseSetup(true)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setupLocalDatabase()
  }, [])

  return isDatabaseSetup
}
