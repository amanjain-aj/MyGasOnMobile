import React, {useState} from 'react';
import {Text, View, FlatList, ScrollView} from 'react-native';
import CONSTANTS from '../../constants/constants';
import I18n from '../../config/i18n';
import Header from '../../components/atoms/Header';
import PostAuthWrapper from '../../components/PostAuthWrapper';
import {FAB} from 'react-native-paper';
import config from '../../config/colors';
import itemStyles from './itemManagement.styles';
import ItemManagement from '.';
import {List} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './itemManagement.styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DeleteItem, GetItemListing} from '../../api/agencyApi';
import FooterTab from '../../components/atoms/FooterTab';
import DeleteModal from '../../components/atoms/Modals/DeleteModal';

const ItemListing: any = ({navigation}: {navigation: any}) => {
  // Dummy data

  const [ItemList, setItemList] = useState([]);
  const [loading, setloading] = useState(true);
  const [token, settoken] = useState('');
  const [emptyMessage, setEmptyMesage] = useState(false);

  const [loadList, setloadList] = useState(0);
  const [staffName, setStaffName] = useState('');
  const [id, setId] = useState('');

  const [todelete, setToDelete] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setloading(true);
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
        if (err) {
          console.warn(err);
        }
        settoken(items[0][1]);
        GetItemListing(items[0][1], items[1][1], 1)
          .then(res => {
            console.log(res.data);
            setItemList(res.data);
            setloading(false);
            if (res.data.length < 1) {
              setEmptyMesage(true);
            } else {
              setEmptyMesage(false);
            }
          })
          .catch(err => {
            console.log(err);
            setloading(false);
          });
      });
    }, [loadList]),
  );

  const deleteItem = () => {
    setToDelete(false);
    setloading(true);
    // console.log(id,token)
    DeleteItem(id, token)
      .then(res => {
        setloading(false);
        console.log(res.data);
        setloadList(loadList + 1);
      })
      .catch(err => {
        setloading(false);

        console.log(err.response.data);
      });
  };

  const renderItem = ({item}) => (
    <List.Item
      style={styles.listStyle}
      title={'Item Name & Price'}
      titleStyle={{color: config.DARK_GREY, fontSize: 14}}
      description={item.item.itemName + '\nPrice: ' + item.price}
      descriptionStyle={{
        color: config.NAVY_BLUE,
        fontSize: 16,
        fontWeight: 'bold',
      }}
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
                    setId(item.priceId);
                    setToDelete(true);
                  }}
                />
              </View>
              <View style={styles.icon1Container}>
                <Icon
                  name={'edit'}
                  color={config.DARK_GREY}
                  size={15}
                  onPress={() => {
                    navigation.navigate('AddItemPrice', {
                      type: 'edit',
                      Id: item.priceId,
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
    <View style={{height: '100%', width: '100%'}}>
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
        title={I18n.t('errorMessage.delete_item')}
        onDelete={deleteItem}
      />
      <Header navigation={navigation} title={I18n.t('items.header')} />

      <PostAuthWrapper
        titlePreFix={I18n.t('items.item_txt')}
        titlePostFix={I18n.t('items.item_listing.listing_txt')}
        isAgencyHomePage={false}
        isHelpCenter={false}
        navigation={navigation}
        EditRoute={'CustomerProfileEdit'}
        isEdit={false}>
        <View style={itemStyles.listing_view}>
          <FlatList
            keyExtractor={item => item.priceId}
            data={ItemList}
            renderItem={renderItem}
          />
        </View>
      </PostAuthWrapper>

      <FooterTab
        navigation={navigation}
        onAddRoute={'AddItemPrice'}
        isAdd={true}
        navigationData={{
          type: 'add',
        }}
        onPress={() => {
          console.warn('Customr');
        }}
      />
    </View>
  );
};

export default ItemListing;
