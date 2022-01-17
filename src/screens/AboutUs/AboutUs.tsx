import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Linking} from 'react-native';
import Header from '../../components/atoms/Header';
import PostAuthWrapper from '../../components/PostAuthWrapper';
import CONSTANTS from '../../constants/constants';
import {Button} from 'react-native-paper';
import config from '../../config/colors';
import Input from '../../components/atoms/Input';
import I18n from '../../config/i18n';
import styles from '../AboutUs/AboutUs.styles';
import FooterTab from '../../components/atoms/FooterTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../../components/atoms/Modals/CustomeAlert';
import { sendNotif } from '../../api/notificationsApi';

const AboutUs: any = ({navigation}: {navigation: any}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading,setLoading] = useState(false)
  const [details, setDetails] = useState({
    links: {
      improvementTipsLink: '',
      userManualLink: '',
      fileBaseURL: '',
      rateUsLink: '',
      trainingVideosLink: '',
      faqLink: '',
      bookTrainingLink: '',
    },
    appInfo: {
      productVersion: '',
      releaseDate: '',
      appSize: '',
    },
  });
  const getHelpData = async () => {
    const data = await AsyncStorage.getItem('HelpCentreData');
    setDetails(JSON.parse(data));
    console.log(details.appInfo)
  };
  useEffect(() => {
    getHelpData();
  }, []);
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');

  // const product_details = {
  //   product_version: '0-1-2-000003',
  //   release_date: '18 January, 2021',
  //   app_size: '25 MB',
  // };

  const addSuggestion = () => {
    setLoading(true)
    if (subject.length < 1 || message.length < 1) {
      setErrorText(I18n.t('errorMessage.error_allFields'));
      setPopUp(true);
      setLoading(false)
      return;
    }
    AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
      if (err) {
        console.warn(err);
      }
      const body = {
        "agencyId": items[1][1],
        "messageType": "appSuggestion",
        "subject":  subject,
        "message":  message
      }
      sendNotif(items[0][1],body).then((res)=>{
       
          console.log(res.data);
          if(res.status ==200){
            setErrorText(I18n.t('aboutUs.success'));
            setPopUp(true);
            setSubject('')
            setMessage('')
            setLoading(false)
          }
      })
      .catch(err=>{
        setLoading(false)
        console.log("Error",err)
      })

    });
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={I18n.t('aboutUs.header')} />

      <CustomAlert
        showDialog={popUp}
        setShowDialog={setPopUp}
        title={errorText}
      />
      <ScrollView>
        <PostAuthWrapper
          navigation={navigation}
          subtitle={I18n.t('aboutUs.text')}
          isAgencyHomePage={false}
          isEdit={false}
          isHelpCenter={true}>
          <View style={{top: 8}}>
            <Button
              mode="contained"
              labelStyle={{color: config.WHITE}}
              onPress={() => {Linking.openURL(details.links.rateUsLink)}}>
              {I18n.t('aboutUs.rateUs')}
            </Button>
          </View>

          <SafeAreaView style={{top: 30}}>
            <View style={styles.contractWrapper}>
              <View style={styles.rowWrapper}>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text style={styles.label}>
                    {I18n.t('aboutUs.product_ver')}
                  </Text>
                  <Text style={styles.value}>
                    {details.appInfo ? details.appInfo.productVersion:<></>}
                  </Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text style={styles.label}>
                    {I18n.t('aboutUs.release_date')}
                  </Text>
                  <Text style={styles.value}>
                    {details.appInfo ?details.appInfo.releaseDate:<></>}
                  </Text>
                </View>
              </View>
              <View style={styles.rowWrapper}>
                <View>
                  <Text style={styles.label}>{I18n.t('aboutUs.app_size')}</Text>
                  <Text style={[styles.value]}>{details.appInfo ?details.appInfo.appSize:<></>}</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>

          <View style={{top: 50}}>
            <Text>{I18n.t('aboutUs.suggestion')}</Text>
            <Input
              secureTextEntry={false}
              label={I18n.t('aboutUs.subject')}
              value={subject}
              onChange={text => setSubject(text)}
              iconName=""
              placeholder=""
              disabled={false}
              error={false}
              mode="flat"
              numberOnly=""
              style={{}}
              dense=""
              isAvailable={false}
              success={false}
              hintText=""
              keyboardType="default"
              onFocus={() => {}}
            />
            <Input
              secureTextEntry={false}
              label={I18n.t('aboutUs.message')}
              value={message}
              onChange={text => setMessage(text)}
              iconName=""
              placeholder=""
              disabled={false}
              error={false}
              mode="flat"
              numberOnly=""
              style={{}}
              maxLength={240}
              dense=""
              isAvailable={false}
              success={false}
              hintText=""
              keyboardType="default"
              onFocus={() => {}}
            />
          </View>

          <View style={{marginTop: 25}}>
            <Button
              style={{marginTop: 30}}
              mode="contained"
              loading={loading}
              disabled={loading}
              labelStyle={{padding: 6, color: config.WHITE}}
              onPress={() => {
                addSuggestion();
              }}>
              {I18n.t('aboutUs.submit')}
            </Button>
          </View>
        </PostAuthWrapper>
      </ScrollView>
      <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </View>
  );
};

export default AboutUs;
