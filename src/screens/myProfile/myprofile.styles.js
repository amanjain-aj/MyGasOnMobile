import { StyleSheet } from 'react-native';
import config from '../../config/colors';

const styles = StyleSheet.create({
  modal_heading: {
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 20,
    padding: 15,
    lineHeight: 28,
    color: config.BLACK,
    marginLeft: -100,
  },
  btn_Sign_Modal_2: {
    color: config.WHITE,
    width: '100%',
    padding: 5,
    letterSpacing: 0.15,
    borderRadius: 3,
  },
  modal_Sign_space: {
    marginTop: 11,
  },
  btn_modal_Sign_space: {
    marginTop: 20,
  },
  modal_Sign_heading: {
    fontWeight: 'bold',
    fontSize: 23,
    marginTop: 8,
    color: config.BLACK,
    textAlign: 'center',
    lineHeight: 28,
    alignItems: 'center',
  },

  modal_Sign_txt: {
    textAlign: 'center',
    fontSize: 17,
    color: config.DARK_GREY,
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
    marginTop: 450,
    marginLeft: 15.5,
    marginRight: 15.5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    height: '50%',
    backgroundColor: config.WHITE,
    borderColor: config.BLACK,
    borderWidth: 0.5,
    padding: 24,
  },
  btn_SignUp_ND_Modal_2: {
    marginTop: 10,
    color: config.WHITE,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 19,
    width: '100%',
    letterSpacing: 0.75,
    padding: 5,
  },
  upload_picture_txt: {
    marginTop: 20,
    width: 163.77,
    height: 24,
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
    display: 'flex',
    letterSpacing: 0.44,
    alignItems: 'center',
    color: config.DARK_GREY,
  },
  upload_btn: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: config.GREY,
    marginTop: 15,
  },
  geo_location_btn: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: config.SKY_BLUE,
    marginTop: 15,
    width: 250,
    marginBottom: 20
  },
  container: {
    width: '100%',
    padding: 2,
    marginBottom: 40
  },
  innerContainer: {
    backgroundColor: config.LIGHT_GREY,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 24,
    paddingBottom: 0,
    paddingTop: 20,

  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: config.GREY,
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center'
  },
  buttonLocation: {
    padding: 8,
    color: config.SKY_BLUE,
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
});

export default styles;
