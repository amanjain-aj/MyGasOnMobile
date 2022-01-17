import { StyleSheet } from 'react-native';

import config from '../../../config/colors';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        
      },
    dot: {
        position: 'absolute',
        width: 14,
        height: 14,
        left: 66,
        top: 124,
        borderRadius: 50,
        backgroundColor: config.RED
    }
});
