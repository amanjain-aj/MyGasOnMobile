import React, {ReactElement, useState} from 'react';
import {Text, View, ScrollView, Image} from 'react-native';
import {IconButton} from 'react-native-paper';
import styles from './PostAuthWrapper.styles';
import config from '../../config/colors';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostAuthWrapper = ({
  titlePreFix,
  titlePostFix,
  children,
  subtitle,
  isAgencyHomePage,
  EditRoute,
  navigation,
  isEdit,
  isHelpCenter = false,
}) => {

  const [id, setid] = useState('')
  const [im, setIm] = useState(false)

  useEffect(() => {
    AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
      if (err) {
        console.warn(err);
      }

      setid(items[1][1])
    })
    checkImageURL()
   
  }, [])

  const checkImageURL=()=>{
    fetch(`http://34.73.73.156/profile/${id}?height=50&width=50&random=${Math.random().toString(36).substring(7)}`)
       .then(res => {
         if (res.status == 404) {
         setIm(false)
         
         } else {
           setIm(true)
         
      }
    })
   .catch(err=>setIm(false))
   }


  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow:1}}> 
      <View style={styles.container}>
        <View style={styles.innerContainer}>
        {isHelpCenter !== false && (
                <Text style={styles.subtitle}>{subtitle}</Text>
              )}
          <View style={{marginTop: 50}}>
            {isAgencyHomePage !== false && (
              <View style={styles.agencyLogo}>
                {/* {checkImageURL} */}

                {
                  im ?
                  <Image
         style={{width: 40, height: 39.31, marginBottom: 10}}
         source={{uri:`http://34.73.73.156/profile/${id}?height=50&width=50&random=${Math.random().toString(36).substring(7)}`}}></Image> : <Image
                  style={{width: 40, height: 39.31, marginBottom: 10}}
                  source={require('../../assets/icons/agency_logo.png')}></Image>
                }
                
                {/* <Image
                  style={{width: 40, height: 39.31, marginBottom: 10}}
                  source={{uri:`http://34.73.73.156/profile/${id}?height=50&width=50&random=${Math.random().toString(36).substring(7)}`}}></Image> */}
              </View>
            )}
            {isEdit !== false && (
              <View style={styles.editIcon}>
                <IconButton
                  icon="pencil"
                  color={config.GREY}
                  size={15}
                  onPress={() => {
                    navigation.navigate(EditRoute);
                  }}
                />
              </View>
            )}
            <View style={styles.title}>
              <Text style={styles.titlePreFix}>
                {titlePreFix}
                {!!titlePostFix && (
                  <Text style={styles.titlePostFix}>&nbsp;{titlePostFix}</Text>
                )}
              </Text>
              {isAgencyHomePage !== false && (
                <Text style={styles.subtitle}>{subtitle}</Text>
              )}
              <View style={!isHelpCenter ? styles.titleUnderLineWrapper:styles.help_center_underline}>
                <View style={!isHelpCenter? styles.titleUnderline: styles.help_center_titleUnderline}/>
              </View>
            </View>
            {children}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PostAuthWrapper;
