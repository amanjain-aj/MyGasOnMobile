import React from 'react';
import {View, Text,Linking} from 'react-native';
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


const HelpCenter: any = ({navigation}: {navigation: any}) => {

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
        title={I18n.t('helpCenter.header')}
      />
    <PostAuthWrapper
        navigation={navigation}
        subtitle={I18n.t('helpCenter.text')}
        isAgencyHomePage={false}
        isEdit={false}
        isHelpCenter={true}>
        <View style={styles.cardBox}>
          <Card style={styles.cardContent} onPress={()=>{Linking.openURL(helpData.links.userManualLink)}} >
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <Ionicons name={'document-text-outline'} color={config.GREY} size={25} />
              </View>
            </Card.Actions>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {I18n.t('helpCenter.user_manual')}
              </Title>
            </Card.Content>
          </Card>

          <Card style={styles.cardContent} onPress={()=>{Linking.openURL(helpData.links.trainingVideosLink)}}>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <Ionicons name={'videocam'} color={config.GREY} size={25} />
              </View>
             
            </Card.Actions>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {I18n.t('helpCenter.training_videos')}
              </Title>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.cardBox}>
          <Card style={styles.cardContent} onPress={()=>{Linking.openURL(helpData.links.improvementTipsLink)}}>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <IconCommunity name={'lightbulb-on-outline'} color={config.GREY} size={25} />
               
              </View>
            </Card.Actions>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {I18n.t('helpCenter.tips')}
              </Title>
            </Card.Content>
          </Card>

          <Card style={styles.cardContent} onPress={()=>{Linking.openURL(helpData.links.faqLink)}}>
            <Card.Actions style={styles.action} >
              <View style={styles.iconBox}>
                <IconCommunity name={'comment-question-outline'} color={config.GREY} size={25} />
               
              </View>
            </Card.Actions>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {I18n.t('helpCenter.faq')}
              </Title>
            </Card.Content>
          </Card>
        </View>
        <View style={styles.cardBox}>
          <Card style={styles.cardContent} onPress={()=>{Linking.openURL(helpData.links.bookTrainingLink)}}>  
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <IconCommunity name={'teach'} color={config.GREY} size={25} />
           
              </View>
          
            </Card.Actions>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {I18n.t('helpCenter.book_session')}
              </Title>
            </Card.Content>
          </Card>
        </View>
      </PostAuthWrapper>

      <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </View>
  );
};

export default HelpCenter;