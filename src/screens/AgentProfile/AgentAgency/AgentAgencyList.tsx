import React from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/atoms/Header';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import constants from '../../../constants/constants';
import config from '../../../config/colors';
import Spinner from 'react-native-loading-spinner-overlay';
import I18n from '../../../config/i18n';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './AgentAgency.styles';
import ProfileBottomCard from '../../../components/atoms/ProfileBottomCard';
import FooterTab from '../../../components/atoms/FooterTab';
import {useState} from 'react';
import {deleteAgency, getAgenciesByCustomer} from '../../../api/customerApi';
import DeleteModal from '../../../components/atoms/Modals/DeleteModal';
import {GetAgencyById} from '../../../api/agencyApi';
import {getAgentById} from '../../../api/agentApi';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

const AgentAgencyList: any = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [loading, setloading] = useState(true);
  const [token, settoken] = useState('');
  const [cid, setCid] = useState('');

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const [agnId, setAgnId] = useState('');

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

        getAgentById(items[1][1], items[0][1])
          .then(res => {
            setloading(false);
            console.log(res.data);
            setAgnId(res.data.agency.id);
            setName(res.data['agency']['name']);
            setAddress(
              res.data.agency.address.addressLine1 +
                '\n' +
                res.data.agency.address.addressLine2 +
                '\n' +
                res.data.agency.address.city +
                ', ' +
                res.data.agency.address.state,
            );
          })
          .catch(err => {
            console.log(err.response.data);
            setloading(false);
          });
      });
    }, [loadList]),
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

      <Header navigation={navigation} title={I18n.t('agentHome.header')} />
      <PostAuthWrapper
        titlePreFix={route.params.firstname}
        titlePostFix={route.params.lastname}
        navigation={navigation}
        subtitle={I18n.t('customerAgency.agency_title')}
        isAgencyHomePage={true}
        isEdit={false}>
        <SafeAreaView style={{flex: 1}}>
          <List.Item
            style={styles.listStyle}
            title={name}
            description={address}
            descriptionNumberOfLines={5}
            right={props => (
              <List.Icon
                icon={() => (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      paddingRight: 10,
                    }}>
                    <View style={styles.icon1Container}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('AgentContract', {
                            custId: cid,
                            firstname: route.params.firstname,
                            lastname: route.params.lastname,
                            type: 'agent',
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
                          navigation.navigate('AgentPaymentDetails', {
                            isBank: true,
                            firstname: route.params.firstname,
                            lastname: route.params.lastname,
                            id: cid,
                            agnId: agnId,
                            type: 'agent',
                          });
                        }}
                      />
                    </View>
                  </View>
                )}
              />
            )}
          />
        </SafeAreaView>
      </PostAuthWrapper>

      <FooterTab
        navigation={navigation}
        onAddRoute={''}
        isAdd={false}
        navigationData={{
          firstname: route.params.firstname,
          lastname: route.params.lastname,
        }}
      />
    </View>
  );
};

export default AgentAgencyList;
