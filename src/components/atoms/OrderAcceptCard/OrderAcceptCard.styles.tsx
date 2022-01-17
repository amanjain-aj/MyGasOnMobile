import {StyleSheet} from 'react-native';
import config from '../../../config/colors';

export default StyleSheet.create({
  contractWrapper: {
    backgroundColor: config.LIGHT_GREY,

    borderRadius: 8,
    paddingTop: 15,
  },
  rowWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: config.GREY,
    marginLeft: 10,
    marginRight: 10,
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
    color: config.NAVY_BLUE,
    lineHeight: 20,
    letterSpacing: 0.25,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 0,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 20,

    backgroundColor: config.SKY_BLUE,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonLabel: {
    padding: 6,
    fontSize: 18,
    color: config.WHITE,
    textAlign: 'center',
  },
  iconPhone: {
    width: 32,
    height: 32,
    backgroundColor: config.NAVY_BLUE,
    borderRadius: 50,
    textAlign: 'center',
    padding: 5,
  },
});
