import React, {useState} from 'react';
import {StyleSheet, Text, SafeAreaView, Image} from 'react-native';
import AgencyDashboard from './AgencyDashboard';
import CustomerDashboard from './CustomerDashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useFocusEffect, useNavigationState } from '@react-navigation/native';

const Dashboard = ({navigation}: {navigation: any}) => {
  const [active, setActive] = React.useState('');
  const index = useNavigationState(state => state.index);
  const state = useNavigationState(state => state);

  const getRole = async() => {
      const role = await AsyncStorage.getItem('USER_ROLE');
      if(role == 'ROLE_AGENCYMANAGER'){
          navigation.navigate('AgencyDashboard');
      }
      else if(role == 'ROLE_CLIENTMANAGER') {
          navigation.navigate('CustomerDashboard');
      }
      else{
        navigation.navigate('CustomerDashboard');
      }
  }
 
  useEffect(()=>{
    getRole();
  },[])
  useFocusEffect(
    React.useCallback(() => {
      getRole();
     
      
    },[])
  )
  return (
    <>
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Dashboard;
