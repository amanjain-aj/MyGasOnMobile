import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from '../../config/i18n';
import {IconButton, Card, Title, Button} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

import PostAuthWrapper from '../../components/PostAuthWrapper';
import styles from './AgencyProfile.styles';
import CONSTANTS from '../../constants/constants';
import Header from '../../components/atoms/Header';
import config from '../../config/colors';
import Input from '../../components/atoms/Input';
import FooterTab from '../../components/atoms/FooterTab';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAgencyProfile} from '../../api/agencyApi';
import CustomAlert from '../../components/atoms/Modals/CustomeAlert';
import {sendNotif} from '../../api/notificationsApi';


const AgencyProfileHome: any = ({navigation}: {navigation: any}) => {
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [longPress1, setLongPress1] = useState(false);
  const [longPress2, setLongPress2] = useState(false);
  const [longPress3, setLongPress3] = useState(false);
  const [longPress4, setLongPress4] = useState(false);
  const [longPress5, setLongPress5] = useState(false);
  const [longPress6, setLongPress6] = useState(false);
  const [longPress7, setLongPress7] = useState(false);
  const [longPress8, setLongPress8] = useState(false);
  const [role, setRole] = useState('');

  const [profileData, setprofileData] = useState({
    basicInfo: {
      id: null,
      name: null,
      address: {
        addressId: null,
        addressLine1: null,
        addressLine2: null,
        city: null,
        state: null,
        latitude: null,
        longitude: null,
      },
    },
    agents: 0,
    channelPartners: 0,
    customers: 0,
    godowns: 0,
    deliverySlots: 0,
    vehicles: 0,
    staff: 0,
  });

  useFocusEffect(
    React.useCallback(() => {
      //Fetch Details for the Customer Profile HomeScreen
      setLoading(true);
      setLongPress1(false);
      setLongPress2(false);
      setLongPress3(false);
      setLongPress4(false);
      setLongPress5(false);
      setLongPress6(false);
      setLongPress7(false);
      setLongPress8(false);
      AsyncStorage.multiGet(
        ['API_TOKEN', 'USER_ID', 'USER_ROLE'],
        (err, items) => {
          if (err) {
            console.warn(err);
          }
          setRole(items[2][1]);
          console.log(items[2][1]);
          getAgencyProfile(items[1][1], items[0][1])
            .then(res => {
              console.log('cdcdc', res.data);
              setprofileData(res.data);
              console.log('cdcd', profileData);
              setLoading(false);
            })
            .catch(err => {
              console.log(err);
              setLoading(false);
            });
        },
      );
    }, []),
  );

  const addSuggestion = () => {
    if (subject.length < 1 || message.length < 1) {
      setErrorText(I18n.t('errorMessage.error_allFields'));
      setPopUp(true);
      return;
    }
    // console.warn('call API')
  };

  const getUserAddress = address => {
    return (
      address.addressLine1 +
      ', ' +
      address.addressLine2 +
      ', ' +
      address.city +
      ', ' +
      address.state
    );
  };

  const getSplitNames = (position, str) => {
    if (position == 0) {
      return str.split(' ').slice(0, -1).join(' ');
    }

    if (position == 1) {
      return str.split(' ').slice(-1).join(' ');
    }
  };

  const sendNotification = () => {
    setLoader(true)
    AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
      if (err) {
        console.warn(err);
      }
      if (subject.length < 1 || message.length < 1) {
        setErrorText(I18n.t('notifications.all_fields'));
        setPopUp(true);
        setLoader(false)
        return;
      }
      const body = {
        agencyId: items[1][1],
        messageType: 'agencySuggestion',
        subject: subject,
        message: message,
      };
      sendNotif(items[0][1], body)
        .then(res => {
         
          if(res.status ==200){
            setErrorText(I18n.t('aboutUs.success'));
            setPopUp(true);
            setSubject('')
            setMessage('')
            setLoader(false)
            console.log(res.data);
          }
         
        })
        .catch(err => {
          setLoader(false)
          console.log('Error', err);
        });
    });
  };

  return (
    <View style={styles.container}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        size="large"
        textContent={'Loading...'}
        textStyle={{
          color: config.WHITE,
          fontSize: 12,
          marginTop: 2,
        }}
      />

      <CustomAlert
        showDialog={popUp}
        setShowDialog={setPopUp}
        title={errorText}
      />

      <Header navigation={navigation} title={I18n.t('agencyHome.header')} />
      <PostAuthWrapper
        titlePreFix={
          profileData.basicInfo.name &&
          getSplitNames(0, profileData.basicInfo.name)
        }
        titlePostFix={
          profileData.basicInfo.name &&
          getSplitNames(1, profileData.basicInfo.name)
        }
        navigation={navigation}
        subtitle={
          profileData.basicInfo.address.addressId &&
          getUserAddress(profileData.basicInfo.address)
        }
        isAgencyHomePage={true}
        EditRoute={'AgencyProfileEdit'}
        isEdit={role === 'ROLE_AGENCYMANAGER' ? true : false}>
        <View style={styles.cardBox}>
          <Card
            style={longPress1 ? styles.cardContent1 : styles.cardContent}
            onLongPress={() => {
              setLongPress1(!longPress1);
            }}
            onPress={() => {
              navigation.navigate('StaffList', {
                firstname: getSplitNames(0, profileData.basicInfo.name),
                lastname: getSplitNames(1, profileData.basicInfo.name),
              });
            }}>
            <Card.Content>
              <Title style={longPress1 ? styles.cardTitle1 : styles.cardTitle}>
                {I18n.t('agencyHome.menu_staff')}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <Ionicons
                  name={'people'}
                  color={longPress1 ? config.WHITE : config.GREY}
                  size={22}
                />
                <Text style={longPress1 ? styles.text1 : styles.text}>
                  {profileData && profileData.staff}
                </Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={longPress1 ? config.WHITE : config.FADED_BLUE}
                size={18}
              />
            </Card.Actions>
          </Card>

          <Card
            style={longPress2 ? styles.cardContent1 : styles.cardContent}
            onLongPress={() => {
              setLongPress2(!longPress2);
            }}
            onPress={() => {
              navigation.navigate('VehicleList', {
                firstname: getSplitNames(0, profileData.basicInfo.name),
                lastname: getSplitNames(1, profileData.basicInfo.name),
              });
            }}>
            <Card.Content>
              <Title style={longPress2 ? styles.cardTitle1 : styles.cardTitle}>
                {I18n.t('agencyHome.menu_vehicle')}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <IconCommunity
                  name={'truck-delivery'}
                  color={longPress2 ? config.WHITE : config.GREY}
                  size={22}
                />
                <Text style={longPress2 ? styles.text1 : styles.text}>
                  {profileData && profileData.vehicles}
                </Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={longPress2 ? config.WHITE : config.FADED_BLUE}
                size={18}
              />
            </Card.Actions>
          </Card>
        </View>
        <View style={styles.cardBox}>
          <Card
            style={longPress3 ? styles.cardContent1 : styles.cardContent}
            onLongPress={() => {
              setLongPress3(!longPress3);
            }}
            onPress={() => {
              navigation.navigate('GodownList', {
                firstname: getSplitNames(0, profileData.basicInfo.name),
                lastname: getSplitNames(1, profileData.basicInfo.name),
              });
            }}>
            <Card.Content>
              <Title style={longPress3 ? styles.cardTitle1 : styles.cardTitle}>
                {I18n.t('agencyHome.menu_goddown')}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <Icon
                  name={'home'}
                  color={longPress3 ? config.WHITE : config.GREY}
                  size={22}
                />
                <Text style={longPress3 ? styles.text1 : styles.text}>
                  {profileData && profileData.godowns}
                </Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={longPress3 ? config.WHITE : config.FADED_BLUE}
                size={18}
                onPress={() => {
                  navigation.navigate('GodownList', {
                    firstname: getSplitNames(0, profileData.basicInfo.name),
                    lastname: getSplitNames(1, profileData.basicInfo.name),
                  });
                }}
              />
            </Card.Actions>
          </Card>
          <Card
            style={longPress4 ? styles.cardContent1 : styles.cardContent}
            onLongPress={() => {
              setLongPress4(!longPress4);
            }}
            onPress={() => {
              navigation.navigate('CustomerList', {
                firstname: getSplitNames(0, profileData.basicInfo.name),
                lastname: getSplitNames(1, profileData.basicInfo.name),
              });
            }}>
            <Card.Content>
              <Title style={longPress4 ? styles.cardTitle1 : styles.cardTitle}>
                {I18n.t('agencyHome.menu_customers')}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <Icon
                  name={'groups'}
                  color={longPress4 ? config.WHITE : config.GREY}
                  size={22}
                />
                <Text style={longPress4 ? styles.text1 : styles.text}>
                  {profileData && profileData.customers}
                </Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={longPress4 ? config.WHITE : config.FADED_BLUE}
                size={18}
              />
            </Card.Actions>
          </Card>
        </View>
        <View style={styles.cardBox}>
          <Card
            style={longPress5 ? styles.cardContent1 : styles.cardContent}
            onLongPress={() => {
              setLongPress5(!longPress5);
            }}
            onPress={() => {
              navigation.navigate('DeliverySlotList', {
                firstname: getSplitNames(0, profileData.basicInfo.name),
                lastname: getSplitNames(1, profileData.basicInfo.name),
              });
            }}>
            <Card.Content>
              <Title style={longPress5 ? styles.cardTitle1 : styles.cardTitle}>
                {I18n.t('agencyHome.menu_delivery_slots')}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <IconCommunity
                  name={'truck-delivery'}
                  color={longPress5 ? config.WHITE : config.GREY}
                  size={22}
                />
                <Text style={longPress5 ? styles.text1 : styles.text}>
                  {profileData && profileData.deliverySlots}
                </Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={longPress5 ? config.WHITE : config.FADED_BLUE}
                size={18}
              />
            </Card.Actions>
          </Card>
          <Card
            style={longPress6 ? styles.cardContent1 : styles.cardContent}
            onLongPress={() => {
              setLongPress6(!longPress6);
            }}
            onPress={() =>
              navigation.navigate('AgentList', {
                firstname: getSplitNames(0, profileData.basicInfo.name),
                lastname: getSplitNames(1, profileData.basicInfo.name),
              })
            }>
            <Card.Content>
              <Title style={longPress6 ? styles.cardTitle1 : styles.cardTitle}>
                {I18n.t('agencyHome.menu_agent')}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <IconCommunity
                  name={'account-group'}
                  color={longPress6 ? config.WHITE : config.GREY}
                  size={22}
                />
                <Text style={longPress6 ? styles.text1 : styles.text}>
                  {profileData && profileData.agents}
                </Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={longPress6 ? config.WHITE : config.FADED_BLUE}
                size={18}
              />
            </Card.Actions>
          </Card>
        </View>
        <View style={styles.cardBox}>
          <Card
            style={longPress7 ? styles.cardContent1 : styles.cardContent}
            onLongPress={() => {
              setLongPress7(!longPress7);
            }}
            onPress={() => {
              navigation.navigate('ChannelPartnerList', {
                firstname: getSplitNames(0, profileData.basicInfo.name),
                lastname: getSplitNames(1, profileData.basicInfo.name),
              });
            }}>
            <Card.Content>
              <Title style={longPress7 ? styles.cardTitle1 : styles.cardTitle}>
                {I18n.t('agencyHome.menu_channel_partner')}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <IconCommunity
                  name={'account-group'}
                  color={longPress7 ? config.WHITE : config.GREY}
                  size={22}
                />

                <Text style={longPress7 ? styles.text1 : styles.text}>
                  {profileData && profileData.channelPartners}
                </Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={longPress7 ? config.WHITE : config.FADED_BLUE}
                size={18}
              />
            </Card.Actions>
          </Card>
          <Card
            style={longPress8 ? styles.cardContent1 : styles.cardContent}
            onLongPress={() => {
              setLongPress8(!longPress8);
            }}
            onPress={() => {
              navigation.navigate('BankList', {
                firstname: getSplitNames(0, profileData.basicInfo.name),
                lastname: getSplitNames(1, profileData.basicInfo.name),
                isBank:false
              });
            }}>
            <Card.Content>
              <Title style={longPress8 ? styles.cardTitle1 : styles.cardTitle}>
                {I18n.t('agencyHome.menu_bank')}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <IconCommunity
                  name={'bank'}
                  color={longPress8 ? config.WHITE : config.GREY}
                  size={22}
                />
                <Text style={longPress8 ? styles.text1 : styles.text}></Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={longPress8 ? config.WHITE : config.FADED_BLUE}
                size={18}
              />
            </Card.Actions>
          </Card>
        </View>
        <View style={styles.suggestionBox}>
          <Title style={styles.suggestionTitle}>
            {I18n.t('agencyHome.suggestion')}
          </Title>
          <Input
            secureTextEntry={false}
            label={I18n.t('agencyHome.subject')}
            value={subject}
            onChange={text => {
              setSubject(text);
            }}
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
            success={false}
            hintText=""
            isAvailable={false}
            keyboardType="default"
            onFocus={() => {}}
          />
          <Input
            secureTextEntry={false}
            label={I18n.t('agencyHome.message')}
            value={message}
            onChange={text => {
              setMessage(text);
            }}
            iconSize={20}
            iconName=""
            placeholder=""
            disabled={false}
            error={false}
            mode="flat"
            numberOnly=""
            maxLength={240}
            style={{}}
            dense=""
            success={false}
            hintText=""
            isAvailable={false}
            keyboardType="default"
            onFocus={() => {}}
          />
        </View>

        <Button
          labelStyle={styles.button}
          mode="contained"
          loading={loader}
          disabled={loader}
          onPress={() => {
            sendNotification();
          }}>
          {I18n.t('agencyHome.submit')}
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

export default AgencyProfileHome;
