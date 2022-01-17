import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import constants from '../../../constants/constants';
import styles from './GiveCompliment.styles';
import I18n from "../../../config/i18n";
import config from '../../../config/colors';
import {AirbnbRating} from 'react-native-ratings';
import Input from '../../../components/atoms/Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-paper';

const GiveCompliment: any = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.conatiner}>
      <TouchableOpacity style={styles.button}>
        <Text style={{color: config.SKY_BLUE, fontSize: 16}}>
          {I18n.t('orderDetail.meet_expectation')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonGrey}>
        <Text style={{color: config.GREY, fontSize: 16}}>
          {I18n.t('orderDetail.performed_above_avg')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonGrey}>
        <Text style={{color: config.GREY, fontSize: 16}}>
          {' '}
          {I18n.t('orderDetail.performed_above_avg')}
        </Text>
      </TouchableOpacity>

      <View style={{padding: 10, marginTop: 20}}>
        <Text
          style={{
            fontSize: 17,
            color: config.SKY_BLUE,
            textAlign: 'center',
            marginTop: 10,
          }}>
          {I18n.t('orderDetail.meet_expectation')}
        </Text>
        <AirbnbRating
          count={5}
          selectedColor={config.SKY_BLUE}
          unSelectedColor={config.LIGHT_GREY}
          starContainerStyle={{padding: 3}}
          defaultRating={1}
          size={40}
          reviewSize={0}
        />
      </View>

      <Input
        secureTextEntry={false}
        value=""
        onChange={() => {}}
        iconSize={20}
        iconName=""
        placeholder={I18n.t('orderDetail.write_a_note')}
        disabled={false}
        error={false}
        mode="flat"
        numberOnly=""
        maxLength={30}
        style={{height: 100}}
        dense=""
        isAvailable={false}
        success={false}
        hintText=""
        keyboardType="default"
        onFocus={() => {}}
      />

      <View style={{marginBottom: 20}} />
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
        labelStyle={[
          {
            padding: 8,
            color: config.WHITE,
          },
        ]}
        mode="contained"
        onPress={() => {}}>
        {I18n.t('orderDetail.submit')}
      </Button>
    </View>
  );
};

export default GiveCompliment;
