import React from 'react';
import { View,Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './ContractCard.styles';
import config from '../../../config/colors';
import CONSTANTS from '../../../constants/constants';
import I18n from '../../../config/i18n';

export interface ContractCard {
    itemName: string,
    issuedCyl: string,
    omcId: string,
    deposit: string,
    discount: number,
    onEdit:any

}


const ContractCard: any = ({

    itemName,
    issuedCyl,
    omcId,
    deposit,
    discount,
    onEdit



}: ContractCard) => {

    return(
        <View style={{marginBottom: 20}}>
        <View style={styles.contractWrapper}>
        <View style={styles.rowWrapper}>
            <View style={{display: 'flex',flexDirection:'column'}}>
                <Text style={styles.label}>{I18n.t('contractCard.item_name')}</Text>
                <Text style={styles.value}>{itemName}</Text>
            </View>
            <View>
                <Text style={styles.label}>{I18n.t('contractCard.issued_cyl')}</Text>
                <Text style={[styles.value,{textAlign: 'right'}]}>{issuedCyl}</Text>
            </View>
        </View>
        <View style={styles.rowWrapper}>
            <View style={{display: 'flex',flexDirection:'column'}}>
                <Text style={styles.label}>{I18n.t('contractCard.omc_id')}</Text>
                <Text style={styles.value}>{omcId}</Text>
            </View>
            <View>
                <Text style={styles.label}>{I18n.t('contractCard.security_deposit')}</Text>
                <Text style={[styles.value,{textAlign: 'right'}]}>{deposit}</Text>
            </View>
        </View>
        </View>
        <View style={styles.rowBlueWrapper}>
            <View style={styles.discountWrapper}>
                    <View style={styles.iconContainer}>
                        <IconCommunity  name={'ticket-percent'} color={config.WHITE} size={20} />
                    </View>
                    <View style={{display: 'flex',flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={styles.discount}>
                        <IconCommunity name={'currency-inr'} color={config.WHITE} size={23}/>{discount}</Text>
                        <Text style={{fontSize: 12,color: config.WHITE,justifyContent: 'center'}}>{I18n.t('contractCard.discount')}</Text>
                        </View>
            </View>
            <View style={{backgroundColor: config.FADED_BLUE,padding: 10,justifyContent: 'center'}}>
                    <Icon name={'edit'} color={config.WHITE} size={25}
                        onPress={ onEdit}/>
            </View>
        </View>
        </View>
    );

}


export default ContractCard;