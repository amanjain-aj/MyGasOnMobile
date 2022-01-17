import { StyleSheet } from 'react-native';
import config from '../../../config/colors';

const styles = StyleSheet.create({
  terms: {
    marginTop: -2,
    marginBottom: 20,
    marginLeft: 8,
    justifyContent: 'flex-start',
    display: 'flex',
    alignItems:'center',
    flexDirection:'row'
  },
  terms_modal: {
    marginTop: 80,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 100,
    borderRadius: 8,
    alignItems: 'center',
    height: '82.5%',
    backgroundColor: config.WHITE,
    borderColor: config.BLACK,
    borderWidth: 0.32,
    padding: 24,
  },
  terms_modal_Sign: {
    marginTop: 420,
    marginLeft: 15.5,
    marginRight: 15.5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
    height: '43%',
    backgroundColor: config.WHITE,
    borderColor: config.BLACK,
    borderWidth: 0.5,
    padding: 24,
  },
  termsConditions_checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  terms_agree: {
    marginLeft: 10,
    alignSelf: 'center',
    textAlign: 'center',
    color: config.SKY_BLUE,
  },
  modal_heading: {
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 20,
    padding: 15,
    lineHeight: 28,
    color: config.BLACK,
    marginLeft: -64,
  },
  btn_Sign_Modal: {
    fontSize: 20,
    lineHeight: 28,
    backgroundColor: config.GREEN,
  },
  btn_Sign_Modal_2: {
    color: config.WHITE,
    width: '100%',
    padding: 5,
    letterSpacing: 0.15,
    borderRadius: 3,
  },
  modal_Sign_space: {
    marginTop: 10,
  },
  btn_modal_Sign_space: {
    marginTop: 25,
  },
  modal_Sign_heading: {
    fontWeight: 'bold',
    fontSize: 21,
    marginTop: 10,
    color: config.GREEN,
    textAlign: 'center',
    lineHeight:28,
  },
  modal_Sign_txt: {
    textAlign: 'center',
    fontSize: 14,
    color: config.DARK_GREY,
    lineHeight:20,
    letterSpacing:0.25
  },
  modal_condition_txt: {
    textAlign: 'justify',
    marginLeft: 9,
    color: config.DARK_GREY,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  modal_background: {
    opacity: 0.6,
    backgroundColor: config.BLACK,
  },
  terms_modal_Sign_ND: {
    marginLeft: 15.5,
    marginRight: 15.5,
    borderRadius:8,
    alignItems: 'center',
    height: '55%',
    backgroundColor: config.WHITE,
    borderColor: config.BLACK,
    borderWidth: 0.5,
    padding: 24,
  },
  btn_SignUp_ND_Modal_2: {
    color: config.WHITE,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 19,
    width: '100%',
    letterSpacing: 0.75,
    padding: 5,
  },
  dialogContent: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  innnerConatiner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Iagree_txt: {
    color: config.SKY_BLUE,
    fontSize: 16,
    marginLeft: 2,
    
   
  },
  button: {
    padding: 8,
    color: config.WHITE,
  },
});

export default styles;
