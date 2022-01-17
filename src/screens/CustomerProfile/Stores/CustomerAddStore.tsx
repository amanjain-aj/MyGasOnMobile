import React, {useState} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import Header from '../../../components/atoms/Header';
import Input from '../../../components/atoms/Input';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import config from '../../../config/colors';
import Spinner from 'react-native-loading-spinner-overlay';

import constants from '../../../constants/constants';
import styles from './CustomerStore.styles';
import Dropdown from '../../../components/atoms/Dropdown';
import LocationModal from '../../../components/atoms/Modals/LocationModal';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNewStore, updateStoreByCustomer} from '../../../api/customerApi';
import Geocoder from 'react-native-geocoding';
import {useEffect} from 'react';
import {getStoreById} from '../../../api/customerApi';
import * as yup from 'yup';
import CustomAlert from '../../../components/atoms/Modals/CustomeAlert';
import I18n from '../../../config/i18n';

const storeValidationSchema = yup.object().shape({
  name: yup.string().required(),
  address1: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  ltlng: yup.string().required(),
});

const CustomerAddStore: any = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  Geocoder.init('AIzaSyBnGFNu35L3rNfbFb7INcc-3t4gNfRlWMU');

 
  const [name, setname] = useState('');
  const [addressline, setAddressline] = useState('');
  const [addressline2, setAddressline2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [location, setLocation] = useState([]);
  const [loader, setloader] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [loading, setloading] = useState(false);
  const [token, settoken] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [address, setAddress] = useState({
    addressLine1: null,
    addressLine2: null,
    city: null,
    state: null,
  });

  useEffect(() => {
    console.log(route.params.type);
    if (route.params.type === 'edit') {
      setloader(true);
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
        if (err) {
          console.warn(err);
        }
        settoken(items[0][1]);
        getStoreById(route.params.storeId, items[0][1])
          .then(res => {
            console.log(res.data);
            setCity(res.data.address.city);
            setState(res.data.address.state);
            setname(res.data.name);
            setAddressline(res.data.address.addressLine1);
            setAddressline2(res.data.address.addressLine2);
            setLocation([
              res.data.address.latitude,
              res.data.address.longitude,
            ]);

            setloader(false);
          })
          .catch(err => {
            console.log(err);
            setloader(false);
          });
      });
    }
  }, []);

  const addStore = () => {
    storeValidationSchema
      .isValid({
        name: name,
        address1: addressline,
        city: city,
        state: state,
        ltlng: location[0],
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
              customer: {
                id: items[1][1],
              },
              address: {
                addressLine1: addressline,
                addressLine2: addressline2,
                city: city,
                state: state,
                latitude: location[0],
                longitude: location[1],
              },
            };
            console.log(body);

            if (route.params.type === 'edit') {
              console.log(route.params.storeId);
              updateStoreByCustomer(route.params.storeId, token, body)
                .then(res => {
                  if (res.status === 200) {
                    navigation.goBack();
                    setloader(false);
                  }
                })
                .catch(err => {
                  setErrorText('Error Updating store');
                  setPopUp(true)
                  setloader(false);
                  console.log(err);
                });
            } else {
              createNewStore(items[0][1], body)
                .then(res => {
                  setloader(false);
                  navigation.goBack();
                })
                .catch(err => {
                  console.log(err);
                  setloader(false);
                });
            }
          });
        } else {
          setloader(false);
          setErrorText(I18n.t('errorMessage.error_allFields'));
          setPopUp(true)

          return;
        }
      });
  };

  const openModal = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setShowDialog(true);
    } else {
      setErrorText('Location permission denied');
      setPopUp(true)

    }
  };

  const populateFeildWithGeoCoder = () => {
    Geocoder.from(location[0], location[1])
      .then(res => {
        console.log(res.results[0].address_components[1]);

        setAddressline2(
          res.results[0].address_components[1].long_name +
            ', ' +
            res.results[0].address_components[2].long_name,
        );
        let addrResponse = res.results[0].address_components;
        addrResponse.forEach(part => {
          if (part.types.includes('locality')) {
            setCity(part.long_name);
          }

          if (part.types.includes('administrative_area_level_1')) {
            setState(part.long_name);
          }
        });

        console.log(state);
      })
      .catch(err => {
        setShowDialog(true);
      });
  };

  return (
    <View style={styles.contanier}>
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
        onLocationSelected={cordinates => {
          setLocation([cordinates.latitude, cordinates.longitude]);
          setShowDialog(false);
          populateFeildWithGeoCoder();
        }}
        submit={I18n.t('agencyProfileEdit.location_submit')}
      />
      <Header
        navigation={navigation}
        title={I18n.t('customerProfileHome.header')}
      />

      <PostAuthWrapper
        titlePreFix={route.params && route.params.firstname}
        titlePostFix={route.params && route.params.lastname}
        navigation={navigation}
        subtitle={I18n.t('customerStore.store_add')}
        isAgencyHomePage={true}
        isEdit={false}>
        <>
          <Input
            secureTextEntry={false}
            label={I18n.t('customerStore.store_input_gowdown_name')}
            value={name}
            onChange={text => {
              console.log(text);
              setname(text);
            }}
            iconSize={20}
            iconName=""
            placeholder={
              I18n.t('customerStore.store_input_gowdown_name_placeholder')
            }
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
          />

          {/* <Input
            secureTextEntry={false}
            label={constants.customerStore.store_input_gowdown_incharge_name}
            value=""
            onChange={() => {}}
            iconSize={20}
            iconName=""
            placeholder={
              constants.customerStore.store_input_gowdown_name_placeholder
            }
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
          /> */}

          <Input
            secureTextEntry={false}
            label={I18n.t('customerStore.store_input_address')}
            value={addressline}
            onChange={text => {
              setAddressline(text);
            }}
            iconSize={20}
            iconName=""
            placeholder={
              I18n.t('customerStore.store_input_address_placeholder')
            }
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
            contentStyle={{borderColor: config.SKY_BLUE, borderWidth: 1}}
            labelStyle={[styles.buttonLocation]}
            mode="outlined"
            onPress={openModal}>
            {I18n.t('agencyProfileEdit.agency_button_geo_location')}
          </Button>


          <Input
            secureTextEntry={false}
            label={I18n.t('customerStore.store_input_address2')}
            value={addressline2}
            onChange={text => {
              setAddressline2(text);
            }}
            iconSize={20}
            iconName=""
            placeholder={
              I18n.t('customerStore.store_input_address_placeholder')
            }
            disabled={false}
            editable={false}
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
            multiline ={true}
            numberOfLines={2}
          />

          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_dropdown_district')}
            value={city}
            onChange={text => {
              setCity(text);
            }}
            iconSize={20}
            iconName=""
            placeholder={I18n.t('agencyProfileEdit.agency_dropdown_district')}
            disabled={false}
            error={false}
            mode="flat"
            editable={false}
            numberOnly=""
            maxLength={30}
            style={{}}
            dense=""
            isAvailable={false}
            success={false}
            hintText=""
            keyboardType="default"
          />
          {/* <Dropdown
            options={options}
            
          /> */}

          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_dropdown_state')}
            value={state}
            onChange={text => {
              setState(text);
            }}
            iconSize={20}
            iconName=""
            placeholder={I18n.t('agencyProfileEdit.agency_dropdown_state')}
            disabled={false}
            error={false}
            mode="flat"
            editable={false}
            numberOnly=""
            maxLength={30}
            style={{}}
            dense=""
            isAvailable={false}
            success={false}
            hintText=""
            keyboardType="default"
          />
          {/* <Dropdown
            options={options}
            placeholder={constants.agencyProfileEdit.agency_dropdown_state}
          /> */}

          <Input
            secureTextEntry={false}
            label={I18n.t('customerStore.store_input_latlng')}
            value={
              location[0] === undefined ? '' : location[0] + ' / ' + location[1]
            }
            onChange={() => {}}
            iconSize={20}
            iconName=""
            placeholder={I18n.t('customerStore.store_input_latlng_placeholder')}
            disabled={false}
            error={false}
            mode="flat"
            numberOnly=""
            maxLength={30}
            style={{}}
            editable={false}
            dense=""
            isAvailable={false}
            success={false}
            hintText=""
            keyboardType="default"
          />

          <View style={{marginTop: 20}}>
            <Button
              disabled={loader}
              contentStyle={{flexDirection: 'row-reverse'}}
              labelStyle={[styles.button]}
              mode="contained"
              onPress={() => {
                addStore();
              }}>
              {route.params.type === 'edit'
                ? I18n.t('customerStore.store_update_now')
                : I18n.t('customerStore.store_add_now')}
            </Button>
          </View>
        </>
      </PostAuthWrapper>
    </View>
  );
};

export default CustomerAddStore;
