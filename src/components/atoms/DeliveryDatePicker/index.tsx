import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './DeliveryDatePicker.styles';

const DeliveryDatePicker: any = ({dateList, onChange, initialValue}) => {
  const [select, setselect] = useState(initialValue);

  const itemSelect = (key, value) => {
    setselect(key);
      onChange(value);
  };

  return (
    <View style={styles.container}>
      {dateList.length ? dateList.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={select === index ? styles.selectedBg : styles.unselectBg}
          onPress={() => {
            itemSelect(index, item);
          }}>
          <Text
            style={
              select === index ? styles.textSelected : styles.textunSelected
            }>
            {item.value}
          </Text>
        </TouchableOpacity>
      )): ''}
    </View>
  );
};

export default DeliveryDatePicker;
