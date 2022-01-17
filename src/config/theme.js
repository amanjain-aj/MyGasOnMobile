import * as React from 'react';
import {DefaultTheme} from 'react-native-paper';
import config from './colors';
import fonts from './fonts';

export const theme = {
    ...DefaultTheme,
    dark: false,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: config.SKY_BLUE,
      accent: config.NAVY_BLUE,
      text: config.BODY_FONT,
      placeholder: config.GREY,
      background: config.WHITE,
      underlineColor: 'transparent'
    }
  };