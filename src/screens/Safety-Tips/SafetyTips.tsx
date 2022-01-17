import React from 'react';
import {View, Text,Linking,Image} from 'react-native';
import Header from '../../components/atoms/Header';
import PostAuthWrapper from '../../components/PostAuthWrapper';
import CONSTANTS from '../../constants/constants';
import { Card, Title} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import config from '../../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from "../../config/i18n";

import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../HelpCenter/HelpCenter.styles';
import FooterTab from '../../components/atoms/FooterTab';
import { useEffect } from 'react';
import { useState } from 'react';


const SafetyTips: any = ({navigation}: {navigation: any}) => {

  const [helpData,setHelpData] = useState(
    {
      links: {
          improvementTipsLink: "",
          userManualLink: "",
          fileBaseURL: "",
          rateUsLink: "",
          trainingVideosLink: "",
          faqLink: "",
          bookTrainingLink: ""
      },
      appInfo: {
          productVersion: "",
          releaseDate: "",
          appSize: ""
      }
  }
  );
  const getHelpData = async() => {
    const data = await AsyncStorage.getItem('HelpCentreData');
    setHelpData(JSON.parse(data));
  }
  useEffect(()=>{
      getHelpData();
  },[])

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title={I18n.t('safetyTips.header')}
      />
    <PostAuthWrapper
        navigation={navigation}
        subtitle={I18n.t('safetyTips.text')}
        isAgencyHomePage={false}
        isEdit={false}
        isHelpCenter={true}>
        <View style={styles.cardBox}>
          <Card style={styles.cardContent} >
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
              <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/icons/cylinder_leakage.png')}></Image>
              </View>
            </Card.Actions>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {I18n.t('safetyTips.cylinder')}
              </Title>
            </Card.Content>
          </Card>

          <Card style={styles.cardContent}>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
              <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/icons/virus.png')}></Image>
              </View>
             
            </Card.Actions>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {I18n.t('safetyTips.covid')}
              </Title>
            </Card.Content>
          </Card>
        </View>

      
    
      </PostAuthWrapper>

      <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </View>
  );
};

export default SafetyTips;