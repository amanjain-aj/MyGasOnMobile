import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';

import Dropdown from '../../components/atoms/Dropdown';
import Geocoder from 'react-native-geocoding';
import I18n from '../../config/i18n';

import {IconButton, Button, Avatar, Dialog, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PostAuthWrapper from '../../components/PostAuthWrapper';
import Header from '../../components/atoms/Header';
import config from '../../config/colors';
import Input from '../../components/atoms/Input';
import {ScrollView} from 'react-native-gesture-handler';
import CONSTANTS from '../../constants/constants';
import profileStyles from './myprofile.styles';
import styles from './../../components/PostAuthWrapper/PostAuthWrapper.styles';
import LocationModal from '../../components/atoms/Modals/LocationModal';

import Spinner from 'react-native-loading-spinner-overlay';
import commonStyles from './../../styles/common.styles';

// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import {Formik} from 'formik';
import * as yup from 'yup';
import {UploadAvatar, UploadImage} from '../../api/fileApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {GetUserDetails, UpdateUserDetails} from '../../api/userApi';
import CustomAlert from '../../components/atoms/Modals/CustomeAlert';
import FooterTab from '../../components/atoms/FooterTab';
import { useFocusEffect } from '@react-navigation/native';

const loginValidationSchema = yup.object().shape({
  name: yup.string().required(),
  phone_no: yup
    .string()
    .min(10, ({min}) => I18n.t('profile.err_msg.invalid_phone_no'))
    .required(),
  email: yup.string().email().required(I18n.t('profile.err_msg.email')),
  address1: yup.string().required(),
 
});
const MyProfile: any = ({navigation}: {navigation: any}) => {
  const [isSubmitted, setSubmitted] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [picturePath, setPicturePath] = useState(null);

  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  const [btnText, setbtnText] = useState(I18n.t('editProfile.choose'));

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
  const [pan, setPan] = useState('  ');
  const [employeeTypr, setEmployeeType] = useState('');

  const [location, setLocation] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [panErr,setPanErr] = useState(false);
  const [aadharErr,setAadharErr] = useState(false);

  const openModal = () => {
    setShowDialog(true);
  };
  const panReg = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  const aadharReg = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/
  useEffect(() => {
    setLoading(true);
    AsyncStorage.multiGet(['API_TOKEN', 'LOGIN_ID','USERNAME'], (err, items) => {
      if (err) {
        console.warn(err);
        return
      }
      setUsername(items[1][1])
      console.log(items[2][1])
      GetUserDetails(items[2][1], items[0][1])
        .then(res => {
          setLoading(false);
          console.log('RESPONSE', res.data);
          setName(res.data.userDetails.name);
          setmobileNumber(res.data.userDetails.mobile);
          setEmail(res.data.email);
          // setName(res.data.userDetails.name)
          // setPicturePath(res.data.userDetails.photoPath);
          setEmployeeType(res.data.role.name.split('_')[1]);
          setAddress1(res.data.userDetails.address1);
          setAddress2(res.data.userDetails.address2);
          setCity(res.data.userDetails.city);
          setState(res.data.userDetails.state);
          setAadhar(res.data.userDetails.aadhar);
          setPan(res.data.userDetails.pan)
          setLatLng(res.data.userDetails.latitude + " / " + res.data.userDetails.longitude)
          
        })
        .catch(err => {
          setLoading(false);

          console.log('ERROR', err.response.data);
        });
    });
  }, []);

  useFocusEffect(
    React.useCallback(()=>{
      setLoading(true);
    AsyncStorage.multiGet(['API_TOKEN', 'LOGIN_ID','USERNAME'], (err, items) => {
      if (err) {
        console.warn(err);
        return
      }
      setUsername(items[1][1])
      console.log(items[2][1])
      GetUserDetails(items[2][1], items[0][1])
        .then(res => {
          setLoading(false);
          console.log('RESPONSE', res.data);
          setName(res.data.userDetails.name);
          setmobileNumber(res.data.userDetails.mobile);
          setEmail(res.data.email);
          // setName(res.data.userDetails.name)
          // setPicturePath(res.data.userDetails.photoPath);
          setEmployeeType(res.data.role.name.split('_')[1]);
          setAddress1(res.data.userDetails.address1);
          setAddress2(res.data.userDetails.address2);
          setCity(res.data.userDetails.city);
          setState(res.data.userDetails.state);
          setAadhar(res.data.userDetails.aadhar);
          setPan(res.data.userDetails.pan)
          setLatLng(res.data.userDetails.latitude + " / " + res.data.userDetails.longitude)
          
        })
        .catch(err => {
          setLoading(false);

          console.log('ERROR', err.response.data);
        });
    });
    },[])
  )
  const populateFeildWithGeoCoder = () => {
    console.log(location[0]);

    Geocoder.from(location[0], location[1])
      .then(res => {
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
        console.warn(err);
        openModal();
      });
  };

  const updateUserProfile = () => {
    loginValidationSchema
      .isValid({
        name: name,
        phone_no: mobileNumber,
        email: email,
        address1: address1,
        
      })
      .then(valid => {
       
        if (valid) {

          if(!panReg.test(pan)){
            setPanErr(true);
            return;
          }
          if(!aadharReg.test(aadhar)){
            setAadharErr(true);
            return;
          }
          setLoading(true);
          AsyncStorage.multiGet(['API_TOKEN', 'LOGIN_ID','USERNAME'], (err, items) => {
            if (err) {
              console.warn(err);
            }
           
            const body = {
              email: email,
              userDetails: {
                name: name,
                mobile: mobileNumber,
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                latitude: location[0],
                longitude: location[1],
                photoPath: photoPath,
                aadhar: aadhar,
                pan: pan,
              },
            };

            UpdateUserDetails(items[2][1], body, items[0][1])
              .then(res => {
                setLoading(false);
                navigation.goBack();
                console.log(res.data);
              })
              .catch(err => {
                setErrorText(err.response.data.message);
                setPopUp(true);
                setLoading(false);
              });
          });
        } else {
            setErrorText(I18n.t('errorMessage.required_fields'))
            setPopUp(true);
            setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
      });
  };

  // Choose picture, have used dependency(image-picker : 2.3.1) as it had showImagePicker inbuilt
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
        // setErrorText('User cancelled camera picker');
        // setPopUp(true);
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

      setPicturePath(response);
      setLoader(true);
      AsyncStorage.multiGet(
        ['API_TOKEN', 'USER_ID', 'LOGIN_ID','USERNAME'],
        (err, items) => {
          if (err) {
            setLoader(false);
            console.warn(err);
          }
          console.log(items[3][1]);
          setbtnText(I18n.t('editProfile.uploading'));

          UploadAvatar(items[0][1], items[3][1], response.assets[0])
            .then(res => {
              console.log(res.data);
              setLoader(false);
              setbtnText(I18n.t('editProfile.updated'));
              
              setPhotoPath(res.data);
              const body = {
                userDetails: {
                  photoPath: res.data,
                },
              };
            })
            .catch(err => {
              setLoader(false);
              setbtnText('CHOOSE PROFILE');
              console.log(err.response.data);
            });
        },
      );
    });
  };

  // {Edit mode will become available on cliking submit button, opening same form with disabled fields and edit option}

  return (
    <>
    <ScrollView>
      <View>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          size="large"
          textContent={'Loading...'}
          textStyle={{
            color: config.WHITE,
            fontSize: 12,
            marginTop: 2,
          }}
        />
         <Spinner
          //visibility of Overlay Loading Spinner
          visible={loader}
          //Text with the Spinner
          size="large"
          textContent={'Uploading...'}
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
            setLatLng(cordinates.latitude + ' / ' + cordinates.longitude);
            setShowDialog(false);
            populateFeildWithGeoCoder();
          }}
          submit={I18n.t('agencyProfileEdit.location_submit')}
        />
        <Header navigation={navigation} title={'My Profile'} />

        <PostAuthWrapper
          titlePreFix={I18n.t('profile.myProfile_submit.my')}
          titlePostFix={I18n.t('profile.myProfile_submit.profile')}
          isAgencyHomePage={false}
          isEdit={false}>
          <>
            {isEditable ? (
              <View style={{position: 'absolute', right: -2}}>
                <IconButton
                  icon="pencil"
                  color={config.DARK_GREY}
                  size={15}
                  onPress={() => {
                    setEditable(false);
                  }}
                />
              </View>
            ) : null}
          </>
          <>
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <Avatar.Image
                size={125}
                style={{backgroundColor: config.LIGHT_GREY}}
                source={
                  picturePath
                    ? {
                        uri: picturePath.assets[0].uri,
                      }
                    : {
                      uri:`http://34.73.73.156:80/profile/${username}?height=140&width=140&random=${Math.random().toString(36).substring(7)}`
                    }
                }
              />
            </View>
          </>
          {!isEditable ? (
            <Text style={profileStyles.upload_picture_txt}>{I18n.t('editProfile.upload')}</Text>
          ) : null}
          {!isEditable ? (
            <View style={profileStyles.upload_btn}>
              <Button
                loading={loader}
                disabled={loading}
                labelStyle={{color: config.DARK_GREY}}
                onPress={() => chooseImage()}>
                {btnText}
              </Button>
            </View>
          ) : null}
          <View>
            <View style={{marginTop: 15}}>
              <Input
                secureTextEntry={false}
                label={I18n.t('profile.profile_placeholders.name')}
                value={name}
                onChange={text => {
                  setName(text);
                }}
                iconSize={20}
                iconName="account-network"
                placeholder=""
                disabled={isEditable}
                error={false}
                numberOnly=""
                maxLength={30}
                style={{}}
                isAvailable={false}
                success={false}
                hintText=""
                onFocus={() => {}}
              />

              <Input
                secureTextEntry={false}
                label={I18n.t('profile.profile_placeholders.employeeType')}
                value={employeeTypr}
                onChange={text => {
                  setEmployeeType(text);
                }}
                iconSize={20}
                iconName="account-network"
                placeholder=""
                disabled={isEditable}
                editable={false}
                error={false}
                numberOnly=""
                maxLength={30}
                style={{}}
                isAvailable={false}
                success={false}
                hintText=""
                onFocus={() => {}}
              />

              <Input
                secureTextEntry={false}
                label={I18n.t('profile.profile_placeholders.phone_no')}
                value={mobileNumber}
                onChange={text => {
                  setmobileNumber(text.replace(/[^0-9]/g,''));
                }}
                iconSize={20}
                iconName="cellphone"
                placeholder=""
                disabled={isEditable}
                error={false}
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

              <Input
                secureTextEntry={false}
                label={I18n.t('profile.profile_placeholders.email')}
                value={email}
                onChange={text => {
                  setEmail(text);
                }}
                iconSize={20}
                iconName="gmail"
                placeholder=""
                disabled={isEditable}
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
                label={I18n.t('profile.profile_placeholders.landline')}
                value={landlineNumber}
                onChange={text => {
                  setLandlineNumber(text);
                }}
                iconSize={20}
                iconName="phone-classic"
                placeholder=""
                disabled={isEditable}
                error={false}
                mode="flat"
                numberOnly=""
                maxLength={30}
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
                label={I18n.t('profile.profile_placeholders.address1')}
                value={address1}
                onChange={text => {
                  setAddress1(text);
                }}
                iconSize={20}
                iconName="person-outline"
                placeholder=""
                disabled={isEditable}
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

              {!isEditable ? (
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
                  contentStyle={{
                    borderColor: config.SKY_BLUE,
                    borderWidth: 1,
                  }}
                  labelStyle={[profileStyles.buttonLocation]}
                  mode="outlined"
                  onPress={openModal}>
                  {I18n.t('agencyProfileEdit.agency_button_geo_location')}
                </Button>
              ) : null}
            </View>
            <Input
              secureTextEntry={false}
              label={I18n.t('profile.profile_placeholders.address2')}
              value={address2}
              onChange={text => {
                setAddress2(text);
              }}
              iconSize={20}
              iconName="person-outline"
              placeholder=""
              disabled={isEditable}
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
              multiline ={true}
              numberOfLines={2}
            />

            <Input
              secureTextEntry={false}
              label={I18n.t('profile.profile_placeholders.state')}
              value={state}
              onChange={text => {
                setState(text);
              }}
              iconSize={20}
              iconName="pin-drop"
              placeholder=""
              disabled={isEditable}
              error={false}
              mode="flat"
              numberOnly=""
              maxLength={30}
              style={{}}
              editable={false}
              dense=""
              isAvailable={true}
              success={false}
              hintText=""
              keyboardType="default"
              onFocus={() => {}}
            />
            <Input
              secureTextEntry={false}
              label={I18n.t('profile.profile_placeholders.city')}
              value={city}
              onChange={text => {
                setCity(text);
              }}
              iconSize={20}
              iconName="pin-drop"
              placeholder=""
              disabled={isEditable}
              error={false}
              mode="flat"
              editable={false}
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
              label={I18n.t('profile.profile_placeholders.lat_long')}
              value={latLng}
              onChange={text => {
                setLatLng(text);
              }}
              editable={false}
              iconSize={20}
              iconName="pin-drop"
              placeholder=""
              disabled={isEditable}
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
              label={I18n.t('profile.profile_placeholders.aadhar')}
              value={aadhar}
              onChange={text => {
                setAadhar(text.replace(/[^0-9]/g,''));
                if(text.length>0){
                  setAadharErr(false)
                }
              }}
              iconSize={20}
              iconName="credit-card"
              placeholder=""
              disabled={isEditable}
              error={false}
              mode="flat"
              numberOnly=""
              maxLength={12}
              style={{}}
              dense=""
              isAvailable={true}
              success={false}
              hintText=""
              keyboardType="numeric"
              onFocus={() => {}}
            />
             {aadharErr && (
            <Text style={commonStyles.errInput_txt}> {I18n.t('errorMessage.errror_aadhar_card')} </Text>
          )}
            <Input
              secureTextEntry={false}
              label={I18n.t('profile.profile_placeholders.pan')}
              value={pan}
              onChange={text => {
                setPan(text);
                if(text.length>0){
                  setPanErr(false)
                }
              }}
              iconSize={20}
              iconName="credit-card"
              placeholder=""
              disabled={isEditable}
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
            {panErr && (
            <Text style={commonStyles.errInput_txt}> {I18n.t('errorMessage.error_pan_card')} </Text>
          )}
            {isEditable ? (
              <View style={profileStyles.container}>
                <View style={profileStyles.innerContainer}>
                  <View style={styles.title}>
                    <Text style={styles.titlePreFix}>
                      {'Moti'}
                      {<Text style={styles.titlePostFix}>&nbsp;{'Mahal'}</Text>}
                    </Text>
                    <Text style={profileStyles.subtitle}>
                      {I18n.t('profile.myProfile_submit.afterSubmit')}
                    </Text>
                  </View>
                </View>
                <View>
                  <Button
                    style={{
                      width: '100%',
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                    icon={() => (
                      <Icon
                        name={'arrow-forward'}
                        color={config.WHITE}
                        size={25}
                      />
                    )}
                    contentStyle={{
                      flexDirection: 'row-reverse',
                      left: 50,
                    }}
                    labelStyle={{color: config.WHITE, left: 90}}
                    mode="contained">
                    MOTI MAHAL PROFILE
                  </Button>
                </View>
              </View>
            ) : null}
            {!isEditable ? (
              <View>
                <Button
                  mode="contained"
                  icon={() => (
                    <Icon
                      style={{position: 'absolute', right: -85, top: -12}}
                      name={'arrow-forward'}
                      color={config.WHITE}
                      size={25}
                    />
                  )}
                  labelStyle={{color: config.WHITE}}
                  contentStyle={{flexDirection: 'row-reverse'}}
                  onPress={() => {
                    updateUserProfile();
                  }}>
                  {I18n.t('items.item_management.submit')}
                </Button>
              </View>
            ) : null}
          </View>
          {/* Submitted model */}
          <View>
            <Portal>
              <Dialog
                style={[profileStyles.terms_modal_Sign_ND]}
                visible={isSubmitted}
                onDismiss={() => {
                  setSubmitted(false);
                }}>
                <Dialog.Content style={profileStyles.dialogContent}>
                  <View style={profileStyles.innnerConatiner}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        marginTop: 10,
                        marginBottom: 20,
                      }}
                      source={require('./../../assets/icons/vector_tick.png')}
                    />
                    <View style={profileStyles.modal_Sign_space}>
                      <Text style={profileStyles.modal_Sign_heading}>
                        {I18n.t('profile.myProfile_submit.modal_heading')}
                      </Text>
                    </View>

                    <View style={profileStyles.modal_Sign_space}>
                      <Text style={profileStyles.modal_Sign_txt}>
                        {I18n.t('profile.myProfile_submit.modal_body_txt')}
                      </Text>
                    </View>

                    <Button
                      style={profileStyles.btn_SignUp_ND_Modal_2}
                      labelStyle={profileStyles.btn_SignUp_ND_Modal_2}
                      mode="contained"
                      onPress={() => {
                        setSubmitted(false);
                        setEditable(true);
                      }}>
                      {I18n.t('profile.myProfile_submit.close_btn')}
                    </Button>
                  </View>
                </Dialog.Content>
              </Dialog>
            </Portal>
          </View>
        </PostAuthWrapper>
      </View>
    </ScrollView>
     <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
     </>
  );
};

export default MyProfile;
