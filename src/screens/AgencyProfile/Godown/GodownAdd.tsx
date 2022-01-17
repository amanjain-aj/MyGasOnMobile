import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../components/atoms/Header';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import CONSTANTS from '../../../constants/constants';
import I18n from '../../../config/i18n';
import Input from '../../../components/atoms/Input';
import DropDown from '../../../components/atoms/Dropdown';
import LocationModal from '../../../components/atoms/Modals/LocationModal';
import styles from './Godown.styles';
import config from '../../../config/colors';
import {Button} from 'react-native-paper';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CreateGodown,
  GetGowDownById,
  UpdateGodown,
} from '../../../api/agencyApi';
import Geocoder from '../../../api/geocoder';
import Spinner from 'react-native-loading-spinner-overlay';
import constants from '../../../constants/constants';
import CustomAlert from '../../../components/atoms/Modals/CustomeAlert';

const godownValidationSchema = yup.object().shape({
  name: yup.string().required(),
  address1: yup.string().required(),
  address2: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
});

const GodownAdd: any = ({navigation, route}: {navigation: any; route: any}) => {
  const options = [
    {label: 'Primary', value: 'primary', key: 1},
    {label: 'Floating', value: 'floating', key: 2},
  ];

  const [showDialog, setShowDialog] = useState(false);
  const [location, setLocation] = useState([]);

  const openModal = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setShowDialog(true);
    } else {
      alert('Location permission denied');
    }
  };

  const [state, setstate] = useState('');
  const [name, setname] = useState('');
  const [address1, setaddress1] = useState('');
  const [address2, setaddress2] = useState('');
  const [type, setType] = useState('');

  const [locLoding, setLocLoading] = useState(false);
  const [loding, setloading] = useState(false);
  const [loader, setloader] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [city, setcity] = useState('');

  useEffect(() => {
    if (route.params.type === 'edit') {
      setloader(true);
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
        if (err) {
          console.warn(err);
        }
        console.log(route.params.godownId);
        GetGowDownById(route.params.godownId, items[0][1])
          .then(res => {
            console.log(res.data);
            setname(res.data.name);
            setType(res.data.type);
            setaddress1(res.data.address.addressLine1);
            setaddress2(res.data.address.addressLine2);
            setstate(res.data.address.state);
            setcity(res.data.address.city);
            setLocation([
              res.data.address.latitude,
              res.data.address.longitude,
            ]);
            res.data.type && setType(res.data.type);

            setloader(false);
          })
          .catch(err => {
            console.log(err);
            setloader(false);
          });
      });
    }
  }, []);

  const populateFeildWithGeoCoder = (lat, lng) => {
    console.log(location[0]);
    setLocLoading(true);
    Geocoder.from(lat, lng)
      .then(res => {
        setaddress2(
          res.results[0].address_components[1].long_name +
            ', ' +
            res.results[0].address_components[2].long_name,
        );
        let addrResponse = res.results[0].address_components;
        addrResponse.forEach(part => {
          if (part.types.includes('locality')) {
            setcity(part.long_name);
          }

          if (part.types.includes('administrative_area_level_1')) {
            setstate(part.long_name);
          }
        });

        setLocLoading(false);
      })
      .catch(err => {
        setLocLoading(false);
        setErrorText(I18n.t('errorMessage.internet_error'));
        setPopUp(true);
        console.log(err);
      });
  };

  const addGodown = () => {
    godownValidationSchema
      .isValid({
        name: name,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
      })
      .then(valid => {
        if (valid) {
          setloader(true);
          AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
            if (err) {
              return console.warn(err);
            }
            const body = {
              name: name,
              agency: {
                id: items[1][1],
              },
              type: type,
              address: {
                addressLine1: address1,
                addressLine2: address2,
                city: city,
                state: state,
                latitude: location[0],
                longitude: location[1],
              },
            };

            if (route.params.type === 'edit') {
              console.log(route.params.godownId);
              UpdateGodown(route.params.godownId, items[0][1], body)
                .then(res => {
                  if (res.status === 200) {
                    navigation.goBack();
                    setloader(false);
                  }
                })
                .catch(err => {
                  setErrorText(I18n.t('errorMessage.error_vehicle'));
                  setPopUp(true);
                  setloader(false);
                  console.log(err);
                });
            } else {
              console.log(items[0][1], items[1][1]);
              console.log(body);
              CreateGodown(items[0][1], body)
                .then(res => {
                  setloader(false);

                  console.log(res.data);
                  if (res.status === 201) {
                    navigation.goBack();
                  }
                })
                .catch(err => {
                  setErrorText(I18n.t('errorMessage.error_godown'));
                  setPopUp(true);
                  console.log(err);
                  setloader(false);
                });
            }
          });
        } else {
          setErrorText(I18n.t('errorMessage.error_fields'));
          setPopUp(true);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={loader}
        size="large"
        textContent={I18n.t('loadingText.loading')}
        textStyle={{
          color: config.WHITE,
          fontSize: 12,
          marginTop: 2,
        }}
      />
      <CustomAlert
        showDialog={popUp}
        setShowDialog={setPopUp}
        title={errorText}
      />
      <LocationModal
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        submit={I18n.t('godown.location_submit')}
        onLocationSelected={cordinates => {
          setLocation([cordinates.latitude, cordinates.longitude]);
          setShowDialog(false);

          populateFeildWithGeoCoder(cordinates.latitude, cordinates.longitude);
        }}
      />
      <Header
        navigation={navigation}
        title={I18n.t('agencyProfileEdit.header')}
      />
      <PostAuthWrapper
        titlePreFix={route.params && route.params.firstname}
        titlePostFix={route.params && route.params.lastname}
        subtitle={I18n.t('godown.godown_invite_title')}
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        <Input
          secureTextEntry={false}
          label={I18n.t('godown.godown_input_name')}
          value={name}
          onChange={text => setname(text)}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('godown.godown_input_name')}
          disabled={false}
          error={false}
          mode="flat"
          numberOnly=""
          maxLength={30}
          style={{}}
          dense=""
          isAvailable={false}
          success={false}
          hintText=""
          keyboardType="default"
          onFocus={() => {}}
        />

        <DropDown
          options={options}
          selectedValue={type}
          placeholder={I18n.t('godown.godown_input_type')}
          onChange={text => {
            setType(text);
          }}
        />
        {/* <Input
                    secureTextEntry = {false}
                    label={CONSTANTS.godown.godown_input_type}
                    value = ""
                    onChange={()=>{}}
                    iconSize = {20}
                    iconName=''
                    placeholder = {CONSTANTS.godown.godown_input_type}
                    disabled = {false}
                    error = {false}
                    mode = 'flat'
                    numberOnly = ''
                    maxLength= {30}
                    style = {{}}
                    dense = ''
                    isAvailable = {false}
                    success = {false}
                    hintText =""
                    keyboardType = 'default'
                    onFocus = {()=>{}}
                /> */}
        <Input
          secureTextEntry={false}
          label={I18n.t('godown.godown_input_address')}
          value={address1}
          onChange={text => setaddress1(text)}
          iconSize={20}
          iconName="person-outline"
          placeholder={I18n.t('godown.godown_input_address')}
          disabled={false}
          error={false}
          mode="flat"
          numberOnly=""
          maxLength={30}
          style={{}}
          dense=""
          isAvailable={true}
          success={false}
          hintText=""
          keyboardType="default"
          onFocus={() => {}}
        />
        <Button
          style={{width: '70%'}}
          icon={() => (
            <Icon
              style={{position: 'absolute', left: -30, top: -12}}
              name={'pin-drop'}
              color={config.SKY_BLUE}
              size={25}
            />
          )}
          loading={locLoding}
          contentStyle={{borderColor: config.SKY_BLUE, borderWidth: 1}}
          labelStyle={[styles.buttonLocation]}
          mode="outlined"
          onPress={openModal}>
          {I18n.t('godown.godown_button_geo_location')}
        </Button>

        <Input
          secureTextEntry={false}
          label={I18n.t('godown.godown_input_address2')}
          value={address2}
          onChange={() => {}}
          iconSize={20}
          iconName="person-outline"
          placeholder=""
          disabled={false}
          error={false}
          mode="flat"
          numberOnly=""
          maxLength={30}
          style={{}}
          dense=""
          editable={false}
          isAvailable={true}
          success={false}
          hintText=""
          keyboardType="default"
          onFocus={() => {}}
          multiline ={true}
          numberOfLines={2}
        />

        <Input
          placeholder={I18n.t('ndCustomer.organizationalInfo.city')}
          value={city}
          onChange={text => setcity(text)}
          editable={false}
        />

        <Input
          placeholder={I18n.t('ndCustomer.organizationalInfo.state')}
          value={state}
          onChange={text => setstate(text)}
          editable={false}
        />
        <Input
          secureTextEntry={false}
          label={I18n.t('godown.godown_input_latitude')}
          value={location.length > 1 ? location[0] + ' / ' + location[1] : ''}
          onChange={() => {}}
          iconSize={30}
          iconName="pin-drop"
          placeholder=""
          disabled={false}
          error={false}
          mode="flat"
          numberOnly=""
          editable={false}
          maxLength={30}
          style={{}}
          dense=""
          isAvailable={true}
          success={false}
          hintText=""
          keyboardType="default"
          onFocus={() => {}}
        />
        <Button
          labelStyle={styles.button}
          mode="contained"
          disabled={loader}
          onPress={() => {
            addGodown();
          }}>
          {route.params.type === 'edit'
            ? I18n.t('godown.godown_button_update')
            : I18n.t('godown.godown_button_add')}
        </Button>
      </PostAuthWrapper>
    </View>
  );
};

export default GodownAdd;
