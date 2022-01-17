import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/atoms/Header';
import PostAuthWrapper from '../../components/PostAuthWrapper';
import Input from '../../components/atoms/Input';
import DropDown from '../../components/atoms/Dropdown';
import I18n from '../../config/i18n';
import SliderComponent from '../../components/atoms/Slider';
import LocationModal from '../../components/atoms/Modals/LocationModal';
import styles from './AgencyProfile.styles';
import config from '../../config/colors';
import CONSTANTS from '../../constants/constants';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetAgencyById, UpdateAgencyProfile} from '../../api/agencyApi';
import Spinner from 'react-native-loading-spinner-overlay';
import CustomAlert from '../../components/atoms/Modals/CustomeAlert';
import * as yup from 'yup';
import Geocoder from 'react-native-geocoding';
import * as ImagePicker from 'react-native-image-picker';
import {UploadLogo} from '../../api/fileApi';
import commonStyles from '../../styles/common.styles';


const OMCOptions = [
  {label: 'Indian Gas', value: 'IGS', key: 1},
  {label: 'HP Gas', value: 'HPGS', key: 2},
  {label: 'Bharat Gas', value: 'BGS', key: 3},
];

const loginValidationSchema = yup.object().shape({
  name: yup.string().required(),
  phone_no: yup
    .string()
    .min(10, ({min}) => I18n.t('profile.err_msg.invalid_phone_no'))
    .required(),
  email: yup.string().email().required(I18n.t('profile.err_msg.email')),
  address1: yup.string().required(),
  // pan: yup
  //   .string()
  //   .matches(/[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}/)   
  // ,
  landline:yup.string(),
  gstin: yup
    .string()
    .matches(/^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)
    .required(),
});

// gstn


// pancard 
// [A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}

const AgencyProfileEdit: any = ({navigation}: {navigation: any}) => {
  const [showDialog, setShowDialog] = useState(false);

  const openModal = () => {
    setShowDialog(true);
  };

  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [name, setName] = useState('');
  const [photoPath, setPhotoPath] = useState('');
  const [mobileNumber, setmobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [landlineNumber, setLandlineNumber] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latLng, setLatLng] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [gstin, setGST] = useState('');
  const [omc, setOMC] = useState('');
  const [omcValue, setOMCValue] = useState('');
  const [omcId, setOMCID] = useState('');
  const [logo, setLogo] = useState('');
  const [status, setStatus] = useState(0);

  const [nameErr, setNameErr] = useState(false);
  const [phoneErr, setphoneErr] = useState(false);
  const [emailErr, setemailErr] = useState(false);
  const [address2Err, setAddress2Err] = useState(false);
  const [gstInErr, setGstInErr] = useState(false);
  


  const [token, setToken] = useState('');
  const [Id, setId] = useState('');

  const [pan, setPan] = useState('  ');

  const [location, setLocation] = useState([]);
  const [address, setAddress] = useState({
    addressId: null,
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    setLoading(true);
    AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
      if (err) {
        console.warn(err);
      }
      GetAgencyById(items[1][1], items[0][1])
        .then(res => {
          setLoading(false);
          console.log(res.data);
          setToken(items[0][1]);
          setId(items[1][1]);

          setName(res.data.name);
          setEmail(res.data.email && res.data.email);
          setLandlineNumber(res.data.landline && res.data.landline);
          setPan(res.data.pan && res.data.pan);
          setGST(res.data.gstin && res.data.gstin);
          setmobileNumber(res.data.mobile && res.data.mobile);
          setOMCValue(res.data.omcName)
          if(res.data.omcName == 'IGS'){
            setOMC('Indian Gas')
          }
          if(res.data.omcName == 'HPGS'){
            setOMC('HP Gas')
          }
          if(res.data.omcName == 'BGS'){
            setOMC('Bharat Gas')
          }
         
          setOMCID(res.data.omcId);

          if (res.data.address != null) {
            setAddress(res.data.address);
            setAddress2(res.data.address.addressLine1);
            setCity(res.data.address.city);
            setState(res.data.address.state);

            setLatLng(
              (res.data.address.latitude == null ?' ':res.data.address.latitude) + ' / ' +  (res.data.address.longitude == null ?' ':res.data.address.longitude)
            );
            setAddress1(res.data.address.addressLine2);
          }
        })
        .catch(err => {
          setLoading(false);

          console.log(err.response.data);
        });
    });
  }, []);

  

  const populateFeildWithGeoCoder = () => {
    setLoader(true);
    Geocoder.from(location[0], location[1])
      .then(res => {
        setLoader(false);
        console.log(res.results[0].address_components[7]);

        setAddress2(
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
      })
      .catch(err => {
        setLoader(false);

        console.warn(err);
        openModal();
      });
  };

  const chooseImage = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        // alert('User cancelled camera picker');
        setErrorText('User cancelled camera picker');
        setPopUp(true);
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        setErrorText('Camera not available on device');
        setPopUp(true);
        return;
      } else if (response.errorCode == 'permission') {
        setErrorText('Permission not satisfied');
        setPopUp(true);
        return;
      } else if (response.errorCode == 'others') {
        setErrorText(response.errorMessage);
        setPopUp(true);
        return;
      }

      UploadLogo(token, Id, response.assets[0])
        .then(res => {
          console.log(res.data);
          setLoading(false);
          
          setLogo(res.data);
          setStatus(100);
        })
        .catch(err => {
          setLoading(false);

          console.log(err.response.data);
        });
    });
  };

  const updateAgency = () => {

    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var gstInReg = /^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/




    if(name.length<1){
      setNameErr(true)
      return
    }
   
    if(mobileNumber === undefined || mobileNumber.length!==10){
      setphoneErr(true)
      return
    }
    if(!emailReg.test(email)){
      setemailErr(true)
      return
    }
    if(address2.length<1){
      setAddress2Err(true)
      return
    }
    if(!gstInReg.test(gstin)){
      setGstInErr(true)
      return
    }
        
       
          setLoading(true);
          const body = {
            name: name,
            omcName: omcValue,
            pan: pan,
            gstin: gstin,
            email: email,
            omcId: omcId,
            mobile: mobileNumber,
            landline: landlineNumber,
            address: {
              addressId: address.addressId,
              addressLine1: address1,
              addressLine2: address2,
              city: city,
              state: state,
              latitude: location[0],
              longitude: location[1],
            },
            agencyImagePath: logo,
          };

          UpdateAgencyProfile(Id, token, body)
            .then(res => {
              setLoading(false);
              if (res.status === 200) {
                navigation.goBack();
              }
              console.log(res.data);
            })
            .catch(err => {
              setLoading(false);
              console.log(err.response.data);
            });
        
     
  };

  return (
    <View style={styles.container}>
      <LocationModal
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        submit={I18n.t('agencyProfileEdit.location_submit')}
        onLocationSelected={cordinates => {
          setLocation([cordinates.latitude, cordinates.longitude]);
          setLatLng(cordinates.latitude + ' / ' + cordinates.longitude);
          setShowDialog(false);
          populateFeildWithGeoCoder();
        }}
      />
      <Header
        navigation={navigation}
        title={I18n.t('agencyProfileEdit.header')}
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
      <CustomAlert
        showDialog={popUp}
        setShowDialog={setPopUp}
        title={errorText}
      />

      <PostAuthWrapper
        titlePreFix={I18n.t('agencyProfileEdit.agency_edit_prefix')}
        titlePostFix={I18n.t('agencyProfileEdit.agency_edit_postfix')}
        subtitle={''}
        navigation={navigation}
        isAgencyHomePage={false}
        isEdit={false}>
        <>
          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_input_name')}
            value={name}
            onChange={text => {
              setName(text);
              if(text.length>1){
                setNameErr(false)
              }
            }}
            iconSize={20}
           
            iconName="account-network"
            placeholder=""
            disabled={false}
            error={nameErr}
            
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
          {nameErr && (
            <Text style={commonStyles.errInput_txt}> {I18n.t('errorMessage.error_name')} </Text>
          )}
          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_input_phone')}
            value={mobileNumber}
            onChange={text => {
              setmobileNumber(text.replace(/[^0-9]/g, ''));
              if(text.length>1){
                setphoneErr(false)
              }
            }}
            iconSize={20}
            iconName="cellphone"
            placeholder=""
            disabled={false}
            error={phoneErr}
            mode="flat"
            numberOnly=""
            maxLength={10}
            style={{}}
            dense=""
            isAvailable={false}
            success={false}
            hintText=""
            keyboardType="numeric"
            onFocus={() => {}}
          />

{phoneErr && (
            <Text style={commonStyles.errInput_txt}> {I18n.t('errorMessage.error_number')} </Text>
          )}

          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_input_email')}
            value={email}
            onChange={text => {
              setEmail(text);
              if(text.length>1){
                setemailErr(false)
              }
            }}
            iconSize={20}
            iconName="gmail"
            placeholder=""
            disabled={false}
            error={emailErr}
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
          
{emailErr && (
            <Text style={commonStyles.errInput_txt}> {I18n.t('errorMessage.error_email')} </Text>
          )}
          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_input_landline')}
            value={landlineNumber}
            onChange={text => {
              setLandlineNumber(text);
            }}
            iconSize={20}
            iconName="phone-classic"
            placeholder=""
            disabled={false}
            error={false}
            mode="flat"
            numberOnly=""
            maxLength={11}
            style={{}}
            dense=""
            isAvailable={false}
            success={false}
            hintText=""
            keyboardType="numeric"
            onFocus={() => {}}
          />

          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_input_address')}
            value={address1}
            onChange={text => {
              setAddress1(text);
            }}
            iconSize={20}
            iconName="person-outline"
            placeholder=""
            disabled={false}
            error={false}
            mode="flat"
            numberOnly=""
            maxLength={40}
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
            loading={loader}
            disabled={loader}
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
          <View style={{height:10}} />

          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_input_address2')}
            value={address2}
            onChange={text => {
              setAddress2(text);
              if(text.length>1){
                setAddress2Err(false)
              }
            }}
            editable={false}
            iconSize={20}
            iconName="person-outline"
            placeholder=""
            disabled={false}
            error={address2Err}
            mode="flat"
            numberOnly=""
            maxLength={40}
            multiline ={true}
            numberOfLines={2}
            style={{}}
            dense=""
            isAvailable={true}
            success={false}
            hintText=""
            keyboardType="default"
            onFocus={() => {}}
          />
          
{address2Err && (
            <Text style={commonStyles.errInput_txt}> {I18n.t('errorMessage.error_address')} </Text>
          )}

          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_dropdown_district')}
            value={city}
            onChange={text => {
              setCity(text);
            }}
            iconSize={20}
            iconName="pin-drop"
            placeholder=""
            editable={false}
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
          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_dropdown_state')}
            value={state}
            onChange={text => {
              setState(text);
            }}
            iconSize={20}
            iconName="pin-drop"
            placeholder=""
            editable={false}
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
          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_input_latitude')}
            value={latLng}
            onChange={text => {
              setLatLng(text);
            }}
            iconSize={20}
            iconName="pin-drop"
            placeholder=""
            editable={false}
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
          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_input_pan')}
            value={pan}
            onChange={text => {
              setPan(text);
            }}
            iconSize={20}
            iconName="credit-card"
            placeholder=""
            disabled={false}
            error={false}
            mode="flat"
            numberOnly=""
            maxLength={10}
            style={{}}
            dense=""
            isAvailable={true}
            success={false}
            hintText=""
            keyboardType="default"
            onFocus={() => {}}
          />
          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_input_gst')}
            value={gstin}
            onChange={text => {
              setGST(text);
              if(text.length>0){
                setGstInErr(false)
              }
            }}
            iconSize={20}
            iconName="file-document"
            placeholder=""
            disabled={false}
            error={gstInErr}
            mode="flat"
            numberOnly=""
            maxLength={15}
            style={{}}
            dense=""
            isAvailable={false}
            success={false}
            hintText=""
            keyboardType="default"
            onFocus={() => {}}
          />
          
{gstInErr && (
            <Text style={commonStyles.errInput_txt}> {I18n.t('errorMessage.error_gstin')} </Text>
          )}
          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_input_omc')}
            value={omc}
            onChange={text => {
              setOMC(text);
            }}
            editable={false}
            iconSize={20}
            iconName="file-image"
            placeholder=""
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
          <Input
            secureTextEntry={false}
            label={I18n.t('agencyProfileEdit.agency_input_omcId')}
            value={omcId}
            onChange={text => {
              setOMCID(text);
            }}
            iconSize={20}
            iconName="file-image"
            placeholder=""
            disabled={false}
            error={false}
            editable={false}
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
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderText}>
              {I18n.t('agencyProfileEdit.agency_logo')}
            </Text>
            <View style={styles.sliderContent}>
              <SliderComponent value={status} />
              <View style={styles.sliderIcon}>
                <Icon
                  name={'account-box'}
                  color={config.WHITE}
                  size={20}
                  onPress={() => {
                    chooseImage();
                  }}
                />
              </View>
            </View>
          </View>
          {/* <View style={styles.sliderContainer}>
            <Text style={styles.sliderText}>
              {I18n.t('agencyProfileEdit.agency_certificate')}
            </Text>
            <View style={styles.sliderContent}>
              <SliderComponent />
              <View style={styles.sliderIcon}>
                <IconCommunity
                  name={'file-outline'}
                  color={config.WHITE}
                  size={20}
                />
              </View>
            </View>
          </View> */}
          <View style={{marginBottom: -30,marginTop: 10}}>
            <Button
              icon={() => (
                <Icon
                  style={{position: 'absolute', right: -85, top: -12}}
                  name={'arrow-forward'}
                  color={config.WHITE}
                  size={25}
                />
              )}
              contentStyle={{flexDirection: 'row-reverse'}}
              labelStyle={[styles.button]}
              mode="contained"
              onPress={() => {
                updateAgency();
              }}>
              {I18n.t('agencyProfileEdit.agency_button_proceed')}
            </Button>
          </View>
        </>
      </PostAuthWrapper>
    </View>
  );
};

export default AgencyProfileEdit;
