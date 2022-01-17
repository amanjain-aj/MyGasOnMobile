import {StyleSheet} from 'react-native';
import config from '../../../config/colors';

export default StyleSheet.create({
  radioBorder: {
    height: 20,
    width: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: config.SKY_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioFilled: {
    width: 12,
    height: 12,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: config.SKY_BLUE,
  },
  radioConatiner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding:10,

  },
  text: {
    fontSize: 17,
    color: config.BLACK,
    fontWeight:'400'
  },
  description: {
    fontSize: 15,
    color: config.GREY,
    fontWeight:'400'
  }
});
