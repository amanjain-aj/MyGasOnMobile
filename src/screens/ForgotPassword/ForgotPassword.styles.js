import { StyleSheet } from 'react-native';

import config from './../../config/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  descContainer: {
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  descHighlight: {
    color: config.SKY_BLUE,
    fontWeight: 'bold',
  },
  timer: {
    color: config.BODY_FONT,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: config.SKY_BLUE,
    borderRadius: 24,
    marginLeft: 10,
    padding: 5,
    height: 24,
    width: 30,
  },
  timerError: {
    color: config.RED,
    borderColor: config.RED,
  },
  otpContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    maxWidth: '95%',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 16,
    position: 'relative',
  },
  otpInput: {
    position: 'absolute',
    top: -8,
    left: 0,
    width: '100%',
    marginBottom: 0,
    opacity: 0,
    zIndex: 2,
  },
  otpBox: {
    width: 40,
    height: 40,
    lineHeight: 40,
    borderRadius: 3,
    borderStyle: 'solid',
    borderColor: config.SKY_BLUE,
    borderWidth: 2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  otpError: {
    borderColor: config.RED,
  },
  otpSuccess: {
    borderColor: config.GREEN,
    color: config.GREEN,
  },
  ctaMessage: {
    color: config.RED,
    marginTop: -8,
    marginBottom: 16,
    fontSize: 14,
  },
  error: {
    color: config.RED,
  },
  success: {
    color: config.GREEN,
  },
  button: {
    marginBottom: 16,
  },
  btnLabel: {
    padding: 6,
    color: config.WHITE,
  },
  btnLabelOutlined: {
    padding: 6,
    color: config.SKY_BLUE,
  },
  btnLabelOutlined1: {
    padding: 6,
    color: config.WHITE,
  },
  footer: {
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 24,
  },
  footerLink: {
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
  },
});
