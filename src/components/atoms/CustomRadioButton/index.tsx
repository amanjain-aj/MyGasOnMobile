import React, { useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './CustomRadioButton.styles';

export interface CustomRadioButton {
  radioText: string;
  radioDescription: string;
  isOn: boolean;
  onPress: any;
  key:any
}
const CustomRadioButton: any = ({
  radioText,
  radioDescription,
  isOn,
  onPress,
  key
}: CustomRadioButton) => {

  const [clicked, setclicked] = useState(false)

  return (
    <View style={styles.radioConatiner}>
      <TouchableOpacity
        activeOpacity={3}
        style={styles.radioBorder}
        onPress={onPress}>
        {isOn && <View style={styles.radioFilled} />}
      </TouchableOpacity>
        <View style={{marginLeft: 10}}>
        <Text style={styles.text}>{radioText}</Text>
        {radioDescription && <Text style={styles.description}>{radioDescription}</Text>}

      </View>

      
    </View>
  );
};

export default CustomRadioButton;
