import React, { useState } from 'react'
import { View, Text ,TouchableOpacity} from 'react-native'

import styles from './TripType.styles';
import Input from '../../../components/atoms/Input';
import constants from '../../../constants/constants';
import I18n from "../../../config/i18n";
import Dropdown from '../../../components/atoms/Dropdown';

const options = [
  {label: '1', value: '1', key: 1},
  {label: '2', value: '2', key: 2},
  {label: '3', value: '3', key: 3},
  {label: '4', value: '4', key: 4},
];


const OtherAgencyTrip: any = ({ navigation }: { navigation: any }) => {
    

    const [isInward, setisInward] = useState(true);
    const [isOutward, setisOutward] = useState(false);


    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}>
            <View style={styles.tabContaner}>
          <TouchableOpacity
            style={isInward ? styles.tabItemActive : styles.tabItemInActive}
            onPress={() => {
              if (!isInward) {
                setisInward(true);
                setisOutward(false);
              }
            }}>
            <Text style={styles.tabText}>
              {I18n.t('tripManagment.inward')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isOutward ? styles.tabItemActive : styles.tabItemInActive}
            onPress={() => {
              if (!isOutward) {
                setisInward(false);
                setisOutward(true);
              }
            }}>
            <Text style={styles.tabText}>
              {I18n.t('tripManagment.outward')}
            </Text>
          </TouchableOpacity>
        </View>
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
            placeholder={I18n.t('tripManagment.trip_time_slot')}
          />
          <Dropdown
            options={options}
            placeholder={I18n.t('tripManagment.driver')}
          />
          <Dropdown
            options={options}
            placeholder={I18n.t('tripManagment.assinged_vehicle')}
          />
          
                <View style={{marginBottom:30}}></View>
        </View>
      </View>
    )
}

export default OtherAgencyTrip
