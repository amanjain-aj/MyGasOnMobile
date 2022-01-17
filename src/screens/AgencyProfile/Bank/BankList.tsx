import React, {useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {List} from 'react-native-paper';
import Header from '../../../components/atoms/Header';
import Input from '../../../components/atoms/Input';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import constants from '../../../constants/constants';
import styles from './Bank.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from '../../../config/i18n';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import FooterTab from '../../../components/atoms/FooterTab';
import Spinner from 'react-native-loading-spinner-overlay';
import config from '../../../config/colors';
import SucessModal from '../../../components/atoms/Modals/SucessModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getBankInfo} from '../../../api/agencyApi';
import CustomAlert from '../../../components/atoms/Modals/CustomeAlert';
import Dropdown from '../../../components/atoms/Dropdown';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigationState} from '@react-navigation/native';
import { useEffect } from 'react';

const BankList: any = ({navigation, route}: {navigation: any; route: any}) => {
  const [loading, setLoading] = useState(false);
  const [omcName, setOmcName] = useState('');
  const [agyId, setAgyId] = useState('');
  const [custId, setcustId] = useState('');
  const [token, setToken] = useState('');

  const [showDialog, setShowDialog] = useState(false);
  const [emptyText, setEmptyText] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [agencies, setAgencyList] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [role, setRole] = useState('');


  useEffect(() => {
    setLoading(true);
    AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
      if (err) {
        console.warn(err);
      } else {
        getBankInfo(items[1][1], items[0][1])
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              console.log("STATUS",res.status);

              // setAgencyList([res.data]);
              setId(res.data.id)
              setTitle(res.data.bankName)
              setDescription('Acc. No : '+res.data.bankAccountNo+'\nIFSC Code: '+res.data.ifscCode+'\n')
            } else {
              setEmptyText(true);
            }
          })
          .catch(err => {
            console.log("STATUS", err.response.status);
            if (err.response.status === 404) {
              navigation.navigate('BankAdd', {
                firstname: route.params.firstname,
                lastname: route.params.lastname,
                type: 'add',
                id:id
              });
            }

            setLoading(false);
            console.log('Error' + err);
            setEmptyText(true);
          });
      }
    });
  }, [])
 

  return (
    <View style={styles.container}>
      <CustomAlert
        showDialog={popUp}
        setShowDialog={setPopUp}
        title={errorText}
      />

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
        title={I18n.t('bankProfileHeader.header')}
      />

      <PostAuthWrapper
        titlePreFix={route.params && route.params.firstname}
        titlePostFix={route.params && route.params.lastname}
        subtitle={I18n.t('bank.bank_deatils')}
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        <View style={{height:40}}/>
        <List.Item
          style={styles.listStyle}
          title={title}
          description={description}
          descriptionNumberOfLines={5}
          right={props => (
            <List.Icon
              icon={() => (
                <View style={{alignItems: 'center'}}>
                  <View style={styles.icon2Container}>
                    <Icon
                      name={'edit'}
                      color={config.WHITE}
                      size={18}
                      onPress={() => {
                        navigation.navigate('BankAdd', {
                          firstname: route.params.firstname,
                          lastname: route.params.lastname,
                          type: 'edit',
                          id:id
                        });
                      }}
                    />
                  </View>
                </View>
              )}
            />
          )}
        />
      </PostAuthWrapper>

      <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </View>
  );
};

export default BankList;
