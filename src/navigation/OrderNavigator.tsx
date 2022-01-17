import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrderManagment from '../screens/OrderManagment/OrderManagment';
import OrderManagmentFilter from '../screens/OrderManagment/OrderMangmentFilter';
import AgencyOrderCreate from '../screens/OrderManagment/AgencyOrderCreate';
import OrderCreation from '../screens/OrderManagment/OrderCreation';
import OrderDeatils from '../screens/OrderDetail/OrderDeatils';

const Stack = createStackNavigator();

const OrderNavigator: any = () => {
  return (
    <Stack.Navigator initialRouteName="OrderManagement">
      <Stack.Screen
        name="OrderManagement"
        component={OrderManagment}
        options={{
          headerShown: false,
        }}
          />
          <Stack.Screen
        name="OrderFilter"
        component={OrderManagmentFilter}
        options={{
          headerShown: false,
        }}
          />
            <Stack.Screen
            name="AgencyOrderCreate"
            component={AgencyOrderCreate}
            options={{
              headerShown: false,
            }}
          />
             <Stack.Screen
        name="OrderCreation"
        component={OrderCreation}
        options={{
          headerShown: false,
        }}
          />
          <Stack.Screen
        name="OrderDetails"
        component={OrderDeatils}
        options={{
          headerShown: false,
        }}
          />
    </Stack.Navigator>
  );
};

export default OrderNavigator;
