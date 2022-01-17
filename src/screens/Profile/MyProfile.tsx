import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../../components/atoms/Header';
import CustomProfile from '../../components/CustomProfile';
import PostAuthWrapper from '../../components/PostAuthWrapper';
import CONSTANTS from '../../constants/constants';
import I18n from '../../config/i18n';
import styles from './MyProfile.styles';
import config from '../../config/colors';
import {GetUserDetails} from '../../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DownloadImage} from '../../api/fileApi';
import {getCustomerById} from '../../api/customerApi';
import {GetAgencyById} from '../../api/agencyApi';
import FooterTab from '../../components/atoms/FooterTab';
import { useFocusEffect } from '@react-navigation/native';

const MyProfile: any = ({navigation}: {navigation: any}) => {
  const [loading, setLoading] = useState(true);
  const [custId, setCustId] = useState('');
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const [picture, setPicture] = useState();

  const [cardDetails, setCardDetails] = useState({
    firstname: "",
    lastname: "",
    detail_address: "",
  });

  const [profileData, setProfileData] = useState({
    id: 0,
    username: '',
    email: '',
    role: {
      id: 0,
      name: '',
    },
    userDetails: {
      id: 0,
      name: '',
      mobile: '',
      address1: '',
      address2: '',
      district: '',
      city: '',
      state: '',
      latitude: 0.0,
      longitude: 0.0,
      photoPath: '',
      device: '',
      agencyId: '',
      aadhar: '',
      pan: '',
    },
    active: '',
  });
  useFocusEffect(
    React.useCallback(()=>{
     
      setLoading(true);
      AsyncStorage.multiGet(
        ['API_TOKEN', 'USER_ID', 'LOGIN_ID','USER_ROLE','USERNAME'],
        (err, items) => {
          if (err) {
            console.warn(err);
          }
          console.log(items)
          setRole(items[3][1])
          setToken(items[0][1]);
          setCustId(items[1][0]);
          setUsername(items[4][1]);
        
          GetUserDetails(items[4][1], items[0][1])
            .then(res => {
              setLoading(false)
              // console.log(res.data);
              setProfileData(res.data);
              if(items[3][1] == 'ROLE_AGENCYMANAGER'){
                GetAgencyById(items[1][1], items[0][1])
                .then(res => {
                  setLoading(false);
                  if (res.status === 200) {
                    setCardDetails({
                      firstname: getSplitNames(0, res.data.name),
                      lastname: getSplitNames(1, res.data.name),
                      detail_address: getUserAddress(res.data.address),
                    });
                  }
                })
                .catch(err => {
                  setLoading(false);
                  console.log("Error",err);
                });
              }else{
               
                getCustomerById(items[1][1], items[0][1])
                .then(res => {
                  setLoading(false);
  
                  if (res.status === 200) {
                    setCardDetails({
                      firstname: getSplitNames(0, res.data.name),
                      lastname: getSplitNames(1, res.data.name),
                      detail_address: getUserAddress(res.data.address),
                    });
                  }
                })
                .catch(err => {
                  setLoading(false);
  
                  console.log("Error1",err);
                });
              }
             
  
              // setLoading(false)
            })
            .catch(err => {
              setLoading(false);
              console.log("Error2",err);
            });
        },
      );
    },[])
  )
  useEffect(() => {
    setLoading(true);
    AsyncStorage.multiGet(
      ['API_TOKEN', 'USER_ID', 'LOGIN_ID','USER_ROLE','USERNAME'],
      (err, items) => {
        if (err) {
          console.warn(err);
        }
        console.log(items)
        setRole(items[3][1])
        setToken(items[0][1]);
        setCustId(items[1][0]);
        setUsername(items[4][1]);
      
        GetUserDetails(items[4][1], items[0][1])
          .then(res => {
            setLoading(false)
            // console.log(res.data);
            setProfileData(res.data);
            if(items[3][1] == 'ROLE_AGENCYMANAGER'){
              GetAgencyById(items[1][1], items[0][1])
              .then(res => {
                setLoading(false);
                if (res.status === 200) {
                  setCardDetails({
                    firstname: getSplitNames(0, res.data.name),
                    lastname: getSplitNames(1, res.data.name),
                    detail_address: getUserAddress(res.data.address),
                  });
                }
              })
              .catch(err => {
                setLoading(false);
                console.log("Error",err);
              });
            }else{
             
              getCustomerById(items[1][1], items[0][1])
              .then(res => {
                setLoading(false);

                if (res.status === 200) {
                  setCardDetails({
                    firstname: getSplitNames(0, res.data.name),
                    lastname: getSplitNames(1, res.data.name),
                    detail_address: getUserAddress(res.data.address),
                  });
                }
              })
              .catch(err => {
                setLoading(false);

                console.log("Error1",err);
              });
            }
           

            // setLoading(false)
          })
          .catch(err => {
            setLoading(false);
            console.log("Error2",err);
          });
      },
    );
  }, []);

  const getUserAddress = address => {
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

  const getSplitNames = (position, str) => {
    if (position == 0) {
      return str.split(' ').slice(0, -1).join(' ');
    }

    if (position == 1) {

      return str.split(' ').slice(-1).join(' ');
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title={I18n.t('popUpMenu.myProfile')}
      />
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
      <PostAuthWrapper
        titlePreFix={I18n.t('myProfile.myprofie_prefix')}
        titlePostFix={I18n.t('myProfile.myprofile_postfix')}
        subtitle={''}
        navigation={navigation}
        isAgencyHomePage={false}
        EditRoute={'MyProfile'}
        isEdit={true}>
        {
          profileData.id == 0 ? null :
          <CustomProfile
          profile={profileData && profileData}
          cardDetail={cardDetails}
          username={username}
          navigation={navigation}
        />
        }
      </PostAuthWrapper>
      <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </View>
  );
};

export default MyProfile;
