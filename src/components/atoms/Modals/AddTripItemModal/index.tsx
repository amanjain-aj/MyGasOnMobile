import React, { useState } from 'react';
import {View, Text} from 'react-native';
import styles from './AddTripItemModal.styles';
import constants from '../../../../constants/constants';
import I18n from '../../../../config/i18n';
import {Button, Dialog, Portal} from 'react-native-paper';
import RadioGroup from '../../RadioGroup';
import Input from '../../Input';
import DropDown from '../../Dropdown';
import DeliveryDatePicker from '../../DeliveryDatePicker';
import CustomAlert from '../CustomeAlert';

import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';



const AppTripItemModal: any = ({showDialog, setShowDialog,items,response,token,getVal,updateNow}) => {
  const dateList = [
    {
      'value': '01'
    },
    {
      'value': '05'
    },
    {
      'value': '25'
    },
    {
      'value': '50'
    },
    {
      'value': '100'
    },
    {
      'value': '150'
    },
    {
      'value': '200'
    },
    {
      'value': '250'
    },
    {
      'value': '300'
    },
    {
      'value': '400'
    },
    ];

  const radioGroupList = [
    {
      name: 'Filled Cylinder / ARB Item',
    },
    {
      name: 'Empty Cyl.',
    },
  ];
  const [quantity,setQuantity] = useState('')
  const [item,setItem] = useState('')
  const [name,setName] = useState('')
  const [popUp,setPopUp] = useState(false)
  const [errorText,setErrorText] = useState('')
  const [editTrip,setEditTrip] = useState([])
  const [type,setType]= useState('')
  const [filledCapacity,setFilledCapacity] = useState(false)
 

  const hideDialog1 =() => {
    setShowDialog(false);
  }
 
  const hideDialog = () => {

    if(quantity == undefined || quantity.length <= 0){
        setErrorText(I18n.t('errorMessage.valid_item_name'))
        setPopUp(true)
        return;
    }
    if(item == undefined || item.length <= 0){
        setErrorText(I18n.t('errorMessage.valid_item_quantity'))
        setPopUp(true)
        return;
    }
    let data = {
      'id':item,
      'quantity': quantity,
      'filledCapacity': filledCapacity
    };
 
    getVal(data)
    setShowDialog(false);
    updateNow(data);
  };

  return (
    <Portal>
      <CustomAlert
              showDialog={popUp}
              setShowDialog={setPopUp}
              title={errorText}
            />
      <Dialog
        style={[styles.dialog]}
        visible={showDialog}
        onDismiss={hideDialog1}>
        <Dialog.Content style={styles.dialogContent}>
          <View>
            <Text style={styles.text}>{I18n.t('tripCreation.add_item')}</Text>
            <RadioGroup
              radioGroupList={radioGroupList}
              initialvalue={0}
              onChange={(txt) => {
                setFilledCapacity(txt['name']=='Filled Cylinder / ARB Item' ? true : false)
                setType(txt)}}
            />
            <DropDown
              options={items}
              placeholder={I18n.t('tripCreation.item_name')}
              onChange={(txt)=>{
                setItem(txt)
                if(items.length>0){
                  let i =  items.findIndex(get)
                  if(i!=-1){
                   setName(items[i].label)
                  }
                 
                  function get(item) {
                    return item.value == txt
                  }
                }
               
              }}
            />
            <Input
              secureTextEntry={false}
              label={I18n.t('tripCreation.qty')}
              value={quantity}
              onChange={(txt) => {setQuantity(txt)}}
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
              isAvailable={false}
              success={false}
              hintText=""
              keyboardType="default"
              onFocus={() => {}}
            />

            <DeliveryDatePicker
              dateList={dateList}
              onChange={value => {
                setQuantity(value.value)
              }}
              initialValue={0}
            />

            <View style={{marginBottom: 25}}></View>

            <Button
              labelStyle={[styles.button]}
              mode="contained"
              onPress={() => {
                hideDialog()
              }}>
              {I18n.t('agencyProfileEdit.agency_button_proceed')}
            </Button>
            <View style={{marginBottom: 10}}></View>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default AppTripItemModal;
