import React from 'react';
import {View, Text} from 'react-native';
import constants from '../../../constants/constants';
import styles from './OrderAcceptCard.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OrderAccceptCard: any = ({acceptDetails, callDelivery}) => {
  return (
    <View style={styles.contractWrapper}>
      <View style={styles.rowWrapper}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.label}>
            {constants.acceptedOrderCard.accepted_by}
          </Text>
          <Text style={styles.value}>{acceptDetails.acceptedBy}</Text>
        </View>
        <View>
          <Text style={styles.label}>
            {constants.acceptedOrderCard.accepted_datetime}
          </Text>
          <Text style={[styles.value, {textAlign: 'right'}]}>
            {acceptDetails.acceptedDate + ', ' + acceptDetails.acceptedTime}
          </Text>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text style={styles.label}>
          {constants.acceptedOrderCard.accepted_remark}
        </Text>
        <Text style={styles.value}>{acceptDetails.acceptedRemark}</Text>
      </View>
      <View style={{marginTop:20}}></View>

      {callDelivery && callDelivery ? (
        <View style={styles.button}>
          <Text style={styles.buttonLabel}>
            {constants.deliveryCallCard.call_delivery}
          </Text>

          <Icon
            style={styles.iconPhone}
            name={'local-phone'}
            color={'#ffffff'}
            size={20}
          />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default OrderAccceptCard;
