import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';

import Logo from './../../components/atoms/Logo';
import BgImage from './../../components/atoms/BgImage';
import PreAuthFormWrapper from './../../components/PreAuthFormWrapper';
import Input from './../../components/atoms/Input';
import I18n from "../../config/i18n";

import CONSTANTS from './../../constants/constants';

import styles from './ForgotPassword.styles';
import {ResetPassword} from '../../api/authentication';

const ConfirmPassword = ({onSubmit, navigation, otpData}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasError, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const changePassword = () => {
    const body = {
      mobileNumber: otpData.mobile,
      otp: otpData.otp,
      newPassword: confirmPassword,
    };
    

    setLoading(true);
    ResetPassword(body)
      .then(res => {
        setLoading(false);

        if (
          res.status === 200 &&
          res.data.message === 'Password updated successfully!'
        ) {
          setError(false);
          alert(res.data.message);
          navigation.goBack();
        } else {
          alert(I18n.t('errorMessage.password_changed_error'));
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
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
              {I18n.t('forgotPassword.desc_page3')}
              <Text style={styles.descHighlight}>
                {` ${I18n.t('forgotPassword.new_pass')}.`}
              </Text>
            </Text>
          </View>
          <Input
            label={I18n.t('forgotPassword.new_pass')}
            value={password}
            iconName="account-key"
            isAvailable = {false}
            onChange={text => setPassword(text)}
            secureTextEntry
          />

          <Input
            label={I18n.t('forgotPassword.confirm_pass')}
            value={confirmPassword}
            iconName="account-key"
            isAvailable = {false}
            onChange={text => setConfirmPassword(text)}
            secureTextEntry
            error={hasError}
            hintText={hasError ? I18n.t('forgotPassword.pass_mismatch') : ''}
          />

          <Button
            style={styles.button}
            labelStyle={styles.btnLabel}
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={() => {
              if (password !== confirmPassword) {
                setError(true);
              } else {
                changePassword();
              }
            }}>
            {I18n.t('forgotPassword.create_pass')}
          </Button>
        </>
      </PreAuthFormWrapper>
    </View>
  );
};

export default ConfirmPassword;
