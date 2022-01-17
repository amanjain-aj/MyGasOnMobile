import { StyleSheet } from 'react-native';

import config from './../../../config/colors';

const dropdownStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: config.WHITE,
    fontSize: 16,
    lineHeight: 24,
    borderBottomWidth: 1,
    borderBottomColor: config.BODY_FONT,
    color: config.GREY,
    paddingRight: 48, // to ensure the text is never behind the icon
    paddingBottom: 20,
    paddingLeft: 14,
    marginBottom: 16,
  },
  inputAndroid: {
    backgroundColor: 'transparent',
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: config.GREY,
    color: config.GREY,
    paddingRight: 48, // to ensure the text is never behind the icon
    paddingBottom: 16,
    paddingLeft: 12,
    marginBottom: 20,
    width: '100%',
   
  },
  inputAndroidContainer: {
    borderBottomWidth: 2,
    borderColor: config.SKY_BLUE,
  },
  item: {
    backgroundColor: config.WHITE ,
    color: config.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: config.BODY_FONT,
  }
});

export default dropdownStyles;
