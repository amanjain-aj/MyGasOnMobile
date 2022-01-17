import {StyleSheet} from 'react-native';
import config from '../../config/colors';
export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  listStyle: {
    borderBottomColor: config.LIGHT_GREY,
    borderBottomWidth: 1,
  },
  button: {
    padding: 6,
    color: config.WHITE,
    textAlign: 'center',
  },
  deleteButton: {
    padding: 6,
    color: config.WHITE,
    
    textAlign: 'center',
  },
});
