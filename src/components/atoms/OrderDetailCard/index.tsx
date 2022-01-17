import React from 'react';
import {View, Text} from 'react-native';
import {configureFonts} from 'react-native-paper';
import constants from '../../../constants/constants';
import styles from './OrderDetailCard.styles';
import config from '../../../config/colors';
import I18n from '../../../config/i18n';

export interface OrderDetailCard {
  agencyName: string;
  orderNumber: string;
  OrderedBy: string;
  orderDate: string;
  orderTime: string;
  itemName: string;
  itemQty: string;
  deliveryDate: string;
  deliverySlot: string;
  remark: string;
  paymentStatus: string;
  deliveryType: string;
  address: string;
}

const OrderDetailCard: any = ({
  agencyName,
  orderNumber,
  OrderedBy,
  orderDate,
  orderTime,
  itemName,
  itemQty,
  deliveryDate,
  deliverySlot,
  remark,
  paymentStatus,
  deliveryType,
  address,
}: OrderDetailCard) => {
  return (
    <View style={styles.contractWrapper}>
      <View style={styles.rowWrapper}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.label}>
            {I18n.t('orderDetailCard.agency_name')}
          </Text>
          <Text style={styles.value}>{agencyName}</Text>
        </View>
        <View>
          <Text style={[styles.label,{textAlign:'right'}]}>
            {I18n.t('orderDetailCard.order_number')}
          </Text>
          <Text style={[styles.value, {textAlign: 'right'}]}>
            {orderNumber}
          </Text>
        </View>
      </View>

      <View style={styles.rowWrapper}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.label}>
            {I18n.t('orderDetailCard.ordered_by')}
          </Text>
          <Text style={styles.value}>{OrderedBy}</Text>
        </View>
        <View>
          <Text style={[styles.label,{textAlign:'right'}]}>
            {I18n.t('orderDetailCard.order_datetime')}
          </Text>
          <Text style={[styles.value, {textAlign: 'right'}]}>
            {orderDate + ',' + orderTime}
          </Text>
        </View>
      </View>

      <View style={styles.rowWrapper}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.label}>
            {I18n.t('orderDetailCard.item_name')}
          </Text>
          <Text style={styles.value}>{itemName}</Text>
        </View>
        <View>
          <Text style={styles.label}>{I18n.t('orderDetailCard.item_qty')}</Text>
          <Text style={[styles.value, {textAlign: 'right'}]}>{itemQty}</Text>
        </View>
      </View>

      <View style={styles.rowWrapper}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.label}>
            {I18n.t('orderDetailCard.delivery_date')}
          </Text>
          <Text style={styles.value}>{deliveryDate}</Text>
        </View>
        <View>
          <Text style={styles.label}>
            {I18n.t('orderDetailCard.delivery_slot')}
          </Text>
          <Text style={[styles.value, {textAlign: 'right'}]}>
            {deliverySlot}
          </Text>
        </View>
      </View>

      <View style={styles.rowWrapper}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.label}>{I18n.t('orderDetailCard.remark')}</Text>
          <Text style={styles.value}>{remark}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'column',alignItems:'flex-end'}}>
          <Text style={styles.label}>
            {I18n.t('orderDetailCard.order_status')}
          </Text>
          <Text style={[styles.buttonCredit]}>
            {paymentStatus}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: '#9E9E9E',
          borderBottomWidth: 1,
          marginTop: 10,
          marginBottom: 10,
          width: '100%',
          alignSelf: 'center',
        }}
      />

      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text style={styles.label}>
          {I18n.t('orderDetailCard.delivery_type')}
        </Text>
        <Text style={styles.value}>{deliveryType}</Text>
      </View>

      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text style={styles.label}>{I18n.t('orderDetailCard.address')}</Text>
        <Text style={styles.value}
          numberOfLines={4}
        >{address}</Text>
      </View>
    </View>
  );
};

export default OrderDetailCard;
