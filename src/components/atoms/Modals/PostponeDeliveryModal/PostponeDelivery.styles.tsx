import {StyleSheet} from 'react-native';

import config from '../../../../config/colors';

export default StyleSheet.create({
  dialog: {
    position: 'absolute',
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  button: {
    padding: 6,
    width: '90%',
    color: config.WHITE,
    textAlign: 'center',
  },
});
