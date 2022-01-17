import React, { useState } from 'react';
import {View, Text} from 'react-native';
import styles from './OrderManagment.styles';
import Header from '../../components/atoms/Header';
import constants from '../../constants/constants';
import I18n from "../../config/i18n";
import FilterWrapper from '../../components/FilterWrapper';
import {Button, Switch} from 'react-native-paper';
import config from '../../config/colors';
import DropDown from '../../components/atoms/Dropdown';
import Input from '../../components/atoms/Input';
import { useEffect } from 'react';

const options = [
  {label: '1', value: '1', key: 1},
  {label: '2', value: '2', key: 2},
  {label: '3', value: '3', key: 3},
  {label: '4', value: '4', key: 4},
];

const [filter,setFilter] = useState([{
    'oldtolatest': false,
    'latesttoold': true,
    'hightolow': true,
    'lowtohigh': false,
     
}])


const OrderManagmentFilter: any = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={I18n.t('orderManagment.header')} />
      <FilterWrapper navigation={navigation} showFilter={false}>
        <>
          <Text style={styles.title}>{I18n.t('orderManagment.sort_by')}</Text>
          <View style={styles.toggle}>
            <Text style={styles.toggleText}>
              {I18n.t('orderManagment.sort_filter.old_to_latest')}
            </Text>
            <Switch
              trackColor={{false: config.LIGHT_GREY, true: config.LIGHT_GREY}}
              thumbColor={'#293F66'}
              value={true}
            />
          </View>
          <View style={styles.toggle}>
            <Text style={styles.toggleText}>
              {I18n.t('orderManagment.sort_filter.latest_tooldest')}
            </Text>
            <Switch
              trackColor={{false: config.LIGHT_GREY, true: config.LIGHT_GREY}}
              thumbColor={'#fff'}
              value={false}
            />
          </View>
          <View style={styles.toggle}>
            <Text style={styles.toggleText}>
              {I18n.t('orderManagment.sort_filter.qty_hightoLow')}
            </Text>
            <Switch
              trackColor={{false: config.LIGHT_GREY, true: config.LIGHT_GREY}}
              thumbColor={'#fff'}
              value={false}
            />
          </View>
          <View style={styles.toggle}>
            <Text style={styles.toggleText}>
              {I18n.t('orderManagment.sort_filter.qty_lowToHigh')}
            </Text>
            <Switch
              trackColor={{false: config.LIGHT_GREY, true: config.LIGHT_GREY}}
              thumbColor={'#fff'}
              value={false}
            />
          </View>
        </>
        <View style={{height: 40}}></View>
        <Text style={styles.title}>{I18n.t('orderManagment.filter')}</Text>
        <View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
          <DropDown
            options={options}
            placeholder={I18n.t('orderManagment.agency_item_name')}
          />
          <DropDown
            options={options}
            placeholder={I18n.t('orderManagment.deliveryLocaiton')}
          />
          <DropDown
            options={options}
            placeholder={I18n.t('orderManagment.order_status')}
          />
          <DropDown
            options={options}
            placeholder={I18n.t('orderManagment.customer_type')}
          />

          <Input
            secureTextEntry={false}
            label={I18n.t('orderManagment.date')}
            value=""
            onChange={() => {}}
            iconSize={20}
            iconName="calendar-range"
            placeholder=""
            disabled={false}
            error={false}
            mode="flat"
            numberOnly=""
            maxLength={30}
            style={{}}
            dense=""
            success={false}
            hintText=""
            isAvailable={false}
            onFocus={() => {}}
          />
        </View>

        <Button labelStyle={styles.button} mode="contained" onPress={() => {}}>
          {I18n.t('orderManagment.apply_btn')}
        </Button>
      </FilterWrapper>
    </View>
  );
};

export default OrderManagmentFilter;
