import React, { useState } from 'react';
import {View, Text, Image} from 'react-native';
import CONSTANTS from '../../constants/constants';
import styles from './AgentProfile.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconButton, Card, Title, Button} from 'react-native-paper';
import Header from '../../components/atoms/Header';
import I18n from "../../config/i18n";
import config from '../../config/colors';
import Input from '../../components/atoms/Input';
import PostAuthWrapper from '../../components/PostAuthWrapper';
import FooterTab from '../../components/atoms/FooterTab';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAgentProfile } from '../../api/agentApi';
import Spinner from 'react-native-loading-spinner-overlay';

const AgentProfileHome: any = ({ navigation }: { navigation: any }) => {
  
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');

  const [profileData, setprofileData] = useState({
    basicInfo: {
      id: null,
      name: null,
     
    },
    agencies: 0,
    stores: 0,
    staff: 0,
  });

  useFocusEffect(
    React.useCallback(() => {
      //Fetch Details for the Customer Profile HomeScreen
      setLoading(true)
      
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID','USER_ROLE'], (err, items) => {
        if (err) {
          console.warn(err);
        }
        setRole(items[2][1])
        getAgentProfile(items[1][1], items[0][1])
          .then(res => {
            console.log(res.data);
            setprofileData(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      });
    }, []),
  );

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

      <Header navigation={navigation} title={I18n.t('agentHome.header')} />
      <PostAuthWrapper
        EditRoute={'AgentProfileEdit'}
        
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
          profileData.basicInfo.address &&
          getUserAddress(profileData.basicInfo.address)
        }
        isAgencyHomePage={true}
        isEdit={true}>
        <View style={styles.cardBox}>
          <Card style={styles.cardContent} onPress={() => {
            navigation.navigate('AgentStaffList', {
              firstname: getSplitNames(0, profileData.basicInfo.name),
              lastname: getSplitNames(1, profileData.basicInfo.name),
                  });
                }}>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {I18n.t('agentHome.agency_employee')}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <Ionicons name={'people'} color={config.GREY} size={22} />
                <Text style={styles.text}>{profileData && profileData.staff}</Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={config.FADED_BLUE}
                size={18}
                
              />
            </Card.Actions>
          </Card>
          <Card style={styles.cardContent}  onPress={() => {
            navigation.navigate('AgentStoreList', {
              firstname: getSplitNames(0, profileData.basicInfo.name),
              lastname: getSplitNames(1, profileData.basicInfo.name),
                  });
                }}>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {I18n.t('customerProfileHome.menu_stores')}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <Ionicons name={'people'} color={config.GREY} size={22} />
                <Text style={styles.text}>
                {profileData && profileData.stores}
                </Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={config.FADED_BLUE}
                size={18}
               
              />
            </Card.Actions>
          </Card>
        </View>


        <View style={styles.cardBox}>
          <Card style={styles.cardContent}  onPress={() => {
            navigation.navigate('AgentAgencyList', {
              firstname: getSplitNames(0, profileData.basicInfo.name),
              lastname: getSplitNames(1, profileData.basicInfo.name),
                  });
                }}>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {I18n.t('customerProfileHome.menu_agency')}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <Ionicons name={'people'} color={config.GREY} size={22} />
                <Text style={styles.text}>
                {profileData && profileData.agencies}
                </Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={config.FADED_BLUE}
                size={18}
               
              />
            </Card.Actions>
          </Card>
        </View>

        {/* <View style={styles.cardBox}>
          <Card style={styles.cardContent}>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {CONSTANTS.agentHome.agency_godown}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <Icon name={'home'} color={config.GREY} size={15} />
                <Text style={styles.text}>0</Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={config.GREY}
                size={15}
                onPress={() => {
                  navigation.navigate('GodownAdd');
                }}
              />
            </Card.Actions>
          </Card>
          <Card style={styles.cardContent}>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {CONSTANTS.agentHome.agency_customer}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <Icon name={'groups'} color={config.GREY} size={15} />
                <Text style={styles.text}>0</Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={config.GREY}
                size={15}
                onPress={() => {
                  navigation.navigate('CustomerList');
                }}
              />
            </Card.Actions>
          </Card>
        </View>

        <View style={styles.cardBox}>
          <Card style={styles.cardContent}>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {CONSTANTS.agentHome.agency_planDetails}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <IconCommunity
                  name={'lightbulb-on-outline'}
                  color={config.GREY}
                  size={15}
                />
                <Text style={styles.redText}>
                  0 <Text style={{fontSize: 13,color:config.GREY}}>days</Text>
                </Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={config.GREY}
                size={15}
                onPress={() => console.log('Pressed')}
              />
            </Card.Actions>
          </Card>
          <Card style={styles.cardContent}>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {CONSTANTS.agencyHome.menu_delivery_slots}
              </Title>
            </Card.Content>
            <Card.Actions style={styles.action}>
              <View style={styles.iconBox}>
                <IconCommunity
                  name={'truck-delivery'}
                  color={config.GREY}
                  size={15}
                />
                <Text style={styles.text}>0</Text>
              </View>
              <IconButton
                icon="arrow-right"
                color={config.GREY}
                size={15}
                onPress={() => {
                  navigation.navigate('AddDeliverySlot');
                }}
              />
            </Card.Actions>
          </Card>
        </View> */}

        <View style={{marginTop:40}}></View>
        
      </PostAuthWrapper>


      <FooterTab navigation={navigation}
        onAddRoute={''}
        isAdd={false}
        onPress={() => {
          console.warn("Customr")
        }}
      />
    </View>
  );
};

export default AgentProfileHome;
