import React, {useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import styles from './OrderManagment.styles';
import Header from '../../components/atoms/Header';
import constants from '../../constants/constants';
import I18n from "../../config/i18n";
import config from '../../config/colors';
import FilterWrapper from '../../components/FilterWrapper';
import {Button, Dialog, Portal} from 'react-native-paper';
import RadioGroup from '../../components/atoms/RadioGroup';
import {useFocusEffect, useNavigationState} from '@react-navigation/native';
import {orderList, leakageList,TripList, defectList, imbalanceList, paymentList} from './ListingDetails'
import OrderCard from '../../components/atoms/OrderCard';
import CustomRadioButton from '../../components/atoms/CustomRadioButton';
import FooterTab from '../../components/atoms/FooterTab';
import OrderCreation from './OrderCreation';
import {listOrder} from '../../api/orderApi';
import {getTripList} from '../../api/tripApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { GetCustomerPaymentmapping } from '../../api/agencyApi';

const options = [
  {label: '1', value: '1', key: 1},
  {label: '2', value: '2', key: 2},
  {label: '3', value: '3', key: 3},
  {label: '4', value: '4', key: 4},
];

const OrderManagment: any = ({navigation,route}: {navigation: any,route:any}) => {
  const keyExtractor = (item, index) => index.toString();
  let role = '';
  const [keyRole, setKey] = useState('');
  const [showDailog, setshowDailog] = useState(false);
  const [addRoute, setAddRoute] = useState('');
  const [listAllOrders,setList] = useState([]);
  const [listAllTrips,setTripList] = useState([]);
  const [emptyMessage1,setEmptyMessage1] = useState(false);
  const [emptyMessage2,setEmptyMessage2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentType,setPaymentType] = useState('');
  const state = useNavigationState(state => state);
  const routeName = state.routeNames[state.index];

  let onAddRoute='';


  const tripList = [
    {
      name: 'Abid',
      date: '18 May, 2021',
      time: '09:00 AM to 12:00 AM',
    },
    {
      name: 'Summit Trip',
      date: '18 May, 2021',
      time: '09:00 AM to 12:00 AM',
    },
    {
      name: 'Summit Trip',
      date: '18 May, 2021',
      time: '09:00 AM to 12:00 AM',
    },
    {
      name: 'Summit Trip',
      date: '18 May, 2021',
      time: '09:00 AM to 12:00 AM',
    },
    {
      name: 'Summit Trip',
      date: '18 May, 2021',
      time: '09:00 AM to 12:00 AM',
    },
  ];
  useFocusEffect(
    React.useCallback(()=>{
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID','USER_ROLE'], (err, items) => {
        if (err) {
          console.warn(err);
          let error_msg = `Error in usefocuseffect() under Ordermanagement class with ${err}`;
          throw error_msg;
        }
        let userRole = 'agencyId';
        if(routeName == 'OrderManagement') {
        if(items[2][1] == 'ROLE_AGENCYMANAGER'){
         setAddRoute('AgencyOrderCreate')
         setKey('agencyId')
         userRole = 'agencyId'
        }else if(items[2][1] == 'ROLE_AGENT'){
          setKey('agentId')
          setAddRoute('OrderCreation')
          userRole = 'agentId'
        }else if(items[2][1] == 'ROLE_CHANNELPARTNER'){
          setKey('channelPartnerId')
          setAddRoute('OrderCreation')
          userRole = 'channelPartnerId'
        }
        else if(items[2][1] == 'ROLE_CLIENTMANAGER'){
          setKey('customerId')
          setAddRoute('OrderCreation')
          userRole = 'customerId'
        }
      }
        switch(routeName) {
          case 'OrderManagement':
            const body = [{
              "key": userRole,
              "value": items[1][1],
              "operation": "EQUAL"
            }]
            getOrderData(items[0][1],body)
          break;
          case 'TripManagment':
            const body1 = [{
              "key": userRole,
              "value": items[1][1],
              "operation": "EQUAL"
            }]
            getTripData(items[0][1],body1)

        } 
      })
    
    },[])
  )
    /**
     * 
     * @param : token
     * @description : Get order list for a user
     * @author : Invincix Mobile Team <developers@invincix.com>
     * @return : Order data
     * 
     **/
  const getOrderData = (token,body) => {
    setLoading(true)
    
    listOrder(token,body).then((res)=>{
      console.log("res",res.data)
      if(res.data.length>0){
        res.data.forEach((item,index)=>{
          GetCustomerPaymentmapping(item['agencyId'],item['customerId'],token).then((res)=>{

            if(res.data != undefined || res.data.length> 0 ){
                res.data['paymentType'] = res.data['paymentCode'];
            }
          })
          .catch(err=>{
            console.log("Error",err)
          })  
        })
        console.log("Res",res.data)
        setList(res.data);
        setEmptyMessage1(false)
        setLoading(false)
      }else{
        setLoading(false)
        setEmptyMessage1(true)
      }
    })
    .catch(err=>{
      setLoading(false)
      console.log("Error",err)
    })
  }
  const getPaymentInfo = (agencyId,customerId,token) => {
    GetCustomerPaymentmapping(agencyId,customerId,token).then((res)=>{
     
      if(res.data != undefined || res.data.length> 0 ){
          return res.data['paymentCode'];
      }
    })  
    .catch(err=>{
      console.log("Error",err)
    })
} 
  const getTripData = (token,body) => {
    setLoading(true)
    
    getTripList(body,token).then((res)=>{
      console.log("res",res.data)
      if(res.data.length>0){
        setTripList(res.data);
        setEmptyMessage2(false)
        setLoading(false)
      }else{
        setLoading(false)
        setEmptyMessage2(true)
      }
    })
    .catch(err=>{
      setLoading(false)
      console.log("Error",err)
    })
  }
  let header = null;
  let listDetails = null;
  let renderItem = null;
  switch (routeName) {
    case 'OrderManagement':
     
      header = I18n.t('orderManagment.header');
      listDetails = listAllOrders;
      renderItem = ({item}) => (
        !emptyMessage1 && (
          <>
        <OrderCard
          cardType={routeName}
          cardDetails={item}
          onAssingTrip={() => {
            setshowDailog(true);
          }}
          navigation = {navigation}
          orderId = {item.id}
        /></>) 
      );
      break;
    case 'LeakManagment':
      header = I18n.t('leakManagment.header');
      listDetails = leakageList;
      onAddRoute='CreateLekage'

      renderItem = ({item}) => (
        <OrderCard
          cardType={routeName}
          cardDetails={item}
          onAssingTrip={() => {
            setshowDailog(true);
          }}
        />
      );
      break;
    case 'DefectManagment':
      header = I18n.t('defectManagment.header');
      listDetails = defectList;
      onAddRoute='CreateDeffect'

      renderItem = ({item}) => (
        <OrderCard
          cardType={routeName}
          cardDetails={item}
          onAssingTrip={() => {
            setshowDailog(true);
          }}
        />
      );
      break;
    case 'ImbalanceManagment':
      header = I18n.t('imabalanceManagement.header');
      listDetails = imbalanceList;
      onAddRoute='CreateImbalance'

      renderItem = ({item}) => (
        <OrderCard
          cardType={routeName}
          cardDetails={item}
          onAssingTrip={() => {
            setshowDailog(true);
          }}
        />
      );
      break;

    case 'PaymentManagment':
      header = I18n.t('paymentManagment.header');
      listDetails = paymentList;
      onAddRoute='CreatePayment'

      renderItem = ({item}) => (
        <OrderCard
          cardType={routeName}
          cardDetails={item}
          onAssingTrip={() => {
            setshowDailog(true);
          }}
        />
      );
      break;
      case 'TripManagment':
        header = I18n.t('tripManagment.header');
        listDetails = listAllTrips;
        onAddRoute='TripCreation'
  
        renderItem = ({item}) => (
          !emptyMessage1 ? (<OrderCard
            cardType={routeName}
            cardDetails={item}
            onAssingTrip={() => {
              setshowDailog(true);
            }}
          />): (<View
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
              {I18n.t('listingEmptyMessage.no_trips')}
            </Text>
          </View>)
        );
        break;
  
    default:
      break;
  }

  

  const selectedFilter = [
    I18n.t('orderManagment.filter_tags.credit_type'),
    I18n.t('orderManagment.filter_tags.date'),
    I18n.t('orderManagment.filter_tags.lpg_size'),
    I18n.t('orderManagment.filter_tags.created_by'),
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
      <Portal>
        <Dialog
          style={[styles.dialog]}
          visible={showDailog}
          onDismiss={() => {
            setshowDailog(false);
          }}>
          <Dialog.Content style={styles.dialogContent}>
            <View style={styles.innnerConatiner}>
              <Text style={styles.dialogTitle}>
                {I18n.t('orderCard.assing_trip')}
              </Text>
              <>
                <RadioGroup
                  radioGroupList={tripList}
                  initialvalue={0}
                  onChange={() => {}}
                />
              </>
              <Button
                style={{marginTop: 15}}
                labelStyle={[styles.buttonT]}
                mode="contained"
                onPress={() => setshowDailog(false)}>
                {I18n.t('orderManagment.proceed')}
              </Button>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <Header navigation={navigation} title={header} />
      <FilterWrapper navigation={navigation} showFilter={true}>
      {emptyMessage1 && <View
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
              marginTop: 100,
            }}>
            {I18n.t('listingEmptyMessage.no_orders')}
          </Text>
        </View>}
        <View style={styles.filterWrapper}>
          {/* <View style={styles.filterContent}>
            <Text style={styles.filterText}>{selectedFilter[0]}</Text>
          </View>
          <View style={styles.filterContent}>
            <Text style={styles.filterText}>{selectedFilter[1]}</Text>
          </View>
          <View style={styles.filterContent}>
            <Text style={styles.filterText}>{selectedFilter[2]}</Text>
          </View>
          <View style={styles.filterContent}>
            <Text style={styles.filterText}>{selectedFilter[3]}</Text>
          </View> */}
        </View>

        <SafeAreaView style={{flex: 1}}>
          <FlatList
            keyExtractor={keyExtractor}
            data={listDetails}
            renderItem={renderItem}
          />
        </SafeAreaView>
      </FilterWrapper>

      <FooterTab navigation={navigation}
        onAddRoute={addRoute == 'AgencyOrderCreate' || addRoute == 'OrderCreation' ? addRoute && addRoute : onAddRoute}
        isAdd={true}
      
      />
    </View> 
  );
};

export default OrderManagment;
