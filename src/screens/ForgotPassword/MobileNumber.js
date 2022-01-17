import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';

import Logo from './../../components/atoms/Logo';
import BgImage from './../../components/atoms/BgImage';
import PreAuthFormWrapper from './../../components/PreAuthFormWrapper';
import Input from './../../components/atoms/Input';

import CONSTANTS from './../../constants/constants';
import I18n from "../../config/i18n";

import styles from './ForgotPassword.styles';
import {GetOtp} from '../../api/authentication';
import { color } from 'react-native-reanimated';
import config from '../../config/colors';

const ForgotPassword = ({onSubmit, onNavigate}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [hasError, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isSuccess, setSuccess] = useState(false);

  const getOtp = () => {
    setLoading(true);
    const body = {
      mobileNumber: mobileNumber,
    };
    GetOtp(body)
      .then(res => {
        console.log(res.data);
        setLoading(false);
        if (
          res.status === 200 &&
          res.data.message === 'OTP Sent Successfully'
        ) {
          setSuccess(true);
          onSubmit({
            mobile: mobileNumber,
            otp: '',
          });
        } else {
          setError(true);
          alert(res.data.message);
        }
      })
      .catch(err => {
        setLoading(false);
        alert('Failed!\n' + err.response.data.message);
      });
  };

  const hintText = hasError
    ? I18n.t('forgotPassword.error_message')
    : isSuccess
    ? I18n.t('forgotPassword.success_message')
    : '';

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
              {I18n.t('forgotPassword.desc_page1_pre')}
              <Text style={styles.descHighlight}>
                {` ${I18n.t('forgotPassword.registered')}`}
              </Text>
              <Text style={styles.descHighlight}>
                {` ${I18n.t('forgotPassword.mobile_number')}`}
              </Text>
              {I18n.t('forgotPassword.desc_page1_post')}
            </Text>
          </View>
          <Input
            label={I18n.t('forgotPassword.mobile_number')}
            value={mobileNumber}
            iconName={
              hasError ? 'warning' : isSuccess ? 'check-circle' : 'smartphone'
            }
            
            onChange={text => {
              setMobileNumber(text.replace(/[^0-9]/g,''));
              if (text.length === 10) {
                setError(false);
              }
            }}
            error={hasError}
            numberOnly
            maxLength={10}
            success={isSuccess}
            hintText={hintText}
            keyboardType="numeric"
          />

          <Button
            style={styles.button}
            labelStyle={styles.btnLabel}
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={() => {
              if (!mobileNumber || mobileNumber.length < 10) {
                setError(true);
                setSuccess(false);
              } else {
                getOtp();
              }
            }}>
            {I18n.t('forgotPassword.req_otp')}
          </Button>

          <Button
            style={styles.button}
            labelStyle={styles.btnLabelOutlined}
            mode="outlined"
            onPress={() => onNavigate && onNavigate('Login')}>
            {I18n.t('common.back')}
          </Button>
        </>
      </PreAuthFormWrapper>
    </View>
  );
};

export default ForgotPassword;
