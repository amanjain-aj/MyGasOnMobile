import React from 'react';
import { View } from 'react-native';

import Logo from './../atoms/Logo';
import BgImage from './../atoms/BgImage';

import styles from './PreLoginLayout.styles';
import { ScrollView } from 'react-native';

const PreLoginLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <BgImage />
      <Logo size="half" />
      {children}
    </View>
  );
};

export default PreLoginLayout;
