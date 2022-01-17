import { StyleSheet } from 'react-native';
import config from '../../config/colors';

export default StyleSheet.create({
    drawerContent: {
     margin:0,
     padding:0
    },
    userInfoSection: {
      margin:0,
      padding: 20,
      backgroundColor: config.SKY_BLUE
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: config.WHITE,
      lineHeight: 28,
      letterSpacing: 0.15,
      fontFamily: 'Open Sans'
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      color: config.WHITE
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    
    drawerSection: {
      margin: 8,
      borderRadius: 4,
     
      
    },
    drawerItem: {
      display: 'flex',
      justifyContent: 'flex-start',
     
           
    },
    drawerItemLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: config.NAVY_BLUE,
      letterSpacing: 0.1,
      fontFamily: 'Open Sans',
      borderBottomColor: config.BLACK,
      
    }
  
  });