import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, View} from 'react-native';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import Logo from '../atoms/Logo';
import BgImage from '../atoms/BgImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './SplashScreenComponent.styles';

const SplashScreenComponent = ({navigation}: {navigation: any}) => {
  const performTimeConsumingTask = () => {
    AsyncStorage.getItem('USER_ROLE')
      .then(user => {
        if (user !== null) {
          if (user.length > 0) {
            setTimeout(() => {
              navigation.dispatch(resetAction);
            }, 1500);
          } else {
            setTimeout(() => {
              navigation.replace('Login');
            }, 1500);
          }
        } else {
          setTimeout(() => {
            // navigation.navigate('Login');
            navigation.replace('Login');
          }, 1500);
        }
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1500);
      });
  };

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: 'App'}],
  });

  const getPermisions = async () => {
   await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  };

  useEffect(() => {
    getPermisions();

    performTimeConsumingTask();
  }, []);

  return (
    <View style={styles.container}>
      <BgImage />
      <Logo size="full" />
    </View>
  );
};

export default SplashScreenComponent;
