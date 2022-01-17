import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TripCreation from '../screens/TripManagment/TripCreation';
import OrderManagment from '../screens/OrderManagment/OrderManagment';

const Stack = createStackNavigator();

const TripNavigator: any = () => {
  return (
    <Stack.Navigator initialRouteName="TripManagment">
      
        <Stack.Screen
        name="TripManagment"
        component={OrderManagment}
        options={{
          headerShown: false,
        }}
          />
        <Stack.Screen
        name="TripCreation"
        component={TripCreation}
        options={{
          headerShown: false,
        }}
          />
           
    </Stack.Navigator>
  );
};

export default TripNavigator;
