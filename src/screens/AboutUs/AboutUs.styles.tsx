import { StyleSheet } from 'react-native';

import config from '../../config/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        height:110
    },
    contractWrapper: {
        backgroundColor: config.LIGHT_GREY,
        padding: 10,
        borderRadius: 8
    },
    rowWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    rowBlueWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: config.SKY_BLUE,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    label: {
        fontSize: 12,
        color: config.GREY
    },
    value: {
        fontSize: 14,
        fontWeight: '700',
        color: config.NAVY_BLUE,
        lineHeight: 20,
        letterSpacing: 0.25
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 20,
        color: config.GREY,
        textAlign: 'center',
      },
});