import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { List } from 'react-native-paper';
import FooterTab from '../../../components/atoms/FooterTab';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import config from '../../../config/colors'
import styles from './AgentStore.styles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import { deleteAgentStore, getStoreByAgent } from '../../../api/agentApi';
import I18n from '../../../config/i18n';
import DeleteModal from '../../../components/atoms/Modals/DeleteModal';
import Header from '../../../components/atoms/Header';


const AgentStoreList = ({
    navigation,
    route,
  }: {
    navigation: any;
    route: any;
  }) => {

    const [storeList, setStoreList] = useState([]);
  const [loading, setloading] = useState(true);

  const [emptyMessage, setEmptyMesage] = useState(false);
  const [token, settoken] = useState('');
  const [storeID, setstoreID] = useState('');
  const [todelete, setToDelete] = useState(false);

    const [loadList, setloadList] = useState(0);
    
    useFocusEffect(
        React.useCallback(() => {
          setloading(true);
          AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
            if (err) {
              console.warn(err);
            }
            console.log(items[1][1]);
            settoken(items[0][1]);
            getStoreByAgent(items[1][1], items[0][1], 1)
              .then(res => {
                console.log(res);
                setStoreList(res.data);
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
    
    const deleteStoreItem = () => {
        setToDelete(false);
        deleteAgentStore(storeID, token)
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

    
    
  const renderItem = ({item}) => (
    <List.Item
      style={styles.listStyle}
      title={item.name}
      descriptionNumberOfLines={3}
      description={getStoreAddress(item.address)}
      right={props => (
        <List.Icon
          icon={() => (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={styles.icon2Container1}>
                <Icon
                  name={'delete'}
                  color={config.WHITE}
                  size={17}
                  onPress={() => {
                    setstoreID(item.storeId);
                    setToDelete(true);
                  }}
                />
              </View>
              <View style={styles.icon2Container}>
                <Icon
                  name={'edit'}
                  color={config.WHITE}
                  size={17}
                  onPress={() => {
                    navigation.navigate('AgentStoreAdd', {
                      firstname: route.params.firstname,
                      lastname: route.params.lastname,
                      type: 'edit',
                      storeId: item.storeId,
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
  const keyExtractor = (item, index) => item.storeId;

    
    return (
        <View style={styles.contanier}> 
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
        title={I18n.t('deleteMessage.delete_store')}
        onDelete={deleteStoreItem}
      />

      <Header
        navigation={navigation}
        title={I18n.t('agentHome.header')}
            />
            <PostAuthWrapper
        titlePreFix={route.params && route.params.firstname}
        titlePostFix={route.params && route.params.lastname}
        navigation={navigation}
        subtitle={I18n.t('customerStore.store_title')}
        isAgencyHomePage={true}
        isEdit={false}>
        <SafeAreaView>
          {!emptyMessage ? (
            <FlatList
              keyExtractor={keyExtractor}
              data={storeList}
              renderItem={renderItem}></FlatList>
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
                {I18n.t('listingEmptyMessage.no_store')}
              </Text>
            </View>
          )}
        </SafeAreaView>
      </PostAuthWrapper>

      <FooterTab
        navigation={navigation}
        onAddRoute={'AgentStoreAdd'}
        isAdd={true}
        navigationData={{
          firstname: route.params.firstname,
          lastname: route.params.lastname,
          type: 'add',
        }}
      />
        </View>
    )
}

export default AgentStoreList
