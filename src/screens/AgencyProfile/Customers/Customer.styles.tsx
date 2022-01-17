import {StyleSheet} from 'react-native';

import config from '../../../config/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  upload_btn: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: config.GREY,
    marginTop: 15,
  },
  listStyle: {
    borderBottomColor: config.LIGHT_GREY,
    borderBottomWidth: 1,
  },
  icon2Container: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: config.LIGHT_GREY,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
    marginRight: 8,
  },
  icon1Container: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: config.SKY_BLUE,
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 8,

    alignItems: 'center',
  },
  button: {
    padding: 8,
    color: config.WHITE,
  },
  input: {
    backgroundColor: config.LIGHT_GREY,
  },
});
