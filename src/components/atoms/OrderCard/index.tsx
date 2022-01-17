import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import constants from '../../../constants/constants';
import styles from './OrderCard.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import config from '../../../config/colors';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {Appbar} from 'react-native-paper';
import I18n from '../../../config/i18n';

export interface OrderCards {
  cardType: string;

  cardDetails: any;
  onCahngeStatus: any;
  onAssingTrip: any;
  navigation: any;
  orderId: any;
}

const OrderCard: any = ({
  cardType,
  cardDetails,
  onCahngeStatus,
  onAssingTrip,
  navigation,
  orderId
}: OrderCards) => {
  const menu: any = useRef();
  const showMenu = () => menu.current.show();
  const hideMenu = () => menu.current.hide();

  const cardComponent = () => {
   
    switch (cardType) {
      case 'OrderManagement':
       
        return (
          <TouchableOpacity onPress={()=>{navigation.navigate('OrderDetails',{orderId: orderId})}}> 
          <View>
            <View style={styles.rowWrapper}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text style={styles.label}>
                  {I18n.t('orderCard.order_number')}
                </Text>
                <Text style={cardDetails['impersonateUser'] ? styles.numberOrange : styles.numberBlue }>{cardDetails.id}</Text>
              </View>
              <View >
                <Text style={[styles.label,{textAlign: 'right'}]}>{cardDetails['deliverySlot']['startTime']+'-'+cardDetails['deliverySlot']['endTime']}</Text>
                <Text style={[styles.value, {textAlign: 'right'}]}>
                  {cardDetails['deliveryDate']}
                </Text>
              </View>
            </View>

            <View style={styles.rowWrapper}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text style={styles.label}>
                  {I18n.t('orderCard.item_name')}
                </Text>
                <Text style={styles.value}>{cardDetails['itemPriceContract']['itemPrice']['item']['itemName']}</Text>
              </View>
              <View>
                <Text style={styles.label}>{I18n.t('orderCard.item_qty')}</Text>
                <Text style={[styles.value, {textAlign: 'right'}]}>
                  {cardDetails['actualQuantity']}
                </Text>
              </View>
            </View>
            <View style={styles.rowWrapper}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text style={styles.label}>
                  {I18n.t('orderCard.consumer_no')}
                </Text>
                <Text style={styles.value}>{cardDetails['itemPriceContract']['consumerNo']}</Text>
              </View>
              <View>
                <Text style={styles.label}>
                  {I18n.t('orderCard.order_value')}
                </Text>
                <Text style={[styles.value, {textAlign: 'right'}]}>
                  {cardDetails.hasOwnProperty('payment') && cardDetails['payment'] != null ? cardDetails['payment']['amount']: 'NA'}
                </Text>
              </View>
            </View>
            <View style={styles.rowWrapper}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text style={styles.label}>
                  {I18n.t('orderCard.delivery_at')}
                </Text>
                <Text style={styles.value}>{cardDetails['deliveryAddress']['addressLine1']}</Text>
              </View>
              <View>
                <Text style={[styles.label, {textAlign: 'right'}]}>{I18n.t('orderCard.order_by')}</Text>
                <Text style={[styles.value, {textAlign: 'right'}]}>
                  {cardDetails['createdBy']}
                </Text>
              </View>
            </View>

            <View style={styles.rowWrapper}>
              <Text style={styles.buttonAccept}>
                {cardDetails['status']}
              </Text>

              <Text style={cardDetails['paymentType'] == 'M' || cardDetails['paymentType'] == 'W' ? styles.buttonCredit : styles.buttonInstant}>
                {cardDetails['paymentType'] == 'M' || cardDetails['paymentType'] == 'W' ? 'CREDIT' : 'INSTANT'}
              </Text>
            </View>
          </View>
          </TouchableOpacity>
        );
        break;
      case 'ImbalanceManagment':
        return (
          <View>
            <View style={styles.rowWrapper}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text style={styles.label}>
                  {constants.imbalanceCard.imbalnce_number}
                </Text>
                <Text style={styles.numberBlue}>
                  {cardDetails.imbalance_no}
                </Text>
              </View>
              <View>
                <Text style={styles.label}>
                  {constants.imbalanceCard.item_name}
                </Text>
                <Text style={[styles.value, {textAlign: 'right'}]}>
                  {cardDetails.item_name}
                </Text>
              </View>
            </View>

            <View style={styles.rowWrapper}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text style={styles.label}>
                  {constants.imbalanceCard.customer_name}
                </Text>
                <Text style={styles.value}>{cardDetails.customer_name}</Text>
              </View>
              <View>
                <Text style={styles.label}>{constants.orderCard.item_qty}</Text>
                <Text style={[styles.value, {textAlign: 'right'}]}>
                  {cardDetails.qty}
                </Text>
              </View>
            </View>
            {cardDetails.isAccepted && (
              <View style={styles.rowWrapper}>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text style={styles.label}>{cardDetails.orderTime}</Text>
                  <Text style={[styles.value, {textAlign: 'left'}]}>
                    {cardDetails.orderDate}
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>
                    {constants.imbalanceCard.pickUp}
                  </Text>
                  <Text style={[styles.value, {textAlign: 'right'}]}>
                    {cardDetails.pickup}
                  </Text>
                </View>
              </View>
            )}
            <Text
              style={
                cardDetails.isAccepted
                  ? styles.buttonAccept
                  : styles.buttonInitiated
              }>
              {cardDetails.isAccepted
                ? constants.orderCard.accept
                : constants.imbalanceCard.initianted}
            </Text>
          </View>
        );
        break;
      case 'PaymentManagment':
        return (
          <View>
            <View style={styles.rowWrapper}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text style={styles.label}>
                  {constants.paymentCard.payment_no}
                </Text>
                <Text style={styles.numberBlue}>{cardDetails.payment_no}</Text>
              </View>
              <View>
                <Text style={styles.label}>{constants.paymentCard.amount}</Text>
                <Text style={[styles.value, {textAlign: 'right'}]}>
                  {cardDetails.amount}
                </Text>
              </View>
            </View>

            <View style={styles.rowWrapper}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text style={styles.label}>
                  {constants.paymentCard.customer_name}
                </Text>
                <Text style={styles.value}>{cardDetails.customer_namr}</Text>
              </View>
              <View>
                <Text style={styles.label}>
                  {constants.paymentCard.payment_period}
                </Text>
                <Text style={[styles.value, {textAlign: 'right'}]}>
                  {cardDetails.payment_perod}
                </Text>
              </View>
            </View>
            <View style={styles.rowWrapper}>
              <Text
                style={
                  cardDetails.isAccepted
                    ? styles.buttonAccept
                    : styles.buttonInitiated
                }>
                {cardDetails.isAccepted
                  ? constants.imbalanceCard.accepted
                  : constants.paymentCard.initiaed}
              </Text>

              <Text
                style={
                  cardDetails.payment_satus === 'paid'
                    ? styles.buttonPaid
                    : styles.buttonCredit
                }>
                {cardDetails.payment_satus}
              </Text>
            </View>
          </View>
        );
        break;
      case 'DefectManagment':
        return (
          <View>
            <View style={styles.rowWrapper}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text style={styles.label}>
                  {constants.defectCard.defect_no}
                </Text>
                <Text style={styles.numberBlue}>
                  {cardDetails.defective_id}
                </Text>
              </View>
              <View>
                <Text style={styles.label}>
                  {constants.defectCard.item_name}
                </Text>
                <Text style={[styles.value, {textAlign: 'right'}]}>
                  {cardDetails.item_name}
                </Text>
              </View>
            </View>

            <View style={styles.rowWrapper}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text style={styles.label}>
                  {constants.defectCard.customer_name}
                </Text>
                <Text style={styles.value}>{cardDetails.customer_name}</Text>
              </View>
              <View>
                <Text style={styles.label}>
                  {constants.defectCard.item_qty}
                </Text>
                <Text style={[styles.value, { textAlign: 'right'}]}>
                  {cardDetails.qty}
                </Text>
              </View>
            </View>

            <View style={styles.rowWrapper}>
              {cardDetails.isAccepted && (
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text style={styles.label}>{cardDetails.orderTime}</Text>
                  <Text style={styles.value}>{cardDetails.orderDate}</Text>
                </View>
              )}
              <View>
                <Text style={styles.label}>
                  {constants.defectCard.exchange_from}
                </Text>
                <Text style={[styles.value, {textAlign: 'right'}]}>
                  {cardDetails.exchange_from}
                </Text>
              </View>
            </View>
            <Text
              style={
                cardDetails.isAccepted
                  ? styles.buttonAccept
                  : styles.buttonInitiated
              }>
              {cardDetails.isAccepted
                ? constants.orderCard.accept
                : constants.imbalanceCard.initianted}
            </Text>
          </View>
        );
        break;
      case 'LeakManagment':
        return (
          <View>
            <View style={styles.rowWrapper}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text style={styles.label}>{constants.leakCard.lekage_id}</Text>
                <Text style={styles.numberBlue}>{cardDetails.lekage_id}</Text>
              </View>
              <View>
                <Text style={styles.label}>{constants.leakCard.item_name}</Text>
                <Text style={styles.value}>{cardDetails.item_name}</Text>
              </View>
            </View>

            <View style={styles.rowWrapper}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text style={styles.label}>
                  {constants.leakCard.created_by}
                </Text>
                <Text style={styles.value}>{cardDetails.customer_name}</Text>
              </View>
              <View>
                <Text style={styles.label}>{constants.leakCard.item_qty}</Text>
                <Text style={[styles.value, {textAlign: 'right'}]}>
                  {cardDetails.qty}
                </Text>
              </View>
            </View>
            <View style={styles.rowWrapper}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text style={styles.label}>
                  {constants.leakCard.date_visit}
                </Text>
                <Text style={styles.value}>{cardDetails.orderDate}</Text>
              </View>
              <View>
                <Text style={styles.label}>
                  {constants.leakCard.time_visit}
                </Text>
                <Text style={[styles.value, {textAlign: 'right'}]}>
                  {cardDetails.orderTime}
                </Text>
              </View>
            </View>
            <Text
              style={
                cardDetails.isAccepted
                  ? styles.buttonAccept
                  : styles.buttonInitiated
              }>
              {cardDetails.isAccepted
                ? constants.paymentCard.initiaed
                : constants.imbalanceCard.initianted}
            </Text>
          </View>
        );
        break;
      
      case 'TripManagment':
        return(
        <View>
        <View style={styles.rowWrapper}>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={styles.label}>{I18n.t('tripManagment.trip_name')}</Text>
            <Text style={styles.value}>{cardDetails['name']}</Text>
          </View>
          <View>
            <Text style={[styles.label,{'textAlign':'right'}]}>{I18n.t('tripManagment.trip_date')}</Text>
            <Text style={styles.value}>{cardDetails['startDate']}</Text>
          </View>
        </View>

        <View style={styles.rowWrapper}>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={styles.label}>
              {I18n.t('tripManagment.trip_id')}
            </Text>
            <Text style={styles.numberBlue}>{cardDetails['id']}</Text>
          </View>
          <View>
            <Text style={styles.label}>{I18n.t('tripManagment.trip_time')}</Text>
            <Text style={[styles.value, {textAlign: 'right'}]}>
              {cardDetails['startTime']}
            </Text>
          </View>
        </View>
        <View style={styles.rowWrapper}>
          {cardDetails['driver'] != null ? <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={styles.label}>
              {I18n.t('tripManagment.driver')}
            </Text>
            <Text style={styles.value}>{'Test'}</Text>
          </View> :
            <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={styles.label}>
              {I18n.t('tripManagment.deliveryBoy')}
            </Text>
            <Text style={styles.value}>{cardDetails['mechanicOrDeliveryBoy']['userDetails']['name']}</Text>
          </View>
          
          }
          <View>
            <Text style={styles.label}>
              {I18n.t('tripManagment.start_godown')}
            </Text>
            <Text style={[styles.value, {textAlign: 'right'}]}>
              {cardDetails['startGodown'] != null ? cardDetails['startGodown']['name']:'NA'}
            </Text>
          </View>
          </View>
          <View style={styles.rowWrapper}>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={styles.label}>
              {I18n.t('tripManagment.end_godown')}
            </Text>
            <Text style={styles.value}>{cardDetails['endGodown'] != null ?cardDetails['endGodown']['name'] : 'NA'}</Text>
          </View>
          <View>
            <Text style={styles.label}>
              {I18n.t('tripManagment.assinged_vehicle')}
            </Text>
            <Text style={[styles.value, {textAlign: 'right'}]}>
              {cardDetails['vehicle']['vehicleNumber']}
            </Text>
          </View>
          </View>
          
          <View style={styles.rowWrapper}>
          <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text
          style={
             styles.buttonInitiated
          }>
          {cardDetails['status']}
              </Text>
            </View>
            <View>
            <Text
          style={
            styles.buttonCredit
          }>
          {cardDetails['type']
          }
              </Text>
            </View>
            </View>
          </View>
          )
        break;

      default:
        break;
    }
  };

  return (
    <View style={{marginBottom: 20}}>
      <View style={styles.contractWrapper}>
        {cardComponent()}
      </View>
    </View>
  )
};

export default OrderCard;
