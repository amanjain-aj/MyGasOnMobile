import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './ImbalanceManagment.styles';
import Header from '../../components/atoms/Header';
import FilterWrapper from '../../components/FilterWrapper';
import Input from '../../components/atoms/Input';
import constants from '../../constants/constants';
import I18n from "../../config/i18n";
import Dropdown from '../../components/atoms/Dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-paper';
import config from '../../config/colors';
import FooterTab from '../../components/atoms/FooterTab';

const options = [
  {label: '1', value: '1', key: 1},
  {label: '2', value: '2', key: 2},
  {label: '3', value: '3', key: 3},
  {label: '4', value: '4', key: 4},
];

const CreateImbalance: any = ({navigation}: {navigation: any}) => {
  const [isCustomer, setIsCustomer] = useState(false);
  const [isEmployee, setIsEmployee] = useState(true);

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title={I18n.t('imabalanceManagement.create_imbalance')}
      />

      <FilterWrapper showFilter={false} navigation={''}>
        <View style={styles.tabContaner}>
          <TouchableOpacity
            style={isCustomer ? styles.tabItemActive : styles.tabItemInActive}
            onPress={() => {
              if (!isCustomer) {
                setIsCustomer(true);
                setIsEmployee(false);
              }
            }}>
            <Text style={styles.tabText}>
              {I18n.t('imabalanceManagement.customer_tab')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isEmployee ? styles.tabItemActive : styles.tabItemInActive}
            onPress={() => {
              if (!isEmployee) {
                setIsCustomer(false);
                setIsEmployee(true);
              }
            }}>
            <Text style={styles.tabText}>
              {I18n.t('imabalanceManagement.employee_tab')}
            </Text>
          </TouchableOpacity>
        </View>

        <Dropdown
          options={options}
          placeholder={I18n.t('imbalanceCard.customer_name')}
        />
        <Dropdown
          options={options}
          placeholder={I18n.t('imabalanceManagement.item_no')}
        />
        <Dropdown
          options={options}
          placeholder={I18n.t('imabalanceManagement.empty_qty')}
        />

        <View style={{height: 20}} />
        <Button
          icon={() => (
            <Icon
              style={{position: 'absolute', right: -85, top: -12}}
              name={'arrow-forward'}
              color={config.WHITE}
              size={25}
            />
          )}
          contentStyle={{flexDirection: 'row-reverse'}}
          labelStyle={{padding: 8, color: config.WHITE}}
          mode="contained"
          onPress={() => {}}>
          {I18n.t('imabalanceManagement.submit')}
        </Button>
      </FilterWrapper>

      <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </View>
  );
};

export default CreateImbalance;
