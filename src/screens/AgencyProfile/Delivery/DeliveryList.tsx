import React from 'react';
import {View, FlatList, SafeAreaView, Text, Alert} from 'react-native';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../components/atoms/Header';
import I18n from '../../../config/i18n';
import styles from './Delivery.styles';
import CONSTANTS from '../../../constants/constants';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import config from '../../../config/colors';
import FooterTab from '../../../components/atoms/FooterTab';
import { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeleteDeliverySlot, GetAllDeliverySlotByAgency } from '../../../api/agencyApi';
import constants from '../../../constants/constants';
import DeleteModal from '../../../components/atoms/Modals/DeleteModal';

const DeliverySlotList: any = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
    const [deliverySlotList, setDeliveryList] = useState([]);
    const [loading, setloading] = useState(false);
  const [token, settoken] = useState('');
  const [emptyMessage, setEmptyMesage] = useState(false);
  const [loadList, setloadList] = useState(0);

  const [slotId, setSlotId] = useState('');
  const [todelete, setToDelete] = useState(false);

    
  useFocusEffect(
    React.useCallback(() => {
      setloading(true);
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
        if (err) {
          console.warn(err);
        }
        settoken(items[0][1]);
        GetAllDeliverySlotByAgency(items[0][1], items[1][1], 1, 1)
          .then(res => {
            console.log(res);
            setDeliveryList(res.data);
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
    
  const deleteDeliverySlot = () => {
    setToDelete(false)
    DeleteDeliverySlot(slotId, token)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setloadList(loadList + 1);
        } else {
          alert(I18n.t('errorMessage.some_error'));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
    
    
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <List.Item
      style={styles.listStyle}
      title={item.startTime + ' ' + 'to' + ' ' + item.endTime}
      left={props => (
        <List.Icon
          icon={() => (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View>
                <Icon name={'access-time'} color={config.DARK_GREY} size={15} />
              </View>
            </View>
          )}
        />
      )}
      right={props => (
        <List.Icon
          icon={() => (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={styles.icon1Container}>
                <Icon
                  name={'delete'}
                  color={config.DARK_GREY}
                  size={15}
                  onPress={() => {
                    setSlotId(item.deliverySlotId)
                    setToDelete(true)
                    
                  }}
                />
              </View>
              <View style={styles.icon2Container}>
                <Icon
                  name={'edit'}
                  color={config.DARK_GREY}
                  size={15}
                  onPress={() => {
                    navigation.navigate('AddDeliverySlot', {
                      firstname: route.params.firstname,
                      lastname: route.params.lastname,
                      type: 'edit',
                      deliverySlotId: item.deliverySlotId,
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
        title={I18n.t('errorMessage.delete_slot')}
        onDelete={deleteDeliverySlot}
      />

      <Header
        navigation={navigation}
        title={I18n.t('agencyProfileEdit.header')}
      />
      <PostAuthWrapper
        titlePreFix={route.params && route.params.firstname}
        titlePostFix={route.params && route.params.lastname}
        subtitle={I18n.t('delivery.delivery_title')}
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        <SafeAreaView style={{flex: 1}}>
          {!emptyMessage ? <FlatList
            keyExtractor={keyExtractor}
            data={deliverySlotList}
            renderItem={renderItem}
          /> : 
          <View style={{display: 'flex',alignItems: 'center',justifyContent:'center'}}>
          <Text style={{fontSize: 24,textAlign:'center' ,fontWeight: '400',marginTop:40}}>{constants.listingEmptyMessage.no_delivery}</Text>
      </View>
          }
        </SafeAreaView>
      </PostAuthWrapper>

      <FooterTab
        navigation={navigation}
        onAddRoute={'AddDeliverySlot'}
        isAdd={true}
        navigationData={{
          firstname: route.params.firstname,
          lastname: route.params.lastname,
          type: 'add',
        }}
        onPress={() => {
          console.warn('Customr');
        }}
      />
    </View>
  );
};

export default DeliverySlotList;
