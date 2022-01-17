import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ItemListing from '../screens/itemManagement/itemListing';
import ItemManagement from '../screens/itemManagement';

const Stack = createStackNavigator();

const ItemNavigator: any = () => {
  return (
    <Stack.Navigator initialRouteName="ItemListing">
      <Stack.Screen
        name="ItemListing"
        component={ItemListing}
        options={{
          headerShown: false,
        }}
          />
              

          
          <Stack.Screen
        name="AddItemPrice"
        component={ItemManagement}
        options={{
          headerShown: false,
        }}
          />
    </Stack.Navigator>
  );
};

export default ItemNavigator;
