import {StyleSheet} from 'react-native';
import config from '../../../config/colors';

export default StyleSheet.create({
  container: {
    display: 'flex',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor: config.LIGHT_GREY,
  },
  titlePreFix: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold',
      color: config.NAVY_BLUE,
    marginBottom:10
  },
  titlePostFix: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold',
    color: config.SKY_BLUE,
    },
    adressText: {
        textAlign: 'center',
        fontSize: 15,
        color: config.GREY,
        marginBottom:10
    },
    button: {
        marginTop:10,
        width: '115%',
        alignItems:'flex-start',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        
    },
    buttonLabel: {
        padding: 6,
        color: config.WHITE,
        textAlign:'center'

    }
});
