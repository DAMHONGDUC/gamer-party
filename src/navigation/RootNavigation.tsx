import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setAsyncStorageData, getAsyncStorageData} from 'helper';
import {USER_ID} from 'constants/values';
import MainStack from './MainStack';
import AuthenticationStack from './AuthenticationStack';
import {AuthContext} from 'constants/values';

const RootStack = createNativeStackNavigator();

export default function RootNavigation(): JSX.Element {
  const [isSignedIn, setisSignedIn] = useState(false);

  useEffect(() => {
    const setUpAsyncStorageData = async () => {
      const loginToken = await getAsyncStorageData(USER_ID);

      if (loginToken) {
        setisSignedIn(true);
      }
    };

    setUpAsyncStorageData();
  }, []);

  const handleAfterSignIn = () => {
    setisSignedIn(true);
  };

  const handleAfterSignOut = async () => {
    setisSignedIn(false);

    // clear token
    await setAsyncStorageData(LOGIN_TOKEN, '');
  };

  return (
    <AuthContext.Provider
      value={{
        handleAfterSignIn,
        handleAfterSignOut,
      }}>
      <NavigationContainer>
        <RootStack.Navigator>
          <>
            {isSignedIn ? (
              <RootStack.Screen
                name="MainStack"
                component={MainStack}
                options={{headerShown: false}}
              />
            ) : (
              <RootStack.Screen
                name="AuthenticationStack"
                component={AuthenticationStack}
                options={{headerShown: false}}
              />
            )}
          </>
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
