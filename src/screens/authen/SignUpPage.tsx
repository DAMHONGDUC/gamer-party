import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {COLORS} from 'constants/theme';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {handleEmailSignUp} from 'api/authenAPI';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function SignInPage(): JSX.Element {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);

  const handleBackButton = () => {
    navigation.navigate('SignInPage');
  };

  const handleSignUp = async () => {
    const status = await handleEmailSignUp('hongduc001h@gmail.com', '123456');

    if (status) setShowAlert(true);
  };

  const navToSignInPage = () => {
    setShowAlert(false);
    navigation.navigate('SignInPage');
  };

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Success"
        message="You are successfully registered"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Go to sign in page"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={navToSignInPage}
      />

      <TouchableHighlight
        style={styles.containerBackButton}
        underlayColor={COLORS.white}
        onPress={handleBackButton}>
        <View style={styles.backButton}>
          <Ionicons name="arrow-back" color={COLORS.black} size={25} />
        </View>
      </TouchableHighlight>
      <Image style={styles.image} source={require('assets/sign_up.png')} />
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => console.log(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={styles.inputContainer}>
            <TextInput
              // placeholder="Email hoặc SĐT"
              placeholder="Email"
              placeholderTextColor={COLORS.grey}
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />

            <TextInput
              //placeholder="Họ và tên"
              placeholder="Fullname"
              style={styles.textInput}
              placeholderTextColor={COLORS.grey}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />

            <TextInput
              //placeholder="Mật khẩu"
              placeholder="Password"
              style={styles.textInput}
              placeholderTextColor={COLORS.grey}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />

            <TextInput
              // placeholder="Nhập lại mật khẩu"
              placeholder="Repeat Password"
              style={styles.textInput}
              placeholderTextColor={COLORS.grey}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />

            <TouchableOpacity
              onPress={handleSignUp}
              style={styles.continueButton}>
              <Text style={styles.text}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.textLink}>
              I'm already a member.
              <Text
                style={styles.textLinkRight}
                onPress={() => navigation.navigate('SignInPage')}>
                {' '}
                Sign In
              </Text>
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-evenly',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 20,
    color: COLORS.white,
  },
  textInput: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'white',
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 25,
    color: COLORS.black,
    padding: 15,
  },
  inputContainer: {
    width: '100%',
    flex: 0.8,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 45,
    borderRadius: 22,
    marginTop: 30,
  },
  textLink: {
    color: '#000000',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 25,
  },
  textLinkRight: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  backButton: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBackButton: {position: 'absolute', left: 0, top: 0},
});
