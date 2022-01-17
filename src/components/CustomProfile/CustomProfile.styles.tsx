import { StyleSheet } from 'react-native';

import config from '../../config/colors';

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        
    },
    profileContainer: {
        display:'flex',
        width:'100%',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent:'center',
    },
    title: {
        width: '95%',
        color: config.GREY,
        fontSize: 14,
        textAlign:'center',
        fontWeight: '400',
        marginBottom:20
    },
    textStyle: {
        width: '95%',
        color: config.GREY,
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 10,
        marginTop: 10,
        paddingBottom: 10,
        paddingLeft:5,
        borderBottomColor: config.BORDER_GREY,
        borderBottomWidth:1
    }
});
