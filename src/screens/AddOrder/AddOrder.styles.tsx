import { StyleSheet } from "react-native";
import config from '../../config/colors'

export default StyleSheet.create({
    container: {
        width: '100%',
        height:'100%'
    },
    tabContaner: {
        width: '100%',
        flexDirection:'row',
        height: 35,
        borderRadius: 34,
        justifyContent:'space-between',
        backgroundColor: '#DADADA',
        alignSelf: 'center',
        marginBottom: 30,
        

    },
    tabItemActive: {
        width:'50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: config.SKY_BLUE,
        borderRadius: 34,
        
        
    },
    tabItemInActive: {
        width:'50%',
        justifyContent: 'center',
        alignItems:'center'
    },
    tabText: {
        color: config.WHITE,
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: '700',
        textAlign:'center'
    },
    button: {
        padding: 8,
        color: config.WHITE,
      },

})