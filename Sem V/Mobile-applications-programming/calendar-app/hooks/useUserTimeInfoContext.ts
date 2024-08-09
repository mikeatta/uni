import { useContext } from 'react'
import { UserTimeInfoContext } from '../contexts/UserTimeInfoProvider'

export const useUserTimeInfoContext = () => {
  const userTimeInfo = useContext(UserTimeInfoContext)

  if (!userTimeInfo) {
    throw new Error(
      'useUserTimeContext needs to be used with UserTimeInfoContext',
    )
  }

  const { currentTime, timeZone } = userTimeInfo

  return { currentTime, timeZone }
}
