import {COLORS} from 'constants/theme';
import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LoginOptionButton from 'components/LoginOptionButton';
import {loginGoogle, loginFacebook} from 'api/authenAPI';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {firebase} from '@react-native-firebase/auth';
import {createNewUser} from 'api/authenAPI';
import {AuthContext} from 'constants/values';
import {setAsyncStorageData} from 'helper';
import {USER_ID} from 'constants/values';
import {useDispatch} from 'react-redux';
import {setUid} from 'redux/slices/appSlide';
import {useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';

GoogleSignin.configure({
  webClientId: Config.GOOGLESIGNIN_WEBCLIENTID,
});

export default function WelcomePage(): JSX.Element {
  const {handleAfterSignIn} = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const storeDataSocialLogin = async () => {
    // get curr user
    const res = firebase.auth().currentUser;

    if (res?.providerData[0]) {
      const providerData = res.providerData[0];

      if (providerData.uid && providerData.email) {
        await createNewUser(
          providerData.uid,
          providerData.email,
          providerData.email,
        );

        handleAfterSignIn();
        await setAsyncStorageData(USER_ID, providerData.uid);
        dispatch(setUid(providerData.uid));
      }
    }
  };

  const handleGoogleSignIn = async () => {
    await loginGoogle();

    storeDataSocialLogin();
  };

  const handleFacebookSignIn = async () => {
    await loginFacebook();

    storeDataSocialLogin();
  };

  const handlePhoneSignIn = async () => {
    navigation.navigate('SignInPage');
  };

  return (
    <LinearGradient
      style={styles.container}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#EB455F', '#e6576d', '#F2921D']}>
      <View style={styles.row}>
        <Image
          style={styles.brandImage}
          source={require('assets/app_icon_white.png')}
        />
        <Text style={styles.brandText}>Gamer Finder</Text>
      </View>
      <View>
        <Text style={styles.introText}>
          Sign in to connect and find your gaming friends.
        </Text>
        <LoginOptionButton
          title={'Continue with Facebook'}
          mainColor={COLORS.white}
          textColor={COLORS.black}
          type={0}
          onPress={handleFacebookSignIn}
        />
        <LoginOptionButton
          title={'Continue with Google'}
          mainColor={COLORS.white}
          textColor={COLORS.black}
          type={1}
          onPress={handleGoogleSignIn}
        />
        <LoginOptionButton
          title={'Continue with Email'}
          mainColor={COLORS.white}
          textColor={COLORS.black}
          type={2}
          onPress={handlePhoneSignIn}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandImage: {
    width: 60,
    height: 60,
  },
  brandText: {
    fontSize: 30,
    fontWeight: '500',
    color: COLORS.white,
    marginLeft: 7,
    alignSelf: 'flex-end',
  },
  introText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.white,
    marginBottom: 20,
  },
});
