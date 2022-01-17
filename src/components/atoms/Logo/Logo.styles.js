import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  empty: {},
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  halfScreen: {
    height: 256,
  },
  quarterScreen: {
    height: 168,
  },
  fullScreenImage: {
    width: 240,
    height: 240,
    position: 'relative',
   
  },
  halfScreenImage: {
    width: 160,
    height: 160,
  },
  quarterScreenImage: {
    width: 120,
    height: 120,
  },
  imageBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageLG: {
    position: 'absolute',
    width: 167,
    height: 162,
    top: 38,
    left: 36,
  },
  imageMD: {
    position: 'absolute',
    width: 112,
    height: 95,
    top: 30,
    left: 24,
  },
  imageSM: {
    position: 'absolute',
    width: 84,
    height: 72,
    top: 20,
    left: 17,
  },
});
