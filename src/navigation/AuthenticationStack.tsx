import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SignInPage from 'screens/authen/SignInPage';
import SignUpPage from 'screens/authen/SignUpPage';
import WelcomePage from 'screens/authen/WelcomePage';
import VerifyPage from 'screens/authen/VerifyPage';

const Stack = createNativeStackNavigator();

export default function AuthenticationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomePage"
        component={WelcomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpPage"
        component={SignUpPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignInPage"
        component={SignInPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerifyPage"
        component={VerifyPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
