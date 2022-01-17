import React, {useState} from 'react';
import {View} from 'react-native';
import Header from '../../../components/atoms/Header';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import CONSTANTS from '../../../constants/constants';
import Input from '../../../components/atoms/Input';
import styles from './Bank.styles';
import {Button} from 'react-native-paper';
import {createBankInfo, getBankInfo, updateBankInfo} from '../../../api/agencyApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dropdown from '../../../components/atoms/Dropdown';
import * as yup from 'yup';
import I18n from '../../../config/i18n';
import CustomAlert from '../../../components/atoms/Modals/CustomeAlert';
import Spinner from 'react-native-loading-spinner-overlay';
import config from '../../../config/colors';
import FooterTab from '../../../components/atoms/FooterTab';
import {useEffect} from 'react';

const bankValidationSchema = yup.object().shape({
  // gateway: yup.string().required(),
  account: yup.string().required(),
  name: yup.string().required(),
  ifsc: yup
    .string()
    .min(11, ({min}) => I18n.t('bank.invalid_ifsc'))
    .required(),
});

const BankAdd: any = ({navigation, route}: {navigation: any; route: any}) => {
  const [gateway, setGateway] = useState('txnAgydcsdc213');
  const [account, setAccount] = useState('');
  const [name, setname] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (route.params.type === 'edit') {
      setLoading(true);

      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
        if (err) {
          console.warn(err);
        } else {
          getBankInfo(items[1][1], items[0][1])
            .then(res => {
              setLoading(false);
              if (res.status === 200) {
                console.log(res.data);
                // setAgencyList([res.data]);
                setname(res.data.bankName);
                setIfsc(res.data.ifscCode);
                setAccount(res.data.bankAccountNo);
              } else {
              }
            })
            .catch(err => {
              setLoading(false);
              console.log('Error' + err);
            });
        }
      });
    }
  }, []);

  const addBank = () => {
    bankValidationSchema
      .isValid({
        // gateway: gateway,
        account: account,
        name: name,
        ifsc: ifsc,
      })
      .then(valid => {
        if (valid) {
          setLoading(true);
          AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
            if (err) {
              console.warn(err);
            } else {
              const body = {
                paymentGatewayId: gateway,
                bankName: name,
                bankAccountNo: account,
                ifscCode: ifsc,
                agency: {
                  id: items[1][1],
                },
              };
              if (route.params.type !== 'add') {
                updateBankInfo(body, items[0][1],route.params.id)
                  .then(res => {
                    setLoading(false);
                    console.log("DATA",res.data);
                    if (res.status === 200) {
                      navigation.goBack();
                    }
                  })
                  .catch(err => {
                    console.log(err);
                    setLoading(false);
                    setErrorText('Error\n' + err);
                    setPopUp(true);
                  });
              } else {
                createBankInfo(body, items[0][1])
                  .then(res => {
                    setLoading(false);
                    console.log(res.data);
                    if (res.status === 200) {
                      navigation.goBack();
                    }
                  })
                  .catch(err => {
                    console.log(err.response.data);
                    setLoading(false);
                    setErrorText('Error\n' + err);
                    setPopUp(true);
                  });
              }
            }
          });
        } else {
          setErrorText(I18n.t('errorMessage.error_enterFields'));
          setPopUp(true);

          if (ifsc.length !== 11) {
            setErrorText(I18n.t('errorMessage.error_ifsc'));
            setPopUp(true);
            return;
          }
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
        subtitle={I18n.t('bank.add_new_bank')}
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        <Input
          secureTextEntry={false}
          label={I18n.t('bank.bank_input_gateway')}
          value={gateway}
          onChange={text => {
            setGateway(text);
          }}
          iconSize={20}
          iconName=""
          editable={false}
          placeholder={I18n.t('bank.bank_input_gateway_placeholder')}
          disabled={false}
          error={false}
          mode="flat"
          numberOnly=""
          // editable={false}
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
          label={I18n.t('bank.bank_input_name')}
          value={name}
          onChange={text => setname(text)}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('bank.bank_input_name_placeholder')}
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
          label={I18n.t('bank.bank_input_number')}
          value={account}
          onChange={text => setAccount(text)}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('bank.bank_input_number_placeholder')}
          disabled={false}
          error={false}
          mode="flat"
          numberOnly=""
          maxLength={20}
          style={{}}
          dense=""
          isAvailable={false}
          success={false}
          hintText=""
          keyboardType="numeric"
          onFocus={() => {}}
        />
        <Input
          secureTextEntry={false}
          label={I18n.t('bank.bank_ifsc')}
          value={ifsc}
          onChange={text => setIfsc(text)}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('bank.bank_ifsc_placeholder')}
          disabled={false}
          error={false}
          mode="flat"
          numberOnly=""
          maxLength={11}
          style={{}}
          dense=""
          isAvailable={false}
          success={false}
          hintText=""
          keyboardType="default"
          onFocus={() => {}}
        />
        {/* <Dropdown
          options={options}
          selectedValue={type}
          placeholder={I18n.t('staff.staff_input_employee_type')}
          onChange={text => {
            setType(text);
          }}
        /> */}

        <Button
          labelStyle={styles.button}
          mode="contained"
          onPress={() => {
            addBank();
          }}>
          {I18n.t('bank.bank_add')}
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

export default BankAdd;
