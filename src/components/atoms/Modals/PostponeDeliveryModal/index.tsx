import React from 'react';
import {View, Text, Image} from 'react-native';
import constants from '../../../../constants/constants';
import {Button, Dialog, Portal} from 'react-native-paper';
import styles from './PostponeDelivery.styles';
import DeliveryDatePicker from '../../DeliveryDatePicker';

const PostponeDelivery: any = ({showDialog, setShowDialog}) => {
  const dateList = ['01 Jun', '02 Jun', '03 Jun', '04 Jun', '05 Jun', '06 Jun'];
  const timeList = [
    '07:00-09:00 am',
    '09:00-12:00 pm',
    '03:00-04:00 pm',
    '06:00-08:00 pm',
  ];

  const hideDialog = () => {
    setShowDialog(false);
  };

  return (
    <Portal>
      <Dialog
        style={[styles.dialog]}
        visible={showDialog}
        onDismiss={hideDialog}>
        <Dialog.Content style={styles.dialogContent}>
          <View>
            <Image
              style={{
                width: 50,
                height: 50,
                marginTop: 20,
                alignSelf: 'center',
                marginBottom: 20,
              }}
              source={require('../../../../assets/icons/vector_tick.png')}
            />
            <Text style={styles.title}>
              {constants.postponeDelivery.postpone}
            </Text>

            <Text style={styles.subtitle}>
              {constants.postponeDelivery.postpone_description}
            </Text>

            <Text
              style={{
                fontSize: 18,
                marginStart: 15,
                color: '#182024',
                marginBottom: 10,
              }}>
              {constants.postponeDelivery.delivery_date}
            </Text>

            <DeliveryDatePicker
              dateList={dateList}
              onChange={value => {
                console.warn(value);
              }}
              initialValue={0}
            />
            <View style={{height: 20}} />

            <Text
              style={{
                fontSize: 18,
                marginStart: 15,
                color: '#182024',
                marginBottom: 10,
              }}>
              {constants.postponeDelivery.delivery_time}
            </Text>

            <DeliveryDatePicker
              dateList={timeList}
              onChange={value => {
                console.warn(value);
              }}
              initialValue={0}
            />

            <View style={{height: 30}} />
            <Button
              labelStyle={[styles.button]}
              mode="contained"
              onPress={() => {
                hideDialog;
              }}>
              {constants.ratingModal.close}
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default PostponeDelivery;
