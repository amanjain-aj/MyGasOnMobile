import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { onChange } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import {Picker} from '@react-native-picker/picker';


import config from './../../../config/colors';

import styles from './Dropdown.styles';

const Dropdown = ({ options, placeholder, hasDisabled ,selectedValue,onChange}) => {
  // const [value, setValue] = useState('');
  
  console.log(placeholder);
  // const listItems = options.map((item) => (
  //   <Picker.Item label={String(item)} value={item} key={item} />
  // ));

  return (
 


    <RNPickerSelect
      placeholder={{label: placeholder, color: config.BODY_FONT,key: placeholder}}
      items={options}
      value={selectedValue}
      onValueChange={onChange}
      style={{
        inputAndroid: styles.inputAndroid,
        iconContainer: {
          top: 5,
          right: 15,
        },
      }}
    
     
      useNativeAndroidPickerStyle={false}
      Icon={() => (
        <Icon
          style={{position: 'absolute', right: 0, top: 10}}
          name={'arrow-drop-down'}
          color={config.GREY}
          size={25}
        />
      )}
      disabled={hasDisabled}
    
    />
    // <Picker
    //     mode= 'dialog'
    //     selectedValue={value}
    //     style={styles.inputAndroid}
    //     itemStyle={styles.item}
    //     dropdownIconColor ={config.LIGHT_GREY}
    //     onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
    // >
    //   <Picker.Item label={placeholder}></Picker.Item>
    //     {listItems}
    // </Picker>

  );
};

export default Dropdown;
