import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ProfileBottomCard from '../atoms/ProfileBottomCard';
import styles from './CustomProfile.styles';
import {Avatar} from 'react-native-paper';
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomProfile = ({profile, cardDetail, username,navigation}) => {
  // const [user,setUser] = React.useState('');
  // useFocusEffect(
  //   React.useCallback(()=>{
  //     AsyncStorage.multiGet(['USERNAME'], (err, items) => {
  //       if (err) {
  //         console.warn(err);
  //         return
  //       }
  //       console.log(items[0][1]);
  //       setUser(items[0][1])
  //     });
  //   },[])
  // )

  // useEffect(()=>{
  //   AsyncStorage.multiGet(['USERNAME'], (err, items) => {
  //     if (err) {
  //       console.warn(err);
  //       return
  //     }
  //     console.log(items[0][1]);
  //     setUser(items[0][1])
  //   });
  // },[])
  // console.log("cdcdcdc",user)
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* <Text style={styles.title}></Text> */}
        <Avatar.Image
          size={140}
          style={{marginBottom: 30}}
          source={
            username != null
              ? {
                  uri: `http://34.73.73.156:80/profile/${username}?height=240&width=240&random=${Math.random().toString(36).substring(7)}`,
                }
              : require('../../assets/images/profilePlaceholder.png')
          }
        />
        {profile.userDetails &&
        profile.userDetails.name &&   (
          <Text style={styles.textStyle}>
            {profile.userDetails && profile.userDetails.name}
          </Text>
        )}
        {profile.userDetails && (
          <Text style={styles.textStyle}>
            {profile && profile.role.name.split('_')[1]}
          </Text>
        )}

        {profile.userDetails &&
          profile.userDetails.mobile &&(
          <Text style={styles.textStyle}>
            {profile.userDetails && profile.userDetails.mobile}
          </Text>
        )}

        {profile.userDetails &&
          profile.email &&(
          <Text style={styles.textStyle}>{profile && profile.email}</Text>
        )}
      

        {profile.userDetails.address1 && (
          <Text style={styles.textStyle}>
            {profile.userDetails &&
              profile.userDetails.address1 + ' ' + profile.userDetails &&
              profile.userDetails.address2}
          </Text>
        )}
        {profile.userDetails.city && (
          <Text style={styles.textStyle}>
            {profile.userDetails && profile.userDetails.city}
          </Text>
        )}
        {profile.userDetails.state && (
          <Text style={styles.textStyle}>
            {profile.userDetails && profile.userDetails.state}
          </Text>
        )}

        {profile.userDetails &&
        profile.userDetails.address1 &&
        profile.userDetails.address2 ? (
          <Text style={styles.textStyle}>
            {profile.userDetails.address1 + ' ' + profile.userDetails.address2}
          </Text>
        ) : (
          <></>
        )}
        {profile.userDetails && profile.userDetails.city ? (
          <Text style={styles.textStyle}>{profile.userDetails.city}</Text>
        ) : (
          <></>
        )}
        {profile.userDetails && profile.userDetails.state ? (
          <Text style={styles.textStyle}>{profile.userDetails.state}</Text>
        ) : (
          <></>
        )}

        {/* {profile.userDetails && profile.userDetails.agencyId ? (
          <Text style={styles.textStyle}>{profile.userDetails.agencyId}</Text>
        ) : (
          <></>
        )} */}

        
        {profile.userDetails && profile.userDetails.aadhar ? (
          <Text style={styles.textStyle}>{profile.userDetails.aadhar}</Text>
        ) : (
          <></>
        )}

        {profile.userDetails.pan && (
          <Text style={styles.textStyle}>
            {profile.userDetails && profile.userDetails.pan}
          </Text>
        )}
      </View>

      <View style={{height: 40}}></View>
      {cardDetail.firstname !== null ? (
        <ProfileBottomCard onPress={()=>{navigation.navigate('Home')}} cardDetails={cardDetail} />
      ) : (
        <></>
      )}
    </View>
  );
};

export default CustomProfile;
