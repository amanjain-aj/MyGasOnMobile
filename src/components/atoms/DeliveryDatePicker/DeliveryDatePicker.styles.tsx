import {StyleSheet} from 'react-native';

import config from '../../../config/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  selectedBg: {
    borderRadius: 50,
    backgroundColor: '#293F66',
    minWidth: 88,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 13,
  },
  unselectBg: {
    borderRadius: 50,
    backgroundColor: config.LIGHT_GREY,
    minWidth: 88,
    height: 40,
    marginBottom: 10,
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSelected: {
    fontSize: 15,
    fontWeight: '700',
    color: config.WHITE,
  },
  textunSelected: {
    fontSize: 15,
    fontWeight: '700',
    color: config.GREY,
  },
});
