import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Linking, SafeAreaView, FlatList} from 'react-native';
import config from '../../../config/colors';
import Header from '../../../components/atoms/Header';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommmunity from 'react-native-vector-icons/MaterialCommunityIcons';
import FooterTab from '../../../components/atoms/FooterTab';
import DeleteModal from '../../../components/atoms/Modals/DeleteModal';
import styles from './ChannelPartnerStaff.styles'
import I18n from '../../../config/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import {getAgentStaffList} from '../../../api/agentApi';
import { getCahnnelPartnerStaffList } from '../../../api/channelPartnerApi';

const ChannelPartnerStaffList = ({navigation, route}: {navigation: any; route: any}) => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setloading] = useState(true);
  const [token, settoken] = useState('');
  const [emptyMessage, setEmptyMesage] = useState(false);
  const [staffName, setStaffName] = useState('');
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
        getCahnnelPartnerStaffList(items[0][1], 0, items[1][1])
          .then(res => {
            console.log(res.data);
            setStaffList(res.data.content);
            setloading(false);
            if (res.data.content.length < 1) {
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

  const renderItem = ({item}) => (
    <List.Item
      style={styles.listStyle}
      title={item.userDetails.name}
      description={item.role && item.role.name.split('_')[1]}
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
                    setStaffName(item.username);
                    setToDelete(true);
                  }}
                />
              </View>
              <View style={styles.icon2Container}>
                {item.active === 'Y' ? (
                  <Icon
                    name={'local-phone'}
                    color={config.WHITE}
                    size={15}
                    onPress={() => {
                      Linking.openURL(`tel:${item.userDetails.mobile}`);
                    }}
                  />
                ) : (
                  <IconCommmunity
                    name={'share'}
                    color={config.WHITE}
                    size={15}
                    onPress={() => {}}
                  />
                )}
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
        title={I18n.t('channelPartnerHome.header')}
      />

      <PostAuthWrapper
        titlePreFix={route.params.firstname}
        titlePostFix={route.params.lastname}
        subtitle={I18n.t('staff.staff_title')}
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        <SafeAreaView style={{flex: 1}}>
          {!emptyMessage ? (
            <FlatList
              keyExtractor={keyExtractor}
              data={staffList}
              renderItem={renderItem}
            />
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
                {I18n.t('listingEmptyMessage.no_staff')}
              </Text>
            </View>
          )}
        </SafeAreaView>
      </PostAuthWrapper>

      <FooterTab
        navigation={navigation}
        onAddRoute={'ChannelPartnerStaffInvite'}
        isAdd={true}
        navigationData={{
          firstname: route.params.firstname,
          lastname: route.params.lastname,
        }}
      />
    </View>
  );
};

export default ChannelPartnerStaffList;
