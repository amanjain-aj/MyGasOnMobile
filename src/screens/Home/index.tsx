import React, {useState} from 'react';
import {StyleSheet, Text, SafeAreaView, Image, View} from 'react-native';

import AgencyProfileHome from '../AgencyProfile/AgencyProfileHome';
import AgentProfileHome from '../AgentProfile/AgentProfileHome';
import ChannelPartnerProfileHome from '../ChannelPartnerProfile/ChannelPartnerProfileHome';
import CustomerProfileHome from '../CustomerProfile/CustomerProfileHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import constants from '../../constants/constants';
import I18n from "../../config/i18n";
import config from '../../config/colors';

const Home = ({navigation}: {navigation: any}) => {
  let userRole;
  const [HomeComponent, setHomeComponent] = useState(
    <View
      style={{
        flex:1,
        backgroundColor: config.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Spinner
        visible={true}
        size="large"
        textContent={I18n.t('loadingText.loading')}
        textStyle={{
          color: config.WHITE,
          fontSize: 12,
          marginTop: 2,
        }}
      />
    </View>,
  );

  useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    try {
      const role = await AsyncStorage.getItem('USER_ROLE');
      console.log(role)

      if (role === 'ROLE_AGENCYMANAGER') {
        userRole = 'Agency';
      } else if (role == 'ROLE_CLIENTMANAGER') {
        userRole = 'Customer';
      }
      else if (role == 'ROLE_AGENT') {
        userRole = 'Agent';
      }
      else if (role == 'ROLE_CHANNELPARTNER') {
        userRole = 'ChannelPartner';
      }
      switch (userRole) {
        case 'Agency':
          setHomeComponent(<AgencyProfileHome navigation={navigation} />);
          break;

        case 'Customer':
          setHomeComponent(<CustomerProfileHome navigation={navigation} />);
          break;

        case 'Agent':
          setHomeComponent(<AgentProfileHome navigation={navigation} />);
          break;

        case 'ChannelPartner':
          setHomeComponent(
            <ChannelPartnerProfileHome navigation={navigation} />,
          );
          break;

        default:
          break;
      }
    } catch (e) {
      alert('Failed to fetch the data from storage' + e);
    }
  };

  return HomeComponent;
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

export default Home;
