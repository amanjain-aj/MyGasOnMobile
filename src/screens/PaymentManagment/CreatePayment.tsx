import React, {useState} from 'react';
import {View, Text, BackHandler} from 'react-native';
import styles from './PaymentManagment.styles';
import Header from '../../components/atoms/Header';
import FilterWrapper from '../../components/FilterWrapper';
import DropDown from '../../components/atoms/Dropdown';
import Input from '../../components/atoms/Input';
import DateRangePicker from 'react-native-daterange-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-paper';
import constants from '../../constants/constants';
import I18n from "../../config/i18n";
import config from '../../config/colors';
import FooterTab from '../../components/atoms/FooterTab';

const options = [
  {label: '1', value: '1', key: 1},
  {label: '2', value: '2', key: 2},
  {label: '3', value: '3', key: 3},
  {label: '4', value: '4', key: 4},
];

const CreatePayment: any = ({navigation}: {navigation: any}) => {
  const [show, setShow] = useState(false);

  const backAction = () => {
    show ? setShow(false) : navigation.goBack();
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  const showTimepicker = () => {
    setShow(true);
  };

  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [displayedDate, setDisplayedDate] = useState(moment());

  const setDate = props => {
    props.startDate && setstartDate(props.startDate);
    props.endDate && setendDate(props.endDate);
    props.date && setDisplayedDate(props.date);
  };

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title={I18n.t('paymentManagment.create_payment')}
      />

      <DateRangePicker
        onChange={setDate}
        endDate={endDate}
        startDate={startDate}
        displayedDate={displayedDate}
        range
        open={show}>
        <Text></Text>
      </DateRangePicker>

      <FilterWrapper showFilter={false} navigation={navigation}>
        <DropDown
          options={options}
          placeholder={I18n.t('paymentManagment.customer_name')}
        />

        <Input
          secureTextEntry={false}
          label={I18n.t('paymentManagment.amount')}
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

        <Input
          secureTextEntry={false}
          label={I18n.t('paymentManagment.payment_period')}
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
          keyboardType="none"
          onFocus={showTimepicker}
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
          {I18n.t('paymentManagment.submit')}
        </Button>
      </FilterWrapper>

      <FooterTab navigation={navigation}
        onAddRoute={''}
        isAdd={false}
      
      />
    </View>
  );
};

export default CreatePayment;
