import React from 'react';
import { Button as RNButton } from 'react-native-paper';

import styles from './Button.styles';

const Button = ({ label, onPress = () => {} }) => {
  return (
    <RNButton labelStyle={styles.button} mode="contained" onPress={onPress}>
      {label}
    </RNButton>
  );
};

export default Button;
