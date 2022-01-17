import React, {useState} from 'react';
import {View} from 'react-native';
import Header from '../../../components/atoms/Header';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import CONSTANTS from '../../../constants/constants';
import Input from '../../../components/atoms/Input';
import styles from './Staff.styles';
import {Button} from 'react-native-paper';
import {InviteStaff} from '../../../api/customerApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dropdown from '../../../components/atoms/Dropdown';
import * as yup from 'yup';
import I18n from '../../../config/i18n';
import CustomAlert from '../../../components/atoms/Modals/CustomeAlert';
import Spinner from 'react-native-loading-spinner-overlay';
import config from '../../../config/colors';
import FooterTab from '../../../components/atoms/FooterTab';
const loginValidationSchema = yup.object().shape({
  emailId: yup.string().email().required(),
  name: yup.string().required(),
  type: yup.string().required(),
  mobileNumber: yup
    .string()
    .min(10, ({min}) => I18n.t('ndCustomer.personalInfo.invalid_number'))
    .required(),
});

const StaffInvite: any = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [name, setname] = useState('');
  const [type, setType] = useState('');
  const [orgName, setOrgname] = useState('');
  const [orgFeild, setorgFeild] = useState(false);
  const [org, setOrgType] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOrg, setOrg] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');

  const options = [
    {
      label: I18n.t('dropdownOptions.staff_type.godown_incharge'),
      value: 'godownIncharge',
      key: 1,
    },
    {
      label: I18n.t('dropdownOptions.staff_type.delivery_boy'),
      value: 'deliveryBoy',
      key: 2,
    },
    {
      label: I18n.t('dropdownOptions.staff_type.driver'),
      value: 'driver',
      key: 3,
    },
    {
      label: I18n.t('dropdownOptions.staff_type.mechanic'),
      value: 'mechanic',
      key: 4,
    },
    {
      label: I18n.t('dropdownOptions.staff_type.agent'),
      value: 'agent',
      key: 5,
    },
    {
      label: I18n.t('dropdownOptions.staff_type.channel_partner'),
      value: 'channelPartner',
      key: 6,
    },
  ];

  const addStaff = () => {
    loginValidationSchema
      .isValid({
        emailId: email,
        type: type,
        name: name,
        mobileNumber: phone,
      })
      .then(valid => {
        if (valid) {
          var body = {};
          if (isOrg) {
            body = {
              mobileNumber: phone,
              emailId: email,
              name: name,
              role: type,
              orgName: orgName,
            };
          } else {
            body = {
              mobileNumber: phone,
              emailId: email,
              name: name,
              role: type,
            };
          }

          console.log(body)
          setLoading(true);
          AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
            if (err) {
              console.warn(err);
            } else {
              InviteStaff(items[0][1], body)
                .then(res => {
                  setLoading(false);
                  if (res.status === 200) {
                    navigation.goBack();
                  }
                })
                .catch(err => {
                  console.log(err);
                  setLoading(false);
                  setErrorText('Error\n' + err.response.data.message);
                  setPopUp(true);
                });
            }
          });
        } else {
          setErrorText(I18n.t('errorMessage.error_enterFields'));
          setPopUp(true);
          return;
        }
      });
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        showDialog={popUp}
        setShowDialog={setPopUp}
        title={errorText}
      />
      <Spinner
        visible={loading}
        size="large"
        textContent={I18n.t('loadingText.loading')}
        textStyle={{
          color: config.WHITE,
          fontSize: 12,
          marginTop: 2,
        }}
      />
      <Header
        navigation={navigation}
        title={I18n.t('agencyProfileEdit.header')}
      />
      <PostAuthWrapper
        titlePreFix={route.params.firstname}
        titlePostFix={route.params.lastname}
        subtitle={I18n.t('staff.staff_invite_title')}
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        <Input
          secureTextEntry={false}
          label={I18n.t('staff.staff_input_name')}
          value={name}
          onChange={text => setname(text)}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('staff.staff_input_name_placeholder')}
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
          label={I18n.t('staff.staff_input_email')}
          value={email}
          onChange={text => setemail(text)}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('staff.staff_input_email_placeholder')}
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
          label={I18n.t('staff.staff_input_phone')}
          value={phone}
          onChange={text => setphone(text.replace(/[^0-9]/g,''))}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('staff.staff_input_phone_placeholder')}
          disabled={false}
          error={false}
          mode="flat"
          numberOnly=""
          maxLength={10}
          style={{}}
          dense=""
          isAvailable={false}
          success={false}
          hintText=""
          keyboardType="numeric"
          onFocus={() => {}}
        />

        <Dropdown
          options={options}
          selectedValue={type}
          placeholder={I18n.t('staff.staff_input_employee_type')}
          onChange={text => {
            setType(text);
            if (text === 'agent' || text === 'channelPartner') {
              setOrg(true);
            } else {
              setOrg(false);
            }
          }}
        />

        {isOrg ? (
          <Input
            secureTextEntry={false}
            label={I18n.t('staff.staff_input_org')}
            value={orgName}
            onChange={text => setOrgname(text)}
            iconSize={20}
            iconName=""
            placeholder={I18n.t('staff.staff_input_org_placeholder')}
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
            onFocus={() => {}}
          />
        ) : null}

        <Button
          labelStyle={styles.button}
          mode="contained"
          onPress={() => {
            addStaff();
          }}>
          {I18n.t('staff.staff_invite')}
        </Button>
      </PostAuthWrapper>
      <FooterTab
        navigation={navigation}
        onAddRoute={''}
        isAdd={false}
        onPress={() => {
          console.warn('Customr');
        }}
      />
    </View>
  );
};

export default StaffInvite;
