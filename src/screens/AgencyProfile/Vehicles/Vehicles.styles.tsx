import {StyleSheet} from 'react-native';

import config from '../../../config/colors';


export default StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        
    },
    listStyle: {
        borderBottomColor: config.LIGHT_GREY,
        borderBottomWidth: 1 
    },
    textStyle1: {
        color: config.SKY_BLUE, 
        fontWeight: 'bold', 
        fontSize: 14
    },
    textStyle2: {
        color: '#FF8000', 
        fontWeight: 'bold', 
        fontSize: 14
    },
    icon1Container: {
        width: 32,
        height: 32,
        borderRadius: 50,
        backgroundColor: config.LIGHT_GREY,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        marginLeft:-10

    },
    icon2Container: {
        width: 32,
        height: 32,
        borderRadius: 50,
        backgroundColor: config.LIGHT_GREY,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:8

    },
    button: {
        padding: 8,
        color: config.WHITE,
      },
});