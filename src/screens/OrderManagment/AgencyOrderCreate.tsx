import React, {useState} from 'react';
import {StyleSheet, Text, SafeAreaView, Image, View, ScrollView, TouchableOpacity} from 'react-native';
import {Button, Card, Drawer, IconButton, Title} from 'react-native-paper';
import Header from '../../components/atoms/Header';
import SideDrawer from '../../components/SideDrawer';
import constants from '../../constants/constants';
import I18n from '../../config/i18n';
import styles from './OrderManagment.styles';
import config from '../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import FooterTab from '../../components/atoms/FooterTab';
import PreAuthFormWrapper from '../../components/PreAuthFormWrapper';
import Dropdown from '../../components/atoms/Dropdown';
import Input from '../../components/atoms/Input';
import DeliveryDatePicker from '../../components/atoms/DeliveryDatePicker';
import {getAllCustomersByAgency,getAllChannelPartnersByAgency,getAllAgentsByAgency, createOrder,createImpersonateOrder} from '../../api/orderApi';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { values } from 'lodash';
import CustomAlert from '../../components/atoms/Modals/CustomeAlert';
import Spinner from 'react-native-loading-spinner-overlay';
import {GetItemListing} from '../../api/agencyApi';
import SucessModalModal from '../../components/atoms/Modals/SucessModal';

const AgencyOrderCreate = ({navigation}: {navigation: any}) => {
  let role = '';
  const [active, setActive] = React.useState('');
  const [impersonate, setImpersonate] = useState(true);
  const [onbehalf, setOnbehalf] = useState(false);
  const [type, setType] = useState('');
  
  const [name, setName] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');
  const [nameList,setNameList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [items,setItems] = useState([])
  const [token,setToken] = useState('')
  const [orderId,setOrderId]= useState('')
  const [show,setShow] = useState(false)
  


  const quantityList = [
    {
      value: '01'
    },
    {
      value: '02'
    },
    {
      value: '03'
    },
    {
      value: '04'
    },
    {
      value: '05'
    },
    {
      value: '10'
    },
    {
      value: '15'
    },
    {
      value: '20'
    },
    {
      value: '25'
    },
    {
      value: '30'
    },
  ];
  const [quantity, setQuantity] = useState(quantityList[0].value);
  const options = [
    {
      label: I18n.t('bank.weekly'),
      value: 'weekly',
      key: 1,
    },
    {
      label: I18n.t('bank.monthly'),
      value: 'monthly',
      key: 2,
    },
    {
      label: I18n.t('bank.annually'),
      value: 'annually',
      key: 3,
    },
   
  ];

  const createOrder = () => {

    if(type == undefined || type.length<=0) {
      setErrorText(I18n.t('errorMessage.valid_item_name'))
      setPopUp(true)
      return;
    }
    if(name == undefined || name.length<=0) {
      setErrorText(I18n.t('errorMessage.error_name'))
      setPopUp(true)
      return;
    }
    if(mobile == undefined || mobile.length<=0) {
      setErrorText(I18n.t('errorMessage.error_number'))
      setPopUp(true)
      return;
    }
    if(email == undefined || email.length<=0) {
      setErrorText(I18n.t('errorMessage.error_email'))
      setPopUp(true)
      return;
    }
    const body = {
      "itemPriceId": type,
      "customerName": name,
      "customerPhone": mobile,
      "customerEmail": email,
      "actualQuantity": quantity,
      "impersonateUser": true
    }
    createImpersonateOrder(body,token).then((res)=>{
      console.log("Response",res.data)
      setOrderId(res.data.id)
      setShow(true)
    })
    .catch(err=>{
      console.log("Error",err)
    })
    // navigation.navigate('OrderCreation')
  }
  
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true)
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], async (err, items) => {
        if (err) {
          console.warn(err);
        }
        // let nameList = [];
        setToken(items[0][1])
        const data = await prepareList(items[1][1],items[0][1]);
        console.log(data)
        setNameList(data);
        console.log(nameList);
        if(data.length>0) {
          setLoading(false)
        }
        if(data == undefined || data.length == 0){
          setLoading(false)
        }
        GetItemListing(items[0][1],items[1][1],1).then((res)=>{
          if(res.data.length>0){
             const data = res.data;
             let list = [];
             data.forEach((item)=>{
              list.push({'label': item['item']['itemName'],'value':item['priceId']})
            })
            if(list.length>0){
              setItems(list)
            }
          }

        })
        .catch(err=>{
          console.log("Error",err)
        })
      });
    }, []),
  );
  
  const prepareList = async (id,token) => {
    let list = [];
    const list1 = await getCustNameList(id,token);
    const list2 = await getAgNameList(id,token);
    const list3 = await getChNameList(id,token);
    if(list1.length>0){
      list.push(...list1)
     
    }
    if(list2.length>0){
      list.push(...list2)
    
    }
    if(list3.length>0){
      list.push(...list3)
   
    }
    return list;
  }

  const getCustNameList = async (id,token) => {
    let list = [];
    let {data} = await getAllCustomersByAgency(id,token);
    if(data != undefined){
      data.forEach((item)=>{
        list.push({value:item.customerId,label:item.name,role: 'ROLE_CLIENTMANAGER'})
      })
      return list;
    }
   
  }
  const getAgNameList = async (id,token) => {
    let list = [];
    let {data} = await getAllAgentsByAgency(id,token);
    if(data != undefined){
      data.forEach((item)=>{
        list.push({value:item.agentId,label:item.name,role: 'ROLE_AGENT'})
      })
      return list;
    }
    
  }
  const getChNameList = async (id,token) => {
    let list = [];
    let {data} = await getAllChannelPartnersByAgency(id,token);
    if(data != undefined){
      data.forEach((item)=>{
        list.push({value:item.channelPartnerId,label:item.name,role: 'ROLE_CHANNELPARTNER'})
      })
      return list;
    }
  
  }

  const getIdNavigate = () => {
      if( type == undefined || type.length <= 1){
          setErrorText(I18n.t('orderError.customer_name_error'))
          setPopUp(true);
      }else{
        console.log("Type",type)
        navigation.navigate('OrderCreation',{id: type,role: role})
      }
  }


  return (
    <>
      <Header title={I18n.t('orderCreation.header')} navigation={navigation} />
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
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow:1}}> 
        <View style ={styles.orderContainer}>
            <View style={styles.innerContainer}>
            <View style={styles.tabContaner}>
                <TouchableOpacity
                  style={
                    impersonate ? styles.tabItemActive : styles.tabItemInActive
                  }
                  onPress={() => {
                    if (!impersonate) {
                      setImpersonate(true);
                      setOnbehalf(false);
                    }
                  }}>
                  <Text style={styles.tabText}>
                    {I18n.t('orderCreation.impersonate')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                   onbehalf ? styles.tabItemActive : styles.tabItemInActive
                  }
                  onPress={() => {
                    if (!onbehalf) {
                      setOnbehalf(true);
                      setImpersonate(false);
                    }
                  }}>
                  <Text style={styles.tabText}>
                    {I18n.t('orderCreation.onbehalf')}
                  </Text>
                </TouchableOpacity>
              </View>
              {impersonate ? (<View>

                <Dropdown
                    options={items}
                    selectedValue={type}
                    placeholder={I18n.t('orderCreation.item_name')}
                    onChange={text => {
                        setType(text);
                    }}
                    hasDisabled={false}
                />
                <Input
                  label={I18n.t('orderCreation.quantity')}
                  value={quantity}
                  onChange={(txt) => {setQuantity(txt)}}
                  iconSize={20}
                  placeholder={I18n.t('orderCreation.quantity')}
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

                <DeliveryDatePicker
                  dateList={quantityList}
                  onChange={value => {
                    setQuantity(value.value);
                  }}
                  initialValue={0}
                />
                 <Input
                   label={I18n.t('orderCreation.customer_name')}
                   mode="flat"
                   numberOnly=""
                   maxLength={30}
                   placeholder={
                    I18n.t('orderCreation.customer_name')
                   }
                  value={name}
                  iconName="person"
                  onChange={(txt) => {
                    setName(txt)
                  }}
                />

                <Input
                   label={I18n.t('registration.agency.ownerDetails.mobileNumber')}
                   mode="flat"
                   numberOnly=""
                   maxLength={10}
                  placeholder={
                    I18n.t('registration.agency.ownerDetails.mobileNumber')
                  }
                  value={mobile}
                
               
                  iconName="smartphone"
                  keyboardType='numeric'
                  onChange={(txt) => {
                    setmobile(txt.replace(/[^0-9]/g,''))
                  }}
                />
               
                <Input
                label={I18n.t('registration.agency.ownerDetails.emailId')}
                mode="flat"
                numberOnly=""
                maxLength={60}
                  placeholder={
                    I18n.t('registration.agency.ownerDetails.emailId')
                  }
                  value={email}
                  iconName="email"
                  onChange={(txt) => {
                    setemail(txt)
                  }}
                />
                
                <Button
                 
                  labelStyle={[styles.button]}
                  mode="contained"
                
                  onPress={() => {
                    createOrder()
                    
                  }}
                >{I18n.t('orderCreation.submit')}</Button>


              </View>) : (<View style={styles.buttonPos}>

               <Dropdown
                    options={nameList}
                    selectedValue={type}
                    placeholder={I18n.t('orderCreation.customer_name')}
                    onChange={text => {
                        setType(text);
                        if(nameList.length>0){
                          let i =  nameList.findIndex(get)
                          if(i!=-1){
                            role = nameList[i].role
                          }
                         
                          function get(item) {
                            return item.value == text
                          }
                        }
                        
                    }}
                    hasDisabled={false}
                />
                <View style={styles.footerButton}>
                 <Button
                    icon={() => (
                      <Icon
                        style={{position: 'absolute', right: -85, top: -12}}
                        name={'arrow-forward'}
                        color={config.WHITE}
                        size={25}
                      />
                    )}
                  contentStyle={{flexDirection: 'row-reverse'}}
                  labelStyle={[styles.button]}
                  mode="contained"
                
                  onPress={() => {
                    getIdNavigate();
                   
                  }}
                >{I18n.t('common.proceed')}</Button>
              </View>
            </View>)}
        </View>
        </View>
        <SucessModalModal 
              title={I18n.t('orderCreation.order_placed')}
              subtitle={
                <Text style={{textAlign: 'center'}}>
                   {I18n.t('orderCreation.placing_order_for')+'\n'}
                   <Text style={{fontSize: 20,fontWeight: '700'}}>
                      {I18n.t('orderCreation.qty')+''+quantity+'\n'} 
                    </Text>  
                    <Text>
                      {I18n.t('orderCreation.to')+'\n'}
                    </Text>
                    <Text style={{fontSize: 20,fontWeight: '700'}}>
                      {name}
                    </Text>
                    <Text>
                      {I18n.t('orderCreation.your_order_id')+'\n'}
                    </Text>
                    <Text style={{fontSize: 20,fontWeight: '700'}}>
                      {orderId}
                    </Text>
                </Text>
              }
              onButtonClick={()=>{
                navigation.navigate('OrderManagement')
                setShow(false)
              }}
              showDialog={show}
            />
        </ScrollView>
        <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </>
  );
};



export default AgencyOrderCreate;
