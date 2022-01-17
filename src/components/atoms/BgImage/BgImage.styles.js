import { Dimensions, StyleSheet } from 'react-native';

import config from './../../../config/colors';

export default StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    overflow: 'hidden',
  },
  imageGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  image: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    opacity: 0.8,
    position: 'absolute',
    zIndex: 1,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
    backgroundColor: 'black',
    // width: width
  },
  // overlay: {
  //   position: 'fixed',
  //   top: 0,
  //   right: 0,
  //   bottom: 0,
  //   left: 0,
  //   background-color: 'rgba(0, 0, 0, 0.65)',
  //   z-index: 2,
  // }
});
