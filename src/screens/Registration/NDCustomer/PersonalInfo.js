import React, {useState} from 'react';
import {Text, View} from 'react-native';

import CONSTANTS from './../../../constants/constants';
import I18n from "../../../config/i18n";

import Button from './../../../components/atoms/Button';
import Input from './../../../components/atoms/Input';
import PreAuthFormWrapper from './../../../components/PreAuthFormWrapper';
import PreLoginLayout from './../../../components/PreLoginLayout';
import AlertBox from '../../../components/atoms/Modals/CustomeAlert';
import commonStyles from './../../../styles/common.styles';
import {ScrollView} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import constants from './../../../constants/constants';

const loginValidationSchema = yup.object().shape({
  emailId: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  mobileNumber: yup
    .string()
    .min(10, ({min}) => I18n.t('ndCustomer.personalInfo.invalid_number'))
    .required(),
});

const RegisterNDCustomerPersonalInfo = ({navigation}) => {
  const [firstname, setfirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');

  const [popUp, setPopUp] = useState(false);

  const validateFormData = () => {
    loginValidationSchema
      .isValid({
        emailId: email,
        firstName: firstname,
        lastName: lastname,
        mobileNumber: mobile,
      })
      .then(valid => {
        if (valid) {
          navigation.navigate('RegisterNDCustomerOrganizationalInfo', {
            personalInfo: {
              firstName: firstname,
              lastName: lastname,
              mobileNo: mobile,
              email: email,
            },
          });
        } else {
          // alert(constants.errorMessage.error_enterFields);
          setPopUp(true);
        }
      })
      .catch(err => {
        // alert(constants.errorMessage.error_enterFields);
        setPopUp(true);
      });
  };

  return (
    <ScrollView>
      <PreLoginLayout>
        <AlertBox
          showDialog={popUp}
          setShowDialog={setPopUp}
          title={I18n.t('errorMessage.error_enterFields')}
        />
        <PreAuthFormWrapper
          titlePreFix={I18n.t('ndCustomer.titlePre')}
          titlePostFix={I18n.t('ndCustomer.titlePost')}>
          <>
            <Text
              style={{
                ...commonStyles.textAlignCenter,
                ...commonStyles.formTitle,
              }}>
              {I18n.t('ndCustomer.personalInfo.heading')}
            </Text>
            <View>
              <>
                <Input
                  name="firstName"
                  placeholder={I18n.t('ndCustomer.personalInfo.firstName')}
                  value={firstname}
                  iconName="person"
                  onChange={text => {
                    setfirstname(text);
                  }}
                />

                <Input
                  name="lastName"
                  placeholder={I18n.t('ndCustomer.personalInfo.lastName')}
                  value={lastname}
                  iconName="person"
                  onChange={text => {
                    setLastname(text);
                  }}
                />

                <Input
                  name="mobileNumber"
                  placeholder={I18n.t('ndCustomer.personalInfo.mobileNumber')}
                  value={mobile}
                  numberOnly
                  maxLength={10}
                  iconName="smartphone"
                  onChange={txt => {
                    setmobile(txt.replace(/[^0-9]/g, ''));
                  }}
                  keyboardType="numeric"
                />

                <Input
                  name="emailId"
                  placeholder={I18n.t('ndCustomer.personalInfo.emailId')}
                  value={email}
                  iconName="email"
                  onChange={text => {
                    setemail(text);
                  }}
                />

                <Button
                  label={I18n.t('common.proceed')}
                  onPress={() => {
                    validateFormData();
                  }}
                />
              </>
            </View>
          </>
        </PreAuthFormWrapper>
      </PreLoginLayout>
    </ScrollView>
  );
};

export default RegisterNDCustomerPersonalInfo;
