import React, {useEffect, useState, useRef} from 'react';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './LocationModal.styles';
import config from '../../../../config/colors';
import {View,PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from '../../../../api/geocoder';

const LocationModal: any = ({
  showDialog,
  setShowDialog,
  submit,
  onLocationSelected,
}) => {
  const hideDialog = () => {
    setShowDialog(false);
  };

  const [addressLoc, setaddressLoc] = useState('Selected Location');

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [cordinates, setCordinates] = useState({});

  const getAddressText = (lat, lng) => {
    Geocoder.from(lat, lng)
      .then(res => {
        console.log(res.results[0].formatted_address);
        setaddressLoc(res.results[0].formatted_address);
        markerRef.current.showCallout();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);
  const getCurrentLocation = async() => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          setCordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          getAddressText(position.coords.latitude, position.coords.longitude);
  
          mapRef.current !== null
            ? mapRef.current.animateCamera({
                center: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
                heading: 5,
                pitch: 10,
              })
            : '';
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
     }else {
      console.log('location permission denied');
      alert('Location permission denied');
    }
    
  };

  return (
   
      <Portal>
        <Dialog
          style={[styles.dialog]}
          visible={showDialog}
          onDismiss={hideDialog}>
          <Dialog.Content style={styles.dialogContent}>
            <MapView
              style={styles.map}
              ref={mapRef}
              onPress={e => {
                var mapData = e.nativeEvent.coordinate;
                setCordinates({
                  latitude: mapData.latitude,
                  longitude: mapData.longitude,
                });
                getAddressText(mapData.latitude, mapData.longitude);

                mapRef.current.animateCamera({
                  center: {
                    latitude: cordinates.latitude,
                    longitude: cordinates.longitude,
                  },

                  heading: 0,
                  pitch: 0,
                  altitude: 5,
                });
              }}
              initialRegion={{
                latitude: cordinates && cordinates.latitude,
                longitude: cordinates && cordinates.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}>
              <Marker
                coordinate={cordinates}
                title="Your Location"
                ref={markerRef}
                description={addressLoc}></Marker>
            </MapView>
            <GooglePlacesAutocomplete
              placeholder="Search"
              styles={{
                container: {
                  marginTop: 50,
                  width: '90%',
                  alignSelf: 'center',
                },
                row: {
                  backgroundColor: '#FFFFFF',
                  padding: 12,
                  height: 38,
                  flexDirection: 'row',
                },
                textInput: {
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16,
                  borderWidth: 0.5,
                  borderColor: '#ddd',
                  borderRadius: 8,
                  elevation: 3,
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
                poweredContainer: {
                  display: 'none',
                },
              }}
              GooglePlacesDetailsQuery={{fields: 'geometry'}}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(details.description);
                Geocoder.from(details.description)
                  .then(json => {
                    var location = json.results[0].geometry.location;
                    setCordinates({
                      latitude: location.lat,
                      longitude: location.lng,
                    });
                    getAddressText(location.lat, location.lng);

                    mapRef.current.animateCamera({
                      center: {
                        latitude: location.lat,
                        longitude: location.lng,
                      },

                      heading: 0,
                      pitch: 0,
                      altitude: 5,
                    });
                  })
                  .catch(error => console.warn(error));
              }}
              query={{
                key: 'AIzaSyBnGFNu35L3rNfbFb7INcc-3t4gNfRlWMU',
                language: 'en',
              }}
            />
          </Dialog.Content>
          <Dialog.Actions style={styles.actions}>
            <View style={styles.iconWrap}>
              <Icon
                name={'gps-fixed'}
                color={config.WHITE}
                size={18}
                onPress={() => {
                  getCurrentLocation();
                }}
              />
            </View>
            <Button
              labelStyle={styles.button}
              mode="contained"
              onPress={() => onLocationSelected(cordinates)}>
              {submit}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
   
  );
};

export default LocationModal;
