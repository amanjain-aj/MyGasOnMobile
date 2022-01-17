import { StyleSheet } from 'react-native'
import config from '../../config/colors'

export default StyleSheet.create({
    container: {
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
    wrapper: {
        padding: 20,
    },
    toolBox: {
        display: 'flex',
        flexDirection: 'row',
      
        marginBottom: 20,
    },
    toolContent:{
        width: '100%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        elevation: 5,
        backgroundColor: config.LIGHT_GREY,
    },
    toolContent1:{
      width: '100%',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: config.DARK_GREY,
      color: config.WHITE
  },
  toolContent2:{
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: config.NAVY_BLUE
},
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
       
      },
      cardContent: {
        width: '46%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        elevation: 5,
        backgroundColor: config.LIGHT_GREY,
      },
      cardTitle: {
        fontSize: 12,
        letterSpacing: 0.4,
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: 'Open Sans'
      },
      cardSubTitle: {
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: 20,
        fontWeight: '400',
        fontFamily: 'Open Sans'
      },
      cardSubTitle1: {
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: 20,
        fontWeight: '400',
        fontFamily: 'Open Sans',
        color: config.WHITE
        },
      action: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      iconBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
      },
      text: {
        fontSize: 24,
        color: config.GREY,
        marginLeft: 5,
      },
})