import { StyleSheet } from "react-native";
import config from '../../../config/colors'

export default StyleSheet.create({
    contractWrapper: {
        backgroundColor: config.LIGHT_GREY,
        padding:5,
        borderRadius: 8,
        paddingTop: 15,
      },
      rowWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      label: {
        fontSize: 12,
        color: config.GREY,
        marginLeft: 10,
        marginRight: 10,
      },
      value: {
        fontSize: 14,
        fontWeight: '700',
        color: config.NAVY_BLUE,
        lineHeight: 20,
        letterSpacing: 0.25,
        marginLeft: 10,
        marginRight: 10,
    },
    valueUnderLine: {
        fontSize: 14,
        fontWeight: '700',
        color: config.NAVY_BLUE,
        lineHeight: 20,
        letterSpacing: 0.25,
        marginLeft: 10,
        marginRight: 10,
        textDecorationLine:'underline'
      },
})