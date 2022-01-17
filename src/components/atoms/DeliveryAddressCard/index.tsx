import React from 'react';
import {View, Text} from 'react-native';
import styles from './DeliveryAddressCard.styles';
import config from '../../../config/colors';
import constants from '../../../constants/constants';

const DeliveryAddressCard: any = ({deliveryAddress}) => {
  return (
    <View style={styles.contractWrapper}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          color: config.NAVY_BLUE,
          textTransform: 'uppercase',
        }}>
        {constants.orderCreation.delivery_address}
      </Text>

          <View style={{height:10}} />
      <View>
        <Text style={styles.label}>{deliveryAddress.name}</Text>
        <Text style={styles.value}>{deliveryAddress.address}</Text>
      </View>
    </View>
  );
};

export default DeliveryAddressCard;
