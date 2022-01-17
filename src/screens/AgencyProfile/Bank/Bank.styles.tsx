import {StyleSheet} from 'react-native';

import config from '../../../config/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  listStyle: {
    borderBottomColor: config.LIGHT_GREY,
    borderBottomWidth: 1,
  },
  button: {
    padding: 6,
    color: config.WHITE,
    textAlign:'center'
  },
  icon1Container: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: config.LIGHT_GREY,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  icon2Container: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: config.SKY_BLUE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
  }
});
