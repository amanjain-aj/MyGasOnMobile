import { StyleSheet } from 'react-native'
import config from '../../config/colors'

export default StyleSheet.create({
    contianer: {
        width: '100%',
        height:'100%',
        backgroundColor: config.WHITE
    },
    wrapper: {
        padding: 20,
        
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
        fontSize: 16,
        letterSpacing: 0.44,
        lineHeight: 24,
        fontWeight: '400',
        fontFamily: 'Open Sans'
      },
      cardSubTitle: {
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: 28,
        fontWeight: '400',
        fontFamily: 'Open Sans'
      },

})