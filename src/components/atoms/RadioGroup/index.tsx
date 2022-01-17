import React, {useState} from 'react';
import {View, Text} from 'react-native';
import CustomRadioButton from '../CustomRadioButton';

const RadioGroup: any = ({radioGroupList, onChange, initialValue}) => {
  const [select, setselect] = useState(initialValue);

  const radioSelect = (key, value) => {
    setselect(key);
    onChange(value);
  };

  return (
    <View>
      {radioGroupList.map( (item, index) => (
        <CustomRadioButton
          key={index}
          isOn={select === index}
          radioText={item.name}
          radioDescription={item.address}
          onPress={() => {
            radioSelect(index, item);
          }}
        />
      ))}
    </View>
  );
};

export default RadioGroup;
