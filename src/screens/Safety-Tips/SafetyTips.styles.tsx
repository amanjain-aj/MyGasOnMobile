import {StyleSheet} from 'react-native';

import config from '../../config/colors';

export default StyleSheet.create({
  container: {
    flex:1,
  },
  cardBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  
  },
  cardContent: {
    width: '45%',
    height: 80,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent:'center',
    alignItems:'center',
    elevation: 5,
    backgroundColor: config.LIGHT_GREY,
    
  },
  cardTitle: {
    fontSize: 14,
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  iconBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 24,
    color: config.GREY,
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: config.GREY,
    textAlign: 'center',
  },
});