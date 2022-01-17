import { StyleSheet } from 'react-native';

import config from './../../config/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  linkContainer: {
    fontFamily: 'OpenSans',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34,
    marginBottom: 0,
  },
  rememberContainer: {
    fontFamily: 'OpenSans',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberText: {
    color: config.SKY_BLUE,
    fontSize: 16,
    marginLeft: 2,
  },
  baseText: {
    fontFamily: 'OpenSans'
  },
  innerText: {
  },


  forgetLink: {
    color: config.SKY_BLUE,
  },
  button: {
    color: config.WHITE,
    padding: 5,
    
    
  },
  footer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 25,
    marginBottom: 34,
  },
  footerLink: {
    fontWeight: 'bold',
    color: config.SKY_BLUE,
    
    marginTop: 0,
    padding:0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
  },
});
