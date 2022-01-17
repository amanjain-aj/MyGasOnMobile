import {StyleSheet} from 'react-native';

import config from '../../../../config/colors';

export default StyleSheet.create({
  dialog: {
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    bottom: 0,
    marginBottom: 0,
  },
  dialogContent: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  innnerConatiner: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderColor: config.FADED_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  buttonText: {
    color: config.FADED_BLUE,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
