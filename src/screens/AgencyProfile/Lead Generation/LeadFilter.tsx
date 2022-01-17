import React, {useState} from 'react';
import {View, BackHandler, Text} from 'react-native';
import {List, Title} from 'react-native-paper';
import DateRangePicker from 'react-native-daterange-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import I18n from "../../../config/i18n";
import Header from '../../../components/atoms/Header';
import LeadsCard from '../../../components/atoms/LeadsCard';
import styles from './Lead.styles';
import CONSTANTS from '../../../constants/constants';
import FilterWrapper from '../../../components/FilterWrapper';
import DropDown from '../../../components/atoms/Dropdown';
import config from '../../../config/colors';
import Input from '../../../components/atoms/Input';

const LeadFilter: any = ({navigation}: {navigation: any}) => {
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

  const options = [
    {label: '1', value: '1', key: 1},
    {label: '2', value: '2', key: 2},
    {label: '3', value: '3', key: 3},
    {label: '4', value: '4', key: 4},
  ];
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
      <DateRangePicker
        onChange={setDate}
        endDate={endDate}
        startDate={startDate}
        displayedDate={displayedDate}
        range
        open={show}>
        <Text></Text>
      </DateRangePicker>
      <Header
        navigation={navigation}
        title={ I18n.t('agencyProfileEdit.header')}
      />

      <FilterWrapper navigation={''} showFilter={false}>
        <Title style={styles.filterTitle}>
          { I18n.t('leadGenerationFilter.filter_title')}
        </Title>
        <Input
          secureTextEntry={false}
          label={ I18n.t('leadGenerationFilter.created_by')}
          value=""
          onChange={() => {}}
          iconSize={20}
          iconName="sort"
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
          keyboardType="default"
          onFocus={() => {}}
        />

        <Input
          secureTextEntry={false}
          label={ I18n.t('leadGenerationFilter.date')}
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

        <DropDown
          options={options}
          placeholder={ I18n.t('leadGenerationFilter.customer_type')}
        />
        <DropDown
          options={options}
          placeholder={ I18n.t('leadGenerationFilter.item_type')}
        />
      </FilterWrapper>
    </View>
  );
};

export default LeadFilter;
