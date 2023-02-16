import React from 'react';
import HomeScreen from 'screens/home/HomeScreen';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';

export default function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <HomeScreen />;
}
