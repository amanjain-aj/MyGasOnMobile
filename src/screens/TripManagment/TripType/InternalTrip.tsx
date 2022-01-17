import React from 'react';
import {View, Text} from 'react-native';
import styles from './TripType.styles';
import Input from '../../../components/atoms/Input';
import constants from '../../../constants/constants';
import I18n from "../../../config/i18n";
import Dropdown from '../../../components/atoms/Dropdown';
import { useState } from 'react';

const options = [
  {label: '1', value: '1', key: 1},
  {label: '2', value: '2', key: 2},
  {label: '3', value: '3', key: 3},
  {label: '4', value: '4', key: 4},
];

const [name,setName] = useState('');
const [date,setDate] = useState('');
const [time,setTime] = useState('');
const [driver,setDriver] = useState('');
const [vehicle,setVehicle] = useState('');
const [startGd,setStartGd] = useState('');
const [endGd,setEndGd] = useState('');
const [tripData,setTripData] = useState([]);

const createTripData = () => {

}

const InternalTrip: any = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <View style={{marginTop: 20}}>
        <Input
          secureTextEntry={false}
          label={I18n.t('tripManagment.trip_name')}
          value={name}
          onChange={(txt) => {
            setName(txt)
          }}
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
          onChange={(txt) => {
            setDate(txt)
          }}
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
          selectedValue={time}
          placeholder={I18n.t('tripManagment.trip_time')}
          onChange={()=>{

          }}
        />
        <Dropdown
          options={options}
          selectedValue={driver}
          placeholder={I18n.t('tripManagment.driver')}
          onChange={()=>{
            
          }}
        />
        <Dropdown
          options={options}
          selectedValue={vehicle}
          placeholder={I18n.t('tripManagment.assinged_vehicle')}
          onChange={()=>{
            
          }}
        />
        <Dropdown
          options={options}
          selectedValue={startGd}
          placeholder={I18n.t('tripManagment.start_godown')}
          onChange={()=>{
            
          }}
        />

        <Dropdown
          options={options}
          selectedValue={endGd}
          placeholder={I18n.t('tripManagment.end_godown')}
          onChange={()=>{
            
          }}
              />
              <View style={{marginBottom:30}}></View>
      </View>
    </View>
  );
};

export default InternalTrip;
