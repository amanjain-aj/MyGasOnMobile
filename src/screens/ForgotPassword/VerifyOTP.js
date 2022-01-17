import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button, configureFonts} from 'react-native-paper';

import Logo from './../../components/atoms/Logo';
import BgImage from './../../components/atoms/BgImage';
import PreAuthFormWrapper from './../../components/PreAuthFormWrapper';
import Input from './../../components/atoms/Input';
import config from '../../config/colors';
import CONSTANTS from './../../constants/constants';
import I18n from "../../config/i18n";
// import * as Progress from 'react-native-progress';
import styles from './ForgotPassword.styles';
import {GetOtp, VerifyOtp} from '../../api/authentication';

const VerifyOTP = ({onSubmit, otpData}) => {
  const [otp, setOTP] = useState('');
  const [hasError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [timer, setTimer] = useState(90);
  const [loading, setLoading] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [fill,setFill] = useState(false);
  const [enable, setEnable] = useState(true);

  useEffect(() => {
    // const timerInterval = setInterval(() => {
    //   if (timer <= 0) {
    //     clearInterval(timerInterval);
    //     setEnable(false);
    //   } else {
    //     setTimer(timer - 1);
    //   }
    // }, 1000);
    // return () => clearInterval(timerInterval);
  }, [timer]);

  const getOtp = () => {
    const body = {
      mobileNumber: otpData.mobile,
    };
    GetOtp(body)
      .then(res => {
        console.log(res.data);
        setLoading(false);
        if (
          res.status === 200 &&
          res.data.message === 'OTP Sent Successfully'
        ) {
          // setTimer(90);
          // setEnable(true);
          alert(I18n.t('errorMessage.otp_sent'));
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        setLoading(false);
        alert('Failed!\n' + err.response.data.message);
      });
  };

  const verifyOtp = () => {
    setLoadingOtp(true);
    const body = {
      otp: otp,
      mobileNumber: otpData.mobile,
    };

    VerifyOtp(body)
      .then(res => {
        setLoadingOtp(false);

        console.log(res.data);
        if (
          res.status === 200 &&
          res.data.message === 'OTP verified successfully'
        ) {
          setError(false);
          setSuccess(true);
          onSubmit({
            mobile: otpData.mobile,
            otp: otp,
          });
        } else {
          setLoadingOtp(false);

          setError(true);
          alert(res.data.message);
        }
      })
      .catch(err => {
        setLoadingOtp(false);

        alert(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  const onOtpEnter = value => {
    setOTP(value);
  };
  
  return (
    <View style={styles.container}>
      <BgImage />
      <Logo size="half" />
      <PreAuthFormWrapper
        titlePreFix={I18n.t('forgotPassword.title_pre')}
        titlePostFix={I18n.t('forgotPassword.title_post')}>
        <>
          <View style={styles.descContainer}>
            <Text style={styles.description}>
              {I18n.t('forgotPassword.desc_page2_pre')}
              <Text style={styles.descHighlight}>
                {` ${I18n.t('forgotPassword.otp')}`}
              </Text>
              {I18n.t('forgotPassword.desc_page2_post')}
            </Text>

            {/* <Text style={styles.description}>
              {I18n.t('forgotPassword.waiting')}&nbsp;
              <Text style={[styles.timer, hasError ? styles.timerError : null]}>
                {timer}
              </Text>
            </Text> */}
          </View>
          <View style={styles.otpContainer}>
            <Input
              style={styles.otpInput}
              mode="outlined"
              value={otp}
              onChange={text => 
                {
                onOtpEnter(text)
                if(text.length>0){
                  setFill(true)
                }else{
                  setFill(false)
                }
               
                }
              }
              error={hasError}
              numberOnly
              maxLength={6}
              keyboardType="numeric"
              dense
            />
            <Text
              style={[
                styles.otpBox,
                hasError ? styles.otpError : null,
                isSuccess ? styles.otpSuccess : null,
              ]}>
              {otp.length > 0 && otp[0]}
            </Text>
            <Text
              style={[
                styles.otpBox,
                hasError ? styles.otpError : null,
                isSuccess ? styles.otpSuccess : null,
              ]}>
              {otp.length > 1 && otp[1]}
            </Text>
            <Text
              style={[
                styles.otpBox,
                hasError ? styles.otpError : null,
                isSuccess ? styles.otpSuccess : null,
              ]}>
              {otp.length > 2 && otp[2]}
            </Text>
            <Text
              style={[
                styles.otpBox,
                hasError ? styles.otpError : null,
                isSuccess ? styles.otpSuccess : null,
              ]}>
              {otp.length > 3 && otp[3]}
            </Text>
            <Text
              style={[
                styles.otpBox,
                hasError ? styles.otpError : null,
                isSuccess ? styles.otpSuccess : null,
              ]}>
              {otp.length > 4 && otp[4]}
            </Text>
            <Text
              style={[
                styles.otpBox,
                hasError ? styles.otpError : null,
                isSuccess ? styles.otpSuccess : null,
              ]}>
              {otp.length > 5 && otp[5]}
            </Text>
          </View>

          <Button
            style={styles.button}
            labelStyle={fill ? styles.btnLabelOutlined1 : styles.btnLabelOutlined}
            loading={loadingOtp}
            disabled={loadingOtp}
            mode={fill ? 'contained' : 'outlined'}
            onPress={() => {
              if (otp.length < 6) {
                setError(true);
                setSuccess(false);
              } else {
                verifyOtp();
              }
            }}>
            {`${I18n.t('forgotPassword.verify')} ${I18n.t('forgotPassword.otp')}`}
          </Button>

            <Button
            style={styles.button}
            labelStyle={styles.btnLabel}
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={() => {
              setLoading(true);
              getOtp();
            }}>
            {`${I18n.t('forgotPassword.resend')} ${I18n.t('forgotPassword.otp')}`}
          </Button> 

          {/* <Button
            style={styles.button}
            labelStyle={styles.btnLabelOutlined}
            mode="outlined"
            onPress={() => onNavigate && onNavigate("Login")}
          >
            {CONSTANTS.common.back}
          </Button> */}
        </>
      </PreAuthFormWrapper>
    </View>
  );
};

export default VerifyOTP;
