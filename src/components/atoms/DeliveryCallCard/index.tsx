import React from 'react';
import {View, Text} from 'react-native';
import constants from '../../../constants/constants';
import styles from './DeliveryCallCard.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import config from '../../../config/colors';
import { Button } from 'react-native-paper'



const DeliveryCallCard: any = ({deliveryDetails}) => {
  return (
    <View style={styles.contractWrapper}>
      <View style={styles.rowWrapper}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.label}>
            {constants.deliveryCallCard.vehicle_model}
          </Text>
          <Text style={styles.value}>{deliveryDetails.vehicleModel}</Text>
        </View>
        <View>
          <Text style={styles.label}>
            {constants.deliveryCallCard.vehice_type}
          </Text>
          <Text style={[styles.value, {textAlign: 'right'}]}>
            {deliveryDetails.vehicleType}
          </Text>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text style={styles.label}>
          {constants.deliveryCallCard.deliveryboy_name}
        </Text>
        <Text style={styles.value}>{deliveryDetails.deliveryBoyName}</Text>
          </View>
          
          <View style={styles.button}>
          <Text style={styles.buttonLabel}> {constants.deliveryCallCard.call_delivery}</Text>

          <Icon
            style={styles.iconPhone}
            name={'local-phone'}
            color={config.WHITE}
            size={20}
          />
          </View>
     
    </View>
  );
};

export default DeliveryCallCard;
