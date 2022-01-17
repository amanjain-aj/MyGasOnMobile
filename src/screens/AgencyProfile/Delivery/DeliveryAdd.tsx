import React, {useEffect, useState} from 'react';
import {View, Platform, TouchableOpacity, Pressable} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../../components/atoms/Header';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import CONSTANTS from '../../../constants/constants';
import Input from '../../../components/atoms/Input';
import I18n from '../../../config/i18n';
import styles from './Delivery.styles';
import {Button} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import config from '../../../config/colors';
import constants from '../../../constants/constants';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CreateDeliverySlot,
  GetDeliverySLotById,
  UpdateDeliverySlot,
} from '../../../api/agencyApi';
import CustomAlert from '../../../components/atoms/Modals/CustomeAlert';

const deliveryValidationSchema = yup.object().shape({
  startTime: yup.string().required(),
  endTime: yup.string().required(),
});
const AddDeliverySlot: any = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [date1, setDate1] = useState('');
  const [dateDetails1, setDateDetails1] = useState(new Date());
  const [show1, setShow1] = useState(false);
  const [date2, setDate2] = useState('');
  const [dateDetails2, setDateDetails2] = useState(new Date());
  const [show2, setShow2] = useState(false);

  const [loding, setloading] = useState(false);
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
        console.log(route.params.deliverySlotId);
        GetDeliverySLotById(route.params.deliverySlotId, items[0][1])
          .then(res => {
            console.log(res.data);
            setDate1(res.data.startTime);
            setDate2(res.data.endTime);

            setloader(false);
          })
          .catch(err => {
            console.log(err);
            setloader(false);
          });
      });
    }
  }, []);

  const addDelivery = () => {

    

    deliveryValidationSchema
      .isValid({
        startTime: date1.toString(),
        endTime: date2.toString(),
      })
      .then(valid => {
        if (valid) {
          
          
          if (date1.toString() > date2.toString()) {
            setErrorText(I18n.t('errorMessage.error_delivery_add'));
            setPopUp(true);
            return
          }
          setloader(true);
          AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
            if (err) {
              return console.warn(err);
            }

            const body = {
              startTime: date1.toString(),
              endTime: date2.toString(),
              agency: {
                id: items[1][1],
              },
            };

            if (route.params.type === 'edit') {
              console.log(route.params.deliverySlotId);
              UpdateDeliverySlot(route.params.deliverySlotId, items[0][1], body)
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
              CreateDeliverySlot(items[0][1], body)
                .then(res => {
                  setloader(false);

                  console.log(res.data);
                  if (res.status === 201) {
                    navigation.goBack();
                  }
                })
                .catch(err => {
                  setErrorText(I18n.t('errorMessage.error_godown'));
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

  const onChange1 = (event, selectedDate) => {
    if (isNaN(selectedDate)) {
      // let date = date1
      // setDate1(date)
      setShow1(!show1)
      return;
    }

    console.log("Time",selectedDate)

  
    const unixTimeZero = new Date(selectedDate);

    console.log('selectedDate', unixTimeZero.getHours());
    console.log('selectedDate', unixTimeZero.getMinutes());
    setShow1(Platform.OS === 'ios');
    let minutes = unixTimeZero.getMinutes();
    let min = minutes.toString();
    if (minutes < 10) {
      min = '0' + minutes.toString();
    }

    setDate1(unixTimeZero.getHours() + ':' + min);
    setShow1(!show1)
  };



  const onChange2 = (event, selectedDate) => {
    // console.log("EVENT",event)
    if (isNaN(selectedDate)) {
      setShow2(!show2)
      console.log(selectedDate)

      return;
    }
    console.log(selectedDate)

    
    const unixTimeZero = new Date(selectedDate);

    console.log('selectedDate', unixTimeZero.getHours());
    setShow2(Platform.OS === 'ios');
    let minutes = unixTimeZero.getMinutes();
    let min = minutes.toString();
    if (minutes < 10) {
      min = '0' + minutes.toString();
    }

    setDate2(unixTimeZero.getHours() + ':' + min);
    setShow2(!show2)
    
  };

  const showTimepicker1 = () => {
    console.log('Cd');
    setShow1(!show1);
  };

  const showTimepicker2 = () => {
    setShow2(!show2);
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
        subtitle={I18n.t('delivery.delivery_add_slot')}
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        <Pressable
          onPress={()=>showTimepicker1()}
        >
        <Input
          secureTextEntry={false}
          label={I18n.t('delivery.delivery_start_time')}
          value={date1.toString()}
          onChange={() => {}}
          iconSize={20}
          iconName="access-time"
          placeholder=""
          disabled={false}
          error={false}
          mode="flat"
          editable={false}
          numberOnly=""
          maxLength={30}
          style={{}}
          dense=""
          isAvailable={true}
          success={false}
          hintText=""
          onFocus={()=>{}}
          keyboardType="numeric"
        />
          </Pressable>
          <Pressable
          onPress={()=>showTimepicker2()}
        >
        <Input
          secureTextEntry={false}
          label={I18n.t('delivery.delivery_end_time')}
          value={date2.toString()}
          onChange={() => {}}
          iconSize={20}
          iconName="access-time"
          placeholder=""
          disabled={false}
          error={false}
          mode="flat"
          numberOnly=""
          editable={false}
          maxLength={30}
          style={{}}
          dense=""
          isAvailable={true}
          success={false}
          hintText=""
          onFocus={showTimepicker2}
          keyboardType="numeric"
        />
        </Pressable>
        <View>
          {show1 && (
            <DateTimePicker
              placeholderText={I18n.t('delivery.delivery_start_time')}
              testID="dateTimePicker"
              value={new Date()}
              mode={'time'}
              is24Hour={true}
              display="spinner"
              onChange={onChange1}
              minuteInterval={15}
              
              
            />
          )}
        </View>
        <View>
          {show2 && (
            <DateTimePicker
              placeholderText={I18n.t('delivery.delivery_end_time')}
              testID="dateTimePicker"
              value={new Date()}
              mode={'time'}
              is24Hour={true}
              display="spinner"
              onChange={onChange2}
              minuteInterval={15}
              
            />
          )}
        </View>

        <Button
          labelStyle={styles.button}
          mode="contained"
          disabled={loader}
          onPress={() => {
            addDelivery();
          }}>
          {route.params.type === 'edit'
            ? I18n.t('delivery.update_time')
            : I18n.t('delivery.add_time')}
        </Button>
      </PostAuthWrapper>
    </View>
  );
};

export default AddDeliverySlot;
