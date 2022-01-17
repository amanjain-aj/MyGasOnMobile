import React from 'react'
import { View, Text } from 'react-native'
import styles from './TripType.styles';
import Input from '../../../components/atoms/Input';
import constants from '../../../constants/constants';
import I18n from "../../../config/i18n";
import FilterWrapper from '../../../components/FilterWrapper';
import Dropdown from '../../../components/atoms/Dropdown';
const options = [
    {label: '1', value: '1', key: 1},
    {label: '2', value: '2', key: 2},
    {label: '3', value: '3', key: 3},
    {label: '4', value: '4', key: 4},
  ];

const OMCTrip:any = ({ navigation}: {navigation:any}) => {
    return (
        <View style={styles.container}>
        <View style={{marginTop: 20}}>
          <Input
            secureTextEntry={false}
            label={I18n.t('tripManagment.trip_name')}
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
            keyboardType="default"
            onFocus={() => {}}
          />
  
          <Input
            secureTextEntry={false}
            label={I18n.t('tripManagment.trip_date')}
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
            isAvailable={false}
            success={false}
            hintText=""
            keyboardType="default"
            onFocus={() => {}}
          />
  
          <Dropdown
            options={options}
            placeholder={I18n.t('tripManagment.trip_time')}
          />
          <Dropdown
            options={options}
            placeholder={I18n.t('tripManagment.driver')}
          />
          <Dropdown
            options={options}
            placeholder={I18n.t('tripManagment.assinged_vehicle')}
          />
          <Dropdown
            options={options}
            placeholder={I18n.t('tripManagment.start_godown')}
          />
  
          <Dropdown
            options={options}
            placeholder={I18n.t('tripManagment.end_godown')}
                />
                <View style={{marginBottom:30}}></View>
        </View>
      </View>
    )
}

export default OMCTrip
