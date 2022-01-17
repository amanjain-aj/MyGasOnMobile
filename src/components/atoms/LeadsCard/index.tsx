import React from 'react';
import { View,Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './LeadsCard.styles';
import config from '../../../config/colors';
import CONSTANTS from '../../../constants/constants';

export interface LeadsCard {
    requestedBy: string,
    createdDate: string,
    customer_type: string,
    customer_name: string,
    cylinder_type: string

}


const LeadsCard: any = ({

    requestedBy,
    createdDate,
    customer_type,
    customer_name,
    cylinder_type



}: LeadsCard) => {

    return(
        <View style={{marginBottom: 20}}>
        <View style={styles.contractWrapper}>
        <View style={styles.rowWrapper}>
            <View style={{display: 'flex',flexDirection:'column'}}>
                <Text style={styles.label}>{CONSTANTS.leadGenerationList.request_created_by}</Text>
                <Text style={styles.value}>{requestedBy}</Text>
            </View>
            <View>
                <Text style={styles.label}>{CONSTANTS.leadGenerationList.created_date_time}</Text>
                <Text style={[styles.value,{textAlign: 'right'}]}>{createdDate}</Text>
            </View>
        </View>
        <View style={styles.rowWrapper}>
            <View style={{display: 'flex',flexDirection:'column'}}>
                <Text style={styles.label}>{CONSTANTS.leadGenerationList.customer_type}</Text>
                <Text style={styles.value}>{customer_type}</Text>
            </View>
            <View>
                <Text style={styles.label}>{CONSTANTS.leadGenerationList.customer_name}</Text>
                <Text style={[styles.value,{textAlign: 'right'}]}>{customer_name}</Text>
            </View>
        </View>
        <View style={styles.rowWrapper}>
            <View style={{display: 'flex',flexDirection:'column'}}>
                <Text style={styles.label}>{CONSTANTS.leadGenerationList.cyliner_type}</Text>
                <Text style={styles.value}>{cylinder_type}</Text>
            </View>
        </View>
        </View>
      
        </View>
    );

}


export default LeadsCard;