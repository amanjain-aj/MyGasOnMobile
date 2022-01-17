import {StyleSheet} from 'react-native';

import config from '../../config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    padding: 16
  
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: config.WHITE,
    borderRadius: 8,
    padding: 24,
    paddingBottom: 70,
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
    // color: config.SKY_BLUE,
    color: config.NAVY_BLUE,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: config.GREY,
    textAlign: 'center',
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
  agencyLogo: {
    alignItems: 'center',
  },
  editIcon: {
    position: 'absolute',
    right: 0,
  },
  help_center_underline:{
    width: '100%',
    height: 1,
    backgroundColor: config.LIGHT_GREY,
    borderRadius: 4,
    marginTop: -40,
    marginBottom: 16,
    alignItems: 'center',
  },
  help_center_titleUnderline: {
    width: 96,
    height: 4,
    backgroundColor: config.NAVY_BLUE,
    borderRadius: 4,
    marginTop: -2,
  },
});
