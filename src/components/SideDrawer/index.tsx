import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Image, View} from 'react-native';
import styles from './sidedrawer.styles';
import {Avatar, Caption, Drawer, Paragraph, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../../components/SideDrawer';
import config from '../../config/colors';
import CONSTANTS from '../../constants/constants';
import I18n from '../../config/i18n';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {} from '../../screens/OrderManagment/AgencyOrderCreate';

const SideDrawer = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role,setRole] = useState('')
  const [photoPath,setPhotoPath] = useState('')

  const getRole = async() => {  
    const role = await AsyncStorage.getItem('USER_ROLE');
    setRole(role);
    
    
    }
    
 


  useFocusEffect(()=>{
      getRole();
  })
  
  useEffect(() => {
    AsyncStorage.multiGet(['USER_NAME', 'USER_EMAIL','LOGIN_ID','USERNAME'], (err, items) => {
      if (err) {
        console.warn(err);
      } else {
       
        setName(items[0][1])
        setEmail(items[1][1])
        setPhotoPath(items[3][1])
        getRole();
      }
    })
    
  }, [])

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView 
        contentContainerStyle={{
          paddingTop:0
         }}
      >
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection} >
            <View style={{flexDirection: 'column',marginTop: 20}}>
              <Avatar.Image
                source={photoPath == null ? require('../../assets/images/avatar.png')
                  : { uri:`http://34.73.73.156:80/profile/${photoPath}?height=80&width=80&random=${Math.random().toString(36).substring(7)}`}}
                size={48}
                
              />
              <View style={{flexDirection: 'column'}}>
                <Title style={styles.title}>
                  {name}
                </Title>
                <Caption style={styles.caption}>
                  {email}
                </Caption>
              </View>
            </View>
          </View>
          {role == 'ROLE_AGENCYMANAGER' && 
          <>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              focused={true}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/dashboard.png')}
                />
              )}
              label={I18n.t('sideBarMenu.dashboard')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
          </Drawer.Section>
         
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              

              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.organisation')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('MyOrganization',{screen:'Home'})

              }}
            />
          </Drawer.Section>
      
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/order_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.order_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // if(role == 'ROLE_AGENCYMANAGER'){
                
                //   navigation.navigate('AgencyOrderCreate');
                // }else{
                  
                //   navigation.navigate('OrderCreation');
                // }
                navigation.navigate('OrderManagement',{screen: 'OrderManagement',role: role})

              }}
            />
          </Drawer.Section>
          
        
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/vehicle.png')}
                />
              )}
              label={I18n.t('sideBarMenu.trip_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('TripManagment',{screen: 'TripManagment'})
              }}
            />
          </Drawer.Section>
           
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/item_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.item_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('ItemManagment',{screen:'ItemListing'});
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/imbalance.png')}
                />
              )}
              label={I18n.t('sideBarMenu.imabalance_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('ImbalanceManagment')

              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/defective_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.defective_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('DefectManagment');
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/rupees_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.payment_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('PaymentManagment');
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/notice.png')}
                />
              )}
              label={CONSTANTS.sideBarMenu.stock_management}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {}}
            />
          </Drawer.Section> */}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/leak_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.leak_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('LeakManagment')
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/reports.png')}
                />
              )}
              label={I18n.t('sideBarMenu.pos')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {}}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/reports.png')}
                />
              )}
              label={I18n.t('sideBarMenu.reports')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {}}
            />
          </Drawer.Section>
          
          </>
        } 
          {role == 'ROLE_DRIVER' && 
          <>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              focused={true}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/dashboard.png')}
                />
              )}
              label={I18n.t('sideBarMenu.dashboard')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
          </Drawer.Section>
         
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              

              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.organisation')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('MyOrganization',{screen:'Home'})

              }}
            />
          </Drawer.Section>
      
        
          
        
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/vehicle.png')}
                />
              )}
              label={I18n.t('sideBarMenu.trip_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('TripManagment')
              }}
            />
          </Drawer.Section>
           
         
          
          {/* <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/notice.png')}
                />
              )}
              label={CONSTANTS.sideBarMenu.stock_management}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {}}
            />
          </Drawer.Section> */}
        
         
          
          
          </>
        } 
          {role == 'ROLE_DELIVERYBOY' && 
          <>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              focused={true}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/dashboard.png')}
                />
              )}
              label={I18n.t('sideBarMenu.dashboard')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
          </Drawer.Section>
         
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              

              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.organisation')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('MyOrganization',{screen:'Home'})

              }}
            />
          </Drawer.Section>
      
        
          
        
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/vehicle.png')}
                />
              )}
              label={I18n.t('sideBarMenu.trip_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('TripManagment')
              }}
            />
          </Drawer.Section>
           
        
          {/* <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/notice.png')}
                />
              )}
              label={CONSTANTS.sideBarMenu.stock_management}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {}}
            />
          </Drawer.Section> */}
             <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/leak_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.leak_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('LeakManagment')
              }}
            />
          </Drawer.Section>
         
       
     
          
          </>
        } 
          {role == 'ROLE_GODOWNINCHARGE' && 
          <>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              focused={true}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/dashboard.png')}
                />
              )}
              label={I18n.t('sideBarMenu.dashboard')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              

              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.organisation')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('MyOrganization',{screen:'Home'})

              }}
            />
          </Drawer.Section>
          
        
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/vehicle.png')}
                />
              )}
              label={I18n.t('sideBarMenu.trip_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('TripManagment')
              }}
            />
          </Drawer.Section>
           
         
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/imbalance.png')}
                />
              )}
              label={I18n.t('sideBarMenu.imabalance_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('ImbalanceManagment')

              }}
            />
          </Drawer.Section>
         
        
          {/* <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/notice.png')}
                />
              )}
              label={CONSTANTS.sideBarMenu.stock_management}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {}}
            />
          </Drawer.Section> */}
         
        
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/reports.png')}
                />
              )}
              label={I18n.t('sideBarMenu.reports')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {}}
            />
          </Drawer.Section>
          
          </>
        } 
          {role == 'ROLE_MECHANIC' && 
          <>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              focused={true}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/dashboard.png')}
                />
              )}
              label={I18n.t('sideBarMenu.dashboard')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
          </Drawer.Section>
         
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              

              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.organisation')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('MyOrganization',{screen:'Home'})

              }}
            />
          </Drawer.Section>
      
          
          
        
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/vehicle.png')}
                />
              )}
              label={I18n.t('sideBarMenu.trip_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('TripManagment')
              }}
            />
          </Drawer.Section>
         
         
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/defective_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.defective_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('DefectManagment');
              }}
            />
          </Drawer.Section>
       
        
          {/* <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/notice.png')}
                />
              )}
              label={CONSTANTS.sideBarMenu.stock_management}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {}}
            />
          </Drawer.Section> */}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/leak_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.leak_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('LeakManagment')
              }}
            />
          </Drawer.Section>
        
         
         
          
          </>
        } 
          {role === 'ROLE_CLIENTMANAGER' && 
          <>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              focused={true}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/dashboard.png')}
                />
              )}
              label={I18n.t('sideBarMenu.dashboard')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
          </Drawer.Section>
         
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              

              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.organisation')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('MyOrganization',{screen:'Home'})

              }}
            />
          </Drawer.Section>
      
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/order_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.order_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {

                navigation.navigate('OrderManagement',{screen: 'OrderManagement',role: role})
                  // navigation.navigate('OrderCreation');
                

              }}
            />
          </Drawer.Section>
          
        
          
           
      
         
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/imbalance.png')}
                />
              )}
              label={I18n.t('sideBarMenu.imabalance_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('ImbalanceManagment')

              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/defective_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.defective_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('DefectManagment');
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/rupees_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.payment_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('PaymentManagment');
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/notice.png')}
                />
              )}
              label={CONSTANTS.sideBarMenu.stock_management}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {}}
            />
          </Drawer.Section> */}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/leak_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.leak_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('LeakManagment')
              }}
            />
          </Drawer.Section>
         
   
          
          </>
        } 
          {role == 'ROLE_AGENT' && 
          <>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              focused={true}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/dashboard.png')}
                />
              )}
              label={I18n.t('sideBarMenu.dashboard')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
          </Drawer.Section>
         
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              

              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.organisation')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('MyOrganization',{screen:'Home'})

              }}
            />
          </Drawer.Section>
      
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/order_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.order_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('OrderCreation');

              }}
            />
          </Drawer.Section>
          
       
           
         
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/imbalance.png')}
                />
              )}
              label={I18n.t('sideBarMenu.imabalance_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('ImbalanceManagment')

              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/defective_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.defective_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('DefectManagment');
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/rupees_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.payment_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('PaymentManagment');
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/notice.png')}
                />
              )}
              label={CONSTANTS.sideBarMenu.stock_management}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {}}
            />
          </Drawer.Section> */}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/leak_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.leak_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('LeakManagment')
              }}
            />
          </Drawer.Section>
      
    
          </>
        } 
          {role == 'ROLE_CHANNELPARTNER' && 
          <>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              focused={true}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/dashboard.png')}
                />
              )}
              label={I18n.t('sideBarMenu.dashboard')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
          </Drawer.Section>
         
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              

              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.organisation')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate('MyOrganization',{screen:'Home'})

              }}
            />
          </Drawer.Section>
      
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/order_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.order_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('OrderCreation');

              }}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/imbalance.png')}
                />
              )}
              label={I18n.t('sideBarMenu.imabalance_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('ImbalanceManagment')

              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/defective_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.defective_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('DefectManagment');
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/rupees_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.payment_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('PaymentManagment');
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/notice.png')}
                />
              )}
              label={CONSTANTS.sideBarMenu.stock_management}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {}}
            />
          </Drawer.Section> */}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/leak_management.png')}
                />
              )}
              label={I18n.t('sideBarMenu.leak_management')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                // navigation.navigate('LeakManagment')
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeBackgroundColor={config.LIGHT_GREY}
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/reports.png')}
                />
              )}
              label={I18n.t('sideBarMenu.pos')}
              labelStyle={styles.drawerItemLabel}
              onPress={() => {}}
            />
          </Drawer.Section>
         
        
          
          </>
        } 
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default SideDrawer;
