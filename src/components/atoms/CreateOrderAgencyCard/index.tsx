import React from 'react';
import { View,Text,TouchableOpacity } from 'react-native';
import styles from './CreateOrderAgencyCard.styles';
import config from '../../../config/colors';
import CONSTANTS from '../../../constants/constants';

export interface CreateOrderAgencyCard {
    agency_name: string,
    item_name: string,
    quantity: string,
    onItemSelect: any,
    cardBorder:true
}


const CreateOrderAgencyCard: any = ({
    agency_name,
    item_name,
    quantity,
    onItemSelect,
    cardBorder
}: CreateOrderAgencyCard) => {

    return(
        <TouchableOpacity onPress={onItemSelect} style={cardBorder?styles.cardBorder:{marginBottom: 20}}>
        <View style={styles.contractWrapper}>
        <View style={styles.rowWrapper}>
            <View style={{display: 'flex',flexDirection:'column'}}>
                <Text style={styles.label}>{CONSTANTS.orderCreation.title}</Text>
                <Text style={styles.value}>{agency_name}</Text>
            </View>
        </View>
        <View style={styles.rowWrapper}>
            <View style={{display: 'flex',flexDirection:'column'}}>
                <Text style={styles.label}>{CONSTANTS.orderCreation.card_item_name}</Text>
                <Text style={styles.value}>{item_name}</Text>
            </View>
            <View>
                <Text style={styles.label}>{CONSTANTS.orderCreation.card_capacity}</Text>
                <Text style={[styles.value,{textAlign: 'right'}]}>{quantity}</Text>
            </View>
        </View>
        </View>
        </TouchableOpacity>
    );

}


export default CreateOrderAgencyCard;