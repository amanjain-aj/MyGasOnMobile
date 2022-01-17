import {StyleSheet} from 'react-native';
import config from '../../config/colors';
export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  nextButton: {
    padding: 8,
    color: config.WHITE,
    width: '95%',
  },
  otp: {
    borderColor: config.SKY_BLUE,
    width: 55,
    height: 48,
    borderWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    color: config.GREY,
    fontSize: 18,
  },
  otpcontainerStyle: {
    padding: 10,
    marginBottom:15
  },
  dashedBUtton: {
    borderWidth: 1,
    height: 40,
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: '#182024',
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

  nextButtonStyle: {
    justifyContent:'center',
     alignItems: 'center',
     width: 296,
     marginStart: 30,
     height:45,
     backgroundColor: config.SKY_BLUE,
     position: 'absolute',
     display:'flex',
     right: -53,
     borderRadius:3  
  },
  previousButtonStyle: {
    justifyContent:'center',
     alignItems: 'center',
     width: 296,
     marginStart: 30,
     height:45,
     backgroundColor: config.SKY_BLUE,
     position: 'absolute',
     display:'flex',
    left: -80,
     bottom:10,
     borderRadius:3  
   },
   nextButtonText: {
     color: config.WHITE,
     textTransform: 'uppercase',
     fontWeight: '700',
     letterSpacing:1
   },
   dialog: {
    display: 'flex',
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
  },
  innnerConatiner: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  dialogTitle: {
    color: config.NAVY_BLUE,
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  buttonT: {
    padding: 6,
    width: '90%',
    color: config.WHITE,
    textAlign: 'center',
  },
});
