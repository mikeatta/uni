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
  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Button
          title={'Sign Out'}
          onPress={async () => {
            await GoogleSignin.signOut();
            setIsLoggedIn(false);
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Sign in with Google</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={'light'}
        onPress={async () => {
          try {
            const user = await GoogleSignin.signIn();
            if (!user) {
              throw Error('No user object!');
            }

            const { idToken, accessToken } = await GoogleSignin.getTokens();
            if (!idToken || !accessToken) {
              throw new Error('No access token received!');
            }

            const googleCredentials =
              auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredentials);

            // Set the access token in the GoogleAuthService singleton
            GoogleAuthService.setAccessToken(accessToken);
            setIsLoggedIn(true);
          } catch (error) {
            console.error('Failed to sign into Google Account:', error);
          }
        }}
      />
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 10,
  },
});
