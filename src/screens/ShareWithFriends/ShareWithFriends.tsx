import React, {useState} from 'react';
import {View, ScrollView, Image, Text} from 'react-native';
import Header from '../../components/atoms/Header';
import PostAuthWrapper from '../../components/PostAuthWrapper';
import CONSTANTS from '../../constants/constants';
import I18n from "../../config/i18n";
import {Button} from 'react-native-paper';
import config from '../../config/colors';
import Input from '../../components/atoms/Input';
import styles from '../ShareWithFriends/ShareWithFriends.styles';
import FooterTab from '../../components/atoms/FooterTab';
import DropDown from '../../components/atoms/Dropdown';
import {Dialog, Portal} from 'react-native-paper';
import CustomAlert from '../../components/atoms/Modals/CustomeAlert';

const ShareWithFriends: any = ({navigation}: {navigation: any}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [omc, setOmc] = useState('');
  const [agency, setAgency] = useState('');
  const [submit, setSubmitted] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const share = () => {
    if (name.length < 1 || mobile.length < 1 || email.length < 1 || omc.length < 1 || agency.length < 1) {
      setErrorText(I18n.t('errorMessage.error_allFields'));
      setPopUp(true);
      return;
    }
    if(mobile.length <= 9){
      setErrorText(I18n.t('errorMessage.error_number'));
      setPopUp(true);
      return;
    }
    if(!re.test(email)){
      setErrorText(I18n.t('errorMessage.error_email'));
      setPopUp(true);
      return;
    }
  };
  const options = [
    {label: 'Indian Gas', value: 'IGS', key: 1},
    {label: 'HP Gas', value: 'HPGS', key: 2},
    {label: 'Bharat Gas', value: 'BGS', key: 3},
  ];
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title={I18n.t('shareWithFriends.header')}
      />
      <CustomAlert
        showDialog={popUp}
        setShowDialog={setPopUp}
        title={errorText}
      />
      <ScrollView>
        <PostAuthWrapper
          navigation={navigation}
          subtitle={I18n.t('shareWithFriends.text')}
          isAgencyHomePage={false}
          isEdit={false}
          isHelpCenter={true}>
          <View>
            <Input
              secureTextEntry={false}
              label={I18n.t('shareWithFriends.name')}
              value={name}
              onChange={text => setName(text)}
              iconName=""
              placeholder=""
              disabled={false}
              error={false}
              mode="flat"
              numberOnly=""
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
              label={I18n.t('shareWithFriends.mobile')}
              value={mobile}
              onChange={text => setMobile(text.replace(/[^0-9]/g, ''))}
              iconName=""
              placeholder=""
              disabled={false}
              error={false}
              mode="flat"
              numberOnly=""
              style={{}}
              dense=""
              isAvailable={false}
              success={false}
              hintText=""
              keyboardType="numeric"
              onFocus={() => {}}
              maxLength={10}
            />
            <Input
              secureTextEntry={false}
              label={I18n.t('shareWithFriends.email')}
              value={email}
              onChange={text => setEmail(text)}
              iconName=""
              placeholder=""
              disabled={false}
              error={false}
              mode="flat"
              numberOnly=""
              style={{}}
              dense=""
              isAvailable={false}
              success={false}
              hintText=""
              keyboardType="default"
              onFocus={() => {}}
            />
             <DropDown
                  options={options}
                  selectedValue={omc}
                  placeholder={I18n.t('ndCustomer.organizationalInfo.omcName')}
                  onChange={text => {
                    setOmc(text);
                  }}
              />
        
            <Input
              secureTextEntry={false}
              label={I18n.t('shareWithFriends.agency_name')}
              value={agency}
              onChange={text => setAgency(text)}
              iconName=""
              placeholder=""
              disabled={false}
              error={false}
              mode="flat"
              numberOnly=""
              style={{}}
              dense=""
              isAvailable={false}
              success={false}
              hintText=""
              keyboardType="default"
              onFocus={() => {}}
            />
          </View>

          <View style={{top: 5}}>
            <Button
              mode="contained"
              labelStyle={{color: config.WHITE}}
              onPress={() => {
                share();
              }}>
              {I18n.t('shareWithFriends.submit')}
            </Button>
          </View>

          <View>
            <Portal>
              <Dialog style={[styles.dialog]} visible={submit}>
                <Dialog.Content>
                  <View style={styles.innnerConatiner}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        marginTop: 20,
                        marginBottom: 20,
                      }}
                      //source={require('../../../../assets/icons/vector_tick.png')}
                      source={require('../../assets/icons/vector_tick.png')}
                    />
                    <Text style={styles.title}>
                      {I18n.t('shareWithFriends.success_msg')}
                    </Text>

                    <Button
                      style={{marginTop: 15}}
                      labelStyle={[styles.button]}
                      mode="contained"
                      onPress={() => {
                        setSubmitted(false);
                      }}>
                      {I18n.t('shareWithFriends.close_btn')}
                    </Button>
                  </View>
                </Dialog.Content>
              </Dialog>
            </Portal>
          </View>
        </PostAuthWrapper>
      </ScrollView>
      <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </View>
  );
};

export default ShareWithFriends;
