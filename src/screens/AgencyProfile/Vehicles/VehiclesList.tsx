import React from 'react';
import {View, FlatList, SafeAreaView, Text, Alert} from 'react-native';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../components/atoms/Header';
import styles from './Vehicles.styles';
import CONSTANTS from '../../../constants/constants';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import config from '../../../config/colors';
import FooterTab from '../../../components/atoms/FooterTab';
import {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from '../../../config/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import constants from '../../../constants/constants';
import {DeleteVehicle, GetAllVehicleByAgency} from '../../../api/agencyApi';
import DeleteModal from '../../../components/atoms/Modals/DeleteModal';

const VehicleList: any = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [vehicleList, setVehicleList] = useState([]);
  const [loading, setloading] = useState(false);
  const [token, settoken] = useState('');
  const [emptyMessage, setEmptyMesage] = useState(false);
  const [loadList, setloadList] = useState(0);

  const [vehicleId, setVehicleId] = useState('');
  const [todelete, setToDelete] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setloading(true);
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
        if (err) {
          console.warn(err);
        }
        settoken(items[0][1]);
        GetAllVehicleByAgency(items[0][1], items[1][1], 1, 1)
          .then(res => {
            console.log(res.data);
            setVehicleList(res.data);
            if (res.data.length < 1) {
              setEmptyMesage(true)
            }else {
              setEmptyMesage(false)
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

  const deleteVehicle = () => {
      setToDelete(false)
      DeleteVehicle(vehicleId, token)
        .then(res => {
          if (res.status === 200) {
            console.log(res);
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
      title={item.name}
      description={
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text
            style={item.active === true ? styles.textStyle1 : styles.textStyle2}>
            {item.vehicleNumber.toUpperCase()}
          </Text>
          <Text>
            Capacity:{' '}
            <Text style={{color: config.SKY_BLUE, fontWeight: 'bold'}}>
              {item.capacity}
            </Text>{' '}
            Cyl.
          </Text>
        </View>
      }
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
                    setVehicleId(item.vehicleId)
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
                    navigation.navigate('VehicleAdd', {
                      firstname: route.params.firstname,
                      lastname: route.params.lastname,
                      type: 'edit',
                      vehicleId: item.vehicleId,
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
        title={I18n.t('errorMessage.delete_vehicle')}
        onDelete={deleteVehicle}
      />
      <Header
        navigation={navigation}
        title={I18n.t('agencyProfileEdit.header')}
      />
      <PostAuthWrapper
        titlePreFix={route.params && route.params.firstname}
        titlePostFix={route.params && route.params.lastname}
        subtitle={I18n.t('vehicle.vehicle_title')}
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        <SafeAreaView style={{flex: 1}}>
          {!emptyMessage? <FlatList
            keyExtractor={keyExtractor}
            data={vehicleList}
            renderItem={renderItem}
          />: 
          <View style={{display: 'flex',alignItems: 'center',justifyContent:'center'}}>
          <Text style={{fontSize: 24,textAlign:'center' ,fontWeight: '400',marginTop:40}}>{I18n.t('listingEmptyMessage.no_vehicle')}</Text>
      </View>
          }
        </SafeAreaView>
      </PostAuthWrapper>

      <FooterTab
        navigation={navigation}
        onAddRoute={'VehicleAdd'}
        isAdd={true}
        navigationData={{
          firstname: route.params.firstname,
          lastname: route.params.lastname,
          type: 'add',
        }}
        onPress={() => {
          console.warn('Customer');
        }}
      />
    </View>
  );
};

export default VehicleList;
