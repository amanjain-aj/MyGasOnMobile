import {StyleSheet} from 'react-native';

import config from '../../config/colors';

export default StyleSheet.create({
  container: {
    flex:1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
      justifyContent: 'center',
    backgroundColor:'#F5FCFF88'
  },
  cardBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardContent: {
    width: '45%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 5,
    backgroundColor: config.LIGHT_GREY,
  },
  cardContent1:{
    width: '45%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: config.SKY_BLUE,
    color: config.WHITE
},
  cardContentActive: {
    width: '45%',
    backgroundColor:config.FADED_BLUE,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  cardTitle: {
    fontSize: 14,
    letterSpacing: 0.4,
    lineHeight: 16,
    color:config.BLACK
  },
  cardTitle1: {
    fontSize: 14,
    letterSpacing: 0.4,
    lineHeight: 16,
    color: config.WHITE
},
  iconBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  text: {
    fontSize: 24,
    color: config.GREY,
    marginLeft: 5,
  },
  text1: {
    fontSize: 24,
    color: config.WHITE,
    marginLeft: 5
},
  action: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  suggestionBox: {},
  suggestionTitle: {
    fontSize: 14,
    lineHeight: 36,
    letterSpacing: 0.1,
    fontWeight: '600',
  },
  button: {
    padding: 8,
    color: config.WHITE,
  },
  buttonLocation: {
    padding: 8,
    color: config.SKY_BLUE,
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 15,
  },
  sliderText: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: config.SKY_BLUE,
    paddingRight: 48, // to ensure the text is never behind the icon
  },
  sliderIcon: {
    width: 40,
    height: 40,
    backgroundColor: config.SKY_BLUE,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
