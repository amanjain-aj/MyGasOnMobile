import React, {useEffect, useState} from 'react';
import {Text, CheckBox, View, Modal, Pressable, Image} from 'react-native';

import CONSTANTS from './../../../constants/constants';
import I18n from "../../../config/i18n";
import {registerAgencyUser} from '../../../api/authentication';

import {Button, Portal, Dialog} from 'react-native-paper';
import Input from './../../../components/atoms/Input';
import PreAuthFormWrapper from './../../../components/PreAuthFormWrapper';
import PreLoginLayout from './../../../components/PreLoginLayout';
import config from '../../../config/colors';

import commonStyles from './../../../styles/common.styles';
import styles from './../../Login/Login.styles';
import termsStyles from './TermsConditions.styles';
import {ScrollView} from 'react-native';
import AlertBox from '../../../components/atoms/Modals/CustomeAlert';

import {Formik} from 'formik';
import * as yup from 'yup';
import {CommonActions} from '@react-navigation/native';
import constants from './../../../constants/constants';

const loginValidationSchema = yup.object().shape({
  userID: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

const RegisterAgencyPasswordSecurity = ({navigation, route}) => {
  const [isTermsSelected, setTermsConditions] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleSignUp, setModalVisibleSignUp] = useState(false);
  const [loading, setloading] = useState(false);

  const [userId, setuserId] = useState('');
  const [password, setpassword] = useState('');
  const [confirm, setconfirm] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: 'Auth'}],
  });

  useEffect(() => {
    setuserId(route.params.authInfo.personalInfo.mobileNo);
    // console.log(route.params.authInfo.personalInfo.mobileNo)
  }, []);

  const registerUser = (userId, passkey) => {
    const body = {
      orgInfo: route.params.orgInfo,
      authInfo: {
        loginInfo: {
          userId: userId,
          password: passkey,
          agreed: true,
        },
        personalInfo: route.params.authInfo.personalInfo,
      },
    };
    console.log(body);

    registerAgencyUser(body)
      .then(response => {
        console.log(response.data);
        setloading(false);
        if (response.status === 200) {
          setModalVisibleSignUp(true);
        } else {
          setErrorText(I18n.t('errorMessage.error_register'));
          setPopUp(true);
        }
      })
      .catch(err => {
        console.log(err);
        setErrorText(err.response.data.message);
        setPopUp(true);
      });
  };

  return (
    <ScrollView>
      <AlertBox showDialog={popUp} setShowDialog={setPopUp} title={errorText} />
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
              {I18n.t('registration.agency.passwordSecurity.heading')}
            </Text>

            <>
              <Input
                placeholder={I18n.t('ndCustomer.passwordSecurity.userId')}
                value={userId}
                iconName="person"
                onChange={txt => {
                  setuserId(txt);
                }}
              />

              <Input
                placeholder={I18n.t('ndCustomer.passwordSecurity.password')}
                value={password}
                iconName="account-key"
                isAvailable = {false}
                onChange={txt => {
                  setpassword(txt);
                }}
                secureTextEntry
              />

              <Input
                placeholder={
                  I18n.t('ndCustomer.passwordSecurity.confirmPassword')
                }
                value={confirm}
                iconName="account-key"
                isAvailable = {false}
                onChange={txt => {
                  setconfirm(txt);
                }}
                secureTextEntry
              />

              <View style={termsStyles.terms}>
                <CheckBox
                  value={isTermsSelected}
                  onValueChange={setTermsConditions}
                  tintColors={{true: config.SKY_BLUE, false: config.SKY_BLUE}}
                />

                <Text style={termsStyles.Iagree_txt}>
                  {I18n.t('termsAndConditions.termsConditions')}
                </Text>
                <Pressable
                  style={{marginLeft: 5}}
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      color: config.SKY_BLUE,
                    }}>
                    {I18n.t('termsAndConditions.termsConditions_btn')}
                  </Text>
                </Pressable>
              </View>

              <View>
                <Portal>
                  <Dialog
                    style={[termsStyles.terms_modal]}
                    visible={isModalVisible}
                    onDismiss={() => {
                      setModalVisible(false);
                      
                    }}>
                    <Dialog.Content style={termsStyles.dialogContent}>
                      <View style={termsStyles.innnerConatiner}>
                        <View>
                          <Text style={termsStyles.modal_heading}>
                            {I18n.t('termsAndConditions.termsConditions_btn')}
                          </Text>
                        </View>
                        <View>
                          <Text style={termsStyles.modal_condition_txt}>
                            {I18n.t('termsAndConditions.conditions')}
                          </Text>
                        </View>

                        <Pressable
                          style={{marginTop: 20}}
                          onPress={() => setModalVisible(!isModalVisible)}>
                          <Button
                            style={{
                              paddingLeft: 80,
                              paddingRight: 80,
                            }}
                            labelStyle={{color: config.WHITE}}
                            mode="contained">
                            {I18n.t('termsAndConditions.close_btn')}
                          </Button>
                        </Pressable>
                      </View>
                    </Dialog.Content>
                  </Dialog>
                </Portal>
              </View>

              <Portal>
                <Dialog
                  style={[termsStyles.terms_modal_Sign_ND]}
                  visible={isModalVisibleSignUp}
                  onDismiss={() => {}}>
                  <Dialog.Content style={termsStyles.dialogContent}>
                    <View style={termsStyles.innnerConatiner}>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          marginTop: 10,
                          marginBottom: 20,
                        }}
                        source={require('./../../../assets/icons/vector_tick.png')}
                      />
                      <View style={termsStyles.modal_Sign_space}>
                        <Text style={termsStyles.modal_Sign_heading}>
                          {I18n.t('signup_ND.agency_lpg_msg')}
                        </Text>
                      </View>

                      <View style={termsStyles.modal_Sign_space}>
                        <Text style={termsStyles.modal_Sign_txt}>
                          {I18n.t('signup_ND.signup_text')}
                        </Text>
                      </View>

                      <View style={termsStyles.btn_modal_Sign_space}>
                        <Button
                          style={termsStyles.btn_SignUp_ND_Modal}
                          labelStyle={termsStyles.btn_SignUp_ND_Modal_2}
                          mode="contained"
                          onPress={() => {
                            setModalVisibleSignUp(false);
                            navigation.dispatch(resetAction);
                          }}>
                          {I18n.t('signup.click_login_btn')}
                        </Button>
                      </View>
                    </View>
                  </Dialog.Content>
                </Dialog>
              </Portal>

              <Pressable style={{marginBottom: 30}}>
                <Button
                  labelStyle={styles.button}
                  mode="contained"
                  loading={loading}
                  disabled={loading}
                  onPress={() => {
                    loginValidationSchema
                      .isValid({
                        userID: userId,
                        password: password,
                        confirmPassword: confirm,
                      })
                      .then(valid => {
                        if (valid) {
                          if (!isTermsSelected) {
                            setErrorText(I18n.t('errorMessage.terms'));
                            setPopUp(true);
                            return
                          }
                          if (password.length < 6) {
                            setErrorText(
                              I18n.t('errorMessage.error_password_strength'),
                            );
                            setPopUp(true);
                            return
                          }
                          if (password === confirm) {
                            registerUser(userId, confirm);
                          } else {
                            setErrorText(
                              I18n.t('errorMessage.error_password_match'),
                            );
                            setPopUp(true);
                          }
                        } else {
                          setErrorText(I18n.t('errorMessage.error_allFields'));
                          setPopUp(true);
                        }
                      });
                    //setModalVisibleSignUp(true)
                  }}>
                  {I18n.t('common.signUp')}
                </Button>
              </Pressable>
            </>
          </>
        </PreAuthFormWrapper>
      </PreLoginLayout>
    </ScrollView>
  );
};

export default RegisterAgencyPasswordSecurity;
