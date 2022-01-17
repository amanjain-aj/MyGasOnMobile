import { StyleSheet } from 'react-native';

import config from '../../config/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    height:'100%',
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  innerContainer: {
    height: '100%',
    backgroundColor: config.WHITE,
    borderRadius:8,
    padding: 24,
    paddingBottom: 0,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlePreFix: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold',
    color: config.NAVY_BLUE,
  },
  titlePostFix: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold',
    color: config.SKY_BLUE,
  },
  titleUnderLineWrapper: {
    width: '100%',
    height: 1,
    backgroundColor: config.LIGHT_GREY,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  titleUnderline: {
    width: 96,
    height: 4,
    backgroundColor: config.NAVY_BLUE,
    borderRadius: 4,
    marginTop: -2,
  },
  underLine: {
    width: '100%',
    marginTop: 0,
  },
});
