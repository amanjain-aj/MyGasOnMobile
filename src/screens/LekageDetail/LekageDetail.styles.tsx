import {StyleSheet} from 'react-native';
import config from '../../config/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  nextButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 296,
    marginStart: 30,
    height: 45,
    backgroundColor: config.SKY_BLUE,
    position: 'absolute',
    display: 'flex',
    right: -53,
    borderRadius: 3,
  },
  previousButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 296,
    marginStart: 30,
    height: 45,
    backgroundColor: config.SKY_BLUE,
    position: 'absolute',
    display: 'flex',
    left: -80,
    bottom: 10,
    borderRadius: 3,
  },
  nextButtonText: {
    color: config.WHITE,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 1,
  },
  button: {
    padding: 8,
    color: config.WHITE,
  },
  blueButton: {
    padding: 8,
    color: config.WHITE,
    backgroundColor: config.NAVY_BLUE,
  },
});
