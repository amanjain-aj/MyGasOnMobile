import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import Registration from '../screens/Registration';
import RegisterNDCustomerPersonalInfo from '../screens/Registration/NDCustomer/PersonalInfo';
import RegisterNDCustomerOrganizationalInfo from '../screens/Registration/NDCustomer/OrganizationalInfo';
import RegisterNDCustomerPasswordSecurity from '../screens/Registration/NDCustomer/PasswordSecurity';
import RegisterAgencyOwnerDetails from '../screens/Registration/Agency/OwnerDetails';
import RegisterAgencyDetails from '../screens/Registration/Agency/AgencyDetails';
import RegisterAgencyPlans from '../screens/Registration/Agency/AgencyPlans';
import RegisterAgencyPasswordSecurity from '../screens/Registration/Agency/PasswordSecurity';
import  SplashScreenComponent  from '../components/SplashScreenComponent';

const Stack  = createStackNavigator();


const AuthNavigator: any = () => (
    
   <Stack.Navigator initialRouteName= 'SplashScreenComponent'>
    <Stack.Screen 
      name="Splash" 
      component={SplashScreenComponent} 
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Registration"
      component={Registration}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RegisterNDCustomerPersonalInfo"
      component={RegisterNDCustomerPersonalInfo}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RegisterNDCustomerOrganizationalInfo"
      component={RegisterNDCustomerOrganizationalInfo}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RegisterNDCustomerPasswordSecurity"
      component={RegisterNDCustomerPasswordSecurity}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RegisterAgencyOwnerDetails"
      component={RegisterAgencyOwnerDetails}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RegisterAgencyDetails"
      component={RegisterAgencyDetails}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RegisterAgencyPlans"
      component={RegisterAgencyPlans}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RegisterAgencyPasswordSecurity"
      component={RegisterAgencyPasswordSecurity}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
  );
  
  export default AuthNavigator;
  