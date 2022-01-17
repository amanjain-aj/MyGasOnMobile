import { StyleSheet } from 'react-native';
import config from './../config/colors';

const styles = StyleSheet.create({
  textAlignCenter: {
    textAlign: 'center',
  },
  formTitle: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 16,
    letterSpacing: 0.1
  },
  errInput_txt: {
    fontSize: 12,
    color: config.RED,
    marginTop: -12,
    lineHeight:16,
    letterSpacing:0.4
  },
});

export default styles;
