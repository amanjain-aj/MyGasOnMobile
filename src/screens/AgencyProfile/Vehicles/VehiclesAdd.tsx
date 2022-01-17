import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Header from '../../../components/atoms/Header';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import CONSTANTS from '../../../constants/constants';
import Input from '../../../components/atoms/Input';
import styles from './Vehicles.styles';
import I18n from '../../../config/i18n';
import {Button} from 'react-native-paper';
import FooterTab from '../../../components/atoms/FooterTab';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CreateVehicle,
  GetVehicleById,
  UpdateVehicle,
} from '../../../api/agencyApi';
import Spinner from 'react-native-loading-spinner-overlay';
import config from '../../../config/colors';

import constants from '../../../constants/constants';
import CustomAlert from '../../../components/atoms/Modals/CustomeAlert';
import Dropdown from '../../../components/atoms/Dropdown';

const vehicleValidationSchema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().required(),
  capacity: yup.number().required(),
});

const status = [
  {label: 'Active', value: true, key: 1},
  {label: 'In-active', value: false, key: 2},
];

const VehicleInvite: any = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [name, setname] = useState('');
  const [number, setnumber] = useState('');
  const [capacity, setcapacity] = useState('');
  const [loading, setloading] = useState(false);
  const [vehicleStatus, setVehicleStatus] = useState(true);
  const [loader, setloader] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (route.params.type === 'edit') {
      setloader(true);
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
        if (err) {
          console.warn(err);
        }
        GetVehicleById(route.params.vehicleId, items[0][1])
          .then(res => {
            console.log(res.data);
            setname(res.data.name);
            setcapacity(res.data.capacity);
            setnumber(res.data.vehicleNumber);
            setVehicleStatus(res.data.active)
            setloader(false);
          })
          .catch(err => {
            console.log(err);
            setloader(false);
          });
      });
    }
  }, []);

  const addVehicle = () => {
    vehicleValidationSchema
      .isValid({
        name: name,
        number: number,
        capacity: capacity,
      })
      .then(valid => {
        if (valid) {
          setloader(true);
          AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
            if (err) {
              return console.warn(err);
            }
            const body = {
              name: name,
              vehicleNumber: number,
              agency: {
                id: items[1][1],
              },
              capacity: capacity,
              active:vehicleStatus
            };

            if (route.params.type === 'edit') {
              console.log(route.params.storeId);
              UpdateVehicle(route.params.vehicleId, items[0][1], body)
                .then(res => {
                  if (res.status === 200) {
                    navigation.goBack();
                    setloader(false);
                  }
                })
                .catch(err => {
                  setErrorText(I18n.t('errorMessage.update_vehicle'));
                  setPopUp(true);
                  setloader(false);
                  console.log(err);
                });
            } else {
              console.log(items[0][1], items[1][1]);
              console.log(body);
              CreateVehicle(items[0][1], body)
                .then(res => {
                  setloader(false);

                  console.log(res.data);
                  if (res.status === 201) {
                    navigation.goBack();
                  }
                })
                .catch(err => {
                  setErrorText(I18n.t('errorMessage.add_vehicle'));
                  setPopUp(true);
                  console.log(err);
                  setloader(false);
                });
            }
          });
        } else {
          setErrorText(I18n.t('errorMessage.error_fields'));
          setPopUp(true);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={loader}
        size="large"
        textContent={I18n.t('loadingText.loading')}
        textStyle={{
          color: config.WHITE,
          fontSize: 12,
          marginTop: 2,
        }}
      />

      <CustomAlert
        showDialog={popUp}
        setShowDialog={setPopUp}
        title={errorText}
      />
      <Header
        navigation={navigation}
        title={I18n.t('agencyProfileEdit.header')}
      />
      <PostAuthWrapper
        titlePreFix={route.params && route.params.firstname}
        titlePostFix={route.params && route.params.lastname}
        subtitle={I18n.t('vehicle.vehicle_invite_title')}
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        <Input
          secureTextEntry={false}
          label={I18n.t('vehicle.vehicle_input_name')}
          value={name}
          onChange={text => {
            setname(text);
          }}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('vehicle.vehicle_input_name_placeholder')}
          disabled={false}
          error={false}
          mode="flat"
          numberOnly=""
          maxLength={30}
          style={{}}
          dense=""
          isAvailable={false}
          success={false}
          hintText=""
          keyboardType="default"
          onFocus={() => {}}
        />
        <Input
          secureTextEntry={false}
          label={I18n.t('vehicle.vehicle_input_number')}
          value={number}
          onChange={text => {
            setnumber(text);
          }}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('vehicle.vehicle_input_number_placeholder')}
          disabled={false}
          error={false}
          mode="flat"
          numberOnly=""
          maxLength={30}
          style={{}}
          dense=""
          isAvailable={false}
          success={false}
          hintText=""
          keyboardType="default"
          onFocus={() => {}}
        />
        <Input
          secureTextEntry={false}
          label={I18n.t('vehicle.vehicle_input_capacity')}
          value={capacity.toString()}
          onChange={text => {
            
            setcapacity(text.replace(/[^0-9]/g, ''));
          }}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('vehicle.vehicle_input_capacity_placeholder')}
          disabled={false}
          error={false}
          mode="flat"
          numberOnly=""
          maxLength={30}
          style={{}}
          dense=""
          isAvailable={false}
          success={false}
          hintText=""
          keyboardType="numeric"
          onFocus={() => {}}
        />

        <Dropdown
          options={status}
          selectedValue={vehicleStatus}
          placeholder={I18n.t('godown.godown_input_type')}
          onChange={text => {
            setVehicleStatus(text);
          }}
        />
        <Button
          labelStyle={styles.button}
          mode="contained"
          onPress={() => {
            addVehicle();
          }}
          disabled={loader}>
          {route.params.type === 'edit'
            ? I18n.t('vehicle.vehicle_update')
            : I18n.t('vehicle.vehicle_invite')}
        </Button>
      </PostAuthWrapper>
      <FooterTab
        navigation={navigation}
        onAddRoute={'VehicleAdd'}
        isAdd={false}
        onPress={() => {
          console.warn('Customer');
        }}
      />
    </View>
  );
};

export default VehicleInvite;
