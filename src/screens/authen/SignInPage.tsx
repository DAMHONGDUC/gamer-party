import React, {useContext} from 'react';
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
import {checkValidateEmail, checkValidatePhone} from 'helper';
import * as Yup from 'yup';
import {handleEmailSignIn} from 'api/authenAPI';
import {AuthContext} from 'constants/values';

const SignupSchema = Yup.object().shape({
  // email_or_phone: Yup.string()
  //   .required('Email / Phone is required')
  //   .test('email_or_phone', 'Email / Phone is invalid', value => {
  //     return checkValidateEmail(value) || checkValidatePhone(value);
  //   }),
  email_or_phone: Yup.string()
    .required('Email is required')
    .test('email_or_phone', 'Email is invalid', value => {
      return checkValidateEmail(value);
    }),
  password: Yup.string().required('Password is required'),
});

export default function SignInPage(): JSX.Element {
  const navigation = useNavigation();
  const {handleAfterSignIn} = useContext(AuthContext);

  const handleBackButton = () => {
    navigation.navigate('WelcomePage');
  };

  const navToVerifyPage = (email: string) => {
    navigation.navigate('VerifyPage', {email: email});
  };

  const handleSignIn = async (username: string, password: string) => {
    const user = await handleEmailSignIn(username, password);

    user!.emailVerified ? handleAfterSignIn() : navToVerifyPage(username);
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.containerBackButton}
        underlayColor={COLORS.white}
        onPress={handleBackButton}>
        <View style={styles.backButton}>
          <Ionicons name="arrow-back" color={COLORS.black} size={25} />
        </View>
      </TouchableHighlight>
      <Image style={styles.image} source={require('assets/sign_in.png')} />

      <Formik
        initialValues={{email_or_phone: '', password: ''}}
        validationSchema={SignupSchema}
        onSubmit={values => {
          handleSignIn(values.email_or_phone, values.password);
        }}>
        {({
          handleChange,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          values,
          setFieldTouched,
        }) => (
          <View style={styles.inputContainer}>
            <TextInput
              //placeholder="Email or Phone Number"
              placeholder="Email"
              placeholderTextColor={COLORS.grey}
              style={styles.textInput}
              onChangeText={handleChange('email_or_phone')}
              onBlur={() => setFieldTouched('email_or_phone')}
              value={values.email_or_phone}
              // keyboardType="email-address"
            />
            {touched.email_or_phone && errors.email_or_phone && (
              <Text style={styles.validationText}>{errors.email_or_phone}</Text>
            )}

            <TextInput
              placeholder="Password"
              style={styles.textInput}
              placeholderTextColor={COLORS.grey}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.validationText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.continueButton}>
              <Text style={styles.text}>Sign In</Text>
            </TouchableOpacity>

            <Text style={styles.textLink}>
              I'm a new member.
              <Text
                style={styles.textLinkRight}
                onPress={() => navigation.navigate('SignUpPage')}>
                {' '}
                Sign Up
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
    marginTop: 20,
    backgroundColor: 'white',
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 25,
    color: COLORS.black,
    padding: 15,
  },
  inputContainer: {
    width: '100%',
    flex: 0.7,
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
  validationText: {
    color: COLORS.primary,
    fontSize: 13,
    marginLeft: 5,
    marginTop: 3,
  },
});
