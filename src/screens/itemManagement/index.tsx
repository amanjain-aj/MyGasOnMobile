import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import {View, Text, Pressable, Modal, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import NumberFormat from 'react-number-format';
import Header from '../../components/atoms/Header';
import PostAuthWrapper from '../../components/PostAuthWrapper';
import itemStyles from './itemManagement.styles';
import Input from '../../components/atoms/Input';
import config from '../../config/colors';
import CONSTANTS from '../../constants/constants';
import I18n from '../../config/i18n';
import {Dialog, Portal} from 'react-native-paper';
import Dropdown from '../../components/atoms/Dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreateItem, GetItemById, getItems, UpdateItem} from '../../api/agencyApi';
import { useFocusEffect } from '@react-navigation/native';
import CustomAlert from '../../components/atoms/Modals/CustomeAlert';
import FooterTab from '../../components/atoms/FooterTab';

const ItemManagement = ({navigation, route}: {navigation: any; route: any}) => {
  const [Item, setItem] = useState('');
  const [Price, setPrice] = useState('');
  const [showDailog, setShowDailog] = useState(false);
  const [itemOptions, setItemsOptions] = useState([]);
  const [token, settoken] = useState('');
  const [agnId, setAgnId] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [cgst, setCgst] = useState(0.0);
  const [sgst, setSgst] = useState(0.0);
  const [costPrice, setCostPrice] = useState('');
  const [loading, setloading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');

  const regEx = /^\d*\.?\d*$/;

  useFocusEffect(
    React.useCallback(() => {
    setloading(true)
    AsyncStorage.multiGet(['API_TOKEN', 'USER_ID'], (err, items) => {
      if (err) {
        console.warn(err);
      }
      settoken(items[0][1]);
      setAgnId(items[1][1]);
      getItems(items[0][1]).then(res => {
        setloading(false);
        console.log(res.data);
        let data = res.data;
        if (data.length > 0) {
          let list = [];
          data.forEach(item => {
            list.push({
              value: item.itemId,
              label: item.itemName,
              hsnCode: item.hsnCode,
              cgst: item.cgst,
              sgst: item.sgst,
            });
          });
          console.log(list);
          setItemsOptions(list);
          if (route.params.type === 'edit') {
            setloading(true);
            console.log("Id",route.params.Id)
            GetItemById( route.params.Id,items[0][1])
              .then(res => {
                setloading(false);
                setCostPrice(res.data.costPrice)
                setPrice(res.data.price)
                setSgst(res.data.item.sgst)
                setCgst(res.data.item.cgst)
                setHsnCode(res.data.item.hsnCode)
                setItem(res.data.item.itemId)
                
    
                console.log(res.data);
              })
              .catch(err => {
                setloading(false);
    
                console.log(err.response.data);
              });
          }
        }
      }).catch(err => {
        setloading(false)
        console.log(err.response.data)
      });
      
    });
    }, [])
  )
  
  const updateItem = () => {
    console.log(parseInt(Price))
    if(Item == undefined || Item.length<1){
      setErrorText(I18n.t('errorMessage.valid_item'));
      setPopUp(true)
      return
    }
    if (Number.isNaN(parseFloat(Price))) {
      setErrorText(I18n.t('errorMessage.price'));
      setPopUp(true)
      return
    }
    if (parseFloat(Price) <= 0) {
      setErrorText(I18n.t('errorMessage.price_zero'));
      setPopUp(true)
      return
      
    }
    if (Number.isNaN(parseFloat(costPrice))) {
      setErrorText(I18n.t('errorMessage.cost_price'));
      setPopUp(true)
      return
    }
    if (parseFloat(costPrice) <= 0) {
      setErrorText(I18n.t('errorMessage.cost_price_zero'));
      setPopUp(true)
      return
    }
    if(!regEx.test(Price)){
      setErrorText(I18n.t('errorMessage.decimal_check'));
      setPopUp(true)
      return
    }
    if(!regEx.test(costPrice)){
      setErrorText(I18n.t('errorMessage.decimal_check'));
      setPopUp(true)
      return
    }

    setloading(true);
    
    const body = {
      agency: {
        id: agnId,
      },
      item: {
        itemId: Item,
      },
      price: Price,
      costPrice: costPrice,
    };

    if (route.params.type === 'edit') {
      console.log(body)
      console.log("Route Id"+route.params.Id)
      UpdateItem(route.params.Id,token, body)
      .then(res => {
       
        setloading(false);
        console.log(res.status)
        if (res.status === 200) {
          
          setShowDailog(true);
        }
      })
      .catch(err => {
        setloading(false);
        setPopUp(true);
        setErrorText(err.response.data.message)
      });
      
    } else {
      CreateItem(token, body)
      .then(res => {
        console.log(res.status);
        setloading(false);
        if (res.status === 201) {
          setShowDailog(true);
        }
      })
      .catch(err => {
        setloading(false);
        setErrorText(err.response.data.message)
        setPopUp(true)
      });
    }

    
  };

  const saveItems = index => {
    itemOptions.forEach(item => {
      if (item.value === index) {
        setHsnCode(item.hsnCode);
        setCgst(item.cgst);
        setSgst(item.sgst);
        console.log(item.cgst);
      }
    });
  };

  return (
    <View>
    <ScrollView>
      <View>
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
         <CustomAlert
        showDialog={popUp}
        setShowDialog={setPopUp}
        title={errorText}
      />
        <Header navigation={navigation} title={I18n.t('items.header')} />
        <PostAuthWrapper
          isEdit={false}
          isAgencyHomePage={false}
          titlePreFix={I18n.t('items.item_txt')}
          titlePostFix={I18n.t('items.item_management.management_txt')}>
          <Text style={itemStyles.heading}>{ I18n.t('items.header')}</Text>

          <View style={{marginTop: 15}}>
            <Dropdown
              placeholder={I18n.t('items.item_management.item_placeholder')}
              selectedValue={Item}
              options={itemOptions}
              hasDisabled={route.params.type === 'edit'?true:false}
              onChange={(text, index) => {
                setItem(text);
                saveItems(text);
                // console.log(index)
              }}
            />
            <Input
              placeholder={I18n.t('items.item_management.hsn_code')}
              value={hsnCode}
              editable={false}
              onChange={text => setHsnCode(text)}
              label={I18n.t('items.item_management.hsn_code')}
            />
            <Input
              placeholder={I18n.t('items.item_management.cgst_placeholder')}
              value={cgst.toString()}
              editable={false}
              onChange={text => setCgst(text)}
              label={I18n.t('items.item_management.cgst_placeholder')}
            />

            <Input
              placeholder={I18n.t('items.item_management.sgst_placeholder')}
              value={sgst.toString()}
              editable={false}
              onChange={text => setSgst(text)}
              label ={I18n.t('items.item_management.sgst_placeholder')}
            />

            <Input
              placeholder={I18n.t('items.item_management.price_placeholder')}
              value={Price && Price.toString()}
              iconName="currency-inr"
              isAvailable={false}
              keyboardType='numeric'
              onChange={text => setPrice(text.replace(/[^0-9.]/g,''))}
              label ={I18n.t('items.item_management.price_placeholder')}
            />
            
            <Input
              placeholder={I18n.t(
                'items.item_management.cost_price_placeholder',
              )}
              value={costPrice && costPrice.toString()}
              isAvailable={false}
              keyboardType='numeric'
              iconName="currency-inr"
              onChange={text => setCostPrice(text.replace(/[^0-9.]/g,''))}
                label={I18n.t(
                  'items.item_management.cost_price_placeholder',
                )}
            />

            <View style={{top: 20}}>
              <Button
                mode="contained"
                labelStyle={{color: config.WHITE, padding: 6}}
                onPress={() => {
                  updateItem();
                }}>
                {I18n.t('items.item_management.submit')}
                </Button>
                <View style={{height:30}}/>
            </View>

            <View>
              <Portal>
                <Dialog
                  style={[itemStyles.terms_modal_Sign_ND]}
                  visible={showDailog}
                  onDismiss={() => {
                    setShowDailog(false);
                  }}>
                  <Dialog.Content style={itemStyles.dialogContent}>
                    <View style={itemStyles.innnerConatiner}>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          marginTop: 10,
                          marginBottom: 20,
                        }}
                        source={require('./../../assets/icons/vector_tick.png')}
                      />
                      {route.params.type === 'edit' ?
                         <View style={itemStyles.modal_Sign_space}>
                         <Text style={itemStyles.modal_Sign_heading}>
                           {I18n.t('items.item_management.update_heading')}
                         </Text>
                       </View>
                       :
                       <View style={itemStyles.modal_Sign_space}>
                       <Text style={itemStyles.modal_Sign_txt}>
                         {I18n.t('items.item_management.modal_heading')}
                       </Text>
                     </View>
                       }
                      <Button
                        style={itemStyles.btn_SignUp_ND_Modal_2}
                        labelStyle={{ 
                          width: '90%',
                          color: config.WHITE,
                          textAlign: 'center',}}
                        mode="contained"
                        onPress={() => {
                          setShowDailog(false);
                          navigation.goBack();
                          //navigation.navigate('ItemListing');
                        }}>
                        {I18n.t('items.item_management.close_btn')}
                        </Button>
                       
                    </View>
                  </Dialog.Content>
                </Dialog>
              </Portal>
            </View>
          </View>
        </PostAuthWrapper>
      </View>
     
    </ScrollView>
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
export default ItemManagement;
