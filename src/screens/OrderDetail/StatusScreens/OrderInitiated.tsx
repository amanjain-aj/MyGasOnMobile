import React, { useEffect } from 'react';
import {View, Text} from 'react-native';
import styles from './StatusScreen.styles';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import config from '../../../config/colors';
import constants from '../../../constants/constants';
import I18n from "../../../config/i18n";
import OrderDetailCard from '../../../components/atoms/OrderDetailCard';
import TaxBillingCard from '../../../components/atoms/TaxBillingCard';
import { useFocusEffect } from '@react-navigation/native';

export interface OrderInitiated {
  navigation: any;
  isModified: boolean;
  postPoneDelivery: Function;
  cancelOrder: Function;
  orderData: any;
}

const OrderInitiated: any = ({
  navigation,
  isModified,
  postPoneDelivery,
  cancelOrder,
  orderData
}: OrderInitiated) => {
  const taxDetails = {
    subTotal: orderData.hasOwnProperty('payment') && orderData['payment'] != null ? orderData['payment']['amount'] : 'NA',
    discount: '200.00',
    grandTotal: '1764.50',
  };
  
  // useEffect(()=>{

  // },[orderData])
  
  return (
    <View style={styles.container}>
      <Button
        style={
          isModified
            ? {backgroundColor: config.NAVY_BLUE}
            : {opacity: 0.5, backgroundColor: config.NAVY_BLUE}
        }
        contentStyle={{flexDirection: 'row-reverse'}}
        labelStyle={[styles.button]}
        mode="contained"
        onPress={() => {
          postPoneDelivery;
        }}>
        {I18n.t('orderDetail.postponeDelivery')}
      </Button>
      <View style={{height: 20}} />
      <Button
        style={isModified ? {} : {opacity: 0.5}}
        contentStyle={{flexDirection: 'row-reverse'}}
        labelStyle={[styles.button]}
        mode="contained"
        onPress={() => {
          cancelOrder;
        }}>
        {I18n.t('orderDetail.cancelOrder')}
      </Button>
      <View style={{height: 30}} />
      {orderData !== null && <OrderDetailCard
        agencyName={orderData['itemPriceContract']['itemPrice']['agency']['name']}
        orderNumber={orderData['id']}
        OrderedBy={orderData['createdBy']}
        orderDate={orderData['createdDate'].split(' ')[0]}
        orderTime={orderData['createdDate'].split(' ')[1]}
        itemName={orderData['itemPriceContract']['itemPrice']['item']['itemName']}
        itemQty={orderData['actualQuantity']}
        deliveryDate={orderData['deliveryDate']}
        deliverySlot={orderData['deliverySlot']['startTime']+'-'+orderData['deliverySlot']['endTime']}
        remark={orderData['remarks']== null ? "N/A": orderData['remarks']}
        paymentStatus={orderData.hasOwnProperty('payment') && orderData['payment'] != null ? orderData['payment']['status']: 'NA'}
        deliveryType={orderData['selfPickup'] ? 'SelfPickup' : 'Delivery'}
        address={orderData['deliveryAddress']['addressLine1'] +""+ orderData['deliveryAddress']['addressLine2']+ "" +orderData['deliveryAddress']['city']}
      /> }
      <View style={{height: 30}} />
      {orderData.hasOwnProperty('payment') && orderData['payment'] != null && <TaxBillingCard taxDetails={taxDetails} />}
      <View style={{height: 20}} />

     
      <View style={{height: 20}} />
    </View>
  );
};

export default OrderInitiated;
