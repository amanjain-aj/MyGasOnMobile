import { StyleSheet } from "react-native";
import config from '../../../config/colors'

export default StyleSheet.create({
    contractWrapper: {
        backgroundColor: config.LIGHT_GREY,
        padding: 10,
       borderRadius: 8,
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
        marginTop:8
      },
      value: {
        fontSize: 15,
        fontWeight: '700',
        color: config.NAVY_BLUE,
        lineHeight: 20,
        letterSpacing: 0.25,
      },
      buttonCredit: {
        width: 88,
        color: config.WHITE,
        textAlign: 'center',
        height: 24,
        marginTop: 5,
        backgroundColor: '#EB3323',
        borderRadius: 40,
        padding: 3,
      },
})