import { StyleSheet } from 'react-native';

import config from '../../config/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
    flex: 1,
    marginBottom:40
  },
  innerContainer: {
    height: '100%',
    backgroundColor: config.WHITE,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 24,
    paddingBottom: 20,
  },
  filterIcon: {
    position: 'absolute',
    right: 10,
    width: 40,
    top: 10,
    height: 40,
    borderRadius: 40/2,
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    borderWidth: 1,
    borderColor:'#ddd',
    shadowRadius: 24,  
    backgroundColor:config.WHITE,
    elevation:4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center' 
  }
});
