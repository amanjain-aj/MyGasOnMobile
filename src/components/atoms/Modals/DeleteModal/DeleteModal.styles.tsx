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
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 5,
  },
  button: {
    padding: 8,
    color: config.WHITE,
  },
});
