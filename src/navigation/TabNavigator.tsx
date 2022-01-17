import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import MainStackNavigator from './MainStackNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import config from '../config/colors';
import AgencyProfileHome from '../screens/AgencyProfile/AgencyProfileHome';
import CustomerProfileHome from '../screens/CustomerProfile/CustomerProfileHome';
import AgentProfileHome from '../screens/AgentProfile/AgentProfileHome';
import ChannelPartnerProfileHome from '../screens/ChannelPartnerProfile/ChannelPartnerProfileHome';
import {TabBarAdvancedButton} from '../components/atoms/CustomTab/TabBarAdvancedButton';
const Tab = createBottomTabNavigator();

const TabNavigator: any = ({navigation}: {navigation: any}) => (
  <Tab.Navigator
    tabBarOptions={{
      adaptive: true,
      showLabel: false,
      style: {
        height: 56,

        position: 'absolute',
        borderTopWidth: 0,
        backgroundColor: 'transparent',
        elevation: 30,
      },
      tabStyle: {
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: config.NAVY_BLUE,
      },
    }}
    tabBar={props => (
      <View>
        <BottomTabBar {...props} />
      </View>
    )}
    initialRouteName="Home">
    <Tab.Screen
      name="Home"
      component={MainStackNavigator}
      options={{
        tabBarIcon: ({size, focused}) => (
          <IconCommunity
            name={'truck-delivery'}
            size={size}
            color={focused ? config.FADED_BLUE : config.WHITE}
          />
        ),
      }}
    />
    <Tab.Screen
      name="AgencyProfile"
      component={AgencyProfileHome}
      options={{
        tabBarIcon: ({size, focused}) => (
          <Ionicons
            name="ios-document-text"
            size={size}
            color={focused ? config.FADED_BLUE : config.WHITE}
          />
        ),
        tabBarLabel: () => {
          return null;
        },
      }}
    />
    <Tab.Screen
      name="CsutomerProfile"
      component={CustomerProfileHome}
      options={{
        tabBarIcon: ({size, focused}) => (
          <Icon
            name="people"
            size={size}
            color={focused ? config.FADED_BLUE : config.WHITE}
          />
        ),
      }}
    />
    <Tab.Screen
      name="AgentProfile"
      component={AgentProfileHome}
      options={{
        tabBarIcon: ({size, focused}) => (
          <IconCommunity
            name="bell"
            size={size}
            color={focused ? config.FADED_BLUE : config.WHITE}
          />
        ),
      }}
    />
    <Tab.Screen
      name="ChannelPartner"
      component={ChannelPartnerProfileHome}
      options={{
        tabBarIcon: ({size, focused}) => (
          <Icon
            name="local-offer"
            size={size}
            color={focused ? config.FADED_BLUE : config.WHITE}
          />
        ),
      }}
    />

    <Tab.Screen
      name="AddScreen"
      component={ChannelPartnerProfileHome}
      options={{
        tabBarButton: props => (
          <TabBarAdvancedButton
            bgColor={config.NAVY_BLUE}
            icon="add"
            {...props}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
