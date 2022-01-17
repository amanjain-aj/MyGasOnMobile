import React, {useRef} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Appbar, Divider, Provider, TouchableRipple} from 'react-native-paper';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

import {theme} from '../../../config/theme';
import config from '../../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './header.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CommonActions,
  StackActions,
  useFocusEffect,
} from '@react-navigation/native';
import CONSTANTS from '../../../constants/constants';
import constants from '../../../constants/constants';
import I18n from '../../../config/i18n';
import {useEffect} from 'react';

interface HeaderProps {
  title: any;
  navigation: any;
}

const Header = ({title, navigation}: HeaderProps) => {
  const [visible, setVisible] = React.useState(false);
  const [role, setRole] = React.useState('');
  const openSideMenu = () => {};
  const menu: any = useRef();

  const hideMenu = () => menu.current.hide();

  const showMenu = () => menu.current.show();

  const saveUser = (userId, password) => {
    const items = [
      ['REMBER_ME', 'OK'],
      ['LOGIN_ID', userId],
      ['PASS_CODE', password],
    ];
    AsyncStorage.multiSet(items, () => {
      navigation.dispatch(resetAction);
    });
  };

  const removeStorage = () => {
    AsyncStorage.multiGet(
      ['REMBER_ME', 'LOGIN_ID', 'PASS_CODE'],
      (err, items) => {
        if (err) {
          console.warn(err);
        }

        if (items[0][1] === 'OK') {
          let user = items[1][1];
          let pass = items[2][1];

          AsyncStorage.clear()
            .then(() => {
              saveUser(user, pass);
            })
            .catch(err => console.log(err));
        } else {
          AsyncStorage.clear()
            .then(() => {
              navigation.dispatch(resetAction);
            })
            .catch(err => console.log(err));
        }
      },
    );
  };

  const getRole = async () => {
    const role = await AsyncStorage.getItem('USER_ROLE');
    setRole(role);
  };
  useFocusEffect(() => {
    getRole();
  });
  useEffect(() => {
    getRole();
  }, []);
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: 'Auth'}],
  });

  return (
    <>
      <Appbar.Header
        statusBarHeight={30}
        style={{
          backgroundColor: config.NAVY_BLUE,
          paddingRight: 0,
          marginRight: 0,
        }}>
        <Icon
          name="menu"
          color={config.WHITE}
          size={20}
          style={{marginRight: 10,marginLeft:8, marginTop: -5}}
          onPress={() => {
            navigation.openDrawer();
          }}
        />

        <Appbar.Content
          title={title}
          titleStyle={{
            fontSize: 24,
            marginLeft: -20,
            marginTop: -5,
            alignItems: 'center',
            fontFamily: 'Open Sans',
          }}
        />
        <View style={styles.container}>
          <Menu
            ref={menu}
            style={{
              width: 200,
              padding: 10,
              top: 55,
              left: Dimensions.get('screen').width - 18,
            }}
            button={
              <Icon
                name="more-vert"
                color={config.WHITE}
                size={20}
                style={{
                  marginRight: 10,
                  marginTop:-5
                }}
                onPress={showMenu}
              />
            }>
            {role == 'ROLE_AGENCYMANAGER' && (
              <>
                <MenuItem
                  onPress={() => {
                    navigation.navigate('CustomMyProfile', {
                      screen: 'CustomProfile',
                    }),
                      hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.myProfile')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('Language'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changeLanguage')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('ChangePassword'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changePassword')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                     hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.holiday')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    // navigation.navigate('AgentProfileHome'),
                    hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.lead_generation')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    // navigation.navigate('ChannelPartnerProfileHome'),
                    hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.marketing')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('ShareWithFriends'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.share')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('HelpCenter'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.help')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={()=>{
                      hideMenu();
                      navigation.navigate('SafetyTips')
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.safety')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    navigation.navigate('AboutUs');
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.about')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    removeStorage();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.logout')}
                </MenuItem>
              </>
            )}
            {role == 'ROLE_GODOWNINCHARGE' && (
              <>
                <MenuItem
                  onPress={() => {
                    navigation.navigate('CustomMyProfile'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.myProfile')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('Language'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changeLanguage')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('ChangePassword'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changePassword')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    // navigation.navigate('AgentProfileHome'),
                    hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.lead_generation')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('ShareWithFriends'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.share')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('HelpCenter'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.help')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                   onPress={()=>{
                    hideMenu();
                    navigation.navigate('SafetyTips')
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.safety')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    navigation.navigate('AboutUs');
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.about')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    removeStorage();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.logout')}
                </MenuItem>
              </>
            )}
            {role == 'ROLE_DRIVER' && (
              <>
                <MenuItem
                  onPress={() => {
                    navigation.navigate('CustomMyProfile'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.myProfile')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('Language'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changeLanguage')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('ChangePassword'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changePassword')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    // navigation.navigate('AgentProfileHome'),
                    hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.lead_generation')}
                </MenuItem>
                <MenuDivider />

                <MenuItem
                  onPress={() => {
                    navigation.navigate('ShareWithFriends'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.share')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('HelpCenter'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.help')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                    onPress={()=>{
                      hideMenu();
                      navigation.navigate('SafetyTips')
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.safety')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    navigation.navigate('AboutUs');
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.about')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    removeStorage();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.logout')}
                </MenuItem>
              </>
            )}
            {role == 'ROLE_DELIVERYBOY' && (
              <>
                <MenuItem
                  onPress={() => {
                    navigation.navigate('CustomMyProfile'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.myProfile')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('Language'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changeLanguage')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('ChangePassword'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changePassword')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    // navigation.navigate('AgentProfileHome'),
                    hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.lead_generation')}
                </MenuItem>
                <MenuDivider />

                <MenuItem
                  onPress={() => {
                    navigation.navigate('ShareWithFriends'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.share')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('HelpCenter'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.help')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={()=>{
                    hideMenu();
                    navigation.navigate('SafetyTips')
                }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.safety')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    navigation.navigate('AboutUs');
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.about')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    removeStorage();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.logout')}
                </MenuItem>
              </>
            )}
            {role == 'ROLE_MECHANIC' && (
              <>
                <MenuItem
                  onPress={() => {
                    navigation.navigate('CustomMyProfile'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.myProfile')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('Language'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changeLanguage')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('ChangePassword'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changePassword')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    // navigation.navigate('AgentProfileHome'),
                    hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.lead_generation')}
                </MenuItem>
                <MenuDivider />

                <MenuItem
                  onPress={() => {
                    navigation.navigate('ShareWithFriends'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.share')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('HelpCenter'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.help')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                    onPress={()=>{
                      hideMenu();
                      navigation.navigate('SafetyTips')
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.safety')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    navigation.navigate('AboutUs');
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.about')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    removeStorage();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.logout')}
                </MenuItem>
              </>
            )}
            {role == 'ROLE_CLIENTMANAGER' && (
              <>
                <MenuItem
                  onPress={() => {
                    navigation.navigate('CustomMyProfile'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.myProfile')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('Language'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changeLanguage')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('ChangePassword'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changePassword')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    // navigation.navigate('CustomerProfileHome')
                    hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.calendar')}
                </MenuItem>
                <MenuDivider />

                <MenuItem
                  onPress={() => {
                    navigation.navigate('ShareWithFriends'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.share')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('HelpCenter'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.help')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                    onPress={()=>{
                      hideMenu();
                      navigation.navigate('SafetyTips')
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.safety')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    navigation.navigate('AboutUs');
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.about')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    removeStorage();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.logout')}
                </MenuItem>
              </>
            )}
            {role == 'ROLE_AGENT' && (
              <>
                <MenuItem
                  onPress={() => {
                    navigation.navigate('CustomMyProfile'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.myProfile')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('Language'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changeLanguage')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('ChangePassword'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changePassword')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    // navigation.navigate('CustomerProfileHome')
                    hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.calendar')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    // navigation.navigate('AgentProfileHome'),
                    hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.lead_generation')}
                </MenuItem>
                <MenuDivider />

                <MenuItem
                  onPress={() => {
                    navigation.navigate('ShareWithFriends'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.share')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('HelpCenter'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.help')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={()=>{
                    hideMenu();
                    navigation.navigate('SafetyTips')
                }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.safety')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    navigation.navigate('AboutUs');
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.about')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    removeStorage();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.logout')}
                </MenuItem>
              </>
            )}
            {role == 'ROLE_CHANNELPARTNER' && (
              <>
                <MenuItem
                  onPress={() => {
                    navigation.navigate('CustomMyProfile'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.myProfile')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('Language'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changeLanguage')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('ChangePassword'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.changePassword')}
                </MenuItem>

                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    // navigation.navigate('CustomerProfileHome')
                    hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.calendar')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    // navigation.navigate('AgentProfileHome'),
                    hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.lead_generation')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('ShareWithFriends'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.share')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    navigation.navigate('HelpCenter'), hideMenu();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.help')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                   onPress={()=>{
                    hideMenu();
                    navigation.navigate('SafetyTips')
                }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.safety')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    navigation.navigate('AboutUs');
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.about')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    removeStorage();
                  }}
                  textStyle={{textAlign: 'right', paddingRight: 25}}>
                  {I18n.t('popUpMenu.logout')}
                </MenuItem>
              </>
            )}
          </Menu>
        </View>
      </Appbar.Header>
    </>
  );
};

export default Header;
