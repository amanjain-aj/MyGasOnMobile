import React, { useState } from 'react';
import {Text, View} from 'react-native';

import CONSTANTS from '../../../constants/constants';
import I18n from "../../../config/i18n";
import AlertBox from '../../../components/atoms/Modals/CustomeAlert';

// import Button from '../../../components/atoms/Button';
import Input from '../../../components/atoms/Input';
import PreAuthFormWrapper from '../../../components/PreAuthFormWrapper';
import PreLoginLayout from '../../../components/PreLoginLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../../../styles/common.styles';
import {ScrollView} from 'react-native';
import * as yup from 'yup';
import constants from '../../../constants/constants';
import {Button} from 'react-native-paper';
import config from '../../../config/colors'
import styles from './TermsConditions.styles';

const loginValidationSchema = yup.object().shape({
  emailId: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  mobileNumber: yup
    .string()
    .min(10, ({min}) => I18n.t('ndCustomer.personalInfo.invalid_number'))
    .required(),
});

const RegisterAgencyOwnerDetails = ({navigation}) => {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');

  const validateForm = () => {
    loginValidationSchema
      .isValid({
        emailId: email,

        firstName: firstname,
        lastName: lastname,
        mobileNumber: mobile,
      })
      .then(valid => {
        if (valid) {
          navigation.navigate(
            'RegisterAgencyDetails',
            {
              personalInfo: {
                firstName: firstname,
                lastName: lastname,
                mobileNo: mobile,
                email: email,
              },
            },
          );
        } else {
          setErrorText(I18n.t('errorMessage.error_enterFields'));
          setPopUp(true)
        }
      });
  };

  return (
    <ScrollView >
      <AlertBox
          showDialog={popUp}
          setShowDialog={setPopUp}
          title={errorText}
        />
      <PreLoginLayout>
        <PreAuthFormWrapper
          titlePreFix={I18n.t('registration.agency.titlePre')}
          titlePostFix={I18n.t('registration.agency.titlePost')}>
          <>
            <Text
              style={{
                ...commonStyles.textAlignCenter,
                ...commonStyles.formTitle,
              }}>
              {I18n.t('registration.agency.ownerDetails.heading')}
            </Text>
            <View>
              <>
                <Input
                  placeholder={
                    I18n.t('registration.agency.ownerDetails.firstName')
                  }
                  value={firstname}
                  iconName="person"
                  onChange={(txt) => {
                    setfirstname(txt)
                  }}
                />
               
                <Input
                  placeholder={
                    I18n.t('registration.agency.ownerDetails.lastName')
                  }
                  value={lastname}
                  iconName="person"
                  onChange={(txt) => {
                    setlastname(txt)
                  }}
                />
               
                <Input
                  placeholder={
                    I18n.t('registration.agency.ownerDetails.mobileNumber')
                  }
                  value={mobile}
                  numberOnly
                  maxLength={10}
                  iconName="smartphone"
                  keyboardType='numeric'
                  onChange={(txt) => {
                    setmobile(txt.replace(/[^0-9]/g, ''))
                  }}
                />
               
                <Input
                  placeholder={
                    I18n.t('registration.agency.ownerDetails.emailId')
                  }
                  value={email}
                  iconName="email"
                  onChange={(txt) => {
                    setemail(txt)
                  }}
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
                
                  onPress={() => {
                    validateForm()
                  }}
                >{I18n.t('common.proceed')}</Button>
              </>
            </View>
          </>
        </PreAuthFormWrapper>
      </PreLoginLayout>
    </ScrollView>
  );
};

export default RegisterAgencyOwnerDetails;
