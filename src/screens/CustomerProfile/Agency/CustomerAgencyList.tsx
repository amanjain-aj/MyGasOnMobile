import React from 'react';
import {View, SafeAreaView, FlatList,Text, Alert, Image, TouchableOpacity} from 'react-native';
import Header from '../../../components/atoms/Header';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import constants from '../../../constants/constants';
import config from '../../../config/colors';
import Spinner from 'react-native-loading-spinner-overlay';
import I18n from "../../../config/i18n";
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './CustomerAgency.styles';
import ProfileBottomCard from '../../../components/atoms/ProfileBottomCard';
import FooterTab from '../../../components/atoms/FooterTab';
import {useState} from 'react';
import { deleteAgency, getAgenciesByCustomer } from '../../../api/customerApi';
import DeleteModal from '../../../components/atoms/Modals/DeleteModal';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';


const CustomerAgencyList: any = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [agencyList, setAgencyList] = useState([]);
  const [loading, setloading] = useState(true);
  const [token, settoken] = useState('');
  const [cid, setCid] = useState('');

  const [emptyMessage, setEmptyMesage] = useState(false);
  const [agnId, setAgnId] = useState('');
  const [todelete, setToDelete] = useState(false);

  const [loadList, setloadList] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setloading(true);
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
        if (err) {
          console.warn(err);
        }
        settoken(items[0][1]);
        setCid(items[1][1]);

        getAgenciesByCustomer(items[1][1], items[0][1], 1, 10)
          .then(res => {
            console.log(res.data);
            setAgencyList(res.data);
            setloading(false);
            if (res.data.length < 1) {
              setEmptyMesage(true)
            }else {
              setEmptyMesage(false)
            }
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
      description={item.address.addressLine2 + ',\n' + item.address.city+', '+item.address.state}
      right={props => (
        <List.Icon
          icon={() => (
            <View
              style={{ display: 'flex', flexDirection: 'row', paddingRight: 10 }}>
              
              <View style={styles.icon1Container}>
                <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CustomerContract', {
                    custId: cid,
                    firstname: route.params.firstname,
                    lastname: route.params.lastname,
                    type:'customer'
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
                    navigation.navigate('PaymentDetails', {
                      firstname: route.params.firstname,
                      lastname: route.params.lastname,
                      custId: item.customerId,
                      cid:cid,
                      customerData: item,
                      type:'customer'

                    });
                  }}
                />
              </View>
            </View>
          )}
        />
      )}
    />
  );

  const keyExtractor = (item, index) => index.toString();

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
        title={I18n.t('customerProfileHome.header')}
      />
      <PostAuthWrapper
        titlePreFix={route.params.firstname}
        titlePostFix={route.params.lastname}
        navigation={navigation}
        subtitle={I18n.t('customerAgency.agency_title')}
        isAgencyHomePage={true}
        isEdit={false}>
        <SafeAreaView style={{flex: 1}}>
          {!emptyMessage? <FlatList
            keyExtractor={keyExtractor}
            data={agencyList}
            renderItem={renderItem}
          /> : <View style={{display: 'flex',alignItems: 'center',justifyContent:'center'}}>
                <Text style={{fontSize: 24,textAlign:'center' ,fontWeight: '400',marginTop:40}}>{I18n.t('listingEmptyMessage.no_agency')}</Text>
            </View>}
        </SafeAreaView>
        {/* <ProfileBottomCard
          cardDetails={constants.cardDetails}
          /> */}
      </PostAuthWrapper>

      <FooterTab
        navigation={navigation}
        onAddRoute={'CustomerSearchAgency'}
        isAdd={true}
        navigationData={{
          firstname: route.params.firstname,
          lastname: route.params.lastname,
          
        }}
      />
    </View>
  );
};

export default CustomerAgencyList;
