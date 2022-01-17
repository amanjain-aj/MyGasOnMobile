import React, {useState} from 'react';
import {View, Platform} from 'react-native';
import styles from './LeakManagment.styles';
import Header from '../../components/atoms/Header';
import FilterWrapper from '../../components/FilterWrapper';
import Input from '../../components/atoms/Input';
import constants from '../../constants/constants';
import Dropdown from '../../components/atoms/Dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from "../../config/i18n";
import {Button} from 'react-native-paper';
import config from '../../config/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import FooterTab from '../../components/atoms/FooterTab';

const options = [
  {label: '1', value: '1', key: 1},
  {label: '2', value: '2', key: 2},
  {label: '3', value: '3', key: 3},
  {label: '4', value: '4', key: 4},
];

const CreateLeakage: any = ({navigation}: {navigation: any}) => {
  const [date1, setDate1] = useState('');
  const [show1, setShow1] = useState(false);

  const onChange1 = (event, selectedDate) => {
    if (isNaN(selectedDate)) {
      setDate1('');
      return;
    }
    const unixTimeZero = new Date(selectedDate);

    console.log('selectedDate', unixTimeZero.getHours());
    console.log('selectedDate', unixTimeZero.getMinutes());
    setShow1(Platform.OS === 'ios');

    setDate1(unixTimeZero.getHours() + ':' + unixTimeZero.getMinutes());
  };

  const showTimepicker1 = () => {
    console.log('Cd');
    setShow1(true);
  };

  return (
    <View style={styles.contianer}>
      <Header
        navigation={navigation}
        title={I18n.t('leakManagment.create_leak')}
      />

      <FilterWrapper showFilter={false} navigation={''}>
        <Dropdown
          options={options}
          placeholder={I18n.t('leakManagment.agency')}
        />
        <Dropdown options={options} placeholder={I18n.t('leakManagment.qty')} />
        <Dropdown
          options={options}
          placeholder={I18n.t('leakManagment.store')}
        />
        <Dropdown
          options={options}
          placeholder={I18n.t('leakManagment.day_of_visit')}
        />
        <View style={styles.rowView}>
          <View style={{width: '50%'}}>
            <Input
              secureTextEntry={false}
              label={I18n.t('leakManagment.hh')}
              value=""
              onChange={() => {}}
              iconSize={20}
              //   iconName="rupee"
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
              keyboardType="numeric"
              onFocus={showTimepicker1}
            />
          </View>
          <View>
            {show1 && (
              <DateTimePicker
                placeholderText={'Select Time'}
                testID="dateTimePicker"
                value={new Date()}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={onChange1}
              />
            )}
          </View>
          <View style={{width: '40%', marginLeft: 30}}>
            <Dropdown
              options={options}
              placeholder={I18n.t('leakManagment.am')}
            />
          </View>
        </View>

        <Input
          secureTextEntry={false}
          label={I18n.t('leakManagment.reason_of_visit')}
          value=""
          onChange={() => {}}
          iconSize={20}
          //   iconName="rupee"
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
          keyboardType="numeric"
          onFocus={() => {}}
        />

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
          {I18n.t('leakManagment.proceed')}
        </Button>
      </FilterWrapper>
      <FooterTab navigation={navigation}
        onAddRoute={''}
        isAdd={false}
      
      />
    </View>
  );
};

export default CreateLeakage;
