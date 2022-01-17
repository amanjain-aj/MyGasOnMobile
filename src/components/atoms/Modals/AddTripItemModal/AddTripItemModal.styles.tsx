import {StyleSheet} from 'react-native';

import config from '../../../../config/colors';

export default StyleSheet.create({
    dialog: {
        position: 'absolute',
        alignSelf: 'center',
        width:'90%',
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
        paddingBottom: 20,
    },
    button: {
        padding: 8,
        color: config.WHITE,
       
      },
    text: {
        fontWeight: '700',
        fontSize: 16,
        textTransform: 'uppercase',
        color: config.NAVY_BLUE,
        marginBottom: 20,
        marginTop:10
    }
})