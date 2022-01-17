import { StyleSheet } from 'react-native';

import config from './../../config/colors';

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
      
      },
      wrapper: {
        display: 'flex',
        height: '100%'
        
      },
      descContainer: {
        marginBottom: 16,
      },
      description: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
      },
      descHighlight: {
        color: config.SKY_BLUE,
        fontWeight: 'bold',
      },
      button: {
        marginBottom: 16,
      },
      btnLabel: {
        padding: 6,
        color: config.WHITE,
      },
});