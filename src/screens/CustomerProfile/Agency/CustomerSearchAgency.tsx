import React, {useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {List} from 'react-native-paper';
import Header from '../../../components/atoms/Header';
import Input from '../../../components/atoms/Input';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import constants from '../../../constants/constants';
import styles from './CustomerAgency.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from "../../../config/i18n";
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import FooterTab from '../../../components/atoms/FooterTab';
import Spinner from 'react-native-loading-spinner-overlay';
import config from '../../../config/colors';
import SucessModal from '../../../components/atoms/Modals/SucessModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AddAgencyToCustomer,
  GetAgenciesByOmcID,
} from '../../../api/customerApi';
import CustomAlert from '../../../components/atoms/Modals/CustomeAlert';
const CustomerSearchAgency: any = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
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

  const addAgency = () => {
    if (agyId.length < 1) {
      setErrorText(I18n.t('errorMessage.agency_error'));
      setPopUp(true)
      return;
    }
    setLoading(true);
    console.log(agyId, custId, token);
    AddAgencyToCustomer(token, custId, agyId)
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          console.log(res.data);
          setShowDialog(true);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  const searchAgency = () => {
    if (omcName.length < 1) {
      setErrorText(I18n.t('errorMessage.agency_search'));
      setPopUp(true)

      return;
    }
    setLoading(true);
    AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
      if (err) {
        console.warn(err);
      } else {
        setToken(items[0][1]);
        setcustId(items[1][1]);

        GetAgenciesByOmcID(items[0][1], omcName && omcName)
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              console.log(res.data);
              setAgyId(res.data.agencyId);
              setAgencyList([res.data]);
            } else {
              setEmptyText(true)
            }
          })
          .catch(err => {
            setLoading(false);
            console.log('Error' + err);
            setEmptyText(true)
          });
      }
    });
  };

  const getAgencyAddress = address => {
    return (
      address.addressLine1 +
      ', ' +
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
      descriptionNumberOfLines={5}
      description={getAgencyAddress(item.address)}
      right={props => (
        <List.Icon
          icon={() => (
            <View style={{alignItems: 'center'}}>
              <View style={styles.icon2Container}>
                <Icon
                  name={'person-pin-circle'}
                  color={config.WHITE}
                  size={18}
                />
              </View>
            </View>
          )}
        />
      )}
    />
  );

  const keyExtractor = (item, index) => index.toString();

  const openModal = () => {
    setShowDialog(true);
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        showDialog={popUp}
        setShowDialog={setPopUp}
        title={errorText}
      />
      <SucessModal
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onButtonClick={() => {
          navigation.goBack();
        }}
        submit={I18n.t('customerAgency.close_agency')}
        title={I18n.t('agencyModal.modal_title')}
        subtitle={I18n.t('agencyModal.modal_subtitle')}
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
        title={I18n.t('customerProfileHome.header')}
      />

      <PostAuthWrapper
        titlePreFix={route.params && route.params.firstname}
        titlePostFix={route.params && route.params.lastname}
        subtitle={I18n.t('customerAgency.search_agency_title')}
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        <>
          <Input
            secureTextEntry={false}
            label={I18n.t('customerAgency.search_agency_title')}
            value={omcName}
            onChange={text => {
              setOmcName(text);
            }}
            iconSize={20}
            iconName="search"
            placeholder=""
            disabled={false}
            error={false}
            mode="flat"
            numberOnly=""
            maxLength={17}
            style={{}}
            onIconCLick={() => {
              searchAgency();
            }}
            dense=""
            isAvailable={true}
            success={false}
            hintText=""
            keyboardType="default"
          />
        </>
        {emptyText ? <View style={{display: 'flex',alignItems: 'center',justifyContent:'center'}}>
            <Text style={{fontSize: 20,textAlign:'center' ,fontWeight: '400',marginTop:20}}>{I18n.t('customerAgency.no_agency')}</Text>
        </View> : null}

        <SafeAreaView style={{flex: 1}}>
          <FlatList
            keyExtractor={keyExtractor}
            data={agencies}
            renderItem={renderItem}
          />
          <Button
            style={{marginTop: 15}}
            contentStyle={{flexDirection: 'row-reverse'}}
            labelStyle={[styles.button]}
            mode="contained"
            onPress={addAgency}>
            {I18n.t('customerAgency.add_agency')}
          </Button>
        </SafeAreaView>
      </PostAuthWrapper>

      <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </View>
  );
};

export default CustomerSearchAgency;
