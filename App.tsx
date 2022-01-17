import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {  StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
 
import {theme} from './src/config/theme';
import {AppRouter} from './src/navigation';
import SplashScreenComponent from './src/components/SplashScreenComponent';
import I18n from './src/config/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack = createStackNavigator();

const getLanguage = async () => {
  
  const currentLanguage = await AsyncStorage.getItem('Language');
  console.log(currentLanguage);
  if(currentLanguage != undefined){
    I18n.locale = currentLanguage;
  }
 
}

export default function App() {
  StatusBar.setBackgroundColor('transparent');
  // StatusBar.setHidden(true)
  StatusBar.setTranslucent(true)

  useEffect(() =>{
    getLanguage();
    
  },[])
  
  
  return  (
    <PaperProvider theme={theme}>
          <NavigationContainer>
            <AppRouter />
          </NavigationContainer>
    </PaperProvider>

  )
}
