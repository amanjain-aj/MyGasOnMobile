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
    icon1Container: {
        width: 32,
        height: 32,
        borderRadius: 50,
        backgroundColor: config.LIGHT_GREY,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8

    },
    icon2Container: {
        width: 32,
        height: 32,
        borderRadius: 50,
        backgroundColor: config.SKY_BLUE,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        padding: 8,
        color: config.WHITE,
    },
    filterWrapper:{
        width: 200,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginBottom: 20
    },
    filterContent:{
       backgroundColor: config.SKY_BLUE,
       borderRadius: 41,
       padding: 7,
       marginRight: 5
        
    },
    filterText:{
        color: config.WHITE,
        fontSize: 14,
        fontWeight: '400',
    },
    suggestionTitle: {
        fontSize: 14,
        lineHeight: 36,
        letterSpacing: 0.1,
        fontWeight: '600'
    },
    filterTitle: {
        fontSize: 14,
        lineHeight: 19.07,
        letterSpacing: 0.75,
        fontWeight: '700',
        textTransform: 'capitalize'
    },
    input: {
        backgroundColor: config.WHITE,
        fontSize: 16,
        lineHeight: 24,
        borderStyle: undefined,
        marginBottom: 16,
      },
      hintText: {
        marginLeft: 16,
        marginTop: -8,
        marginBottom: 16,
        fontSize: 14,
      },
   
});