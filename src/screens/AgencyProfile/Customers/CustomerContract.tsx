import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from '../../../config/i18n';
import Header from '../../../components/atoms/Header';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import ContractCard from '../../../components/atoms/ContractCard';
import CONSTANTS from '../../../constants/constants';
import styles from './Customer.styles';
import config from '../../../config/colors';
import FooterTab from '../../../components/atoms/FooterTab';
import {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { GetAllCustomerByAgencyContract, GetAllCustomerContract } from '../../../api/agencyApi';

const CustomerContract: any = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [contractList, setcontactList] = useState([ ]);

  const [emptyMessage, setEmptyMesage] = useState(false);

  const [loading, setloading] = useState(false);
  const [loadList, setloadList] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setloading(true);
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
        if (err) {
          console.warn(err);
        }

        console.log(route.params.custId)
        console.log(items[1][1])
        console.log(items[0][1])

        // if (route.params.type === 'customer') {
        //   GetAllCustomerByAgencyContract(route.params.custId, items[0][1])
        //   .then(res => {
        //     console.log(res.data);
           
        //     if (res.data.length < 1) {
        //       setEmptyMesage(true);
        //     } else {
        //       setEmptyMesage(false);
        //     }
        //     setcontactList(res.data)
        //     setloading(false);
        //   })
        //   .catch(err => {
        //     setloading(false);

        //     console.log(err);
        //   });
        // }
        
        GetAllCustomerContract(route.params.custId, items[0][1])
          .then(res => {
            console.log(res.data);
           
            if (res.data.length < 1) {
              setEmptyMesage(true);
            } else {
              setEmptyMesage(false);
            }
            setcontactList(res.data)
            setloading(false);
          })
          .catch(err => {
            setloading(false);

            console.log(err);
          });
      });
    }, [loadList]),
  );

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <ContractCard
      itemName={item.itemPrice.item.itemName}
      issuedCyl={item.issuedCyl}
      omcId={item.omcId}
      deposit={item.cylSecurityDeposit}
      discount={item.cylSecurityDiscount}
      onEdit={() => {
        if (route.params.type === 'customer') {
          
        } else {
          navigation.navigate('CustomerAddItem', {
            firstname: route.params.firstname,
            lastname: route.params.lastname,
            custId: route.params.custId,
            type: 'edit',
            contractId:item.id
            
         })
        }
       
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
        subtitle={
         route.params.firstname+" "+route.params.lastname
        }
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        <SafeAreaView style={{flex: 1}}>
        { !emptyMessage? <FlatList
            keyExtractor={keyExtractor}
            data={contractList}
            renderItem={renderItem}
          />: 
          <View style={{display: 'flex',alignItems: 'center',justifyContent:'center'}}>
          <Text style={{fontSize: 24,textAlign:'center' ,fontWeight: '400',marginTop:40}}>{I18n.t('listingEmptyMessage.no_contracts')}</Text>
      </View>
          }
        </SafeAreaView>
      </PostAuthWrapper>

      <FooterTab
        navigation={navigation}
        onAddRoute={'CustomerAddItem'}
        isAdd={route.params.type === 'customer'?false: true}
        navigationData={{
          firstname: route.params.firstname,
          lastname: route.params.lastname,
          custId:route.params.custId
        }}
        onPress={() => {
         
        }}
      />
    </View>
  );
};

export default CustomerContract;
