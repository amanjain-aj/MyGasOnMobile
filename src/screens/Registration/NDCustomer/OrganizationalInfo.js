import React, {useState} from 'react';
import {PermissionsAndroid, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CONSTANTS from './../../../constants/constants';
import I18n from "../../../config/i18n";
import profileStyles from '../../../screens/myProfile/myprofile.styles';
import {Button} from 'react-native-paper';
import Dropdown from './../../../components/atoms/Dropdown';
import Input from './../../../components/atoms/Input';
import PreAuthFormWrapper from './../../../components/PreAuthFormWrapper';
import PreLoginLayout from './../../../components/PreLoginLayout';
import LocationModal from '../../../components/atoms/Modals/LocationModal';
import AlertBox from '../../../components/atoms/Modals/CustomeAlert';

import commonStyles from './../../../styles/common.styles';
import {ScrollView} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Geocoder from '../../../api/geocoder';

import config from '../../../config/colors';
import {Alert} from 'react-native';

const loginValidationSchema = yup.object().shape({
  organizationName: yup.string().required(),
  orgType: yup.string().required(),

  pincode: yup.number().min(6).required(),
  state: yup.string().required(),
  owner: yup.string(),
  city: yup.string().required(),
});

const RegisterNDCustomerOrganizationalInfo = ({navigation, route}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [location, setLocation] = useState([]);
  
  const [name, setname] = useState('');

  const [pincode, setpincode] = useState('');
  const [state, setstate] = useState('');
  const [owner, setowner] = useState('');
  const [orgType, setorgTyoe] = useState('');

  const [address1, setaddress1] = useState('');
  const [address2, setaddress2] = useState('');
  const [locLoding, setLocLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');



  const [city, setcity] = useState('');

  // Geocoder.init('AIzaSyBnGFNu35L3rNfbFb7INcc-3t4gNfRlWMU', {language: 'en'});

  const openModal = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setShowDialog(true);
    }
    else {
      // alert('Location permission denied');
      setErrorText('Location permission denied')
          setPopUp(true)
      
    }
    
  };

  const validateForm = () => {
    loginValidationSchema
      .isValid({
        organizationName: name,
        orgType:orgType,
        pincode: pincode,
        state: state,
        owner: owner,
        city: city,
      })
      .then(valid => {
        if (valid) {
          navigation.navigate('RegisterNDCustomerPasswordSecurity', {
            orgInfo: {
              name: name,
              type: orgType,
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
          // alert(CONSTANTS.errorMessage.error_allFields);
          setErrorText(I18n.t('errorMessage.error_allFields'))
          setPopUp(true)
        }
      });
  };

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
          if (part.types.includes('postal_code')) {
            setpincode(part.long_name);
          }
          if (part.types.includes('administrative_area_level_1')) {
            setstate(part.long_name);
          }
        });

        setLocLoading(false);
      })
      .catch(err => {
        setLocLoading(false);
        // alert('Error!\nCheck your internet connection!');
        setErrorText('Error!\nCheck your internet connection!')
        setPopUp(true)
        console.log(err);
      });
  };

  return (
    <View>
      <LocationModal
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onLocationSelected={cordinates => {
          setLocation([cordinates.latitude, cordinates.longitude]);
          setShowDialog(false);
          console.log(cordinates);
          populateFeildWithGeoCoder(cordinates.latitude, cordinates.longitude);
        }}
        submit={I18n.t('agencyProfileEdit.location_submit')}
      />
      <AlertBox
          showDialog={popUp}
          setShowDialog={setPopUp}
          title={errorText}
        />
      <PreLoginLayout>
        <PreAuthFormWrapper
          titlePreFix={I18n.t('ndCustomer.titlePre')}
          titlePostFix={I18n.t('ndCustomer.titlePost')}>
          <>
            <Text
              style={{
                ...commonStyles.textAlignCenter,
                ...commonStyles.formTitle,
              }}>
              {I18n.t('ndCustomer.organizationalInfo.heading')}
              {/* {route.params.personalInfo.email} */}
            </Text>
            <View>
              <>
                <Input
                  placeholder={
                    I18n.t('ndCustomer.organizationalInfo.organizationName')
                  }
                  value={name}
                  iconName="groups"
                  onChange={text => setname(text)}
                />

                <Dropdown
                  placeholder={
                    I18n.t('ndCustomer.organizationalInfo.organizationType')
                  }
                  selectedValue={orgType}
                  options={[
                    {label: 'Industry/Factory', value: 'Industry/Factory'},
                    {
                      label: 'Hospital/Nurshing Home',
                      value: 'Hospital/Nurshing Home',
                    },
                    {label: 'Hotel', value: 'Hotel'},
                    {label: 'Restraurant', value: 'Restraurant'},
                    {label: 'Cloud Kitchen', value: 'Cloud Kitchen'},
                    {label: 'Cafe/Bar', value: 'Cafe/Bar'},
                    {label: 'Canteen', value: 'Canteen'},
                    {label: 'Bakery', value: 'Bakery'},
                    {label: 'Sweet Shop', value: 'Sweet Shop'},
                    {
                      label: 'Banquet/ Marraige Lawn',
                      value: 'Banquet/ Marraige Lawn',
                    },
                    {label: 'Catere', value: 'Catere'},
                    {label: 'Kiosk/Stail', value: 'Kiosk/Stail'},
                    {label: 'Constructions', value: 'Constructions'},
                    {label: 'Others', value: 'Others'},
                  ]}
                  onChange={txt => {
                    if (txt !== undefined) {
                      setorgTyoe(txt);
                   }
                  }}
                />

                <Input
                  placeholder={I18n.t('ndCustomer.organizationalInfo.manager')}
                  value={owner}
                  iconName="person"
                  onChange={text => setowner(text)}
                  editable={false}
                />

                <Input
                  style={{marginTop: -16, marginBottom: 5}}
                  placeholder={
                    I18n.t('ndCustomer.organizationalInfo.addressLine1')
                  }
                  value={address1}
                  onChange={text => setaddress1(text)}
                />

                <Button
                  style={{width: '70%', marginBottom: 30}}
                  loading={locLoding}
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
                  style={{marginTop: -16, marginBottom: 5}}
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
                  onChange={text => setpincode(text)}
                  editable={false}
                />
                <Input
                  placeholder={I18n.t('ndCustomer.organizationalInfo.city')}
                  value={city}
                  onChange={text => setcity(text)}
                  editable={false}
                />

                {/* <Dropdown
                      placeholder={
                        CONSTANTS.ndCustomer.organizationalInfo.state
                      }
                      options={[
                        {label: 'State 1', value: 'state1'},
                        {label: 'State 2', value: 'state2'},
                        {label: 'State 3', value: 'statre3'},
                      ]}
                      selectedValue={values.state}
                      onChange={handleChange('state')}
                      onBlur={handleBlur('state')}
                    /> */}
                <Input
                  placeholder={I18n.t('ndCustomer.organizationalInfo.state')}
                  value={state}
                  onChange={text => setstate(text)}
                  editable={false}
                />

                {/* <Dropdown
                      placeholder={
                        CONSTANTS.ndCustomer.organizationalInfo.district
                      }
                      options={[
                        {label: 'District 1', value: 'district1'},
                        {label: 'District 2', value: 'district2'},
                        {label: 'District 3', value: 'district3'},
                      ]}
                      selectedValue={values.district}
                      onChange={handleChange('district')}
                      onBlur={handleBlur('district')}
                    /> */}

                {/* <Dropdown
                      placeholder={CONSTANTS.ndCustomer.organizationalInfo.city}
                      options={[
                        {label: 'City 1', value: 'city1'},
                        {label: 'City 2', value: 'city2'},
                        {label: 'City 3', value: 'city3'},
                      ]}
                      selectedValue={values.city}
                      onChange={handleChange('city')}
                      onBlur={handleBlur('city')}
                      options={[
                        {label: 'City 1', value: 'city1'},
                        {label: 'City 2', value: 'city2'},
                        {label: 'City 3', value: 'city3'},
                      ]}
                    /> */}

                <Button
                  style={{marginBottom: 30}}
                  labelStyle={[{padding: 8, color: config.WHITE}]}
                  mode="contained"
                  onPress={() => {
                    validateForm();
                  }}>
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

export default RegisterNDCustomerOrganizationalInfo;
