import {StyleSheet} from 'react-native';
import config from '../../../config/colors';

export default StyleSheet.create({
  contractWrapper: {
    backgroundColor: config.LIGHT_GREY,
    padding: 10,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: config.DARK_GREY,
  },
  value: {
    fontSize: 14,
    color: config.GREY,
    lineHeight: 20,
    maxWidth: 260,
  },
});
