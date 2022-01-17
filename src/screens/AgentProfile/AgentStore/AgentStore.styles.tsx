import {StyleSheet} from 'react-native';

import config from '../../../config/colors';

export default StyleSheet.create({
  contanier: {
    width: '100%',
    height: '100%',
  },
  buttonLocation: {
    padding: 8,
    color: config.SKY_BLUE,
  },
  button: {
    padding: 8,
    color: config.WHITE,
    textAlign: 'center',
  },
  listStyle: {
    borderBottomColor: config.LIGHT_GREY,
    borderBottomWidth: 1,
  },
  icon2Container: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: config.GREY,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
   
  },
  icon2Container1: {
    width: 32,
    height: 32,
    borderRadius: 50,
    marginRight: 5,
    backgroundColor: config.GREY,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
    marginLeft:-10
  },
});
