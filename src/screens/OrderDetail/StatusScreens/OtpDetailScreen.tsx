import React from 'react';
import {View, Text} from 'react-native';
import config from '../../../config/colors';

const OtpDetailScreen = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          margin: 10,
          padding: 10,
          textAlign: 'center',
        }}>
        Please share the{' '}
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: config.SKY_BLUE,
          }}>
          OTP
        </Text>{' '}
        once you have perfomed{' '}
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: config.SKY_BLUE,
          }}>
          PDC
        </Text>
      </Text>
      <Text
        style={{
          color: config.SKY_BLUE,
          fontSize: 34,
          fontWeight: '700',
          textAlign: 'center',
          letterSpacing: 50,
          borderBottomWidth: 2,
          borderBottomColor: config.SKY_BLUE,
        }}>
        3945
      </Text>
    </View>
  );
};

export default OtpDetailScreen;
