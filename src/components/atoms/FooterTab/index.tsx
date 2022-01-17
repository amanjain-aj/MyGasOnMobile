import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import styles from './FooterTab.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import config from '../../../config/colors';
import TabBarAdvancedButton from '../CustomTab/TabBarAdvancedButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface FooterTab {
  navigation: any;
  onAddRoute: string;
  isAdd: boolean;
  navigationData?: any;
}

const FooterTab = ({
  navigation,
  onAddRoute,
  isAdd,
  navigationData,
}: FooterTab) => {
  const [select, setselect] = useState(-1);
  const [role, setRole] = React.useState('');
  const getRole = async () => {
    const role = await AsyncStorage.getItem('USER_ROLE');
    setRole(role);
    console.log(role);
  };

  useFocusEffect(() => {
    getRole();
  });
  useEffect(() => {
    getRole();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tabView}>
        {role == 'ROLE_AGENCYMANAGER' && (
          <>
            <TouchableOpacity
              key={0}
              style={select === 0 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(0);
                navigation.navigate('Dashboard');
              }}>
              <IconCommunity name={'home'} size={23} color={config.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              key={1}
              style={select === 1 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(1);
                // navigation.navigate('OrderDetail');
              }}>
              <IconCommunity
                name={'truck-delivery'}
                size={23}
                color={config.WHITE}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={2}
              onPress={() => {
                setselect(2);
                // navigation.navigate('LeakageDetail');
              }}
              style={select === 2 ? styles.iconViewSelect : styles.iconView}>
              <Ionicons
                name={'ios-document-text'}
                size={23}
                color={config.WHITE}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={3}
              onPress={() => {
                // navigation.navigate('AddOrder');
                setselect(3);
              }}
              style={select === 3 ? styles.iconViewSelect : styles.iconView}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../../assets/icons/pos_footer.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={4}
              onPress={() => {
                // setselect(4);
                navigation.navigate('NotificationScreen');
              }}
              style={select === 4 ? styles.iconViewSelect : styles.iconView}>
              <IconCommunity name={'bell'} size={23} color={config.WHITE} />
            </TouchableOpacity>
            {/* <TouchableOpacity
          key={5}
          onPress={() => {
           
            setselect(5);
          }}
          style={select === 5 ? styles.iconViewSelect : styles.iconView}>
          <Icon name={'local-offer'} size={23} color={config.WHITE} />
        </TouchableOpacity> */}
          </>
        )}
        {role == 'ROLE_DRIVER' && (
          <>
            <TouchableOpacity
              key={0}
              style={select === 0 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(0);
                //navigation.navigate('Dashboard')
              }}>
              <IconCommunity name={'home'} size={23} color={config.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              key={1}
              style={select === 1 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(1);
                // navigation.navigate('OrderDetail');
              }}>
              <IconCommunity
                name={'truck-delivery'}
                size={23}
                color={config.WHITE}
              />
            </TouchableOpacity>

            <TouchableOpacity
              key={2}
              onPress={() => {
                setselect(2);
              }}
              style={select === 2 ? styles.iconViewSelect : styles.iconView}>
              <IconCommunity name={'bell'} size={23} color={config.WHITE} />
            </TouchableOpacity>
          </>
        )}
        {role == 'ROLE_DELIVERYBOY' && (
          <>
            <TouchableOpacity
              key={0}
              style={select === 0 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(0);
                //navigation.navigate('Dashboard')
              }}>
              <IconCommunity name={'home'} size={23} color={config.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              key={1}
              style={select === 1 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(1);
                // navigation.navigate('OrderDetail');
              }}>
              <IconCommunity
                name={'truck-delivery'}
                size={23}
                color={config.WHITE}
              />
            </TouchableOpacity>

            <TouchableOpacity
              key={2}
              onPress={() => {
                setselect(2);
              }}
              style={select === 2 ? styles.iconViewSelect : styles.iconView}>
              <IconCommunity name={'bell'} size={23} color={config.WHITE} />
            </TouchableOpacity>
          </>
        )}
        {role == 'ROLE_GODOWNINCHARGE' && (
          <>
            <TouchableOpacity
              key={0}
              style={select === 0 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(0);
                //navigation.navigate('Dashboard')
              }}>
              <IconCommunity name={'home'} size={23} color={config.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              key={1}
              style={select === 1 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(1);
                // navigation.navigate('OrderDetail');
              }}>
              <IconCommunity
                name={'truck-delivery'}
                size={23}
                color={config.WHITE}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={2}
              onPress={() => {
                setselect(2);
                // navigation.navigate('LeakageDetail');
              }}
              style={select === 2 ? styles.iconViewSelect : styles.iconView}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../../assets/icons/imb_footer.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              key={3}
              onPress={() => {
                setselect(3);
              }}
              style={select === 3 ? styles.iconViewSelect : styles.iconView}>
              <IconCommunity name={'bell'} size={23} color={config.WHITE} />
            </TouchableOpacity>
          </>
        )}
        {role == 'ROLE_MECHANIC' && (
          <>
            <TouchableOpacity
              key={0}
              style={select === 0 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(0);
                //navigation.navigate('Dashboard')
              }}>
              <IconCommunity name={'home'} size={23} color={config.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              key={1}
              style={select === 1 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(1);
                // navigation.navigate('OrderDetail');
              }}>
              <IconCommunity
                name={'truck-delivery'}
                size={23}
                color={config.WHITE}
              />
            </TouchableOpacity>

            <TouchableOpacity
              key={2}
              onPress={() => {
                setselect(2);
              }}
              style={select === 2 ? styles.iconViewSelect : styles.iconView}>
              <IconCommunity name={'bell'} size={23} color={config.WHITE} />
            </TouchableOpacity>
          </>
        )}
        {role == 'ROLE_CLIENTMANAGER' && (
          <>
            <TouchableOpacity
              key={0}
              style={select === 0 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(0);
                navigation.navigate('Dashboard');
              }}>
              <IconCommunity name={'home'} size={23} color={config.WHITE} />
            </TouchableOpacity>

            <TouchableOpacity
              key={1}
              onPress={() => {
                setselect(1);
                // navigation.navigate('LeakageDetail');
              }}
              style={select === 1 ? styles.iconViewSelect : styles.iconView}>
              <Ionicons
                name={'ios-document-text'}
                size={23}
                color={config.WHITE}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={2}
              onPress={() => {
                // navigation.navigate('AddOrder');
                setselect(2);
              }}
              style={select === 2 ? styles.iconViewSelect : styles.iconView}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../../assets/icons/pay_footer.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={3}
              onPress={() => {
                // navigation.navigate('AddOrder');
                setselect(3);
              }}
              style={select === 3 ? styles.iconViewSelect : styles.iconView}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../../assets/icons/imb_footer.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={4}
              onPress={() => {
                setselect(4);
              }}
              style={select === 4 ? styles.iconViewSelect : styles.iconView}>
              <IconCommunity name={'bell'} size={23} color={config.WHITE} />
            </TouchableOpacity>
          </>
        )}
        {role == 'ROLE_AGENT' && (
          <>
            <TouchableOpacity
              key={0}
              style={select === 0 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(0);
                //navigation.navigate('Dashboard')
              }}>
              <IconCommunity name={'home'} size={23} color={config.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              key={1}
              style={select === 1 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(1);
                // navigation.navigate('OrderDetail');
              }}>
              <IconCommunity
                name={'truck-delivery'}
                size={23}
                color={config.WHITE}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={2}
              onPress={() => {
                // navigation.navigate('AddOrder');
                setselect(2);
              }}
              style={select === 2 ? styles.iconViewSelect : styles.iconView}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../../assets/icons/pay_footer.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={3}
              onPress={() => {
                // navigation.navigate('AddOrder');
                setselect(3);
              }}
              style={select === 3 ? styles.iconViewSelect : styles.iconView}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../../assets/icons/imb_footer.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={4}
              onPress={() => {
                setselect(4);
              }}
              style={select === 4 ? styles.iconViewSelect : styles.iconView}>
              <IconCommunity name={'bell'} size={23} color={config.WHITE} />
            </TouchableOpacity>
          </>
        )}
        {role == 'ROLE_CHANNELPARTNER' && (
          <>
            <TouchableOpacity
              key={0}
              style={select === 0 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(0);
                //navigation.navigate('Dashboard')
              }}>
              <IconCommunity name={'home'} size={23} color={config.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              key={1}
              style={select === 1 ? styles.iconViewSelect : styles.iconView}
              onPress={() => {
                setselect(1);
                // navigation.navigate('OrderDetail');
              }}>
              <IconCommunity
                name={'truck-delivery'}
                size={23}
                color={config.WHITE}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={2}
              onPress={() => {
                // navigation.navigate('AddOrder');
                setselect(2);
              }}
              style={select === 2 ? styles.iconViewSelect : styles.iconView}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../../assets/icons/pay_footer.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={3}
              onPress={() => {
                // navigation.navigate('AddOrder');
                setselect(3);
              }}
              style={select === 3 ? styles.iconViewSelect : styles.iconView}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../../assets/icons/imb_footer.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={4}
              onPress={() => {
                setselect(4);
              }}
              style={select === 4 ? styles.iconViewSelect : styles.iconView}>
              <IconCommunity name={'bell'} size={23} color={config.WHITE} />
            </TouchableOpacity>
          </>
        )}
      </View>
      {isAdd ? (
        <View style={styles.addButton}>
          <TabBarAdvancedButton
            bgColor={config.NAVY_BLUE}
            icon="add"
            onPress={() => {
              console.log("hy",onAddRoute);

              navigation.navigate(onAddRoute, navigationData && navigationData);
              setselect(-1);
            }}
          />
        </View>
      ) : (
        <View style={styles.noTabView}></View>
      )}
    </View>
  );
};

export default FooterTab;
