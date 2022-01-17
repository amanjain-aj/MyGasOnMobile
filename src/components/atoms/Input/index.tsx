import * as React from 'react';
import {TextInput, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/FontAwesome';

import config from '../../../config/colors';

import styles from './Input.styles';

interface InputProps {
  secureTextEntry?: boolean;
  label: string;
  value: string;
  onChange: Function;
  iconSize?: number;
  iconName?: string;
  placeholder: string;
  disabled?: boolean;
  error?: boolean;
  mode: 'flat' | 'outlined';
  numberOnly: any;
  maxLength: any;
  editable?: boolean;
  style?: any;
  dense?: any;
  success?: boolean;
  hintText?: string;
  name?: string;
  isAvailable?: boolean;
  keyboardType?: any;
  onFocus?: Function;
  onBlur?: Function;
  onIconCLick?: any;
  multiline?: boolean;
  numberOfLines?: number
}

const Input = ({
  secureTextEntry = false,
  label,
  value,
  onChange,
  iconSize = 20,
  iconName,
  placeholder,
  disabled,
  error,
  mode = 'flat',
  numberOnly,
  maxLength = 40,
  style,
  dense,
  success,
  hintText,
  editable = true,
  name,
  isAvailable,
  keyboardType,
  onFocus,
  onBlur,
  onIconCLick,
  multiline = false,
  numberOfLines = 1


}: InputProps) => {
  const [text, setText] = React.useState(value);

  return (
    <>
      <TextInput
        mode={mode}
        dense={dense}
        error={error}
        secureTextEntry={secureTextEntry}
        style={[styles.input, style]}
        label={label}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        editable={editable}
        multiline={multiline}
        numberOfLines={1}
        
        keyboardType={keyboardType}
        onFocus={() => {
          onFocus && onFocus();
        }}
        onBlur={() => {
          onBlur;
        }}
        name={name}
        onChangeText={txt => {
          const t = numberOnly ? text.replace(/[^0-9]/g, '') : txt;
          setText(txt);
          onChange && onChange(txt);
         
        }}
        right={
          iconName && (
            <TextInput.Icon
              name={() =>
                isAvailable !== false ? (
                  <Icon
                    name={iconName}
                    color={error ? config.RED : config.GREY}
                    size={iconSize}
                    onPress={onIconCLick}
                  />
                ) : (
                  <IconCommunity
                    name={iconName}
                    color={error ? config.RED : config.GREY}
                    size={iconSize}
                    onPress={onIconCLick}
                  />
                )
              }
            />
          )
        }
        theme={
          success
            ? {
                colors: {
                  text: config.GREEN,
                  primary: config.GREEN,
                  disabled: config.GREEN,
                  placeholder: config.GREEN,
                },
              }
            : undefined
        }
      />
      <Text
        style={[
          hintText ? styles.hintText : null,
          error ? styles.error : null,
          success ? styles.success : null,
        ]}>
        {hintText}
      </Text>
    </>
  );
};

export default Input;
