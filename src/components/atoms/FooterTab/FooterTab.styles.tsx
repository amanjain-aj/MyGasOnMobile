import { StyleSheet } from "react-native";
import config from '../../../config/colors'

export default StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        marginRight: 0,
        marginLeft:0,
        position: 'absolute',
        bottom: 0,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    tabView: {
        backgroundColor: config.NAVY_BLUE,
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width:'82%'
        
    },
    iconView: {
        width: 55,
        height:'100%',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
       
       backgroundColor:config.NAVY_BLUE
    
    },
    iconViewSelect: {
        width: 55,
        height:'100%',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
      
        backgroundColor:config.FADED_BLUE
    
    },
    addButton: {
        height: '100%',
        width:'18%',
        marginRight: 0,
        right: 0,
        position:'absolute'
    },
    noTabView:{
        height: '100%',
        width:'18%',
        marginRight: 0,
        right: 0,
        backgroundColor:config.NAVY_BLUE,
        position:'absolute'
    }

})