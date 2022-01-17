import {StyleSheet} from 'react-native';
import config from '../../../config/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  profileContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '95%',
    color: config.GREY,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 20,
  },
  buttonLocation: {
    padding: 8,
    color: config.SKY_BLUE,
  },
  button: {
    padding: 8,
    color: config.WHITE,
  },
  dashedBUtton: {
    borderWidth: 1,
    height: 40,
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
    borderStyle: 'dashed',
    borderRadius: 1,
      borderColor: config.GREY,
      justifyContent: 'center',
    alignItems:'center',
    padding: 6,
  },
  buttonText: {
    color: config.GREY,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700',
  },
});
