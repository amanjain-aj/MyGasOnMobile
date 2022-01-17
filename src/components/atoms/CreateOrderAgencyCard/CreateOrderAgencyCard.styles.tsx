import {StyleSheet} from 'react-native';
import config from '../../../config/colors';

export default StyleSheet.create({

    contractWrapper: {
        backgroundColor: config.LIGHT_GREY,
        padding: 10,
        borderRadius:8
    },
    rowWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10},
    rowBlueWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: config.SKY_BLUE,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    discountWrapper: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    discountEditIcon: {
        backgroundColor: config.FADED_BLUE,
        padding: 10,
        justifyContent: 'center'
    },
    label: {
        fontSize: 12,
        color:  config.GREY
    },
    value: {
        fontSize: 14,
        fontWeight: '700',
        color: config.NAVY_BLUE,
        lineHeight: 20,
        letterSpacing: 0.25
    },
    iconContainer: {
        backgroundColor: config.NAVY_BLUE,
        width: 32,
        height: 32,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8
       
    },
    discount: {
        fontSize: 24,
        lineHeight: 24,
        letterSpacing: 0.25,
        color: config.WHITE,
        marginRight: 5
        
    },
    cardBorder: {
        borderColor: config.FADED_BLUE,
        borderWidth: 3,
        marginBottom: 20,
        borderRadius:8
    }

});