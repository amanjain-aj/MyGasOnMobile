import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './OrderManagment.styles';
import Header from '../../components/atoms/Header';
import CONSTANTS from '../../constants/constants';
import I18n from "../../config/i18n";
import FilterWrapper from '../../components/FilterWrapper';
import config from '../../config/colors';
import CreateOrderAgencyCard from '../../components/atoms/CreateOrderAgencyCard';
import constants from '../../constants/constants';
import DeliveryDatePicker from '../../components/atoms/DeliveryDatePicker';
import Input from '../../components/atoms/Input';
import TaxBillingCard from '../../components/atoms/TaxBillingCard';
import CustomCheckBox from '../../components/atoms/CustomCheckBox';
import RadioButtonGroup from '../../components/atoms/RadioGroup';
import CustomRadioButton from '../../components/atoms/CustomRadioButton';
import DeliveryAddressCard from '../../components/atoms/DeliveryAddressCard';
import FailModal from '../../components/atoms/Modals/FailModal';
import SucessModal from '../../components/atoms/Modals/SucessModal';
import FooterTab from '../../components/atoms/FooterTab';
import {getDeliverySlotsByAgency,getAllContractsCustomer,getStoreAddressByCustomer,getGodownAddressByAgency,createOrder,getStoreAddressByAgent,getStoreAddressByChannelPartner,getAllContractsAgent,getAllContractsChannelpartner,getWorkingDays} from '../../api/orderApi';
import { useEffect } from 'react';
import {UploadImage} from '../../api/fileApi';
import { useFocusEffect } from '@react-navigation/native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { RadioButton } from 'react-native-paper';
import CustomAlert from '../../components/atoms/Modals/CustomeAlert';
import * as ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import SucessModalModal from '../../components/atoms/Modals/SucessModal';
import {GetCustomerPaymentmapping} from '../../api/agencyApi';
import RazorpayCheckout from 'react-native-razorpay';

const OrderCreation: any = ({navigation,route}: {navigation: any,route:any}) => {
  const [select, setselect] = useState(0);
  const [step,setStep] = useState(0);
  const [payNow, setpayNow] = useState(true);
  const [payAtDelivery, setPayAtDelivery] = useState(false);
  const [delivery, setdelivery] = useState(true);
  const [selfPickup, setselfPickup] = useState(false);
  const [failed, setFailed] = useState(false);
  const [checkedSelf, setCheckedSelf] = useState(false);
  const [checked, setChecked] = useState(false);
  const [sucess, setSuccess] = useState(false);
  const [paymentSucess, setpaymentSuccess] = useState(false);
  const [userId,setId] = useState('');
  const [slotList,setSlotList] = useState([]);
  const [contractList,setContractList] = useState([]);
  const [remarks,setRemarks] = useState('');
  const [emptyMessage,setEmptyMessage] = useState(false);
  const [stores,setStores] = useState([]);
  const [godowns,setGodowns] = useState([]);
  const [slotId,setSlotId]= useState('');
  const [error,setError] = useState(false);
  const [addressId,setAddressId] = useState('');
  const [selectedStore,setSelectedStore] = useState([]);
  const [emptyMessage1,setEmptyMessage1] = useState(false);
  const [emptyMessage2,setEmptyMessage2] = useState(false);
  const [activeChecked,setActiveChecked] = useState(false);
  const [token,setToken] = useState('');
  const [bank,setBank] = useState('');
  const [chequeNo,setChequeNo] =  useState('')
  const [upload,setUpload] = useState(false);
  const [chequeImg,setChequeImg] = useState('')
  const [utr,setUtr] = useState('');
  const [receiptImg,setReceiptImg] = useState('')
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const [paymentType,setPaymentType] = useState('');
  const [dateList,setDateList] = useState([]);
  const [formatted,setFormatetd] = useState('');
  const [btnText1,setButtonText1] = useState(I18n.t('orderCreation.upload_cheque'))
  const [btnText2,setButtonText2] = useState(I18n.t('orderCreation.upload_recipt'))
  const [show,setShow] = useState(false)
  const [orderId,setOrderId]= useState('')
  const [role,setRole] = useState('')
  const [paymentCode,setPaymentCode] = useState('')
 
  const [amountDetails,setAmountDetails] = useState(
    {
      subTotal: 0,
      discount: 0,
      taxable_amount: 0,
      grandTotal: 0,
    }
  )
  const [isPayNowSuccessful,setPayNowSuccessful] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID','USER_ROLE'], (err, items) => {
        if (err) {
          console.warn(err);
        }
        
        setToken(items[0][1])
        setId(items[1][1])
        setRole(items[2][1])
        switch(items[2][1]) {

          case 'ROLE_AGENCYMANAGER':
                getDateList(items[0][1],items[1][1])
                triggerData(route.params.role,items[0][1])
                getPaymentInfo(items[1][1],route.params.id,items[0][1])
                break;

          case 'ROLE_CLIENTMANAGER':
                
                getContractListCustomer(items[1][1],items[0][1]);
                getStoreAddress(items[1][1],items[0][1],getStoreAddressByCustomer)
               
                break;

          case 'ROLE_AGENT':
                
                getContractListAgent(items[1][1],items[0][1]);
                getStoreAddress(items[1][1],items[0][1],getStoreAddressByAgent)
                break;

          case 'ROLE_CHANNELPARTNER':
                
                getContractListChannelPartner(items[1][1],items[0][1]);
                getStoreAddress(items[1][1],items[0][1],getStoreAddressByChannelPartner)
                break;
        }
      });
    }, []),
  );
  
  const triggerData = (role,token) => {
    console.log("ccd",role);
    switch(role) {
     

      case 'ROLE_CLIENTMANAGER':
            getContractListCustomer(route.params.id,token);
            getStoreAddress(route.params.id,token,getStoreAddressByCustomer)
            break;

      case 'ROLE_AGENT':
            getContractListAgent(route.params.id,token);
            getStoreAddress(route.params.id,token,getStoreAddressByAgent)
            break;

      case 'ROLE_CHANNELPARTNER':
            getContractListChannelPartner(route.params.id,token);
            getStoreAddress(route.params.id,token,getStoreAddressByChannelPartner)
            break;

    }

  }

  const getPaymentInfo = (agencyId,customerId,token) => {
      GetCustomerPaymentmapping(agencyId,customerId,token).then((res)=>{
        console.log("Response",res.data)
        if(res.data != undefined || res.data.length> 0 ){
            setPaymentType(res.data['paymentCode']);
        }
      })  
      .catch(err=>{
        console.log("Error",err)
      })
  } 

  const getSlotsByAgency =(id,token) => {
    getDeliverySlotsByAgency(id,token)
    .then(res => {
      const data = res.data;
      let arr = [];
      data.forEach((item)=>{
        arr.push({'deliverySlotId':item.deliverySlotId,'value':`${item.startTime}-${item.endTime}`})
      })
      setSlotList(arr);
      if(arr.length>0){
        setTime(arr[0].value)
        setSlotId(arr[0].deliverySlotId)
      }
     
    })
    .catch(err => {
      console.log(err);
      
    });
  }

  const getContractListCustomer = (id,token) => {
      setLoading(true)
      getAllContractsCustomer(id,token).then((res)=>{
        const data = res.data;
        let list = []
        if(data != undefined){
          data.forEach((item)=>{
            list.push(
            {
            'id':item.id,
            'agency_name':item['agency']['name'],
            'capacity':item.issuedCyl,
            'item_name':item['itemPrice']['item']['itemName'],
            'item_price':item['itemPrice']['price'],
            'discount':item['cylSecurityDiscount'],
            'agency_id':item['agency']['id'],
            'cust_id':item['customer']['id']
          })
          })
        }
     
        setContractList(list);
        if(list.length>0){
          setLoading(false)
          setEmptyMessage(false)
        }else{
          setLoading(false)
          setEmptyMessage(true)
        }
      
      })
      .catch(err=>{
        console.log("Error",err)
      })
  }
  const getContractListAgent = (id,token) => {
    setLoading(true)
    getAllContractsAgent(id,token).then((res)=>{
      const data = res.data;
      let list = []
      if(data != undefined){
        data.forEach((item)=>{
          list.push(
          {
          'id':item.id,
          'agency_name':item['agency']['name'],
          'capacity':item.issuedCyl,
          'item_name':item['itemPrice']['item']['itemName'],
          'item_price':item['itemPrice']['price'],
          'discount':item['cylSecurityDiscount'],
          'agency_id':item['agency']['id'],
          'agent_id':item['agent']['id']
        })
        })
      }
   
      setContractList(list);
      if(list.length>0){
        setLoading(false)
        setEmptyMessage(false)
      }else{
        setLoading(false)
        setEmptyMessage(true)
      }
    
    })
    .catch(err=>{
      console.log("Error",err)
    })
}
const getContractListChannelPartner = (id,token) => {
  setLoading(true)
  getAllContractsChannelpartner(id,token).then((res)=>{
    const data = res.data;
    let list = []
    if(data != undefined){
      data.forEach((item)=>{
        list.push(
        {
        'id':item.id,
        'agency_name':item['agency']['name'],
        'capacity':item.issuedCyl,
        'item_name':item['itemPrice']['item']['itemName'],
        'item_price':item['itemPrice']['price'],
        'discount':item['cylSecurityDiscount'],
        'agency_id':item['agency']['id'],
        'channel_id':item['channelPartner']['id']
      })
      })
    }
 
    setContractList(list);
    if(list.length>0){
      setLoading(false)
      setEmptyMessage(false)
    }else{
      setLoading(false)
      setEmptyMessage(true)
    }
  
  })
  .catch(err=>{
    console.log("Error",err)
  })
}  
  const getStoreAddress = (id,token,storeData) => {
    storeData(id,token).then((res)=>{
        const data = res.data;
        let list = [];
        if(data !=  undefined){
          data.forEach((item)=>{
            list.push(
              {
                'name':item.name,
                'address': item['address']['addressLine1'] + '' + item['address']['addressLine2'],
                'addressId': item['address']['addressId'],
                'storeId': item.storeId
              }
              )
          })
          setStores(list);
          if(list.length>0){
            setAddressId(list[0].addressId)
            setSelectedStore(list[0])
            setEmptyMessage1(false)
          }else{
            setEmptyMessage1(true)
          }
        }
        
        
    })
    .catch(err=>{
      console.log("Error",err)
    })
  }

  const getGodownAddress = (id,token) => {
    getGodownAddressByAgency(id,token).then((res)=>{
       const data = res.data;
       let list = [];
       if(data !=  undefined){
        data.forEach((item)=>{
          list.push(
            {
              'name':item.name,
              'address': item['address']['addressLine1'] + '' + item['address']['addressLine2'],
              'addressId': item['address']['addressId'],
              'godownId': item.godownId
            }
            )
        })
        console.log(list)
        setGodowns(list);
        if(list.length>0){
          setAddressId(list[0].addressId)
          setSelectedStore(list[0])
          setEmptyMessage2(false)
        }else{
          setEmptyMessage2(true)
        }
      }
    })
    .catch(err=>{
      console.log("Error",err);
    })
  }
  const chooseImage = (type) => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        // alert('User cancelled camera picker');
        setErrorText('User cancelled camera picker');
        setPopUp(true);
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        setErrorText('Camera not available on device');
        setPopUp(true);
        return;
      } else if (response.errorCode == 'permission') {
        setErrorText('Permission not satisfied');
        setPopUp(true);
        return;
      } else if (response.errorCode == 'others') {
        setErrorText(response.errorMessage);
        setPopUp(true);
        return;
      }
      switch(type){
        case 'cheque':
          setButtonText1(I18n.t('orderCreation.uploading'))
          UploadImage(token, userId, response.assets[0])
          .then(res => {
            console.log(res.data);
            setButtonText1(I18n.t('orderCreation.uploaded'))
            setStatus(200);
            setLoading(false);
            
            setChequeImg(res.data);
            
          })
          .catch(err => {
            setLoading(false);
  
            console.log(err.response.data);
          });
          break;
        case 'receipt':
          setButtonText2(I18n.t('orderCreation.uploading'))
          UploadImage(token, userId, response.assets[0])
          .then(res => {
            console.log(res.data);
            setButtonText2(I18n.t('orderCreation.uploaded'))
            setStatus(200);
            setLoading(false);
            
            setReceiptImg(res.data);
            
          })
          .catch(err => {
            setLoading(false);
            console.log(err.response.data);
          });
          break;
      }
   
    });
  };

  const createNewOrder = () => {
  

  AsyncStorage.multiGet(['API_TOKEN', 'USER_ID','USER_ROLE'], (err, items) => {
    if (err) {
      console.warn(err);
    }

    const body = {
      "deliveryAddressId": addressId,
      "deliverySlotId": slotId,
      "deliveryDate": formatted,
      "agencyId": items[2][1] == 'ROLE_AGENCYMANAGER' ? items[1][1] : contractList !== undefined ? contractList[select]['agency_id'] : '',
      "customerId": items[2][1] == 'ROLE_AGENCYMANAGER' ? route.params.role == 'ROLE_CLIENTMANAGER' ? route.params.id : '' : items[2][1] == 'ROLE_CLIENTMANAGER' ? items[1][1]: '',
      "agentId": items[2][1] == 'ROLE_AGENCYMANAGER' ? route.params.role == 'ROLE_AGENT' ? route.params.id : '' : items[2][1] == 'ROLE_AGENT' ? items[1][1]: '',
      "channelPartnerId": items[2][1] == 'ROLE_AGENCYMANAGER' ? route.params.role == 'ROLE_CHANNELPARTNER' ? route.params.id : '' : items[2][1] == 'ROLE_CHANNELPARTNER' ? items[1][1]: '',
      "itemPriceContractId": contractList != undefined ? contractList[select]['id'] : '',
      "onbehalf": items[2][1] == 'ROLE_AGENCYMANAGER' ? true : false,
      "status": "INITIATED",
      "initiatedBy": "1716",
      "actualQuantity": quantity,
      "vehicleId": 1,
      "payments": [
          {
              "type": "NOW",
              "mode": paymentType,
              "deliveryAddressId": addressId,
              "deliverySlotId": slotId,
              "agencyId": items[2][1] == 'ROLE_AGENCYMANAGER' ? items[1][1] : contractList !== undefined ? contractList[select]['agency_id'] : '',
              "customerId": items[2][1] == 'ROLE_AGENCYMANAGER' ? route.params.role == 'ROLE_CLIENTMANAGER' ? route.params.id : '' : items[2][1] == 'ROLE_CLIENTMANAGER' ? items[1][1]: '',
              "agentId": items[2][1] == 'ROLE_AGENCYMANAGER' ? route.params.role == 'ROLE_AGENT' ? route.params.id : '' : items[2][1] == 'ROLE_AGENT' ? items[1][1]: '',
              "channelPartnerId": items[2][1] == 'ROLE_AGENCYMANAGER' ? route.params.role == 'ROLE_CHANNELPARTNER' ? route.params.id : '' : items[2][1] == 'ROLE_CHANNELPARTNER' ? items[1][1]: '',
              "amount": amountDetails.grandTotal,
              "status": "CREDIT",
              "challanImage": "/image/1.png",
              "otherImage": "/other/1.png"
          }
      ],
      "createdBy": "",
      "lastModifiedBy": "",
      "impersonateUser": false
  } 
    
   
    createOrder(body,items[0][1]).then((res)=>{
    
      if(res.status == 201){
          console.log(res.data)
          setShow(true)
          setOrderId(res.data.id)
      }
    })
    .catch(err=>{
      console.log("Order Error",err)
    })
    })
  }

  const calculateTotal = () => {
    
      amountDetails.discount = contractList[select].discount * parseInt(quantity);
      amountDetails.subTotal = contractList[select].item_price * parseInt(quantity);
      // amountDetails.taxable_amount = amountDetails.subTotal * (18/100);
      amountDetails.grandTotal = (amountDetails.subTotal) - amountDetails.discount;
    
  }

  const getDateList = (token,id) => {
    getWorkingDays(token,id).then((res)=>{
      console.log("Response",res.data)
      if(res.data.length>0){
        let dateList = [];
        res.data.forEach((item)=>{
          let final_date = item['day'] + " "+item['month']
          dateList.push({'value': final_date,'formatted': item['year']+'-'+item['month']+'-'+item['day']})
        })
        if(dateList.length>0){
          setDateList(dateList)
          setDate((dateList[0].value).toString())
          setFormatetd((dateList[0].formatted).toString())
       }
      }
    })
    .catch(err=>{
      console.log("error",err)
    })
    // const today = new Date();
    // let dateList = [];
    // for(let i=0;i<7;i++){
    //   let x = today.setDate(today.getDate() + i)
    //   let myDate = new Date(x);
    //   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    //   "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    //   ];
    //   let final_date = myDate.getDate()+" "+(monthNames[myDate.getMonth()])
    //   dateList.push({'value': final_date,'formatted': formatDate(today.setDate(today.getDate() + i))})
    // }
    
    

  }
 
  const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  const deliveryAddress = [
    {
      title: 'Local Address',
      subtitle: 'Lalpur, LKO. 0522-2476000 Phone: 011-238348474',
    },
    {
      title: 'Permanent Address',
      subtitle: 'Lalpur, LKO. 0522-2476000 Phone: 011-238348474',
    },
  ];

  const selfPickupAddress = [
    {
      title: 'Harihar SIngh Store',
      subtitle: 'Lalpur, LKO. 0522-2476000 Phone: 011-238348474',
    },
    {
      title: 'Rohit Store',
      subtitle: 'Lalpur, LKO. 0522-2476000 Phone: 011-238348474',
    },
    {
      title: 'Rohit Store',
      subtitle: 'Lalpur, LKO. 0522-2476000 Phone: 011-238348474',
    },
  ];

  const taxDetails = {
    subTotal: '1694.92',
    discount: '200.00',
    taxable_amount: '1495.42',
    gst: '269.08',
    grandTotal: '1764.50',
  };
  // const dateList = [
  //   {
  //     value: '01 June 2021',
   
  //   },
  //   {
  //     value: '02 June 2021',
      
  //   },
  //   {
  //     value: '03 June 2021',
     
  //   },
  //   {
  //     value: '04 June 2021',
    
  //   },
  //   {
  //     value: '05 June 2021',
     
  //   },
  //   {
  //     value: '06 June 2021',
     
  //   },
  // ];
  // const timeList = [
  //   {
  //     value: '07:00-09:00 am',
  //     id:1
  //   },
  //   {
  //     value: '07:00-09:00 am',
  //     id:1
  //   },
  // ];
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
  const [date, setDate] = useState(dateList != undefined || dateList.length> 0 ? dateList[0]?.value : '');
  const [time, setTime] = useState(slotList != undefined || slotList.length > 1 ? slotList[0]?.value : '');
  const [cheque, setCheque] = useState(false);
  const [cash,setCash] = useState(true);
  const [selfPay, setSelfPay] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errorText, setErrorText] = useState('');

  const agencyDetails = [
    {
      agency_name: 'Bihari Gas Service',
      item_name: '19 kg LPG Cyl.',
      capacity: '10',
    },
    {
      agency_name: 'Hari Gas Service',
      item_name: '15 kg LPG Cyl.',
      capacity: '10',
    },
    {
      agency_name: 'Himmat Gas Service',
      item_name: '5 kg LPG Cyl.',
      capacity: '10',
    },
  ];

  const validateNext = () =>{
        const id = contractList[select].agency_id;
        getSlotsByAgency(id,token);
        getGodownAddress(id,token);
        if(role != 'ROLE_AGENCYMANAGER'){
          getPaymentInfo(id,userId,token)
          getDateList(token,id)
        }
       
        
  }
  
  const onValidate2 =() => {
     
      if(quantity == undefined || quantity.length<1){
        setErrorText(I18n.t('errorMessage.no_quantity'))
        setPopUp(true)
        setError(true);
        return;
      }
      if(time == undefined || time.length<1){
        setErrorText(I18n.t('errorMessage.no_time_slot'))
        setPopUp(true)
        setError(true)
        return;
      }
      if(date == undefined || date.length<1){
        setErrorText(I18n.t('errorMessage.no_delivery_date'))
        setPopUp(true)
        setError(true);
        return;
      }
     
      // if(remarks.length<1){
       
      //   return;
      // }
      setError(false)
      calculateTotal();
      
  }
  const validate3 = () => {
      if(selectedStore.length<1){
          setErrorText(I18n.t('errorMessage.no_store_selected'))
          setPopUp(true)
          setError(true)
          return;
      }
      else{
        setError(false)
      }
  }

  const onValidate4 =() => {
      // if(bank.length<1){
      //   setErrorText(I18n.t('errorMessage.no_bank_name'))
      //   setPopUp(true)
      //   setError(true)
      //     return;
      // }
      if(cheque && chequeNo.length<1){
        setErrorText(I18n.t('errorMessage.no_cheque'))
        setPopUp(true)
        setError(true)
        return;
      }
      setError(false)
      createNewOrder();
      // if(chequeImg.length<1){
      //   setErrorText(I18n.t('errorMessage.no_store_selected'))
      //   setPopUp(true)
      //   setError(true)
      //   return;
      // }
  }

  const onPayNow = async () => {
    console.log('Pay now initiated for order id ', orderId);  
    var options = {
       currency: 'INR',
       //order_id: orderId,
       key: 'rzp_test_ABC6E5NHVG09dg',  // dummy key
       amount: amountDetails.grandTotal,
        name: CONSTANTS.pay_now.title,
        theme: {color: config.NAVY_BLUE}
      }
    RazorpayCheckout.open(options)
      .then(async (transaction) => {
        console.log("Payment successful ")
        setPayNowSuccessful(true)
      })
      .catch(console.log);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={I18n.t('orderCreation.header')} />

      <CustomAlert
        showDialog={popUp}
        setShowDialog={setPopUp}
        title={errorText}
      />
      {/* Payment failed Modal  */}
      <FailModal
        showDialog={failed}
        setShowDialog={setFailed}
        title={I18n.t('orderCreation.payment_fail')}
        subTitle={I18n.t('orderCreation.payment_fail_desc')}
      />

      {/* Payment Sucess Modal  */}

      <SucessModal
        showDialog={paymentSucess ? paymentSucess : sucess}
        setShowDialog={paymentSucess ? setpaymentSuccess : setSuccess}
        title={
          paymentSucess
            ? I18n.t('orderCreation.paymentSuccesful')
            : I18n.t('orderCreation.order_placed')
        }
        subtitle={
          <Text>
            {I18n.t('orderCreation.placing_order_for') + '\n ' + '19 KG \n'}
            <Text style={{fontWeight: '700'}}>
              {I18n.t('orderCreation.cylinderQty') + ' ' + quantity}
            </Text>
            {'\n' + I18n.t('orderCreation.to ')+ '\n'}
            <Text style={{fontWeight: '700'}}>
              {agencyDetails[select].agency_name}
            </Text>
            {I18n.t('orderCreation.your_order_id')}
            <Text style={{fontWeight: '700'}}>{'\n OD12300001'}</Text>
            {paymentSucess ? (
              <Text>
                <Text>
                  {'\n\n' + I18n.t('orderCreation.payment_request') + '\n '}
                  <Text style={{fontWeight: '700'}}>{'12500'}</Text>
                  {'\n' + I18n.t('orderCreation.to') + '\n'}
                  <Text style={{fontWeight: '700'}}>
                    {agencyDetails[select].agency_name}
                  </Text>
                  {'\n' + I18n.t('orderCreation.payment_id')}
                  <Text style={{fontWeight: '700'}}>{'\n PM12300001'}</Text>
                </Text>
              </Text>
            ) : (
              ''
            )}
          </Text>
        }
      />

      <FilterWrapper navigation={''} showFilter={false}>
        <Text style={{textAlign: 'center'}}>
          {I18n.t('orderCreation.title')}
        </Text>
       
        
       
        <ProgressSteps
          borderWidth={2}
          completedProgressBarColor={config.GREEN}
          labelFontSize={10}
          completedStepIconColor={config.GREEN}
          activeLabelColor={config.GREEN}
          activeStep = {step}
          >
          
     

          {/* Step 1: */}

          <ProgressStep
            label={I18n.t('orderCreation.stepper1')}
            nextBtnText={I18n.t('orderCreation.proceed')}
            nextBtnStyle={styles.nextButtonStyle}
            nextBtnTextStyle={styles.nextButtonText}
            previousBtnDisabled={true}
            onNext ={()=>{
              
              validateNext()
            }}
            
          >
            <SafeAreaView>
            
            <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
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
              <View style={styles.wrap}>
              {!emptyMessage ? <FlatList
                data={contractList}
                renderItem={({item, index}) => (
                  <CreateOrderAgencyCard
                    agency_name={item.agency_name}
                    item_name={item.item_name}
                    quantity={item.capacity}
                    onItemSelect={() => {
                      setselect(index);
                    }}
                    cardBorder={select === index ? true : false}
                  />
                )}
              />:(
                <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  textAlign: 'center',
                  fontWeight: '400',
                  marginTop: 40,
                }}>
                {I18n.t('listingEmptyMessage.order_contracts')}
              </Text>
            </View>
              )}
               </View>
              </ScrollView>
            </SafeAreaView>
          </ProgressStep>
          {/* Step 2:  */}
          
          <ProgressStep label={I18n.t('orderCreation.stepper2')}
          nextBtnText={I18n.t('orderCreation.proceed')}
          nextBtnStyle={styles.nextButtonStyle}
          nextBtnTextStyle={styles.nextButtonText}
         
          previousBtnTextStyle={styles.previousButtonText}
          previousBtnDisabled={true}
                
          onNext ={()=>{
           
            onValidate2()
          }}
          errors={error}
          >
            <View>
              <View style={styles.contractWrapper}>
                <TouchableOpacity style={styles.rowWrapper} onPress={()=>{setStep(0)}}>
                  <View style={{display: 'flex', flexDirection: 'column'}}>
                  
                    <Text style={styles.value}>
                      {contractList[select] !== undefined ? contractList[select].agency_name : null}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.value, {textAlign: 'right'}]}>
                      {contractList[select] !== undefined ? contractList[select].item_name : null }
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{height: 20}} />

              <View>
                <Input
                  label={I18n.t('orderCreation.quantity')}
                  value={quantity}
                  onChange={(txt) => {
                    setQuantity(txt)
                    console.log(txt)
                  }}
                  iconSize={20}
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
                  dateList={quantityList}
                  onChange={value => {
                    
                    setQuantity(value.value);
                   
                  }}
                  initialValue={0}
                />
                <View style={{height: 20}} />

                <Text
                  style={{
                    fontSize: 18,
                    marginStart: 15,
                    color: '#182024',
                    marginBottom: 10,
                  }}>
                  {I18n.t('postponeDelivery.delivery_date')}
                </Text>

                {dateList.length > 0 ? <DeliveryDatePicker
                  dateList={dateList}
                  onChange={value => {
                    setDate(value.value);
                    setFormatetd(value.formatted)
                  }}
                  initialValue={0}
                />: 
                <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    textAlign: 'center',
                    fontWeight: '400',
                    marginTop: 40,
                  }}>
                  {I18n.t('listingEmptyMessage.no_days')}
                </Text>
              </View>
                }
                <View style={{height: 20}} />

                <Text
                  style={{
                    fontSize: 18,
                    marginStart: 15,
                    color: '#182024',
                    marginBottom: 10,
                  }}>
                  {I18n.t('postponeDelivery.delivery_time')}
                </Text>

                {slotList.length > 0 ? <DeliveryDatePicker
                  dateList={slotList}
                  onChange={value => {
                    
                    setTime(value.value);
                    console.log(value.deliverySlotId);
                    setSlotId(value.deliverySlotId)
                  }}
                  initialValue={0}
                /> : (
                  <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    textAlign: 'center',
                    fontWeight: '400',
                    marginTop: 40,
                  }}>
                  {I18n.t('listingEmptyMessage.no_delivery')}
                </Text>
              </View>
                )}
              </View>
              <View style={{height: 20}} />
              <Input
                label={I18n.t('orderCreation.remarks')}
                value={remarks}
                onChange={(txt) => {
                  setRemarks(txt);
                }}
                iconSize={20}
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
            </View>
          </ProgressStep>
          {/* Step 3: */}

          <ProgressStep label={I18n.t('orderCreation.stepper3')}
           nextBtnText={I18n.t('orderCreation.proceed')}
           nextBtnStyle={styles.nextButtonStyle}
           nextBtnTextStyle={styles.nextButtonText}
           previousBtnTextStyle={styles.previousButtonText}
           previousBtnDisabled={true}
             onNext ={()=>{
               
               validate3()
              }}
             nextBtnDisabled ={emptyMessage1}
             errors={error}
             >
            <View>
              <View style={styles.contractWrapper}>
                <TouchableOpacity style={styles.rowWrapper} onPress={()=>{setStep(0)}}>
                  <View style={{display: 'flex', flexDirection: 'column'}}>
                    <Text style={styles.value}>
                      {contractList[select] !== undefined ? contractList[select].agency_name : null}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.value, {textAlign: 'right'}]}>
                      {contractList[select] !== undefined ? contractList[select].item_name : null}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{height: 5}} />

              <View>
                <View style={styles.contractWrapper}>
                  <TouchableOpacity style={styles.rowWrapper} onPress={()=>{setStep(1)}}>
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                      <View style={{display: 'flex',flexDirection: 'row'}}>
                      <Text style={styles.value}>
                        {I18n.t('orderCreation.qty')}
                      </Text>
                      <Text style={styles.valueColor}>
                        {' '+quantity + ' Cyl.'}
                      </Text>
                      </View>
                     
                    </View>
                    <View>
                    <View style={{display: 'flex',flexDirection: 'row'}}>
                      <Text style={styles.value}>
                        {I18n.t('orderCreation.unitPrice')}
                      </Text>
                      <Text style={styles.valueColor}>
                        {contractList[select] !== undefined ? contractList[select].item_price - contractList[select].discount : null}
                      </Text>
                      </View>
                     
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{height: 5}} />
              </View>

              <View>
                <View style={styles.contractWrapper}>
                  <TouchableOpacity style={styles.rowWrapper} onPress={()=>{setStep(1)}}>
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                      <Text style={styles.value}>{date + ' 2021'}</Text>
                    </View>
                    <View>
                      <Text style={[styles.value, {textAlign: 'right'}]}>
                        {time}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{height: 5}} />
              </View>
              <View>
                <View style={styles.contractWrapper}>
                  <TouchableOpacity style={styles.rowWrapper} onPress={()=>{setStep(1)}}>
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                      <Text style={styles.value}>
                        {I18n.t('orderCreation.remarks')}
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.value, {textAlign: 'right'}]}>
                        {remarks}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{height: 20}} />
              </View>

              <TaxBillingCard taxDetails={amountDetails} />
              <View style={{height: 20}} />

              <View style={styles.tabContaner}>
                <TouchableOpacity
                  style={
                    delivery ? styles.tabItemActive : styles.tabItemInActive
                  }
                  onPress={() => {
                    if (!delivery) {
                      setdelivery(true);
                      setselfPickup(false);
                    }
                  }}>
                  <Text style={styles.tabText}>
                    {I18n.t('orderCreation.delivery')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selfPickup ? styles.tabItemActive : styles.tabItemInActive
                  }
                  onPress={() => {
                    if (!selfPickup) {
                      setselfPickup(true);
                      setdelivery(false);
                    }
                  }}>
                  <Text style={styles.tabText}>
                    {I18n.t('orderCreation.self_pickup')}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{marginBottom: 40}}>
                {delivery ? (
                  !emptyMessage1 ? 
                  <RadioButtonGroup
                  radioGroupList={stores}
                  onChange={value=>{
                      setAddressId(value.addressId)
                      setSelectedStore(value)
                  }}
                  initialValue={0}
                  />
                  :  <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      fontWeight: '400',
                      marginTop: 40,
                    }}>
                    {I18n.t('listingEmptyMessage.no_store')}
                  </Text>
                </View>
                ) : (
                  !emptyMessage2 ?
                  <RadioButtonGroup
                  radioGroupList={godowns}
                  onChange={value=>{
                    setAddressId(value.addressId)
                    setSelectedStore(value)
                  }}
                  initialValue={0}
                  />
                  //  <FlatList
                  //   data={godowns}
                  //   renderItem={({item}) => (
                  //     <CustomCheckBox
                  //       title={item.name}
                  //       subtitle={item.address}
                  //       onChecked={value => {
                  //         if(value){
                  //           console.log(item)
                  //           setGodownId(item.godownId)
                  //           setSelectedStore(item)
                  //         }
                  //       }}
                  //       isChecked={false}
                  //     />
                  //   )}
                  // /> 
                  : <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      fontWeight: '400',
                      marginTop: 40,
                    }}>
                    {I18n.t('listingEmptyMessage.no_goddown')}
                  </Text>
                </View>
                )}
              </View>
            </View>
          </ProgressStep>
          {/* Step 4: */}
          <ProgressStep label={I18n.t('orderCreation.stepper4')}
              nextBtnText={I18n.t('orderCreation.proceed')}
              nextBtnStyle={styles.nextButtonStyle}
              nextBtnTextStyle={styles.nextButtonText}
              previousBtnTextStyle={styles.previousButtonText}
              previousBtnDisabled={true}
              onNext ={()=>{
             
                onValidate4()
              }}
              errors ={error}
             >
            <View>
              <View style={styles.contractWrapper}>
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
                <TouchableOpacity style={styles.rowWrapper} onPress={()=>{setStep(0)}}>
                  <View style={{display: 'flex', flexDirection: 'column'}}>
                    <Text style={styles.value}>
                    {contractList[select] !== undefined ? contractList[select].agency_name : null}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.value, {textAlign: 'right'}]}>
                    {contractList[select] !== undefined ? contractList[select].item_name : null}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{height: 5}} />

              <View>
                <View style={styles.contractWrapper}>
                  <TouchableOpacity style={styles.rowWrapper} onPress={()=>{setStep(1)}}>
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                    <View style={{display: 'flex',flexDirection: 'row'}}>
                      <Text style={styles.value}>
                        {I18n.t('orderCreation.qty')}
                      </Text>
                      <Text style={styles.valueColor}>
                        {' '+quantity + ' Cyl.'}
                      </Text>
                      </View>
                    </View>
                    <View>
                    <View style={{display: 'flex',flexDirection: 'row'}}>
                      <Text style={styles.value}>
                        {I18n.t('orderCreation.unitPrice')}
                      </Text>
                      <Text style={styles.valueColor}>
                        {contractList[select] !== undefined ? contractList[select].item_price: null}
                      </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{height: 5}} />
              </View>

              <View>
                <View style={styles.contractWrapper}>
                  <TouchableOpacity style={styles.rowWrapper} onPress={()=>{setStep(1)}}>
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                      <Text style={styles.value}>{date}</Text>
                    </View>
                    <View>
                      <Text style={[styles.value, {textAlign: 'right'}]}>
                        {time}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{height: 5}} />
              </View>
              <View>
                <View style={styles.contractWrapper}>
                  <TouchableOpacity style={styles.rowWrapper} onPress={()=>{setStep(1)}}>
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                      <Text style={styles.value}>
                        {I18n.t('orderCreation.remarks')}
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.value, {textAlign: 'right'}]}>
                        {remarks}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{height: 20}} />
              </View>
              <TouchableOpacity onPress={()=>{setStep(2)}}>

              
              <DeliveryAddressCard deliveryAddress={selectedStore} />
              </TouchableOpacity>
              <View style={{height: 20}} />

              <TaxBillingCard taxDetails={amountDetails} />
              <View style={{height: 20}} />
              {!(paymentType == 'M' || paymentType == 'W') && <View style={styles.tabContaner}>
                <TouchableOpacity
                  style={payNow ? styles.tabItemActive : styles.tabItemInActive}
                  onPress={() => {
                    if (!payNow) {
                      setpayNow(true);
                      setPayAtDelivery(false);
                    }
                  }}>
                  <Text style={styles.tabText}>
                    {I18n.t('orderCreation.pay_now')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    payAtDelivery
                      ? styles.tabItemActive
                      : styles.tabItemInActive
                  }
                  onPress={() => {
                    if (!payAtDelivery) {
                      setPayAtDelivery(true);
                      setpayNow(false);
                    }
                  }}>
                  <Text style={styles.tabText}>
                    {I18n.t('orderCreation.pay_at_delivery')}
                  </Text>
                </TouchableOpacity>
              </View>}
              {!(paymentType == 'M' || paymentType == 'W') && (<View>
              {payAtDelivery ? (
                <View style={{marginBottom: 30}}>
                  <CustomRadioButton
                     radioText={I18n.t('orderCreation.paymentType.cash')} 
                     isOn={cash}
                     onPress={()=>{
                       setCash(!cash)
                       setCheque(false)
                       setSelfPay(false)
                        setPaymentType('cash')
                      }}
                  />
                   <CustomRadioButton
                     radioText={I18n.t('orderCreation.paymentType.cheque')} 
                     isOn={cheque}
                     onPress={()=>{
                       setCheque(!cheque)
                       setCash(false)
                       setSelfPay(false)
                       setPaymentType('cheque')
                      }}
                  />
                   <CustomRadioButton
                     radioText={I18n.t('orderCreation.paymentType.self_deposit')} 
                     isOn={selfPay}
                     onPress={()=>{
                       setSelfPay(!selfPay)
                       setCheque(false)
                       setCash(false)
                       setPaymentType('selfpay')
                      }}
                  />
                  {/* <CustomCheckBox
                    title={I18n.t('orderCreation.paymentType.cash')}
                    onChecked={value => {
                     
                      setCash(value)
                      setCheque(!value)
                      setSelfPay(!value) 
                    }}
                    isChecked={cash}
                  />
                  <CustomCheckBox
                    title={I18n.t('orderCreation.paymentType.cheque')}
                    onChecked={value => {

                        setCheque(!value);
                        setSelfPay(value)
                        setCash(value)
                        
                    }}
                    isChecked={cheque}
                  />
                  <CustomCheckBox
                    title={I18n.t('orderCreation.paymentType.self_deposit')}
                    onChecked={value => {
                        setSelfPay(!value);
                        setCheque(value)
                        setCash(value)
                    }}
                    isChecked={selfPay}
                  /> */}
                </View>
              ) : (
                <View></View>
              )}
              {cheque && payAtDelivery ? (
                <View>
                  <Input
                    label={I18n.t('orderCreation.bank_name')}
                    value={bank}
                    onChange={(txt) => {setBank(txt)}}
                    iconSize={20}
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
                  <Input
                    label={I18n.t('orderCreation.cheque_no')}
                    value={chequeNo}
                    onChange={(txt) => {setChequeNo(txt)}}
                    iconSize={20}
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

                  <TouchableOpacity
                    style={styles.dashedBUtton}
                    
                    onPress={() => {chooseImage('cheque')}}>
                    <Text style={styles.buttonText}>
                      {btnText1}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View></View>
              )}
              {selfPay && payAtDelivery ? (
                <View>
                  <Input
                    label={I18n.t('orderCreation.utr_no')}
                    value={utr}
                    onChange={(txt) => {setUtr(txt)}}
                    iconSize={20}
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

                  <TouchableOpacity
                    style={styles.dashedBUtton}
                    onPress={() => {chooseImage('receipt')}}>
                    <Text style={styles.buttonText}>
                      {btnText2}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View></View>
              )}
              </View>)}
            </View>
          </ProgressStep>
          {/* Step 5: */}
          <ProgressStep label={I18n.t('orderCreation.stepper5')}
          removeBtnRow={true}
          onNext ={()=>{}}
          >
          
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
                      {contractList[select] != undefined ? contractList[select].agency_name +'\n' : ''}
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
          
                
            <View></View>
          </ProgressStep>
        </ProgressSteps>
      </FilterWrapper>


      <FooterTab navigation={navigation}
        onAddRoute={''}
        isAdd={false}
                
      />

    </View>
  );
};

export default OrderCreation;
