import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './AddOrder.styles';
import Header from '../../components/atoms/Header';
import Input from '../../components/atoms/Input';
import constants from '../../constants/constants';
import Dropdown from '../../components/atoms/Dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from '../../config/i18n';
import {Button} from 'react-native-paper';
import FilterWrapper from '../../components/FilterWrapper';
import FooterTab from '../../components/atoms/FooterTab';
import DeliveryDatePicker from '../../components/atoms/DeliveryDatePicker';

const options = [
  {label: '1', value: '1', key: 1},
  {label: '2', value: '2', key: 2},
  {label: '3', value: '3', key: 3},
  {label: '4', value: '4', key: 4},
];

const AddOrder: any = ({navigation}: {navigation: any}) => {
  const dateList = ['01', '02', '03', '04', '05', '06'];

  const [isImporsanate, setisImporsanate] = useState(true);
  const [isBehalf, setisBehalf] = useState(false);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={I18n.t('addOrder.header')} />
      <FilterWrapper showFilter={false} navigation={''}>
        <View style={styles.tabContaner}>
          <TouchableOpacity
            style={
              isImporsanate ? styles.tabItemActive : styles.tabItemInActive
            }
            onPress={() => {
              if (!isImporsanate) {
                setisImporsanate(true);
                setisBehalf(false);
              }
            }}>
            <Text style={styles.tabText}>
              {I18n.t('addOrder.impersonate')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isBehalf ? styles.tabItemActive : styles.tabItemInActive}
            onPress={() => {
              if (!isBehalf) {
                setisImporsanate(false);
                setisBehalf(true);
              }
            }}>
            <Text style={styles.tabText}>
              {I18n.t('addOrder.on_behalf')}
            </Text>
          </TouchableOpacity>
        </View>
        {isImporsanate ? (
          <View>
            <Dropdown
              options={options}
              placeholder={I18n.t('addOrder.item_name')}
            />
            <Input
              secureTextEntry={false}
              label={I18n.t('addOrder.quantity')}
              value=""
              onChange={() => {}}
              iconSize={20}
              iconName=""
              placeholder=""
              disabled={false}
              error={false}
              mode="flat"
              numberOnly=""
              maxLength={30}
              style={{}}
              dense=""
              isAvailable={false}
              success={false}
              hintText=""
              keyboardType="numeric"
              onFocus={() => {}}
            />

            <DeliveryDatePicker
              dateList={dateList}
              onChange={value => {
                console.warn(value);
              }}
              initialValue={0}
            />

            <Input
              secureTextEntry={false}
              label={I18n.t('addOrder.customer_name')}
              value=""
              onChange={() => {}}
              iconSize={20}
              iconName="account"
              placeholder=""
              disabled={false}
              error={false}
              mode="flat"
              numberOnly=""
              maxLength={30}
              style={{}}
              dense=""
              isAvailable={false}
              success={false}
              hintText=""
              keyboardType="default"
              onFocus={() => {}}
            />

            <Input
              secureTextEntry={false}
              label={I18n.t('addOrder.mobile_no')}
              value=""
              onChange={() => {}}
              iconSize={20}
              iconName="cellphone"
              placeholder=""
              disabled={false}
              error={false}
              mode="flat"
              numberOnly=""
              maxLength={30}
              style={{}}
              dense=""
              isAvailable={false}
              success={false}
              hintText=""
              keyboardType="default"
              onFocus={() => {}}
            />

            <Input
              secureTextEntry={false}
              label={I18n.t('addOrder.email')}
              value=""
              onChange={() => {}}
              iconSize={20}
              iconName="gmail"
              placeholder=""
              disabled={false}
              error={false}
              mode="flat"
              numberOnly=""
              maxLength={30}
              style={{}}
              dense=""
              isAvailable={false}
              success={false}
              hintText=""
              keyboardType="default"
              onFocus={() => {}}
            />
            <View style={{marginTop: 20}}></View>
          </View>
        ) : (
          <View>
            <Input
              secureTextEntry={false}
              label={I18n.t('addOrder.customer_name')}
              value=""
              onChange={() => {}}
              iconSize={20}
              iconName="account"
              placeholder=""
              disabled={false}
              error={false}
              mode="flat"
              numberOnly=""
              maxLength={30}
              style={{}}
              dense=""
              isAvailable={false}
              success={false}
              hintText=""
              keyboardType="default"
              onFocus={() => {}}
                          />
        <View style={{marginTop: 90}}></View>
                          
          </View>
        )}
        <Button
          labelStyle={[styles.button]}
          mode="contained"
                  onPress={() => {
              navigation.navigate('OrderCreation')
          }}>
          {I18n.t('addOrder.submit')}
        </Button>
        <View style={{marginTop: 20}}></View>
      </FilterWrapper>
      <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </View>
  );
};

export default AddOrder;
