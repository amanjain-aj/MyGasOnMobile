import React, {useState} from 'react';
import {PermissionsAndroid, Text, View} from 'react-native';

import CONSTANTS from '../../../constants/constants';
import I18n from "../../../config/i18n";
import Icon from 'react-native-vector-icons/MaterialIcons';
import config from '../../../config/colors';
import LocationModal from '../../../components/atoms/Modals/LocationModal';
import {Button} from 'react-native-paper';
import DropDown from '../../../components/atoms/Dropdown';
import Input from '../../../components/atoms/Input';
import PreAuthFormWrapper from '../../../components/PreAuthFormWrapper';
import PreLoginLayout from '../../../components/PreLoginLayout';
import Geocoder from 'react-native-geocoding';

import commonStyles from '../../../styles/common.styles';
import {ScrollView} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import constants from '../../../constants/constants';
import AlertBox from '../../../components/atoms/Modals/CustomeAlert';

const loginValidationSchema = yup.object().shape({
  organizationName: yup.string().required(),
  pincode: yup.number().min(6).required(),
  state: yup.string().required(),
  owner: yup.string(),
  omcName: yup.string().required(),
  omcId: yup.string().required(),
  city: yup.string().required(),
  address1: yup.string().required(),
});

const RegisterAgencyDetails = ({navigation, route}) => {
  const options = [
    {label: 'Indian Gas', value: 'IGS', key: 1},
    {label: 'HP Gas', value: 'HPGS', key: 2},
    {label: 'Bharat Gas', value: 'BGS', key: 3},
  ];

  const [showDialog, setShowDialog] = useState(false);
  const [location, setLocation] = useState([]);
  Geocoder.init('AIzaSyBnGFNu35L3rNfbFb7INcc-3t4gNfRlWMU');

  const [name, setname] = useState('');
  const [city, setcity] = useState('');

  const [pincode, setpincode] = useState('');
  const [state, setstate] = useState('');
  const [owner, setowner] = useState('');
  const [omcName, setomcName] = useState('');
  const [omcId, setomcId] = useState('');

  const [address1, setaddress1] = useState('');
  const [address2, setaddress2] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');


  const openModal = async() => {

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setShowDialog(true);
    }
    else {
      setErrorText('Location permission denied');
      setPopUp(true)
    }
   
  };

  const validateForm = () => {
    loginValidationSchema
      .isValid({
        organizationName: name,
        pincode: pincode,
        state: state,
        city: city,
        omcName: omcName,
        omcId: omcId,
        address1: address1,
      })
      .then(valid => {
        if (valid) {
          navigation.navigate('RegisterAgencyPasswordSecurity', {
            orgInfo: {
              name: name,
              omcName: omcName,
              omcId: omcId,
              owner: owner,
              address: {
                addressLine1: address1,
                addressLine2: address2,
                latitude: location[0],
                longitude: location[1],
                city: city,
                state: state,
              },
            },
            authInfo: {
              personalInfo: route.params.personalInfo,
            },
          });
        } else {
          setErrorText(I18n.t('errorMessage.error_allFields'));
          setPopUp(true)
        }
      });
  };

  const populateFeildWithGeoCoder = async() => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'My GasON',
        message: 'Please Give Acess',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geocoder.from(location[0], location[1])
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
            if (part.types.includes('postal_code')) {
              setpincode(part.long_name);
            }
            if (part.types.includes('administrative_area_level_1')) {
              setstate(part.long_name);
            }
          });
        })
        .catch(err => {
          if (err) {
            setShowDialog(true);
          }
        });
    } else {
      console.log('location permission denied');
      setErrorText('Location permission denied');
      setPopUp(true)
    }
  };

  return (
    <View >
       <AlertBox
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
      <PreLoginLayout>
        <PreAuthFormWrapper
          titlePreFix={I18n.t('registration.agency.titlePre')}
          titlePostFix={I18n.t('registration.agency.titlePost')}>
          <>
            <Text
              style={{
                ...commonStyles.textAlignCenter,
                ...commonStyles.formTitle,
              }}>
              {I18n.t('registration.agency.agencyDetails.heading')}
            </Text>
            <View>
              <>
                <Input
                  placeholder={
                    I18n.t('ndCustomer.organizationalInfo.organizationName')
                  }
                  value={name}
                  iconName="groups"
                  onChange={txt => {
                    setname(txt);
                  }}
                />
                <DropDown
                  options={options}
                  selectedValue={omcName}
                  placeholder={I18n.t('ndCustomer.organizationalInfo.omcName')}
                  onChange={text => {
                    setomcName(text);
                  }}
                />

                <Input
                  placeholder={I18n.t('ndCustomer.organizationalInfo.omcId')}
                  value={omcId}
                  iconName=""
                  maxLength={17}
                  onChange={txt => {
                    setomcId(txt);
                  }}
                />

                <Input
                  placeholder={I18n.t('ndCustomer.organizationalInfo.manager')}
                  value={owner}
                  onChange={txt => {
                    setowner(txt);
                  }}
                  iconName="person"
                  editable={false}
                />

                <Input
                  style={{marginTop: -16, marginBottom: 5,}}
                  placeholder={
                    I18n.t('ndCustomer.organizationalInfo.addressLine1')
                  }

                  value={address1}
                  maxLength={100}
                  onChange={text => setaddress1(text)}
                />

                <Button
                  style={{width: '70%', marginBottom: 30}}
                  icon={() => (
                    <Icon
                      style={{position: 'absolute', left: -30, top: -12}}
                      name={'pin-drop'}
                      color={config.SKY_BLUE}
                      size={25}
                    />
                  )}
                  contentStyle={{
                    borderColor: config.SKY_BLUE,
                    borderWidth: 1,
                  }}
                  labelStyle={{padding: 6}}
                  mode="outlined"
                  onPress={openModal}>
                  {I18n.t('agencyProfileEdit.agency_button_geo_location')}
                </Button>

                <Input
                  style={{marginTop: -16, marginBottom: 5,}}
                  placeholder={
                    I18n.t('ndCustomer.organizationalInfo.addressLine2')
                  }
                  value={address2}
                  onChange={text => setaddress2(text)}
                  editable={false}
                  multiline ={true}
                  numberOfLines={2}
                />

                <Input
                  style={{marginTop: -16, marginBottom: 5}}
                  placeholder={I18n.t('ndCustomer.organizationalInfo.pincode')}
                  value={pincode}
                  onChange={txt => {
                    setpincode(txt);
                  }}
                  editable={false}
                />

                <Input
                  placeholder={I18n.t('ndCustomer.organizationalInfo.city')}
                  value={city}
                  onChange={txt => {
                    setcity(txt);
                  }}
                  editable={false}
                />
                <Input
                  placeholder={I18n.t('ndCustomer.organizationalInfo.state')}
                  value={state}
                  onChange={txt => {
                    setstate(txt);
                  }}
                  editable={false}
                />

                {/* <Input
                  placeholder={CONSTANTS.ndCustomer.organizationalInfo.district}
                  selectedValue={values.district}
                  onChange={handleChange('district')}
                  onBlur={handleBlur('district')}
                /> */}

                <Button
                  style={{marginBottom: 30}}
                  labelStyle={[{padding: 8, color: config.WHITE}]}
                  mode="contained"
                  onPress={() => validateForm()}
                  // onPress={handleSubmit}    have to validate before navigating
                >
                  {I18n.t('agencyProfileEdit.agency_button_proceed')}
                </Button>
              </>
            </View>
          </>
        </PreAuthFormWrapper>
      </PreLoginLayout>
    </View>
  );
};

export default RegisterAgencyDetails;
