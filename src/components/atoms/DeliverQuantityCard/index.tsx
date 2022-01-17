import React from 'react';
import {View, Text} from 'react-native';
import constants from '../../../constants/constants';
import styles from './DeliverQuantityCard.styles';

const DeliverQuantityCard: any = ({quantityDetails}) => {
  return (
    <View style={styles.contractWrapper}>
      <View style={styles.rowWrapper}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.label}>{constants.deliverQuanity.delivered}</Text>
          <Text style={styles.value}>{quantityDetails.delivered}</Text>
        </View>
        <View>
          <Text style={styles.label}>{constants.deliverQuanity.recived}</Text>
          <Text style={[styles.value, {textAlign: 'right'}]}>
            {quantityDetails.recived}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DeliverQuantityCard;
