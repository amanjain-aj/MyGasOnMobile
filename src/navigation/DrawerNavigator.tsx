import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainStackNavigator from './MainStackNavigator';
import OrderNavigator from './OrderNavigator';
import SideDrawer from '../components/SideDrawer';
import ItemListing from '../screens/itemManagement/itemListing';
import OrderManagment from '../screens/OrderManagment/OrderManagment';
import CreateDeffect from '../screens/DefectManagment/CreateDeffect';
import CreatePayment from '../screens/PaymentManagment/CreatePayment';
import CreateLeakage from '../screens/LeakManagment/CreateLeakage';
import CreateImbalance from '../screens/ImbalanceManagment/CreateImbalance';
import OrderDeatils from '../screens/OrderDetail/OrderDeatils';
import OrderCreation from '../screens/OrderManagment/OrderCreation';
import TabNavigator from './TabNavigator';
import OrderManagmentFilter from '../screens/OrderManagment/OrderMangmentFilter';
import TripCreation from '../screens/TripManagment/TripCreation';
import LekageDetail from '../screens/LekageDetail/LekageDetail';
import AddOrder from '../screens/AddOrder/AddOrder';
import Dashboard from '../screens/Dashboard/index';
import CustomerProfileHome from '../screens/CustomerProfile/CustomerProfileHome';
import HelpCenter from '../screens/HelpCenter/HelpCenter';
import ShareWithFriends from '../screens/ShareWithFriends/ShareWithFriends';
import Language from '../screens/Language/Language';
import AboutUs from '../screens/AboutUs/AboutUs';
import CustomMyProfile from '../screens/Profile/MyProfile';
import AgencyDashboard from '../screens/Dashboard/AgencyDashboard';
import CustomerDashboard from '../screens/Dashboard/CustomerDashboard';
import MyProfile from '../screens/myProfile';
import ChangePassword from '../screens/ChangePassword/ChangePassword';
import AgencyOrderCreate from '../screens/OrderManagment/AgencyOrderCreate';
import ItemManagement from '../screens/itemManagement';
import ItemNavigator from './ItemNavigator';
import ProfileNavigator from './ProfieNavigator';
import SafetyTips from '../screens/Safety-Tips/SafetyTips';
import TripNavigator from './TripNavigator';
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen'
const Drawer = createDrawerNavigator();

const DrawerNavigator: any = ({navigation}: {navigation: any}) => (
  <Drawer.Navigator
    drawerContent={props => <SideDrawer {...props} />}
    initialRouteName="Dashboard">
    <Drawer.Screen name="Dashboard" component={Dashboard} />
    <Drawer.Screen name="AgencyDashboard" component={AgencyDashboard} />
    <Drawer.Screen name="CustomerDashboard" component={CustomerDashboard} />
    <Drawer.Screen name="MyOrganization" component={MainStackNavigator} />

    
    <Drawer.Screen name="ItemManagment" component={ItemNavigator} />
    <Drawer.Screen name="TripManagment" component={TripNavigator} />
    <Drawer.Screen name="OrderDetail" component={OrderDeatils} />
    <Drawer.Screen name="ListingFilter" component={OrderManagmentFilter} />


    <Drawer.Screen name="LeakageDetail" component={LekageDetail} />
    <Drawer.Screen name="HelpCenter" component={HelpCenter} />
    <Drawer.Screen name="Language" component={Language} />
    <Drawer.Screen name="ShareWithFriends" component={ShareWithFriends} />
    <Drawer.Screen name="AboutUs" component={AboutUs} />
    <Drawer.Screen name="SafetyTips" component={SafetyTips} />
    <Drawer.Screen name="CustomMyProfile" component={ProfileNavigator} />
    {/* //HeaderScreen */}

    <Drawer.Screen name="OrderManagement" component={OrderNavigator} />
    <Drawer.Screen name="DefectManagment" component={OrderManagment} />
    <Drawer.Screen name="PaymentManagment" component={OrderManagment} />
    <Drawer.Screen name="LeakManagment" component={OrderManagment} />
    <Drawer.Screen name="ImbalanceManagment" component={OrderManagment} />
   

  
    

    <Drawer.Screen name="CreateLekage" component={CreateLeakage} />
    <Drawer.Screen name="CreateImbalance" component={CreateImbalance} />
    <Drawer.Screen name="CreateDeffect" component={CreateDeffect} />
    <Drawer.Screen name="CreatePayment" component={CreatePayment} />

    <Drawer.Screen name="ChangePassword" component={ChangePassword} />

    <Drawer.Screen name="NotificationScreen" component={NotificationScreen} />

  </Drawer.Navigator>
);

export default DrawerNavigator;
