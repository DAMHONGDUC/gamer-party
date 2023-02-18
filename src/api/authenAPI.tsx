import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {checkDocExist, createNewDoc} from './firebaseAPI';
import {USER_COLLECTION} from 'constants/values';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export async function loginGoogle() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export const createNewUser = async (
  uid: string,
  username: string,
  password: string,
) => {
  const userExist = await checkDocExist(USER_COLLECTION, uid);

  if (!userExist) {
    createNewDoc(USER_COLLECTION, uid, {
      username: username,
      password: password,
    });
  }
};

export async function loginFacebook() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}
