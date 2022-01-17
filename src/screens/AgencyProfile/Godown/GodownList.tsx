import React, {useState} from 'react';
import {View, FlatList, SafeAreaView, Text, Alert} from 'react-native';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../components/atoms/Header';
import styles from './Godown.styles';
import CONSTANTS from '../../../constants/constants';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import config from '../../../config/colors';
import FooterTab from '../../../components/atoms/FooterTab';
import I18n from "../../../config/i18n";
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DeleteGodown, GetAllGodownByAgency} from '../../../api/agencyApi';
import Spinner from 'react-native-loading-spinner-overlay';
import constants from '../../../constants/constants';
import DeleteModal from '../../../components/atoms/Modals/DeleteModal';

const GodownList: any = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [loading, setloading] = useState(false);
  const [token, settoken] = useState('');
  const [loadList, setloadList] = useState(0);
  const [emptyMessage, setEmptyMesage] = useState(false);

  const [godownList, setGowdownList] = useState([]);
  const [goId, setGoId] = useState('');
  const [todelete, setToDelete] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setloading(true);
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
        if (err) {
          console.warn(err);
        }
        settoken(items[0][1]);
        GetAllGodownByAgency(items[0][1], items[1][1], 1, 1)
          .then(res => {
            console.log(res.data);
            setGowdownList(res.data);
            if (res.data.length < 1) {
              setEmptyMesage(true)
            } else {
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
  const getStoreAddress = address => {
    return (
      address.addressLine1 +
      ',\n' +
      address.addressLine2 +
      ', ' +
      address.city +
      ', ' +
      address.state
    );
  };

  const deleteGowDown = () => {
    setToDelete(false)
    DeleteGodown(goId, token)
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          setloadList(loadList + 1);
        } else {
          alert('Some Error Occured');
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
      titleStyle={{color: config.SKY_BLUE, fontSize: 16}}
      description={getStoreAddress(item.address)}
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
                    setGoId(item.godownId)
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
                    navigation.navigate('GodownAdd', {
                      firstname: route.params.firstname,
                      lastname: route.params.lastname,
                      type: 'edit',
                      godownId: item.godownId,
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
        textContent={ I18n.t('loadingText.loading')}
        textStyle={{
          color: config.WHITE,
          fontSize: 12,
          marginTop: 2,
        }}
      />
       <DeleteModal
        showDialog={todelete}
        setShowDialog={setToDelete}
        title={I18n.t('errorMessage.delete_godown')}
        onDelete={deleteGowDown}
      />
      <Header
        navigation={navigation}
        title={ I18n.t('agencyProfileEdit.header')}
      />
      <PostAuthWrapper
        titlePreFix={route.params && route.params.firstname}
        titlePostFix={route.params && route.params.lastname}
        subtitle={ I18n.t('godown.godown_title')}
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        <SafeAreaView style={{flex: 1}}>
         { !emptyMessage?<FlatList
            keyExtractor={keyExtractor}
            data={godownList}
            renderItem={renderItem}
          />: 
          <View style={{display: 'flex',alignItems: 'center',justifyContent:'center'}}>
          <Text style={{fontSize: 24,textAlign:'center' ,fontWeight: '400',marginTop:40}}>{I18n.t('listingEmptyMessage.no_goddown')}</Text>
      </View>
          }
        </SafeAreaView>
      </PostAuthWrapper>

      <FooterTab
        navigation={navigation}
        onAddRoute={'GodownAdd'}
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

export default GodownList;
