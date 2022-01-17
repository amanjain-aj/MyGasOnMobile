import React, {useEffect, useState} from 'react';
import {View, Text, CheckBox} from 'react-native';
import {Button} from 'react-native-paper';
import {NavigationStackProp} from 'react-navigation-stack';
import {CommonActions} from '@react-navigation/native';
import Logo from '../../components/atoms/Logo';
import BgImage from '../../components/atoms/BgImage';
import PreAuthFormWrapper from '../../components/PreAuthFormWrapper';
import Input from '../../components/atoms/Input';
import {LoginUser} from '../../api/authentication';
import {getConfig} from '../../api/authentication';
import CONSTANTS from '../../constants/constants';
import I18n from '../../config/i18n';
import axios from 'axios';
import styles from './Login.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from '../../styles/common.styles';
import {ScrollView} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import constants from '../../constants/constants';
import config from '../../config/colors';
import Spinner from 'react-native-loading-spinner-overlay';
import Alert from '../../components/atoms/Modals/CustomeAlert';
import messaging from '@react-native-firebase/messaging';
// import SnackBar from 'rn-snackbar-component'

const Login = ({navigation}) => {
  const [userID, setuserID] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);
  const [visible, setvisible] = useState(false);
  const [userIdError, setuserIdError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [deviceToken, setDeviceToken] = useState(null);

  const [isRememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    AsyncStorage.multiGet(
      ['REMBER_ME', 'LOGIN_ID', 'PASS_CODE'],
      (err, items) => {
        if (err) {
          console.warn(err);
        }
        console.log(items);
        if (items[0][1] === 'OK') {
          setuserID(items[1][1] && items[1][1]);
          setPassword(items[1][1] && items[2][1]);
          console.log(items[1][1], items[2][1]);
        }
      },
    );
  }, []);
  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        return setDeviceToken(token);
      });
    return messaging().onTokenRefresh(token => {
      setDeviceToken(token)
    });
  }, []);
  useEffect(() => {
    console.log(deviceToken)
  }, [deviceToken]);

  const getHelpCentreData = token => {
    getConfig(token)
      .then(res => {
        if (res.status === 200) {
          AsyncStorage.setItem('HelpCentreData', JSON.stringify(res.data));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const doLogin = () => {
    if (userID.length < 1) {
      setuserIdError(true);
      return;
    }

    if (password.length < 1) {
      setpasswordError(true);
      return;
    }

    setloading(true);
    const loginBody = {
      username: userID,
      password: password,
      deviceId: deviceToken
    };
    deviceToken !== null ?
    LoginUser(loginBody)
      .then(res => {
        if (res.status === 200) {
          setloading(false);
          let id = '';
          switch (res.data.role) {
            case 'ROLE_CLIENTMANAGER':
              id = res.data.userDetails.customerId;
              break;
            case 'ROLE_AGENCYMANAGER':
              id = res.data.userDetails.agencyId;
              break;
            case 'ROLE_AGENT':
              id = res.data.userDetails.agentId;
              break;
            case 'ROLE_CHANNELPARTNER':
              id = res.data.userDetails.channelPartnerId;
              break;
          }

          console.log(res.data);
          saveData(
            res.data.accessToken,
            res.data.role,
            id,
            res.data.email,
            res.data.userDetails.name,
            res.data.username,
          );

          getHelpCentreData(res.data.accessToken);
        }
      })
      .catch(err => {
        setloading(false);
        console.log(err);
        if (err.response.data.message === 'Bad credentials') {
          setIsError(true);
        }
      })
    : alert('No Device Id Detected')
  };

  const saveData = async (token, role, custId, email, name, username) => {
    try {
      if (isRememberMe) {
        await AsyncStorage.setItem('REMBER_ME', 'OK');
        await AsyncStorage.setItem('LOGIN_ID', userID);
        await AsyncStorage.setItem('PASS_CODE', password);
      } else {
        await AsyncStorage.setItem('REMBER_ME', 'NONE');
      }

      await AsyncStorage.setItem('API_TOKEN', token);
      await AsyncStorage.setItem('USER_ROLE', role);
      await AsyncStorage.setItem('USER_ID', custId);
      await AsyncStorage.setItem('USER_NAME', name);
      await AsyncStorage.setItem('USER_EMAIL', email);
      await AsyncStorage.setItem('USERNAME', username);

      navigation.dispatch(resetAction);
    } catch (err) {
      console.log(err);
    }
  };

  const resetAction = CommonActions.reset({
    index: 0,

    routes: [{name: 'App'}],
  });

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
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

        <BgImage />
        <Logo size="half" />
        <PreAuthFormWrapper
          titlePreFix={I18n.t('login.title_pre')}
          titlePostFix={I18n.t('login.title_post')}>
          <Input
            placeholder={I18n.t('login.user_id')}
            value={userID}
            error={userIdError}
            iconName="person"
            onChange={text => {
              setuserID(text);
              if (text.length > 0) {
                setuserIdError(false);
                setIsError(false);
              }
            }}
          />
          {userIdError && (
            <Text style={commonStyles.errInput_txt}>
              {' '}
              {I18n.t('errorMessage.error_userId')}{' '}
            </Text>
          )}

          <Input
            placeholder={I18n.t('login.password')}
            value={password}
            iconName={visible ? 'visibility' : 'visibility-off'}
            error={passwordError}
            onChange={text => {
              setPassword(text);
              if (text.length > 0) {
                setpasswordError(false);
                setIsError(false);
              }
            }}
            onIconCLick={() => {
              setvisible(!visible);
            }}
            secureTextEntry={!visible}
          />
          {isError && (
            <Text style={commonStyles.errInput_txt}>
              {I18n.t('errorMessage.login_error')}
            </Text>
          )}
          {passwordError && (
            <Text style={commonStyles.errInput_txt}>
              {I18n.t('errorMessage.error_password')}
            </Text>
          )}
          <View style={styles.rememberContainer}>
            <CheckBox
              value={isRememberMe}
              onValueChange={setRememberMe}
              tintColors={{true: config.SKY_BLUE, false: config.SKY_BLUE}}
            />
            <Text style={styles.rememberText}>
              {I18n.t('login.remember_me')}
            </Text>
          </View>

          <Button
            labelStyle={styles.button}
            mode="contained"
            disabled={loading}
            onPress={doLogin}>
            {I18n.t('login.log_in')}
          </Button>
          <View style={styles.linkContainer}>
            <Button
              labelStyle={styles.forgetLink}
              mode="text"
              uppercase={false}
              onPress={() => navigation.navigate('ForgotPassword')}>
              {I18n.t('login.forget_password')}?
            </Button>
          </View>
          <View style={styles.footer}>
            <Text>
              {I18n.t('login.register_pre')}&nbsp;
              <Text
                style={styles.footerLink}
                mode="text"
                uppercase={false}
                onPress={() => navigation.navigate('Registration')}>
                {I18n.t('login.register_post')}
              </Text>
            </Text>
          </View>
        </PreAuthFormWrapper>
      </View>
    </ScrollView>
  );
};

export default Login;
