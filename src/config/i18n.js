import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";

import en from "../constants/constants";
import hi from "../constants/hi";
import bn from '../constants/bn';
import gu from '../constants/gu';
import kn from '../constants/kn';
import ml from '../constants/ml';
import mr from '../constants/mr';
import ta from '../constants/ta';
import te from '../constants/te';


const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
  
}

I18n.fallbacks = true;
I18n.translations = {
  en,
  hi,
  bn,
  gu,
  kn,
  ml,
  mr,
  ta,
  te
};


export default I18n;
