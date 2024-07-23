import { FormData } from '../../components/types'

export const selectValidInterval = (timestamp: Date) => {
  const timestampHours = timestamp.getHours()
  const timestampMinutes = timestamp.getMinutes()

  const minuteIntervals = [0, 15, 30, 45]

  const validInterval =
    minuteIntervals.find((interval) => interval > timestampMinutes) || 0

  if (validInterval === undefined) {
    throw Error('Error setting valid timestamp interval')
  }

  const validDateTime = new Date(timestamp)

  // For intervals above 45, set the hour to next hour
  if (validInterval === 0 && timestampMinutes >= 45) {
    validDateTime.setHours(timestampHours + 1, validInterval, 0, 0)
  } else {
    validDateTime.setMinutes(validInterval, 0, 0)
  }

  return validDateTime
}

export const selectNextInterval = (timestamp: Date) => {
  const timestampHours = timestamp.getHours()
  const timestampMinutes = timestamp.getMinutes()

  const nextTimestamp = new Date(timestamp)

  // Set the time to the next interval past the 'start' timestamp interval
  if (timestampMinutes >= 45) {
    nextTimestamp.setHours(timestampHours + 1, 0, 0, 0)
  } else {
    nextTimestamp.setMinutes(timestampMinutes + 15, 0, 0)
  }

  const validNextDateTime = selectValidInterval(nextTimestamp)

  return validNextDateTime
}

/*
 * Setting time to midnight due to Google API limitations and to properly
 * handle task syncing.
 *
 * Google API does not allow time-setting for task entries. The entries
 * pulled from the Google Calendar are automatically set to midnight on the
 * given date. To account for that during entry-syncing, we set the task time
 * to 'T00:00:00.000Z'.
 */
export const setTimeToMidnight = (date: Date) =>
  new Date(date.setUTCHours(0, 0, 0, 0))

/*
 * Setting the 'dateTime' milliseconds to '000' to prevent from time value
 * mismatches during event entry comparison.
 */
export const resetMilliseconds = (date: Date) =>
  new Date(date.setMilliseconds(0))

export const normalizeFormDataTimes = (formData: FormData) => {
  const submittedEntryType = formData.type

  if (submittedEntryType === 'event') {
    resetMilliseconds(formData.start.dateTime)
    resetMilliseconds(formData.end.dateTime)
  } else if (submittedEntryType === 'task') {
    setTimeToMidnight(formData.start.dateTime)
  } else {
    throw Error('Unknown entry type while normalizing FormData times')
  }

  return formData
}
