import {StyleSheet} from 'react-native';
import config from '../../../config/colors';

export default StyleSheet.create({
  rowWrapper: {
    display: 'flex',
    flexDirection: 'row',
    padding: 2,
    alignItems: 'center',
    marginBottom: 5
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
