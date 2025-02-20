import { GoogleSignin } from '@react-native-google-signin/google-signin'
import axios from 'axios'
import { CREDENTIALS_URL, API_KEY } from '@env'
import { useEffect, useState } from 'react'
import GoogleAuthService from '../services/auth/GoogleAuthService'

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/tasks',
]

export const useGoogleSignin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const getCredentials = async () => {
    const response = await axios.get(CREDENTIALS_URL, {
      headers: {
        'x-api-key': API_KEY,
      },
    })
    const clientId = response.data.web.client_id
    return clientId as string
  }

  const configure = async () => {
    const clientId = await getCredentials()
    GoogleSignin.configure({
      webClientId: clientId,
      scopes: SCOPES,
      offlineAccess: true, // To obtain the auth tokens
      forceCodeForRefreshToken: true,
    })
  }

  const getPreviousLoginStatus = async () => {
    const previouslySignedIn = GoogleSignin.hasPreviousSignIn()
    const currentUser = GoogleSignin.getCurrentUser()

    if (!previouslySignedIn && currentUser === null) {
      return false
    }

    if (currentUser === null) {
      await GoogleSignin.signInSilently()
    }

    const accessToken = (await GoogleSignin.getTokens()).accessToken
    GoogleAuthService.setAccessToken(accessToken)

    return true
  }

  useEffect(() => {
    const setupGoogleSignin = async () => {
      await configure()
      const loginStatus = await getPreviousLoginStatus()
      setIsLoggedIn(loginStatus)
    }

    setupGoogleSignin()
  }, [])

  return { isLoggedIn, setIsLoggedIn }
}
