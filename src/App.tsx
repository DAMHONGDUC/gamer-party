import React from 'react';
import HomeScreen from 'screens/home/HomePage';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import SignIn from 'screens/authen/SignInPage';
import RootNavigation from 'navigation/RootNavigation';

export default function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <RootNavigation />;
}
