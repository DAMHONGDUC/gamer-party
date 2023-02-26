import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import RootNavigation from 'navigation/RootNavigation';
import {store} from 'redux/store';
import {Provider} from 'react-redux';

export default function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
