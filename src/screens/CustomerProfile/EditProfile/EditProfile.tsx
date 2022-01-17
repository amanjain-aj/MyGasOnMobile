import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './EditProfile.styles';
import Header from '../../../components/atoms/Header';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import {Avatar} from 'react-native-paper';
import config from '../../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from "../../../config/i18n";

import CONSTANTS from '../../../constants/constants';
import Input from '../../../components/atoms/Input';
import DropDown from '../../../components/atoms/Dropdown';
import LocationModal from '../../../components/atoms/Modals/LocationModal';
import {Button} from 'react-native-paper';
import constants from '../../../constants/constants';

const options = [
  {label: 'Sr. CHeff', value: 'Sr. CHeff', key: 1},
  {label: 'Jr.Cheff', value: 'Jr.Cheff', key: 2},
  {label: 'Manager', value: 'Manager', key: 3},
  {label: 'DoorBoy', value: 'DoorBoy', key: 4},
];

const EditProfile: any = ({navigation}: {navigation: any}) => {
  const [showDialog, setShowDialog] = useState(false);

  const openModal = () => {
    setShowDialog(true);
  };

  return (
    <View style={styles.container}>
      <LocationModal
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        submit={I18n.t('customerProfileEdit.location_submit')}
        onLocationSelected={(cordinates) => {
          console.log("latitude"+cordinates.latitude)
        }}
      />

      <Header
        navigation={navigation}
        title={I18n.t('customerProfileHome.header')}
      />

      <PostAuthWrapper
        titlePreFix={I18n.t('myProfile.myprofie_prefix')}
        titlePostFix={I18n.t('myProfile.myprofile_postfix')}
        subtitle={''}
        navigation={navigation}
        isAgencyHomePage={false}
        isEdit={true}>
        <Text style={styles.title}>{I18n.t('popUpMenu.myProfile')}</Text>
        <Avatar.Image
          size={140}
          style={{marginBottom: 30, alignSelf: 'center'}}
          source={require('../../../assets/images/profilePlaceholder.png')}
        />
        <View style={{height: 80}}>
          <Text style={{ paddingStart: 10, fontSize: 16, color: config.GREY }}>
            {I18n.t('editProfile.upload')}
          </Text>
          <TouchableOpacity style={styles.dashedBUtton} onPress={() => {}}>
            <Text style={styles.buttonText}>{I18n.t('errorMessage.choose_picture')}</Text>
          </TouchableOpacity>
        </View>
        <>
          <Input
            secureTextEntry={false}
            label={I18n.t('editProfile.profile_name')}
            value=""
            onChange={() => {}}
            iconSize={20}
            iconName="account-network"
            placeholder=""
            disabled={false}
            error={false}
            mode="flat"
            numberOnly=""
            maxLength={30}
            style={{}}
            onFocus={() => {}}
            dense=""
            isAvailable={false}
            success={false}
            hintText=""
            keyboardType="default"
          />

          <DropDown
            options={options}
            placeholder={I18n.t('editProfile.agency_manager')}
          />

          <Input
            secureTextEntry={false}
            label={I18n.t('editProfile.customer_input_phone')}
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
            onFocus={() => {}}
            hintText=""
            keyboardType="numeric"
          />
          <Input
            secureTextEntry={false}
            label={I18n.t('editProfile.customer_input_email')}
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
            onFocus={() => {}}
            dense=""
            isAvailable={false}
            success={false}
            hintText=""
            keyboardType="default"
          />

          <Input
            secureTextEntry={false}
            label={I18n.t('editProfile.customer_input_landline')}
            value=""
            onChange={() => {}}
            iconSize={20}
            iconName="phone-classic"
            placeholder=""
            disabled={false}
            error={false}
            mode="flat"
            numberOnly=""
            maxLength={30}
            onFocus={() => {}}
            style={{}}
            dense=""
            isAvailable={false}
            success={false}
            hintText=""
            keyboardType="numeric"
          />
          <Input
            secureTextEntry={false}
            label={I18n.t('editProfile.customer_input_address')}
            value=""
            onChange={() => {}}
            iconSize={20}
            iconName="person-outline"
            placeholder=""
            disabled={false}
            error={false}
            mode="flat"
            numberOnly=""
            onFocus={() => {}}
            maxLength={30}
            style={{}}
            dense=""
            isAvailable={true}
            success={false}
            hintText=""
            keyboardType="default"
          />

          <Button
            style={{width: '70%'}}
            icon={() => (
              <Icon
                style={{position: 'absolute', left: -30, top: -12}}
                name={'pin-drop'}
                color={config.SKY_BLUE}
                size={25}
              />
            )}
            contentStyle={{borderColor: config.SKY_BLUE, borderWidth: 1}}
            labelStyle={[styles.buttonLocation]}
            mode="outlined"
            onPress={openModal}>
            {I18n.t('customerProfileEdit.customer_button_geo_location')}
          </Button>

          <Input
            secureTextEntry={false}
            label={I18n.t('customerProfileEdit.customer_input_address2')}
            value=""
            onChange={() => {}}
            iconSize={20}
            iconName="person-outline"
            placeholder=""
            disabled={false}
            error={false}
            mode="flat"
            numberOnly=""
            maxLength={30}
            style={{}}
            dense=""
            isAvailable={true}
            success={false}
            hintText=""
            keyboardType="default"
            onFocus={() => {}}
          />

          <DropDown
            options={options}
            placeholder={I18n.t('editProfile.customer_dropdown_district')}
          />
          <DropDown
            options={options}
            placeholder={I18n.t('editProfile.customer_dropdown_state')}
          />
          <Input
            secureTextEntry={false}
            label={I18n.t('editProfile.customer_input_latitude')}
            value=""
            onFocus={() => {}}
            onChange={() => {}}
            iconSize={20}
            iconName="pin-drop"
            placeholder=""
            disabled={false}
            error={false}
            mode="flat"
            numberOnly=""
            maxLength={30}
            style={{}}
            dense=""
            isAvailable={true}
            success={false}
            hintText=""
            keyboardType="default"
          />

          <Input
            secureTextEntry={false}
            label={I18n.t('editProfile.customer_input_adhar')}
            value=""
            onChange={() => {}}
            onFocus={() => {}}
            iconSize={20}
            iconName="file-document"
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
          />
          <Input
            secureTextEntry={false}
            label={I18n.t('editProfile.customer_input_pan')}
            value=""
            onChange={() => {}}
            iconSize={20}
            iconName="credit-card"
            placeholder=""
            onFocus={() => {}}
            disabled={false}
            error={false}
            mode="flat"
            numberOnly=""
            maxLength={30}
            style={{}}
            dense=""
            isAvailable={true}
            success={false}
            hintText=""
            keyboardType="default"
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
            labelStyle={[styles.button]}
            mode="contained"
            onPress={() => {}}>
            {I18n.t('editProfile.submit')}
          </Button>
        </>
      </PostAuthWrapper>
    </View>
  );
};

export default EditProfile;
