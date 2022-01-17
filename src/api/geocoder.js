import Geocoder from 'react-native-geocoding';
import urlConfig from './config.json';

Geocoder.init(urlConfig.google_api_key, {language: 'en'});


export default Geocoder;