import {StyleSheet} from 'react-native';
import config from '../../config/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  tripCard: {
    width: '90%',
    marginTop: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    height: 55,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#233861',
    letterSpacing: 0.2,
    marginLeft: 10,
  },
  nextButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 296,
    marginStart: 30,
    height: 45,
    backgroundColor: config.SKY_BLUE,
    position: 'absolute',
    display: 'flex',
    right: -53,
    borderRadius: 3,
    
  },
  previousButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 296,
    marginStart: 30,
    height: 45,
    backgroundColor: config.SKY_BLUE,
    position: 'absolute',
    display: 'flex',
    left: -80,
    bottom: 10,
    borderRadius: 3,
  },
  nextButtonText: {
    color: config.WHITE,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 1,
    display: 'none'
  },
  nextButtonText1: {
    color: config.WHITE,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 1,
  
  },
  previousButtonText: {
    color: config.WHITE,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 1,
    display: 'none'
  },
  dashedBUtton: {
    borderWidth: 1,
    height: 40,
    width: '95%',
    marginBottom: 30,
    alignSelf: 'center',
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: config.GREY,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  buttonText: {
    color: config.GREY,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700',
    textTransform:'uppercase'
  },
  listStyle: {
    borderBottomColor: config.LIGHT_GREY,
    borderBottomWidth: 1 
},
icon1Container: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: config.LIGHT_GREY,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8

},
icon2Container: {
    width: 32,
    height: 32,
  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

  },
  listTitle: {
    fontSize: 13,
    
  },
  listDesriptoin: {
    fontSize: 15,
    color: config.NAVY_BLUE,
    fontWeight:'700'
  },
  button: {
    padding: 8,
    color: config.WHITE,
  },
});
