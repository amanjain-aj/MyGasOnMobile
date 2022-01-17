import React from 'react';
import {View, Text} from 'react-native';
import constants from '../../../constants/constants';
import styles from './TaxBillingCard.styles';
import config from '../../../config/colors';
import I18n from '../../../config/i18n';

const TaxBillingCard: any = ({taxDetails}) => {
  return (
    <View style={styles.contractWrapper}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
        }}>
        <Text style={{fontSize: 14, color: config.BLACK}}>
          {I18n.t('taxBillingCard.sub_total')}
        </Text>
        <Text style={{fontSize: 15, color: config.BLACK}}>
          {taxDetails.subTotal}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
        }}>
        <Text style={{fontSize: 14, color: config.BLACK}}>
          {I18n.t('taxBillingCard.discount')}
        </Text>
        <Text style={{fontSize: 15, color: config.BLACK}}>
          {taxDetails.discount}
        </Text>
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
        }}>
        <Text style={{fontSize: 14, color: config.BLACK}}>
          {I18n.t('taxBillingCard.tax_amount')}
        </Text>
        <Text style={{fontSize: 15, color: config.BLACK}}>
          {taxDetails.taxable_amount}
        </Text>
      </View> */}
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
        }}>
        <Text style={{fontSize: 14, color: config.BLACK}}>
          {constants.taxBillingCard.gst}
        </Text>
        <Text style={{fontSize: 15, color: config.BLACK}}>
          {taxDetails.gst}
        </Text>
      </View> */}
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
        }}>
        <Text style={{fontSize: 16, fontWeight:'700', color: config.NAVY_BLUE}}>
          {I18n.t('taxBillingCard.grand_total')}
        </Text>
        <Text style={{fontSize: 16, fontWeight:'700', color: config.NAVY_BLUE}}>
          {taxDetails.grandTotal}
        </Text>
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
    </View>
  );
};

export default TaxBillingCard;
