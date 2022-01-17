import {StyleSheet} from 'react-native';
import config from '../../../config/colors';

export default StyleSheet.create({
  contractWrapper: {
    backgroundColor: config.LIGHT_GREY,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    paddingTop: 15,
    elevation: 5,
  },
  label: {
    fontSize: 12,
    color: config.GREY,
  },
  numberBlue: {
    fontSize: 14,
    fontWeight: '700',
    color: config.SKY_BLUE,
    lineHeight: 20,
    textDecorationLine:'underline',
    letterSpacing: 0.25,
    
  },
  numberOrange: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF8000',
    lineHeight: 20,
    textDecorationLine:'underline',
    letterSpacing: 0.25,
    
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
    color: '#233861',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  rowWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    elevation: 5
  },

  buttonAccept: {
    width: 88,
    height: 24,
    color: config.WHITE,
    marginTop: 15,
    textAlign: 'center',
    backgroundColor: '#3178EA',
    borderRadius: 40,
    padding: 3,
  },
  buttonCredit: {
    width: 88,
    color: config.WHITE,
    textAlign: 'center',
    height: 24,
    marginTop: 15,
    backgroundColor: '#EB3323',
    borderRadius: 40,
    padding: 3,
  },
  buttonInstant: {
    width: 88,
    color: config.WHITE,
    textAlign: 'center',
    height: 24,
    marginTop: 15,
    backgroundColor: config.SKY_BLUE,
    borderRadius: 40,
    padding: 3,
  },
  buttonInitiated: {
    width: 88,
    color: config.WHITE,
    textAlign: 'center',
    height: 24,
    marginTop: 15,
    backgroundColor: '#EE6F2D',
    borderRadius: 40,
    padding: 3,
  },
  buttonPaid: {
    width: 88,
    color: config.WHITE,
    textAlign: 'center',
    height: 24,
    marginTop: 15,
    backgroundColor: '#33CC33',
    borderRadius: 40,
    padding: 3,
  },
});
