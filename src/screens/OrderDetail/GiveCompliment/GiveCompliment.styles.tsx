import {StyleSheet} from 'react-native';
import config from '../../../config/colors';

export default StyleSheet.create({
  conatiner: {
    width: '100%',
    height: '100%',
  },
  button: {
    padding: 12,
    borderColor: config.FADED_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    marginTop: 15,
  },
  buttonGrey: {
    padding: 12,
    borderColor: config.GREY,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    marginTop: 15,
    },
   
});
