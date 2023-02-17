import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import HomePage from 'screens/home/HomePage';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabStack"
        component={HomePage}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
