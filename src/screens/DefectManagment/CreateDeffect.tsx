import React, {useState} from 'react';
import {View, Text, BackHandler} from 'react-native';
import styles from './DefectManagment.styles';
import Header from '../../components/atoms/Header';
import FilterWrapper from '../../components/FilterWrapper';
import DropDown from '../../components/atoms/Dropdown';
import Input from '../../components/atoms/Input';
import DateRangePicker from 'react-native-daterange-picker';
import I18n from "../../config/i18n";
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper'
import constants from '../../constants/constants';
import config from '../../config/colors'
import FooterTab from '../../components/atoms/FooterTab';

const options = [
  {label: '1', value: '1', key: 1},
  {label: '2', value: '2', key: 2},
  {label: '3', value: '3', key: 3},
  {label: '4', value: '4', key: 4},
];

const CreateDeffect: any = ({navigation}: {navigation: any}) => {
  const [show, setShow] = useState(false);
  const showTimepicker = () => {
    setShow(true);
  };

  const [dislayedDate, setdislayedDate] = useState(moment());
  const [date, setdate] = useState(null);
  const backAction = () => {
    show ? setShow(false) : navigation.goBack();
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  const setDate = props => {
    if (props.date != null) {
      setdate(props.date);
      setdislayedDate(props.date);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title={I18n.t('defectManagment.create_defect')}
      />
      <DateRangePicker
        onChange={setDate}
        date={date}
        displayedDate={dislayedDate}
        open={show}>
        <Text></Text>
      </DateRangePicker>
      <FilterWrapper showFilter={false} navigation={navigation}>
        <DropDown
          options={options}
          placeholder={I18n.t('defectManagment.agency_name')}
        />
        <DropDown
          options={options}
          placeholder={I18n.t('defectManagment.qty')}
        />

        <Input
          secureTextEntry={false}
          label={I18n.t('defectManagment.exchange_date')}
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
        <Input
          secureTextEntry={false}
          label={I18n.t('defectManagment.adress')}
          value=""
          onChange={() => {}}
          iconSize={20}
         
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
          onFocus={() => {}}
        />
        <Input
          secureTextEntry={false}
          label={I18n.t('defectManagment.remark')}
          value=""
          onChange={() => {}}
          iconSize={20}
          
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
          onFocus={() => {}}
              />
              
              <View style={ {height:20}}/>
              <Button
                    icon={() => (
                        <Icon style ={{position: 'absolute',right: -85,top: -12}} name={'arrow-forward'} color={config.WHITE} size={25} />
                      )} 
                    contentStyle={{flexDirection: 'row-reverse'}}
                    labelStyle={[styles.button]}
                    mode="contained"
                    onPress={() => {} }
                >
                    {I18n.t('agencyProfileEdit.agency_button_proceed')}
                </Button>
      </FilterWrapper>

      <FooterTab navigation={navigation}
        onAddRoute={''}
        isAdd={false}
      
      />
    </View>
  );
};

export default CreateDeffect;
