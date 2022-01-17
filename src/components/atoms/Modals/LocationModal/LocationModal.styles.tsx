import {StyleSheet} from 'react-native';

import config from './../../../../config/colors';

export default StyleSheet.create({
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    width: '95%',
    padding: 6,
    color: config.WHITE,
  },
  dialog: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dialogContent: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
      paddingBottom: 0,
      height: 550,
    width:'100%'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  iconWrap: {
    position: 'absolute',
    bottom: 70,
    right: 10,
    backgroundColor: config.SKY_BLUE,
    width: 34,
    height: 34,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
