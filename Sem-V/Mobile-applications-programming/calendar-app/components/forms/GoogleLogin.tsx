import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import GoogleAuthService from '../../services/auth/GoogleAuthService';

type GoogleLoginProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const GoogleLogin = ({ isLoggedIn, setIsLoggedIn }: GoogleLoginProps) => {
  const handleSignOut = async () => {
    await GoogleSignin.signOut();
    setIsLoggedIn(false);
  };

  const handleSignIn = async () => {
    try {
      const user = await GoogleSignin.signIn();
      if (!user) {
        throw new Error('No user object!');
      }

      const { idToken, accessToken } = await GoogleSignin.getTokens();
      if (!idToken || !accessToken) {
        throw new Error('No access token received!');
      }

      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredentials);

      GoogleAuthService.setAccessToken(accessToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Failed to sign into Google Account:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <Button title={'Sign Out'} onPress={handleSignOut} />
      ) : (
        <View style={styles.signInContainer}>
          <Text>Sign in with Google</Text>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Light}
            onPress={handleSignIn}
          />
        </View>
      )}
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
  signInContainer: {
    alignItems: 'center',
    gap: 10,
  },
});
