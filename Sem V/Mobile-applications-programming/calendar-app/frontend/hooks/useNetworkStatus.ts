import Netinfo from '@react-native-community/netinfo'
import { useEffect, useState } from 'react'

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = Netinfo.addEventListener((state) => {
      /*
       * Fallback to 'false' on null-values, since 'isConnected' can return either
       * 'false' or 'null'.
       */
      if (state.isConnected === null) {
        setIsConnected(false)
      } else {
        setIsConnected(state.isConnected)
      }
    })

    return () => unsubscribe()
  }, [])

  return isConnected
}
