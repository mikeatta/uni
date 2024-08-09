import { CalendarEvent, CalendarTask } from '../../components/types'

/*
 * Function: 'withFunction'
 *
 * A higher-order function used for executing the specified function (passed as
 * an argument) with other functions.
 */
export const withFunction = <T extends (...args: any[]) => any>(
  finalFunction: () => void,
) => {
  return (mainFunction: T): ((...args: Parameters<T>) => Promise<void>) => {
    return async (...args: Parameters<T>) => {
      await mainFunction(...args)
      await finalFunction()
    }
  }
}

/*
 * Function: 'fillTempEntryId'
 *
 * Fills the entry's ID property with a temporary ID and returns the modified
 * entry.
 *
 * The function is used for handling the creation of entries in offline mode.
 */
export const fillTempEntryId = (tempEntry: CalendarEvent | CalendarTask) => {
  tempEntry.id = generateEntryId()
  return tempEntry
}

function generateEntryId() {
  const timestamp = Date.now()
  const randomPart = Math.floor(Math.random() * 10000)
  return `offline-${randomPart}-${timestamp}`
}
