import {StyleSheet,Dimensions} from 'react-native';
import config from '../../config/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  orderContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: config.WHITE,
    borderRadius: 8,
    padding: 24,
    paddingBottom: 70,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: config.NAVY_BLUE,
  },
  toggle: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: config.LIGHT_GREY,
    borderBottomWidth: 1.5,
  },
  toggleText: {
    fontSize: 17,
    color: '#182024',
  },
  button: {
    padding: 8,
    color: config.WHITE,
  },
  filterWrapper: {
    width: '85%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  filterContent: {
    backgroundColor: config.SKY_BLUE,
    borderRadius: 40,
    padding: 8,
    margin: 5,
  },
  filterText: {
    color: config.WHITE,
    fontSize: 14,
    fontWeight: '400',
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
  contractWrapper: {
    backgroundColor: config.LIGHT_GREY,
    padding: 10,
    borderRadius: 8,
  },
  rowWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: config.GREY,
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
    color: config.NAVY_BLUE,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  valueColor: {
    fontSize: 14,
    fontWeight: '700',
    color: config.SKY_BLUE,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  tabContaner: {
    width: '100%',
    flexDirection: 'row',
    height: 32,
    borderRadius: 34,
    justifyContent: 'space-between',
    backgroundColor: '#DADADA',
    alignSelf: 'center',
    marginBottom: 30,
  },
  tabItemActive: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.SKY_BLUE,
    borderRadius: 34,
  },
  tabItemInActive: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: config.WHITE,
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: '700',
    textAlign: 'center',
  },
  dashedBUtton: {
    borderWidth: 1,
    height: 40,
    width: '95%',
    marginTop: 5,
    marginBottom: 30,
    alignSelf: 'center',
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: config.GREY,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  buttonText: {
    color: config.GREY,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  nextButtonStyle: {
    justifyContent:'center',
     alignItems: 'center',
     width: '300%',
     height:45,
     backgroundColor: config.SKY_BLUE,
     position: 'relative',
     display:'flex',
     right: Dimensions.get('screen').width - 245,
     
     borderRadius:3  
  },
  previousButtonStyle: {
    justifyContent:'center',
     alignItems: 'center',
     width: 296,
     marginStart: 20,
     height:45,
     backgroundColor: config.SKY_BLUE,
     position: 'absolute',
     display:'flex',
     left: -60,
     bottom:10,
     borderRadius:3 ,
     
   },
   nextButtonText: {
     color: config.WHITE,
     textTransform: 'uppercase',
     fontWeight: '700',
     letterSpacing:1,
   },
   previousButtonText: {
    color: config.WHITE,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing:1,
    display:'none'
   },
   buttonPos :{
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%'
   },
   footerButton: {
     position: 'relative',
     top: -120
   },
   wrap:{
    width: '100%',
    height: '100%'
   }
});
