import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import config from '../../../config/colors';
import constants from '../../../constants/constants';
import I18n from "../../../config/i18n";
import styles from '../OrderDeatil.styles';
import OTPTextInput from 'react-native-otp-textinput';

const OtpVerifyScreen = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          margin: 10,
          padding: 10,
          textAlign: 'center',
        }}>
        Please enter the{' '}
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: config.SKY_BLUE,
          }}>
          OTP
        </Text>{' '}
        received.
      </Text>

      <OTPTextInput
        tintColor={config.SKY_BLUE}
        offTintColor={config.SKY_BLUE}
        containerStyle={styles.otpcontainerStyle}
        textInputStyle={styles.otp}
      />
      <TouchableOpacity style={styles.dashedBUtton} onPress={() => {}}>
        <Text style={styles.buttonText}>{I18n.t('orderDetail.verifyOtp')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerifyScreen;
