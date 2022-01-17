import React, {useState} from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {List} from 'react-native-paper';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../../components/atoms/Input';
import I18n from '../../../config/i18n';
import Header from '../../../components/atoms/Header';
import styles from './ChannelPartner.styles';
import CONSTANTS from '../../../constants/constants';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import config from '../../../config/colors';
import FooterTab from '../../../components/atoms/FooterTab';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  GetAllChannelPartnerrByAgency,
  GetAllCustomerByAgency,
} from '../../../api/agencyApi';

const ChannelPartnerList: any = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [customerList, setCustomerList] = useState([]);

  const keyExtractor = (item, index) => index.toString();
  const [loading, setloading] = useState(false);
  const [loadList, setloadList] = useState(0);
  const [emptyMessage, setEmptyMesage] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [customerFilterList, setCustomerFilterList] = useState([]);

  const searchCust = str => {
    if (str.length > 1) {
      setCustomerFilterList(
        customerList.filter(text =>
          text.name.toLowerCase().includes(str.toLowerCase()),
        ),
      );
    } else {
      setCustomerFilterList(customerList);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setloading(true);
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
        if (err) {
          console.warn(err);
        }

        GetAllChannelPartnerrByAgency(items[0][1], items[1][1], 1)
          .then(res => {
            console.log(res);
            setCustomerList(res.data);
            setCustomerFilterList(res.data);
            if (res.data.length < 1) {
              setEmptyMesage(true);
            } else {
              setEmptyMesage(false);
            }
            setloading(false);
          })
          .catch(err => {
            console.log(err);
            setloading(false);
          });
      });
    }, [loadList]),
  );

  const renderItem = ({item}) => (
    <List.Item
      style={styles.listStyle}
      title={item.name}
      description={''}
      right={props => (
        <List.Icon
          icon={() => (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={styles.icon1Container}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ChannelPartnerContract', {
                      custId: item.channelPartnerId,
                      firstname: route.params.firstname,
                      lastname: route.params.lastname,
                    });
                  }}>
                  <Image
                    style={{width: 24, height: 24}}
                    source={require('../../../assets/icons/agreement.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.icon2Container}>
                <IconCommunity
                  name={'account-settings'}
                  color={config.WHITE}
                  size={15}
                  onPress={() => {
                    navigation.navigate('ChannelPartnerPaymentDetails', {
                      
                      firstname: route.params.firstname,
                      lastname: route.params.lastname,
                      id: item.channelPartnerId,
                    });
                  }}
                />
              </View>
            </View>
          )}
        />
      )}
      onPress={() => {
        navigation.navigate('ChannelPartnerContract', {
          custId: item.channelPartnerId,
          firstname: route.params.firstname,
          lastname: route.params.lastname,
        });
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title={I18n.t('agencyProfileEdit.header')}
      />
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        size="large"
        textContent={'Loading...'}
        textStyle={{
          color: config.WHITE,
          fontSize: 12,
          marginTop: 2,
        }}
      />
      <PostAuthWrapper
        titlePreFix={route.params.firstname}
        titlePostFix={route.params.lastname}
        // titlePreFix={I18n.t('agencyHome.agency_name_prefix')}
        // titlePostFix={I18n.t('agencyHome.agency_name_postfix')}
        subtitle={I18n.t('channelPartner.channel_partner_title')}
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        {customerList.length > 0 ? (
          <Input
            secureTextEntry={false}
            label={''}
            value={searchText}
            onChange={text => {
              setSearchText(text);
              searchCust(text);
            }}
            iconSize={20}
            iconName="search"
            placeholder={I18n.t('channelPartner.search_channel_partner')}
            disabled={false}
            error={false}
            mode="flat"
            numberOnly=""
            maxLength={17}
            style={styles.input}
            dense=""
            isAvailable={true}
            success={false}
            hintText=""
            keyboardType="default"
            onFocus={() => {}}
          />
        ) : null}

        <SafeAreaView style={{flex: 1}}>
          {!emptyMessage ? (
            <FlatList
              keyExtractor={keyExtractor}
              data={customerFilterList}
              renderItem={renderItem}
            />
          ) : (
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  textAlign: 'center',
                  fontWeight: '400',
                  marginTop: 40,
                }}>
                {I18n.t('listingEmptyMessage.no_channel_partner')}
              </Text>
            </View>
          )}
        </SafeAreaView>
      </PostAuthWrapper>

      <FooterTab
        navigation={navigation}
        navigationData={{
          firstname: route.params.firstname,
          lastname: route.params.lastname,
        }}
        onAddRoute={'AgentAddItem'}
        isAdd={false}
      />
    </View>
  );
};

export default ChannelPartnerList;
