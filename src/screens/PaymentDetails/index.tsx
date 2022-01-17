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
import {CreateCustomerPaymentmapping, GetCustomerPaymentmapping, UpdateCustomerPaymentmapping} from '../../api/agencyApi';
import { deleteAgency } from '../../api/customerApi';
import DeleteModal from '../../components/atoms/Modals/DeleteModal';

const PaymentDetails: any = ({
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

  const [todelete, setToDelete] = useState(false);


  useEffect(() => {
    console.log("DATA", route.params.customerData)
    setName(route.params.customerData.name)
    setAddress(
      route.params.customerData.address.addressLine1 +
        '\n' +
        route.params.customerData.address.addressLine2 +
        '\n' +
        route.params.customerData.address.city +
        ', ' +
        route.params.customerData.address.state,
    );
    setLoading(true);
    AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
      if (err) {
        console.warn(err);
      } else {
        setToken(items[0][1]);
        setAgnId(items[1][1]);
        GetCustomerPaymentmapping(items[1][1], route.params.custId, items[0][1])
          .then(res => {
            setLoading(false);
            console.log("RESPONSE",res)
            console.log("Data", res.data)
            setPaymentId(res.data.id);
            setType(res.data.paymentCode);
            console.log(res.data)
            if (res.status === 200) {
              if (res.data.paymentCode === undefined) {
                setPaymentId('')
              }
              
              setName(res.data.customer.name);

              setAddress(
                res.data.customer.address.addressLine1 +
                  '\n' +
                  res.data.customer.address.addressLine2 +
                  '\n' +
                  res.data.customer.address.city +
                  ', ' +
                  res.data.customer.address.state,
              );
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

    const body = {
      paymentCode: type,
      customer: {
        id: route.params.custId,
      },
      agency: {
        id: agnId,
      },
    };
    console.log(body)

    if (paymentId === '') {
      //create a mapping

      CreateCustomerPaymentmapping(body, token)
        .then(res => {
          setLoading(false)
          if (res.status === 200) {
            navigation.goBack()
          }
          console.log(res.data)
        }).catch(err => {
          console.log(err.response.data)
          setLoading(false)
          
      })
      
    } else {
      //update the mapping
      UpdateCustomerPaymentmapping(paymentId, body, token)
        .then(res => {
          setLoading(false)
          if (res.status === 200) {
            navigation.goBack()
          }
          console.log(res)
        }).catch(err => {
          console.log(err.response.data)
          setLoading(false)
          
        });
    }

  };

  const deleteAgencyFromList = () => {
    console.log(route.params.customerData.agencyId)
    console.log(route.params.cid)
    setToDelete(false) 
    deleteAgency(route.params.cid, token, route.params.customerData.agencyId).then(res => {
      console.log(res.status)
      if (res.status === 200) {
        navigation.goBack();
      }
    }).catch(errr => {
      console.log(errr)
      alert("some error occured")
    });
  }

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
      <DeleteModal
        showDialog={todelete}
        setShowDialog={setToDelete}
        title={'Are you sure you want to delete this agency ?'}
        onDelete={deleteAgencyFromList}
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
        <SafeAreaView style={{flex: 1}}>
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
            route.params.type === 'customer' ?
            <Button
                style={{ marginTop: 15,backgroundColor:config.RED }}
            
            contentStyle={{flexDirection: 'row-reverse'}}
            labelStyle={[styles.button]}
            mode="contained"
                onPress={() => {

                  setToDelete(true)
                }}>
            {I18n.t('bank.delete_agency')}
              </Button> 
              :
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

export default PaymentDetails;
