import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {COLORS} from 'constants/theme';
import {useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from 'constants/values';
import {sendEmailVerify} from 'api/authenAPI';
import {showToastAndroid} from 'helper';

export default function VerifyPage() {
  const [verified, setVerified] = useState(false);
  const route = useRoute();
  const {handleAfterSignIn} = useContext(AuthContext);

  useEffect(() => {
    const onAuthStateChangedUnsubscribe = auth().onAuthStateChanged(
      async user => {
        if (user) {
          const onIdTokenChangedUnsubscribe = auth().onIdTokenChanged(user => {
            const unsubscribeSetInterval = setTimeout(() => {
              auth().currentUser.reload();
              auth().currentUser.getIdToken(true);
            }, 10000);

            if (user && user.emailVerified) {
              clearInterval(unsubscribeSetInterval);
              onAuthStateChangedUnsubscribe();

              setVerified(true);

              return onIdTokenChangedUnsubscribe();
            }
          });
        }
      },
    );
  }, []);

  const handleResend = async () => {
    await sendEmailVerify();
    showToastAndroid('Success. Please check your email');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('assets/verify.png')} />
      <View style={styles.body}>
        <Text style={styles.mainText}>
          We've sent an email to
          <Text style={{fontWeight: 'bold'}}> {route.params.email}</Text>
        </Text>
        <Text style={styles.mainText}>
          Please verify your account by click the link in email
        </Text>
        <Text onPress={handleResend} style={styles.resendText}>
          Resend email
        </Text>
        {verified && (
          <TouchableOpacity
            onPress={handleAfterSignIn}
            style={styles.continueButton}>
            <Text style={styles.text}>Continue to home</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  body: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 0.7,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 0,
  },
  text: {
    fontSize: 17,
    color: COLORS.white,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    alignSelf: 'center',
  },
  mainText: {
    fontSize: 15,
    color: COLORS.black,
  },
  resendText: {
    marginTop: 30,
    color: COLORS.blue,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
