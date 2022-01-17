import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Header from '../../components/atoms/Header';
import PostAuthWrapper from '../../components/PostAuthWrapper';
import CONSTANTS from '../../constants/constants';
import {IconButton, Card, Title, Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import config from '../../config/colors';
import Spinner from 'react-native-loading-spinner-overlay';
import I18n from "../../config/i18n";

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './CustomerProfile.styles';
import FooterTab from '../../components/atoms/FooterTab';
import DeleteModal from '../../components/atoms/Modals/DeleteModal';
import constants from '../../constants/constants';
import {getCustomerProfile} from '../../api/customerApi';
import { useFocusEffect } from '@react-navigation/native';

const CustomerProfileHome: any = ({navigation}: {navigation: any}) => {
  const [show, setshow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [longPress1,setLongPress1] = useState(false);
  const [longPress2,setLongPress2] = useState(false);
  const [longPress3,setLongPress3] = useState(false);

  const [role, setRole] = useState('');

  const [profileData, setprofileData] = useState({
    basicInfo: {
      id: null,
      name: null,
      address: {
        addressId: null,
        addressLine1: null,
        addressLine2: null,
        city: null,
        state: null,
        latitude: null,
        longitude: null,
      },
    },
    agencies: 0,
    stores: 0,
    staff: 0,
  });

  useFocusEffect(
    React.useCallback(() => {
      //Fetch Details for the Customer Profile HomeScreen
      setLoading(true)
      setLongPress1(false);
      setLongPress2(false);
      setLongPress3(false);
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID','USER_ROLE'], (err, items) => {
        if (err) {
          console.warn(err);
        }
        setRole(items[2][1])
        getCustomerProfile(items[1][1], items[0][1])
          .then(res => {
            console.log(res.data);
            setprofileData(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      });
    }, []),
  );

  const getUserAddress = address => {
    return (
      address.addressLine1 +
      ', ' +
      address.addressLine2 +
      ', ' +
      address.city +
      ', ' +
      address.state
    );
  };

  const getSplitNames = (position, str) => {
    if (position == 0) {
      return str.split(' ').slice(0, -1).join(' ');
    }

    if (position == 1) {
      return str.split(' ').slice(-1).join(' ');
    }
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
        size="large"
        textContent={I18n.t('loadingText.loading')}
        textStyle={{
          color: config.WHITE,
          fontSize: 12,
          marginTop: 2,
        }}
      />

      <DeleteModal
        showDialog={show}
        setShowDialog={setshow}
        title={'Are you sure you want to delete?'}
        onDelete={() => {
          console.warn('Deleted!!');
        }}
      />

      <Header
        navigation={navigation}
        title={I18n.t('customerProfileHome.header')}
      />
      <PostAuthWrapper
        EditRoute={'CustomerProfileEdit'}
        titlePreFix={
          profileData.basicInfo.name &&
          getSplitNames(0, profileData.basicInfo.name)
        }
        titlePostFix={
          profileData.basicInfo.name &&
          getSplitNames(1, profileData.basicInfo.name)
        }
        navigation={navigation}
        subtitle={
          profileData.basicInfo.address.addressId &&
          getUserAddress(profileData.basicInfo.address)
        }
        isAgencyHomePage={true}
        isEdit={role === 'ROLE_CLIENTMANAGER' ? true : false}>
        <View style={styles.cardBox}>
          <Card 
          style={longPress1 ? styles.cardContent1 : styles.cardContent}
          onLongPress={()=>{setLongPress1(!longPress1)}}
          onPress={() => {
                  navigation.navigate('CustomerStaffList', {
                    firstname: getSplitNames(0, profileData.basicInfo.name),
                    lastname: getSplitNames(1, profileData.basicInfo.name),
                  });
                }}>
            <Card.Content>
              <Title style={longPress1 ? styles.cardTitle1 : styles.cardTitle}>
                {I18n.t('customerProfileHome.menu_staff')}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <Ionicons name={'people'} color={longPress1?config.WHITE:config.GREY} size={22} />
                <Text style={longPress1 ? styles.text1 : styles.text}>
                  {profileData && profileData.staff}
                </Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={longPress1?config.WHITE:config.FADED_BLUE}
                size={18}
                
              />
            </Card.Actions>
          </Card>

          <Card 
           style={longPress2 ? styles.cardContent1 : styles.cardContent}
           onLongPress={()=>{setLongPress2(!longPress2)}}
          onPress={() => {
                  navigation.navigate('CustomerStoreList', {
                    firstname: getSplitNames(0, profileData.basicInfo.name),
                    lastname: getSplitNames(1, profileData.basicInfo.name),
                  });
                }}>
            <Card.Content>
              <Title style={longPress2 ? styles.cardTitle1 : styles.cardTitle}>
                {I18n.t('customerProfileHome.menu_stores')}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <Ionicons name={'people'} color={longPress2?config.WHITE:config.GREY} size={22} />
                <Text style={longPress2 ? styles.text1 : styles.text}>
                  {profileData && profileData.stores}
                </Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={longPress2?config.WHITE:config.FADED_BLUE}
                size={18}
                
              />
            </Card.Actions>
          </Card>
        </View>

        <View style={styles.cardBox}>
          <Card 
          
          style={longPress3 ? styles.cardContent1 : styles.cardContent}
          onLongPress={()=>{setLongPress3(!longPress3)}}
           onPress={() => {
                  navigation.navigate('CustomerAgencyList', {
                    firstname: getSplitNames(0, profileData.basicInfo.name),
                    lastname: getSplitNames(1, profileData.basicInfo.name),
                  });
                }}>
            <Card.Content>
              <Title style={longPress3 ? styles.cardTitle1 : styles.cardTitle}>
                {I18n.t('customerProfileHome.menu_agency')}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <Ionicons name={'people'} color={longPress3?config.WHITE:config.GREY} size={22} />
                <Text style={longPress3 ? styles.text1 : styles.text}>
                  {profileData && profileData.agencies}
                </Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={longPress3?config.WHITE:config.FADED_BLUE}
                size={18}
               
              />
            </Card.Actions>
          </Card>
        </View>
      </PostAuthWrapper>

      <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </View>
  );
};

export default CustomerProfileHome;
