import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyProfile from '../screens/myProfile';
import CustomMyProfile from '../screens/Profile/MyProfile';

const Stack = createStackNavigator();

const ProfileNavigator: any = () => {
  return (
    <Stack.Navigator initialRouteName="CustomProfile">
      <Stack.Screen
        name="CustomProfile"
        component={CustomMyProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
