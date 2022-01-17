import { StyleSheet } from 'react-native';

import config from '../../../config/colors';

export default StyleSheet.create({
  input: {
    backgroundColor: config.WHITE,
    fontSize: 16,
    borderStyle: undefined,  
  },
  hintText: {
    marginLeft: 16,
    marginTop: -8,
    marginBottom: 16,
    fontSize: 14,
  },
  error: {
    color: config.RED,
    marginTop:7
  },
  success: {
    color: config.GREEN,
  },
});
