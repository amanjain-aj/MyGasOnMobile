import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../components/atoms/Header';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import I18n from '../../../config/i18n';
import CONSTANTS from '../../../constants/constants';
import Input from '../../../components/atoms/Input';
import styles from './Customer.styles';
import config from '../../../config/colors';
import {Button} from 'react-native-paper';
import Dropdown from '../../../components/atoms/Dropdown';
import commonStyles from '../../../styles/common.styles';
import {
  AddContractForCustomer,
  GetContractByID,
  GetItemListing,
  UpdateContractForCustomer,
} from '../../../api/agencyApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const CustomerAddItem: any = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [itemOptions, setitemOptions] = useState([]);

  const [omcId, setOmcId] = useState('');
  const [consumerNo, setConsumerNo] = useState('');
  const [issuedCyl, setIssuedCyl] = useState('');
  const [issuedItem, setIssuedItem] = useState('');
  const [cylinderDeposit, setCyinderDeposit] = useState('');
  const [regulatoNumber, setRegulatorNumber] = useState('');
  const [regulatorDeposit, setRegulatorDeposit] = useState('');
  const [discount, setDiscout] = useState('');
  const [filename, setFileName] = useState('');
  const [svFormPath, setSvFormPath] = useState('');
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [loading, setloading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');

  const regEx = /^\d*\.?\d*$/;

  const [omcErr, setOmcErr] = useState(false);
  const [consumerNoErr, setconsumerNoErr] = useState(false);
  const [issuedCylErr, setissuedCylErr] = useState(false);
  const [cylinderDepositErr, setCylinderDepositErr] = useState(false);
  const [regulatorNoErr, setRegulatorNoErr] = useState(false);
  const [discountErr, setDiscountErr] = useState(false);
  const [regulatorDepositErr, setRegulatorDepositErr] = useState(false);

  useEffect(() => {
    setloading(true);
    AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
      if (err) {
        console.warn(err);
      }
      console.log('ID ' + route.params.custId);

      setToken(items[0][1]);
      setId(items[1][1]);
      GetItemListing(items[0][1], items[1][1], 1)
        .then(res => {
          setloading(false);
          var data = res.data;
          if (data.length > 0) {
            let list = [];
            data.forEach(item => {
              list.push({label: item.item.itemName, value: item.priceId});
            });
            setitemOptions(list);
          }

          if (route.params.type === 'edit') {
            GetContractByID(items[0][1], route.params.contractId)
              .then(res => {
                console.log(res.data);

                setOmcId(res.data.omcId);
                setConsumerNo(res.data.consumerNo);
                setIssuedCyl(res.data.issuedCyl.toString());
                setCyinderDeposit(res.data.cylSecurityDeposit.toString());
                setRegulatorNumber(res.data.regulatorSerialNo);
                setRegulatorDeposit(
                  res.data.regulatorSecurityDeposit.toString(),
                );
                setDiscout(res.data.cylSecurityDiscount.toString());
                setIssuedItem(res.data.itemPrice.priceId);
                setSvFormPath(res.data.svFormImagePath);
                setloading(false);
              })
              .catch(err => {
                setloading(false);
                console.log('Error1', err);
              });
          }
        })
        .catch(err => {
          setloading(false);
          console.log(err);
        });
    });
  }, []);

  const addContract = () => {

    if (omcId.length < 1) {
      setOmcErr(true);
      return;
    }
    if (consumerNo.length < 1) {
      setconsumerNoErr(true);
      return;
    }
    if (issuedCyl.length < 1) {
      setissuedCylErr(true);
      return;
    }
    if (cylinderDeposit.length < 1) {
      setCylinderDepositErr(true);
      return;
    }
    if (regulatoNumber.length < 1) {
      setRegulatorNoErr(true);
      return;
    }
    if (regulatorDeposit.length < 1) {
      setRegulatorDepositErr(true);
      return;
    }
    if (discount.length < 1) {
      setDiscountErr(true);
      return;
    }

    if(!regEx.test(cylinderDeposit)  || parseFloat(cylinderDeposit) < 0){
      setCylinderDepositErr(true)
       return;
     }
     if(!regEx.test(regulatorDeposit) || parseFloat(regulatorDeposit) < 0){
       setRegulatorDepositErr(true)
       return
     }
     if(!regEx.test(discount) || parseFloat(discount) < 0){
      setDiscountErr(true)
       return
     }


    setloading(true);
    const body = {
      omcId: omcId,
      consumerNo: consumerNo,
      issuedCyl: parseInt(issuedCyl),
      cylSecurityDeposit: parseInt(cylinderDeposit),
      cylSecurityDiscount: parseInt(discount),
      regulatorSerialNo: regulatoNumber,
      regulatorSecurityDeposit: parseInt(regulatorDeposit),
      svFormImagePath: svFormPath,
      remarks: 'No Remarks',
      customer: {
        id: route.params.custId,
      },
      agency: {
        id: id,
      },
      itemPrice: {
        priceId: issuedItem,
      },
    };
    if (route.params.type === 'edit') {
      UpdateContractForCustomer(token, body, route.params.contractId)
        .then(res => {
          setloading(false);
          console.log(res.status);
          if (res.status === 200) {
            navigation.goBack();
          }
        })
        .catch(err => {
          setloading(false);
          console.log('error ', err);
        });
    } else {
      AddContractForCustomer(token, body)
        .then(res => {
          setloading(false);
          console.log(res.status);
          if (res.status === 201) {
            navigation.goBack();
          }
        })
        .catch(err => {
          setloading(false);
          console.log('error ', err);
        });
    }
  };

  return (
    <View style={styles.container}>
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
        subtitle={I18n.t('customer.customer_title')}
        navigation={navigation}
        isAgencyHomePage={true}
        isEdit={false}>
        <Input
          secureTextEntry={false}
          label={I18n.t('customer.omc_id')}
          value={omcId}
          onChange={text => {
            setOmcId(text.replace(/[^0-9]/g, ''))
            setOmcErr(false)
          }}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('customer.omc_id')}
          disabled={false}
          error={omcErr}
          mode="flat"
          numberOnly=""
          maxLength={30}
          style={{}}
          dense=""
          isAvailable={false}
          success={false}
          hintText=""
          keyboardType="numeric"
          onFocus={() => {}}
        />
        {omcErr && (
          <Text style={commonStyles.errInput_txt}>
            {' '}
            {I18n.t('errorMessage.error_omc')}{' '}
          </Text>
        )}
        <Input
          secureTextEntry={false}
          label={I18n.t('customer.consumer_number')}
          value={consumerNo}
          onChange={text => {
            setConsumerNo(text)
          setconsumerNoErr(false)}}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('customer.consumer_number')}
          disabled={false}
          error={consumerNoErr}
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
        {consumerNoErr && (
          <Text style={commonStyles.errInput_txt}>
            {' '}
            {I18n.t('errorMessage.error_consumerName')}{' '}
          </Text>
        )}
        <Dropdown
          selectedValue={issuedItem}
          onChange={text => setIssuedItem(text)}
          options={itemOptions}
          placeholder={I18n.t('customer.issued_cylinder')}
        />

        <Input
          secureTextEntry={false}
          label={I18n.t('customer.issued_cyl')}
          value={issuedCyl}
          onChange={text => {
            setIssuedCyl(text.replace(/[^0-9]/g, ''))
            setissuedCylErr(false)
          }}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('customer.issued_cyl')}
          disabled={false}
          error={issuedCylErr}
          mode="flat"
          numberOnly=""
          maxLength={30}
          style={{}}
          dense=""
          isAvailable={false}
          success={false}
          hintText=""
          keyboardType="numeric"
          onFocus={() => {}}
        />

        {issuedCylErr && (
          <Text style={commonStyles.errInput_txt}>
            {' '}
            {I18n.t('errorMessage.error_issuedCyl')}{' '}
          </Text>
        )}

        <Input
          secureTextEntry={false}
          label={I18n.t('customer.cylinder_security')}
          value={cylinderDeposit}
          onChange={text => {
            setCyinderDeposit(text.replace(/[^0-9.]/g, ''))
            setCylinderDepositErr(false)
          }}
          iconSize={20}
          iconName="currency-inr"
          
          placeholder={I18n.t('customer.cylinder_security')}
          disabled={false}
          error={cylinderDepositErr}
          mode="flat"
          numberOnly=""
          maxLength={30}
          style={{}}
          dense=""
          isAvailable={false}
          success={false}
          hintText=""
          keyboardType="numeric"
          onFocus={() => {}}
        />
        {cylinderDepositErr && (
          <Text style={commonStyles.errInput_txt}>
            {' '}
            {I18n.t('errorMessage.error_cylinderDeposit')}{' '}
          </Text>
        )}
        <Input
          secureTextEntry={false}
          label={I18n.t('customer.regulator_serial')}
          value={regulatoNumber}
          onChange={text => {
            setRegulatorNumber(text)
            setRegulatorNoErr(false)
          }}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('customer.regulator_serial')}
          disabled={false}
          error={regulatorNoErr}
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
        {regulatorNoErr && (
          <Text style={commonStyles.errInput_txt}>
            {' '}
            {I18n.t('errorMessage.error_regulatorNumber')}{' '}
          </Text>
        )}

        <Input
          secureTextEntry={false}
          label={I18n.t('customer.regulatro_security')}
          value={regulatorDeposit}
          onChange={text => {
            setRegulatorDeposit(text.replace(/[^0-9.]/g, ''))
            setRegulatorDepositErr(false)
          }}
          iconSize={20}
          iconName="currency-inr"
          placeholder={I18n.t('customer.regulatro_security')}
          disabled={false}
          error={regulatorDepositErr}
          mode="flat"
          numberOnly=""
          maxLength={30}
          style={{}}
          dense=""
          isAvailable={false}
          success={false}
          hintText=""
          keyboardType="numeric"
          onFocus={() => {}}
        />
        {regulatorDepositErr && (
          <Text style={commonStyles.errInput_txt}>
            {' '}
            {I18n.t('errorMessage.error_regulatorDeposit')}{' '}
          </Text>
        )}
        <Input
          secureTextEntry={false}
          label={I18n.t('customer.discount')}
          value={discount}
          onChange={text => {
            setDiscout(text.replace(/[^0-9.]/g, ''))
            setDiscountErr(false)
          }}
          iconSize={20}
          iconName="currency-inr"
          placeholder={I18n.t('customer.discount')}
          disabled={false}
          error={discountErr}
          mode="flat"
          numberOnly=""
          maxLength={30}
          style={{}}
          dense=""
          isAvailable={false}
          success={false}
          hintText=""
          keyboardType="numeric"
          onFocus={() => {}}
        />

        {discountErr && (
          <Text style={commonStyles.errInput_txt}>
            {' '}
            {I18n.t('errorMessage.error_discount')}{' '}
          </Text>
        )}

        <View style={styles.upload_btn}>
          <Button
            // loading={loading}
            // disabled={loading}
            labelStyle={{color: config.DARK_GREY}}
            onPress={() => {}}>
            {I18n.t('customer.sv_form')}
          </Button>
        </View>

        <Input
          secureTextEntry={false}
          label={I18n.t('customer.file_name')}
          value={filename}
          onChange={text => setFileName(text)}
          iconSize={20}
          iconName=""
          placeholder={I18n.t('customer.file_name')}
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
        <Button
          icon={() => (
            <Icon
              style={{position: 'absolute', right: -105, top: -12}}
              name={'arrow-forward'}
              color={config.WHITE}
              size={25}
            />
          )}
          contentStyle={{flexDirection: 'row-reverse'}}
          labelStyle={styles.button}
          mode="contained"
          onPress={() => {
            addContract();
          }}>
          {I18n.t('customer.save')}
        </Button>
      </PostAuthWrapper>
    </View>
  );
};

export default CustomerAddItem;
