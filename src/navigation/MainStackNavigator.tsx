import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AgencyProfileHome from '../screens/AgencyProfile/AgencyProfileHome';
import AgencyProfileEdit from '../screens/AgencyProfile/AgencyProfileEdit';
import StaffList from '../screens/AgencyProfile/Staff/StaffList';
import StaffInvite from '../screens/AgencyProfile/Staff/StaffInvite';
import VehicleList from '../screens/AgencyProfile/Vehicles/VehiclesList';
import VehicleAdd from '../screens/AgencyProfile/Vehicles/VehiclesAdd';
import GodownAdd from '../screens/AgencyProfile/Godown/GodownAdd';
import GodownList from '../screens/AgencyProfile/Godown/GodownList';
import DeliverySlotList from '../screens/AgencyProfile/Delivery/DeliveryList';
import AddDeliverySlot from '../screens/AgencyProfile/Delivery/DeliveryAdd';
import CustomerList from '../screens/AgencyProfile/Customers/CustomerList';
import CustomerAddItem from '../screens/AgencyProfile/Customers/CustomerAddItem';
import CustomerContract from '../screens/AgencyProfile/Customers/CustomerContract';
import LeadsList from '../screens/AgencyProfile/Lead Generation/LeadsList';
import GenerateLead from '../screens/AgencyProfile/Lead Generation/GenerateLead';
import LeadFilter from '../screens/AgencyProfile/Lead Generation/LeadFilter';

import CustomerProfileHome from '../screens/CustomerProfile/CustomerProfileHome';
import CustomerStaffList from '../screens/CustomerProfile/Staff/CustomerStaffList';
import CustomerStaffInvite from '../screens/CustomerProfile/Staff/CustomerStaffInvite';
import CustomerStoreList from '../screens/CustomerProfile/Stores/CustomerStoreList';
import CustomerAddStore from '../screens/CustomerProfile/Stores/CustomerAddStore';
import CustomerAgencyList from '../screens/CustomerProfile/Agency/CustomerAgencyList';
import CustomerSearchAgency from '../screens/CustomerProfile/Agency/CustomerSearchAgency';
import CustomerProfileEdit from '../screens/CustomerProfile/CustomerProfileEdit';

import AgentList from '../screens/AgencyProfile/Agent/AgentList';
import AgentAddItem from '../screens/AgencyProfile/Agent/AgentAddItem';
import AgentContract from '../screens/AgencyProfile/Agent/AgentContract';

import ChannelPartnerList from '../screens/AgencyProfile/Channel_Partner/ChannelPartnerList';
import ChannelPartnerContract from '../screens/AgencyProfile/Channel_Partner/ChannelContract';
import ChannelPartnerAddItem from '../screens/AgencyProfile/Channel_Partner/ChannelPartnerAddItem';

import BankAdd from '../screens/AgencyProfile/Bank/BankAdd';
import BankList from '../screens/AgencyProfile/Bank/BankList';

import Home from '../screens/Home';
import MyProfile from '../screens/myProfile/index';
import EditProfile from '../screens/CustomerProfile/EditProfile/EditProfile';
import ItemListing from '../screens/itemManagement/itemListing';
import CustomMyProfile from '../screens/Profile/MyProfile';
import AgentProfileHome from '../screens/AgentProfile/AgentProfileHome';
import ChannelPartnerProfileHome from '../screens/ChannelPartnerProfile/ChannelPartnerProfileHome';
import OrderCreation from '../screens/OrderManagment/OrderCreation';
import Dashboard from '../screens/Dashboard/index';
import HelpCenter from '../screens/HelpCenter/HelpCenter';
import AboutUs from '../screens/AboutUs/AboutUs';
import ShareWithFriends from '../screens/ShareWithFriends/ShareWithFriends';
import Language from '../screens/Language/Language';
import AgencyDashboard from '../screens/Dashboard/AgencyDashboard';
import CustomerDashboard from '../screens/Dashboard/CustomerDashboard';
import ChangePassword from '../screens/ChangePassword/ChangePassword';
import ItemManagement from '../screens/itemManagement';
import PaymentDetails from '../screens/PaymentDetails';
import AgentStaffList from '../screens/AgentProfile/AgentStaffList/AgentStaffList';
import AgentStaffInvite from '../screens/AgentProfile/AgentStaffList/AgentStaffInvite';
import AgentStoreList from '../screens/AgentProfile/AgentStore/AgentStoreList';
import AgentAddStore from '../screens/AgentProfile/AgentStore/AgentAddStore';
import { getCahnnelPartnerStaffList } from '../api/channelPartnerApi';
import ChannelPartnerStaffStyles from '../screens/ChannelPartnerProfile/ChannelPartnerStaff/ChannelPartnerStaff.styles';
import ChannelPartnerStaffList from '../screens/ChannelPartnerProfile/ChannelPartnerStaff/ChannelPartnerStaffList';
import ChannelPartnerStaffInvite from '../screens/ChannelPartnerProfile/ChannelPartnerStaff/ChannelPartnerStaffInvite';
import ChannelPartnerStoreList from '../screens/ChannelPartnerProfile/ChannelPartnerStore/ChannelPartnerStoreList';
import ChannelPartnerAddStore from '../screens/ChannelPartnerProfile/ChannelPartnerStore/ChannelPartnerStoreAdd';
import AgentProfileEdit from '../screens/AgentProfile/AgentProfileEdit';
import AgentAgencyList from '../screens/AgentProfile/AgentAgency/AgentAgencyList';
import ChannelPartnerAgencyList from '../screens/ChannelPartnerProfile/ChannelPartnerAgency/ChannelPartnerAgencyList';
import AgentPaymentDetails from '../screens/PaymentDetails/AgentPaymentDetails';
import ChannelPartnerPaymentDetails from '../screens/PaymentDetails/ChannelPartnerPaymentDetails';
import ChannelPartnerProfileEdit from '../screens/ChannelPartnerProfile/ChannelPartnerProfileEdit';
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';
const Stack = createStackNavigator();

const MainStackNavigator: any = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AgencyProfileHome"
        component={AgencyProfileHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AgencyProfileEdit"
        component={AgencyProfileEdit}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StaffList"
        component={StaffList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StaffInvite"
        component={StaffInvite}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VehicleList"
        component={VehicleList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VehicleAdd"
        component={VehicleAdd}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="GodownList"
        component={GodownList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GodownAdd"
        component={GodownAdd}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeliverySlotList"
        component={DeliverySlotList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddDeliverySlot"
        component={AddDeliverySlot}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerList"
        component={CustomerList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerAddItem"
        component={CustomerAddItem}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerContract"
        component={CustomerContract}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AgentList"
        component={AgentList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AgentAddItem"
        component={AgentAddItem}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AgentContract"
        component={AgentContract}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChannelPartnerList"
        component={ChannelPartnerList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChannelPartnerAddItem"
        component={ChannelPartnerAddItem}
        options={{
          headerShown: false,
        }}
      />
    <Stack.Screen name="ItemListing" component={ItemListing} options={{
          headerShown: false,
        }}/>


      <Stack.Screen
        name="AddItemPrice"
        component={ItemManagement}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ChannelPartnerContract"
        component={ChannelPartnerContract}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BankList"
        component={BankList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BankPaymentList"
        component={BankList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BankAdd"
        component={BankAdd}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LeadsList"
        component={LeadsList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GenerateLead"
        component={GenerateLead}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LeadFilter"
        component={LeadFilter}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerProfileHome"
        component={CustomerProfileHome}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CustomerProfileEdit"
        component={CustomerProfileEdit}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CustomerStaffList"
        component={CustomerStaffList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerStaffInvite"
        component={CustomerStaffInvite}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CustomerStoreList"
        component={CustomerStoreList}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CustomerAgencyList"
        component={CustomerAgencyList}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CustomerAddStore"
        component={CustomerAddStore}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerSearchAgency"
        component={CustomerSearchAgency}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MyProfile"
        component={MyProfile} //MyProfile
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomMyProfile"
        component={CustomMyProfile}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AgentProfileHome"
        component={AgentProfileHome}
        options={{
          headerShown: false,
        }}
      />

<Stack.Screen
        name="ChannelPartnerProfileHome"
        component={ChannelPartnerProfileHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChannelPartnerProfileEdit"
        component={ChannelPartnerProfileEdit}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CreateOrder"
        component={OrderCreation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentDetails"
        component={PaymentDetails}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="AgentStaffList"
        component={AgentStaffList}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="AgentProfileEdit"
        component={AgentProfileEdit}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="AgentAgencyList"
        component={AgentAgencyList}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="AgentSTaffInvite"
        component={AgentStaffInvite}
        options={{
          headerShown: false,
        }}
      />

       
      <Stack.Screen
        name="AgentStoreList"
        component={AgentStoreList}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="AgentStoreAdd"
        component={AgentAddStore}
        options={{
          headerShown: false,
        }}
      />

<Stack.Screen
        name="ChannelPartnerStaffList"
        component={ChannelPartnerStaffList}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="ChannelPartnerStaffInvite"
        component={ChannelPartnerStaffInvite}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="ChannelPartnerAgency"
        component={ChannelPartnerAgencyList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChannelPartnerStoreList"
        component={ChannelPartnerStoreList}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="ChannelPartnerStoreAdd"
        component={ChannelPartnerAddStore}
        options={{
          headerShown: false,
        }}
      />

<Stack.Screen
        name="AgentPaymentDetails"
        component={AgentPaymentDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChannelPartnerPaymentDetails"
        component={ChannelPartnerPaymentDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AgencyDashboard"
        component={AgencyDashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerDashboard"
        component={CustomerDashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ShareWithFriends"
        component={ShareWithFriends}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
