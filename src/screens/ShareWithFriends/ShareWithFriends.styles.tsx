import { StyleSheet } from 'react-native';

import config from '../../config/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    dialog: {
        position: 'absolute',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        bottom: 0,
        marginBottom: 0
    },
    innnerConatiner: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 10,
    },
   
    button: {
        padding: 6,
        width: '90%',
        color: config.WHITE,
        textAlign: 'center',
    },
});
