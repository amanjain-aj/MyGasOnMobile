import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TabBg} from '../TabBg';


 const TabBarAdvancedButton= ({
  bgColor,
   icon,
  onPress
}) => (
  <View style={styles.container} pointerEvents="box-none">
    <TabBg color={bgColor} style={styles.background} />
    <TouchableOpacity style={styles.button}  onPress={onPress}>
      <Icon name={icon} style={styles.buttonIcon} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 75,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
  },
  button: {
    top: -25.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 53,
    height: 53,
    borderRadius: 27,
    backgroundColor: '#00B6ED',
  },
  buttonIcon: {
    fontSize: 18,
    color: '#fff',
  },
});
export default TabBarAdvancedButton;