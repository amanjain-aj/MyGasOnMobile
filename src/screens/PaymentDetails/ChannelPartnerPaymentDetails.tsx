import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styles from './PaymentDetails.styles';
import I18n from '../../config/i18n';
import config from '../../config/colors';
import {Button} from 'react-native-paper';

import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../../components/atoms/Header';
import {List} from 'react-native-paper';
import Dropdown from '../../components/atoms/Dropdown';
import FooterTab from '../../components/atoms/FooterTab';
import PostAuthWrapper from '../../components/PostAuthWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetCustomerPaymentmapping} from '../../api/agencyApi';
import { getChannelPartnerById, UpdateChannelPartnerProfile } from '../../api/channelPartnerApi';

const ChannelPartnerPaymentDetails: any = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [agnId, setAgnId] = useState('');
  const [token, setToken] = useState('');
  const [details, setDetails] = useState({});


  useEffect(() => {
    setLoading(true);
    AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
      if (err) {
        console.warn(err);
      } else {
        setToken(items[0][1]);
        getChannelPartnerById(route.params.id,  items[0][1])
          .then(res => {
            setLoading(false);
            setDetails(res.data)
            console.log(res.data)
            if (res.status === 200) {
              // setPaymentId(res.data.id);
              if (route.params.type === 'channelPartner') {
                setType(res.data.paymentCode);
              setName(res.data.agency.name);

              setAddress(
                res.data.agency.address.addressLine1 +
                  '\n' +
                  res.data.agency.address.addressLine2 +
                  '\n' +
                  res.data.agency.address.city +
                  ', ' +
                  res.data.agency.address.state,
              );
              } else {
                setType(res.data.paymentCode);
              setName(res.data.name);

              setAddress(
                res.data.address.addressLine1 +
                  '\n' +
                  res.data.address.addressLine2 +
                  '\n' +
                  res.data.address.city +
                  ', ' +
                  res.data.address.state,
              );
              }
              
            }
          })
          .catch(err => {
            setLoading(false);
            console.log(err.response.data);
          });
      }
    });
  }, []);

  const UpdatePayment = () => {
    setLoading(true);

    const body = details;
    body.paymentCode = type;

    console.log("NEW DETAILS",body)

    
      //create a mapping
      UpdateChannelPartnerProfile(details.channelPartnerId, body, token)
        .then(res => {
          console.log(res.data)
          setLoading(false)
          if (res.status === 200) {
            navigation.goBack();
              
            }
        }).catch(err => {
          setLoading(false)

        console.log(err.response.data)
      })
      
   


  };

  const options = [
    {
      label: I18n.t('bank.weekly'),
      value: 'W',
      key: 1,
    },
    {
      label: I18n.t('bank.monthly'),
      value: 'M',
      key: 2,
    },
    {
      label: I18n.t('bank.instantly'),
      value: 'INS',
      key: 3,
    },
  ];

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

      <Header
        navigation={navigation}
        title={I18n.t('bankProfileHeader.header')}
      />

      <PostAuthWrapper
        titlePreFix={route.params && route.params.firstname}
        titlePostFix={route.params && route.params.lastname}
        subtitle={I18n.t('bank.add')}
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        <SafeAreaView style={{ flex: 1 }}>
          <List.Item
            style={styles.listStyle}
            title={name}
            description={address}
            titleStyle={{fontWeight:'bold'}}
            descriptionNumberOfLines={5}
          />
          <View style={{height: 20}} />
          <Dropdown
            options={options}
            selectedValue={type}
            placeholder={I18n.t('bank.select')}
            onChange={text => {
              setType(text);
            }}
            hasDisabled={false}
          />

          {
            route.params.type === 'channelPartner' ?
              null :
              <Button
            style={{marginTop: 15}}
            contentStyle={{flexDirection: 'row-reverse'}}
            labelStyle={[styles.button]}
            mode="contained"
            onPress={() => { UpdatePayment()}}>
            {I18n.t('bank.save_payment')}
          </Button>
          }

          
        </SafeAreaView>
      </PostAuthWrapper>
      <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </View>
  );
};

export default ChannelPartnerPaymentDetails;
