import React, { useEffect, useState } from "react";
import {View, Text,ScrollView} from 'react-native';
import { Button } from "react-native-paper";
import Logo from './../../components/atoms/Logo';
import BgImage from './../../components/atoms/BgImage';
import PostAuthFormWrapper from './../../components/PostAuthWrapper/index';
import Input from './../../components/atoms/Input';
import I18n from "../../config/i18n";
import {ChangeToNewPassword } from '../../api/authentication';
import styles from "../ChangePassword/ChangePassword.styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterTab from '../../components/atoms/FooterTab';
import Header from '../../components/atoms/Header'
import AlertBox from '../../components/atoms/Modals/CustomeAlert';
import { useFocusEffect,CommonActions } from "@react-navigation/native";

const ChangePassword=({navigation})=> {
    const[oldPassword, setoldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hasError, setError] = useState(false);
    const [error,setEmptyError] = useState(false);
    const [empty,setEmpty] = useState('');
    const [loading, setLoading] = useState(false);
    const [popUp,setPopUp] = useState(false);
    const [isErrorChange,setIsErrorChange] = useState(false);
    const [username,setUserName] = useState('');
    const [token,setToken] = useState('');

    useFocusEffect(
      React.useCallback(()=>{
        getUserName();
      },[])
    )
    
    const getUserName = async() => {
      const username = await AsyncStorage.getItem('USERNAME');
      const token = await AsyncStorage.getItem('API_TOKEN');
      setToken(token)
      setUserName(username);
    }
    const changeToPassword = () => {

      if(oldPassword.length<1) {
         setEmptyError(true);
         setTimeout(()=>{
          setEmptyError(false);
         },4000)
         return;
      }
      if(password.length<1 || confirmPassword.length<1){
        setPopUp(true);
        setEmpty(I18n.t('errorMessage.error_allFields'));
        return;
      }
      if (password !== confirmPassword) {
          setError(true);
          setTimeout(()=>{
          setError(false);
         },4000)
          return;
      }

      const body = {
        newPassword: password,
        oldPassword: oldPassword
      };
      setLoading(true);
      ChangeToNewPassword(body,username,token)
        .then(res => {
          setLoading(false);
  
          if (
            res.status === 200 &&
            res.data.message === 'Password updated successfully!'
           
      
          ) {
            setError(false);
            setLoading(false);
            setEmpty(res.data.message)
            setPopUp(true)
            setIsErrorChange(false)
            // navigation.goBack();
            AsyncStorage.setItem('PASS_CODE',password);
            
            
          
           
          } else {
            setEmpty(I18n.t('errorMessage.password_changed_error'))
            setPopUp(true);
            setIsErrorChange(true)
           
          }
        })
        .catch(err => {
          console.log(err.response.data.message);
          setEmpty(I18n.t('errorMessage.password_changed_error'))
          setPopUp(true);
          setIsErrorChange(true)

         
          setLoading(false);
        });
    };
    const saveUser = (userId, password) => {
      const items = [
        ['REMBER_ME', 'OK'],
        ['LOGIN_ID', userId],
        ['PASS_CODE', password],
      ];
      AsyncStorage.multiSet(items, () => {navigation.dispatch(resetAction);});
    };
    const removeStorage = () => {
      AsyncStorage.multiGet(
        ['REMBER_ME', 'LOGIN_ID', 'PASS_CODE'],
        (err, items) => {
          if (err) {
            console.warn(err);
          }
  
          if (items[0][1] === 'OK') {
            let user = items[1][1];
            let pass = items[2][1];
  
            AsyncStorage.clear()
              .then(() => {
                saveUser(user, pass);
              })
              .catch(err => console.log(err));
          } else {
            AsyncStorage.clear()
              .then(() => {navigation.dispatch(resetAction)})
              .catch(err => console.log(err));
          }
        },
      );
    };
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: 'Auth'}],
    });
  
    return (
      <>
      <Header title={I18n.t('changePassword.change_password_header')} navigation={navigation} />
      <AlertBox showDialog={popUp} setShowDialog={setPopUp} title={empty} onClose={isErrorChange? null:removeStorage}/>
      
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow:1}}> 
        <View style={styles.wrapper}>
       <View style={styles.container}>
      
       <PostAuthFormWrapper
        titlePreFix={I18n.t('changePassword.title_pre')}
        titlePostFix={I18n.t('changePassword.title_post')}
        navigation={navigation}
        isAgencyHomePage={false}
        isEdit={false}
        >
        <>
        <View style={styles.descContainer}>
            <Text style={styles.description}>
              {I18n.t('changePassword.desc_page3')}
              <Text style={styles.descHighlight}>
                {` ${I18n.t('changePassword.new_pass')}.`}
              </Text>
            </Text>
          </View>
          <Input
            label={I18n.t('changePassword.old_pass')}
            value={oldPassword}
            iconName="vpn-key"
            onChange={text => setoldPassword(text)}
            secureTextEntry
            error={error}
            hintText={error ? I18n.t('changePassword.old_password_error') : ''}
          />
          <Input
            label={I18n.t('changePassword.new_pass')}
            value={password}
            iconName="vpn-key"
            onChange={text => setPassword(text)}
            secureTextEntry
          />

          <Input
            label={I18n.t('changePassword.confirm_pass')}
            value={confirmPassword}
            iconName="vpn-key"
            onChange={text => setConfirmPassword(text)}
            secureTextEntry
            error={hasError}
            hintText={hasError ? I18n.t('changePassword.pass_mismatch') : ''}
          />

          <Button
            style={styles.button}
            labelStyle={styles.btnLabel}
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={() => changeToPassword()}>
            {I18n.t('changePassword.change_password')}
          </Button>
        </>
        </PostAuthFormWrapper>
    
       </View>
       </View>

       </ScrollView>
       <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
       </>
    )
}

export default ChangePassword;
