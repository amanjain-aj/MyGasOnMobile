import React from 'react'
import { View, Text } from 'react-native'
import constants from '../../../constants/constants'
import styles from './LekageDetailCard.styles'


const LekageDetailCard: any = ({ cardDetails}) => {
    return (
       
             <View style={styles.contractWrapper}>
      <View style={styles.rowWrapper}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.label}>
            {constants.lekageDetailCard.customer_name}
          </Text>
          <Text style={styles.value}>{cardDetails.customerName}</Text>
        </View>
        <View>
          <Text style={styles.label}>
            {constants.lekageDetailCard.date_time}
          </Text>
          <Text style={[styles.value, {textAlign: 'right'}]}>
            {cardDetails.orderDate + ', ' + cardDetails.orderTime}
          </Text>
        </View>
      </View>

      <View style={styles.rowWrapper}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.label}>
            {constants.lekageDetailCard.created_by}
          </Text>
          <Text style={styles.value}>{cardDetails.createdBy}</Text>
        </View>
        <View>
          <Text style={styles.label}>
            {constants.lekageDetailCard.reason}
          </Text>
          <Text style={[styles.value, {textAlign: 'right'}]}>
            {cardDetails.reason}
          </Text>
        </View>
      </View>

      <View style={styles.rowWrapper}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.label}>
            {constants.lekageDetailCard.ordered_item}
          </Text>
          <Text style={styles.value}>{cardDetails.itemName}</Text>
        </View>
        <View>
          <Text style={styles.label}>{constants.lekageDetailCard.ordered_qty}</Text>
          <Text style={[styles.value, {textAlign: 'right'}]}>{cardDetails.itemQty}</Text>
        </View>
      </View>

      <View style={styles.rowWrapper}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.label}>
            {constants.lekageDetailCard.delivery_date}
          </Text>
          <Text style={styles.value}>{cardDetails.deliveryDate}</Text>
        </View>
        <View>
          <Text style={styles.label}>
            {constants.lekageDetailCard.payment_status}
          </Text>
          <Text style={[styles.buttonCredit]}>
            {cardDetails.paymentStatus}
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
          {constants.orderDetailCard.address}
        </Text>
        <Text style={styles.value}>{cardDetails.address}</Text>
      </View>

    
    </View>
           
    )
}

export default LekageDetailCard
