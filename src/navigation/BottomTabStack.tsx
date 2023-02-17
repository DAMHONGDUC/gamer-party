import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from 'constants/theme';
import UserDetailPage from 'screens/user/UserDetailPage';

const BottomTab = createBottomTabNavigator();

export default function BottomTabStack() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 55,
          elevation: 0,
          backgroundColor: COLORS.tabBarColor,
        },
        tabBarItemStyle: {paddingVertical: 5},
      }}>
      <BottomTab.Screen
        name="User"
        component={UserDetailPage}
        options={{
          headerShown: false,
          tabBarLabel: 'User',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name={'user'} color={color} size={size - 2} />
          ),
          tabBarActiveTintColor: COLORS.primary,
        }}
      />
    </BottomTab.Navigator>
  );
}
