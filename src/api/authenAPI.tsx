import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {checkDocExist, createNewDoc} from './firebaseAPI';
import {USER_COLLECTION} from 'constants/values';

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