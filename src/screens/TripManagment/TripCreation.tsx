import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Platform, Pressable} from 'react-native';
import styles from './TripManagment.styles';
import style from './TripType/TripType.styles';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import Header from '../../components/atoms/Header';
import constants from '../../constants/constants';
import I18n from "../../config/i18n";
import FilterWrapper from '../../components/FilterWrapper';
import config from '../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InternalTrip from './TripType/InternalTrip';
import LeakTrip from './TripType/LeakTrip';
import OtherAgencyTrip from './TripType/OtherAgencyTrip';
import OMCTrip from './TripType/OMCTrip';
import ExternalTrip from './TripType/ExternalTrip';
import {List, Button} from 'react-native-paper';
import AddTripItemModal from '../../components/atoms/Modals/AddTripItemModal';
import Input from '../../components/atoms/Input';
import Dropdown from '../../components/atoms/Dropdown';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../../components/atoms/Modals/CustomeAlert';
import {createNewTrip,getTripById,updateTrip} from '../../api/tripApi';
import {GetAllVehicleByAgency,GetAllGodownByAgency,GetAllDeliverySlotByAgency, DeleteItem} from '../../api/agencyApi';
import {getItems,GetItemListing,GetItemById} from '../../api/agencyApi'
import {getUserList} from '../../api/userApi';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import { useEffect } from 'react';
import DeleteModal from '../../components/atoms/Modals/DeleteModal';


const TripCreation: any = ({navigation}: {navigation: any}) => {

  const [select, setselect] = useState(0);
  const [step, setStep] = useState(0);
  const [showDialog, setshowDialog] = useState(false);
  const [trip,createTrip] = useState([]);
  const [isInward, setisInward] = useState(true);
  const [isOutward, setisOutward] = useState(false);
  const [error,setError] = useState(false);
  const [errorText,setErrorText] = useState('');
  const [token,setToken] = useState('');
  const [id,setId] = useState('');
  const [popUp,setPopUp] = useState(false)
  const [vehicles,setVehicleList] = useState([])
  const [godowns,setGodownList] = useState([])
  const [tripResponse,setTripResponse] = useState([])
  const [start,setStart] = useState('');
  const [end,setEnd] = useState('');
  
  const options = [
    {label: '1', value: '1', key: 1},
    {label: '2', value: '2', key: 2},
    {label: '3', value: '3', key: 3},
    {label: '4', value: '4', key: 4},
  ];
  const [date, setDate] = useState('');
  const [dateDetails, setDateDetails] = useState(new Date());
  const [show1, setShow1] = useState(false);
  const [time,setTime] = useState('');
  const [slotId,setSlotId] = useState('')
  const [timeDetails1, setTimeDetails1] = useState(new Date());
  const [show2, setShow2] = useState(false);
  const [name,setName] = useState('');
  const [name1,setName1] = useState('');
  const [name2,setName2] = useState('');
  const [name3,setName3] = useState('');
  const [name4,setName4] = useState('');
  const [agencyName,setAgencyName] = useState('');
  const [godownName,setGodownName] = useState('');
  const [driver,setDriver] = useState('');
  const [deliveryBoy,setDeliveryBoy] = useState('')
  const [mechanic,setMechanic] = useState('')
  const [vehicle,setVehicle] = useState('');
  const [startGd,setStartGd] = useState('');
  const [endGd,setEndGd] = useState('');
  const [tripData,setTripData] = useState(null);
  const [loading,setLoading] = useState(false)
  const [items,setItems] = useState([])
  const [driverList,setDriverList] = useState([])
  const [deliveryBoyList,setDeliveryBoyList] = useState([])
  const [mechanicList,setMechanicList] = useState([])
  const [slotList,setSlotList] = useState([])
  const [val,setVal] = useState({});
  const [qtyList,setQtyList] = useState([])
  const [listData,updateListData] = useState([])
  const [itemName, setItemName] = useState('');
  const [todelete, setToDelete] = useState(false);
  const [capacity,setCapacity] = useState(100);
  const [exceed,setExceed] = useState(false);
  const [roleList,setRoleList] = useState([]);
  
  useFocusEffect(
    React.useCallback(() => {
     
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID','USER_ROLE'], (err, items) => {
        if (err) {
          console.warn(err);
        }

        setToken(items[0][1])
        setId(items[1][1])
        GetAllVehicleByAgency(items[0][1],items[1][1],1).then((res)=>{
          setLoading(true);
          if(res.data != undefined || res.data.length > 0) {
            const data =  res.data;
            let list = [];
            data.forEach((item)=>{
              list.push({'label': item.name,'value': item.vehicleId,'capacity': item.capacity})
            })
            if(list != undefined || list.length > 0) {
                setLoading(false);
                setVehicleList(list)
            }
            console.log(list)
          }else{
            setLoading(false)
          }
        })
        .catch(err=>{
          console.log("Error1",err)
        })

        GetAllGodownByAgency(items[0][1],items[1][1],1).then((res)=>{
          setLoading(true);
          if(res.data != undefined || res.data.length > 0) {
            const data =  res.data;
            let list = [];
            data.forEach((item)=>{
              if(item.type == 'primary'){
                list.push({'label': item.name,'value': item.godownId})
              }
            })
            if(list != undefined || list.length > 0) {
              setLoading(false);
                setGodownList(list)
            }
          }else{
            setLoading(false);
          }
        })
        .catch(err=>{
          console.log("Error2",err)
        })
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
          console.log("Error3",err)
        })
        // getItems(items[0][1]).then((res)=>{
         
        //   let list = [];
        //   if(res.data.length>0){
        //     const data = res.data;
        //     data.forEach((item)=>{
        //       list.push({'label': item.itemName,'value':item.itemId})
        //     })
        //     if(list.length>0){
        //       setItems(list)
        //     }
           
        //   }
        // })
        // .catch(err=>{
        //   console.log("Error2",err)
        // })
       
              const body ={
                'agencyId': items[1][1],
                'role': 'driver'
              }
              getUserList(items[0][1],body).then((res)=>{
                let list = [];
                console.log(res.data)
                if(res.data != undefined){
                  const data = res.data;
                  data['content'].forEach((item)=>{
                    list.push({'label': item['userDetails']['name'],'value':item['username']})
                  })
                
                  if(list.length>0){
                    setDriverList(list)
                  }
                 
                }
              })
              .catch(err=>{
                console.log("Error4",err)
              })
              
              
        
 
      });
    }, []),
  );
  useEffect(()=>{

    triggerUpdate(listData,token,tripResponse['id']);

  },[listData])

  useEffect(()=>{

    console.log("Rolelist",roleList)

  },[roleList])
  
  const getData = () => {
    const body1 = {
      'agencyId': id,
      'role': 'deliveryBoy'
    }
  
    getUserList(token,body1).then((res)=>{
      let list = [];
      console.log("Res",res.data)
      if(res.data != undefined){
        const data = res.data;
        data['content'].forEach((item)=>{
          list.push({'label': item['userDetails']['name'],'value':item['username']})
        })
      
        if(list.length>0){
          setDeliveryBoyList(list)
        }
       
      }
    })
    .catch(err=>{
      console.log("Error5",err)
    })
    
      GetAllDeliverySlotByAgency(token,id,1)
      .then(res => {
        const data = res.data;
        let arr = [];
        data.forEach((item)=>{
          arr.push({'value':item.deliverySlotId,'label':`${item.startTime}-${item.endTime}`})
        })
        setSlotList(arr);
        if(arr.length>0){
         
          setSlotId(arr[0].deliverySlotId)
        }
       
      })
      .catch(err => {
        console.log("Error6",err);
        
      });
  }
  
  const getData1 = async () => {

    try{
      const body1 = {
        'agencyId': id,
        'role': 'mechanic'
      }
      const body2 = {
        'agencyId': id,
        'role': 'deliveryBoy'
      }
  
      let list1  = await getUserList(token,body1);
      let list2 = await getUserList(token,body2);
      if(list1.data != undefined || list2.data != undefined){
        const data1 = list1.data;
        const data2 = list2.data;
        let finalList1 = [];
        let finalList2 = [];
        data1['content'].forEach((item)=>{
            finalList1.push({'label': item['userDetails']['name'],'value':item['username']})
        })
        data2['content'].forEach((item)=>{
            finalList2.push({'label': item['userDetails']['name'],'value':item['username']})
        })
        
        if(finalList1.length>0 || finalList2.length>0){
          
          setRoleList([...roleList,...finalList1,...finalList2])
        }
      }
    }
    catch(error){
      console.log("Error", error)
    }
    
    // getUserList(token,body1).then((res)=>{
    //   let list = [];
    //   console.log("Res",res.data)
    //   if(res.data != undefined){
    //     const data = res.data;
    //     data['content'].forEach((item)=>{
    //       list.push({'label': item['userDetails']['name'],'value':item['userDetails']['id']})
    //     })
      
    //     if(list.length>0){
    //       console.log("list1",list)
    //       setRoleList(list)
    //     }
       
    //   }
    // })
    // .catch(err=>{
    //   console.log("Error5",err)
    // })
    // getUserList(token,body2).then((res)=>{
    //   let list = [];
    //   console.log("Res",res.data)
    //   if(res.data != undefined){
    //     const data = res.data;
    //     data['content'].forEach((item)=>{
    //       list.push({'label': item['userDetails']['name'],'value':item['userDetails']['id']})
    //     })
      
    //     if(list.length>0){
    //       console.log("list2",list)
    //       setRoleList([...roleList,list])
    //     }
        
    //   }
    // })
    // .catch(err=>{
    //   console.log("Error5",err)
    // })
   
  }
  

  const updateLatestTrip = (val) => {
    setLoading(true)
    if(val != undefined || val.hasOwnProperty('id')){

      getTripById(tripResponse['id'],token).then((res)=>{
        console.log("Trips",res.data)
        if(res.data != undefined){
           
            let data = res.data;
            const itemList = [...data['items'], val];
            const finalData = {...data, items :itemList}
            updateListData(finalData)
            setLoading(false)
            
        }
      })
      .catch(err=>{
        setLoading(false)
        console.log("Error7",err)
      })
  }
  }
  
  const deleteItem = () => {
    setToDelete(false)

  }

  const triggerUpdate = (body,token,id) => {
   
    updateTrip(body,token,id).then((res)=>{
      console.log("Response",res.data)
      let data = res.data;
      let list = [];
      
      if(data['items'].length>0){
        data['items'].forEach( (item)=>{
          let itemName = getItemName(item.id,token);
          
          list.push({'qty':item.quantity,'listTitle':itemName,'id':item.id,'filledCylinder':item.filledCylinder})
        })
        if(list.length>0){
          setQtyList(list)
        }
      }
      setLoading(false)
    })
    .catch(err=>{
      setLoading(false)
      console.log("Error8",err)
    })
  }

  



  const getItemName = (id,token) => {
    GetItemById(id,token).then((res)=>{
      
        if(res.data != undefined){
           return res.data['item']['itemName'];
        }
    })
    .catch((err)=>{
      console.log("Error",err)
    })
  }
  

  const onChange1 = (event, selectedDate) => {
    if (isNaN(selectedDate)) {
      
      setShow1(!show1)
      return;
    }

    const unixTimeZero = new Date(selectedDate);
    setShow1(Platform.OS === 'ios');
    
    setDate(formatDate(unixTimeZero));
    setShow1(!show1)
  };

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

  const onChange2 = (event, selectedDate) => {
    
    if (isNaN(selectedDate)) {
      setShow2(!show2)
      return;
    }

    const unixTimeZero = new Date(selectedDate);

    setShow2(Platform.OS === 'ios');
    let minutes = unixTimeZero.getMinutes();
    let min = minutes.toString();
    if (minutes < 10) {
      min = '0' + minutes.toString();
    }
    setTime(unixTimeZero.getHours() + ':' + min);
    setShow2(!show2)
  };

  const showTimepicker1 = () => {
    setShow1(!show1);
  };

  const showTimepicker2 = () => {
    setShow2(!show2);
  };


  const createTripData = (type) => {
      
      switch(type) {
        case 0:
         
          if(name == undefined || name.length<=0){
            
              setErrorText(I18n.t('errorMessage.valid_trip_name'))
              setPopUp(true);
              setError(true)
              return;
          }
          if(date == undefined || date.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_date'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(time == undefined || time.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_time'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(driver.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_driver'))
            setPopUp(true);
            setError(true)
            return;
          }
         
          if(vehicle == undefined || vehicle.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_vehicle'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(startGd == undefined || startGd.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_startGd'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(endGd == undefined || endGd.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_endGd'))
            setPopUp(true);
            setError(true)
            return;
          }
          const body = 
            {
              "agencyId": id,
              "name": name,
              "startTime": time,
              "startDate": date,
              "type": "INTERNAL",
              "startGodownId": startGd,
              "endGodownId": endGd,
              "vehicleId": vehicle,
              "driverId": driver.toString(),
              "status": "CREATED"
            }
          
            
          setSpecificTrip(body);
          setError(false)
          break;
        case 1:
        
          if(name1 == undefined || name1.length<=0){
          
            setErrorText(I18n.t('errorMessage.valid_trip_name'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(date == undefined || date.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_date'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(slotId == undefined || slotId.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_time'))
            setPopUp(true);
            setError(true)
            return;
          }
         
          if(deliveryBoy == undefined || deliveryBoy.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_delivery'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(driver.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_driver'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(vehicle == undefined || vehicle.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_vehicle'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(startGd == undefined || startGd.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_startGd'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(endGd == undefined || endGd.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_endGd'))
            setPopUp(true);
            setError(true)
            return;
          }
          const body1 = 
            {
              "agencyId": id,
              "name": name1,
              "startDate": date,
              "vehicleId": vehicle,
              "driverId": driver.toString(),
              "mechanicOrDeliveryBoyId": deliveryBoy.toString(),
              "startGodownId": startGd,
              "endGodownId": endGd,
              "deliverySlotId": slotId,
              "type": "EXTERNAL",
              "status": "CREATED"
              
            }

          setSpecificTrip(body1);
          setError(false)
          break;
        case 2:
          if(name2 == undefined || name2.length<=0){
          
            setErrorText(I18n.t('errorMessage.valid_trip_name'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(date == undefined || date.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_date'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(driver.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_driver'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(time == undefined || time.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_time'))
            setPopUp(true);
            setError(true)
            return;
          }
        
          if(vehicle == undefined || vehicle.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_vehicle'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(endGd == undefined || endGd.length<=0){
            setErrorText(I18n.t('errorMessage.valid_godown'))
            setPopUp(true);
            setError(true)
            return;
          }
        
          const body2 = 
            {
              "agencyId": id,
              "name": name2,
              "driverName": driver,
              "startDate": date,
              "startTime": time,
              "type": "OMC",
              "endGodownId": endGd,
              "vehicleDetails": vehicle,
              "status": "CREATED"
             
            }

          setSpecificTrip(body2);
          setError(false)
          break;
        case 3:
          if(name3 == undefined || name3.length<=0){
            
            setErrorText(I18n.t('errorMessage.valid_trip_name'))
            setPopUp(true);
            setError(true)
            return;
        }
        if(date == undefined || date.length<=0){
          setErrorText(I18n.t('errorMessage.valid_trip_date'))
          setPopUp(true);
          setError(true)
          return;
        }
        if(time == undefined || time.length<=0){
          setErrorText(I18n.t('errorMessage.valid_trip_time'))
          setPopUp(true);
          setError(true)
          return;
        }
        if(mechanic.length<=0){
          setErrorText(I18n.t('errorMessage.valid_trip_mechanic'))
          setPopUp(true);
          setError(true)
          return;
        }
       
        if(vehicle == undefined || vehicle.length<=0){
          setErrorText(I18n.t('errorMessage.valid_trip_vehicle'))
          setPopUp(true);
          setError(true)
          return;
        }

        const body3 = 
          {
            "agencyId": id,
            "name": name3,
            "startDate":date,
            "startTime": time,
            "type": "LEAK",
            "mechanicOrDeliveryBoyId": mechanic,
            "vehicleId": vehicle,
            "status": "CREATED"
          
          }
        
          
        setSpecificTrip(body3);
        setError(false)
        break;
         
        case 4:
          if(agencyName == undefined || agencyName.length<=0){
          
            setErrorText(I18n.t('errorMessage.valid_trip_agency'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(endGd == undefined || endGd.length<=0){
          
            setErrorText(I18n.t('errorMessage.valid_godown'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(name4 == undefined || name4.length<=0){
          
            setErrorText(I18n.t('errorMessage.valid_trip_name'))
            setPopUp(true);
            setError(true)
            return;
          }
         
        
          if(date == undefined || date.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_date'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(time == undefined || time.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_time'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(driver.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_driver'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(vehicle == undefined || vehicle.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_vehicle'))
            setPopUp(true);
            setError(true)
            return;
          }
          // if(startGd == undefined || startGd.length<=0){
          //   setErrorText(I18n.t('errorMessage.valid_trip_startGd'))
          //   setPopUp(true);
          //   setError(true)
          //   return;
          // }
          if(endGd == undefined || endGd.length<=0){
            setErrorText(I18n.t('errorMessage.valid_trip_endGd'))
            setPopUp(true);
            setError(true)
            return;
          }
          if(isInward){
            const body4 = 
            {
              "agencyId": id,
              "name": name4,
              "startDate": date,
              "startTime": time,
              "type": "OTHER",
              "driverId":driver.toString(),
              "endGodownId": endGd,
              "agencyName": agencyName,
              "vehicleId": vehicle,
              "status": "CREATED",
              "inward": isInward
           
            }
            console.log(body4)
            setSpecificTrip(body4);
            setError(false)
            break;
          }else{
            const body4 = 
            {
              "agencyId": id,
              "name": name4,
              "startDate": date,
              "startTime": time,
              "type": "OTHER",
              "driverId":driver.toString(),
              "startGodownId": endGd,
              "agencyName": agencyName,
              "vehicleId": vehicle,
              "status": "CREATED",
              "inward": isInward
           
            }
            setSpecificTrip(body4);
            setError(false)
            break;
          }
         

          
          
      }
  }

  const setSpecificTrip = (body) => {
    setLoading(true)
      createNewTrip(body,token).then((res)=>{
        setLoading(false)
        
        if(res.data != undefined){
        
          setTripResponse(res.data)

        }
      })
      .catch(err=>{
        setLoading(false)
        console.log("Error1",err.response.data.message)
      })
  }
  
  const keyExtractor = (item, index) => index.toString();

 

  return (
    <View style={styles.container}>
      <AddTripItemModal showDialog={showDialog} setShowDialog={setshowDialog} items={items} getVal={setVal} updateNow={updateLatestTrip}/>
      
      <Header navigation={navigation} title={I18n.t('tripCreation.header')} />
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
      <FilterWrapper navigation={''} showFilter={false}>
        <ProgressSteps
          borderWidth={2}
          completedProgressBarColor={config.GREEN}
          labelFontSize={12}
          completedStepIconColor={config.GREEN}
          activeLabelColor={config.GREEN}
          activeStep = {step}
         
          >
          {/* Step 1: */}

          <ProgressStep
            label={I18n.t('tripCreation.stepper.stepper1')}
            // nextBtnText={constants.orderCreation.proceed}
            // nextBtnStyle={styles.nextButtonStyle}
            nextBtnTextStyle={styles.nextButtonText}
            // previousBtnDisabled={true}
            
          >
            <View>
              <TouchableOpacity
                onPress={() => {
                 
                  setselect(0);
                  setStep(1)
                }}
                style={[styles.tripCard, {backgroundColor: '#E5F8FD'}]}>
                <Text style={styles.textStyle}>
                  {I18n.t('tripCreation.internal_trip')}
                </Text>
                <Icon
                  name={'arrow-forward'}
                  color={config.NAVY_BLUE}
                  size={25}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  
                  setselect(1);
                  setStep(1)
                  getData();
                }}
                style={[styles.tripCard, {backgroundColor: '#E5F9FD'}]}>
                <Text style={styles.textStyle}>
                  {I18n.t('tripCreation.external_trip')}
                </Text>
                <Icon
                  name={'arrow-forward'}
                  color={config.NAVY_BLUE}
                  size={25}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                
                  setselect(2);
                  setStep(1)
                }}
                style={[styles.tripCard, {backgroundColor: '#CCF0FB'}]}>
                <Text style={styles.textStyle}>
                  {I18n.t('tripCreation.omc_trip')}
                </Text>
                <Icon
                  name={'arrow-forward'}
                  color={config.NAVY_BLUE}
                  size={25}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                 
                  setselect(3);
                  setStep(1)
                  getData1();
                }}
                style={[styles.tripCard, {backgroundColor: '#B3E9FA'}]}>
                <Text style={styles.textStyle}>
                  {I18n.t('tripCreation.leak_trip')}
                </Text>
                <Icon
                  name={'arrow-forward'}
                  color={config.NAVY_BLUE}
                  size={25}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  
                  setselect(4);
                  setStep(1)
                }}
                style={[styles.tripCard, {backgroundColor: '#99E2F8'}]}>
                <Text style={styles.textStyle}>
                  {I18n.t('tripCreation.other_agency')}
                </Text>
                <Icon
                  name={'arrow-forward'}
                  color={config.NAVY_BLUE}
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </ProgressStep>
          <ProgressStep
            label={I18n.t('tripCreation.stepper.stepper2')}
            nextBtnText={I18n.t('orderCreation.proceed')}
            nextBtnStyle={styles.nextButtonStyle}
            nextBtnTextStyle={styles.nextButtonText1}
            previousBtnTextStyle={styles.previousButtonText}
            previousBtnText={I18n.t('orderCreation.back')}
            onNext = {()=>{
               createTripData(select)
            }}
            errors ={error}
            >
            <View>
            <CustomAlert
              showDialog={popUp}
              setShowDialog={setPopUp}
              title={errorText}
            />
            
             <View>
          {show1 && (
            <DateTimePicker
              placeholderText={I18n.t('tripManagment.trip_date')}
              testID="dateTimePicker"
              value={new Date()}
              minimumDate={new Date()}
              mode={'date'}
              is24Hour={true}
              display="spinner"
              onChange={onChange1}
            
              
              
            />
          )}
        </View>
        <View>
          {show2 && (
            <DateTimePicker
              placeholderText={I18n.t('tripManagment.trip_time')}
              testID="dateTimePicker"
              value={new Date()}
              mode={'time'}
              is24Hour={true}
              display="spinner"
              onChange={onChange2}
              minuteInterval={15}
              
            />
          )}
        </View>
              {/* {tripTypeView(select)} */}
              {
                select == 0 && (
                  <View style={style.container}>
                  <View style={{marginTop: 20}}>
                    <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.trip_name')}
                      value={name}
                      onChange={(txt) => {
                        setName(txt)
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
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={() => {}}
                    />
                      <Pressable
                       onPress={()=>showTimepicker1()}>
                    <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.trip_date')}
                      value={date.toString()}
                      onChange={(txt) => {
                        // setDate(txt)
                      }}
                      iconSize={20}
                      iconName="calendar-range"
                      placeholder=""
                      disabled={false}
                      error={false}
                      mode="flat"
                      numberOnly=""
                      maxLength={30}
                      editable={false}
                      style={{}}
                      dense=""
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={showTimepicker1}
                    />
                    </Pressable>
                    
                    <Pressable
                        onPress={()=>showTimepicker2()}
                      >
                      <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.trip_time')}
                      value={time.toString()}
                      onChange={(txt) => {
                        // setDate(txt)
                      }}
                      iconSize={20}
                      iconName="calendar-range"
                      placeholder=""
                      disabled={false}
                      error={false}
                      mode="flat"
                      numberOnly=""
                      maxLength={30}
                      editable={false}
                      style={{}}
                      dense=""
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={showTimepicker2}
                    />
                    </Pressable>
                    <Dropdown
                      options={driverList}
                      selectedValue={driver}
                      placeholder={I18n.t('tripManagment.driver')}
                      onChange={(txt)=>{
                          setDriver(txt)
                      }}
                     
                    />
                    <Dropdown
                      options={vehicles}
                      selectedValue={vehicle}
                      placeholder={I18n.t('tripManagment.assinged_vehicle')}
                      onChange={(txt)=>{
                        setVehicle(txt)
                        if(vehicles.length>0){
                          let i =  vehicles.findIndex(get)
                          if(i!=-1){
                           setCapacity(vehicles[i].capacity)
                          }
                         
                          function get(item) {
                            return item.value == txt
                          }
                        }
                      }}
                    />
                    <Dropdown
                      options={godowns}
                      selectedValue={startGd}
                      placeholder={I18n.t('tripManagment.start_godown')}
                      onChange={(txt)=>{
                        setStartGd(txt)
                      }}
                    />
            
                    <Dropdown
                      options={godowns}
                      selectedValue={endGd}
                      placeholder={I18n.t('tripManagment.end_godown')}
                      onChange={(txt)=>{
                        setEndGd(txt)
                      }}
                          />
                          <View style={{marginBottom:30}}></View>
                  </View>
                </View>
                )
              }
              {
                select == 1 && (
                  <View style={style.container}>
                  <View style={{marginTop: 20}}>
                    <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.trip_name')}
                      value={name1}
                      onChange={(txt) => {
                        setName1(txt)
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
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={() => {}}
                    />
            
                    <Pressable
                       onPress={()=>showTimepicker1()}>
                    <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.trip_date')}
                      value={date.toString()}
                      onChange={(txt) => {
                        // setDate(txt)
                      }}
                      iconSize={20}
                      iconName="calendar-range"
                      placeholder=""
                      disabled={false}
                      error={false}
                      mode="flat"
                      numberOnly=""
                      maxLength={30}
                      editable={false}
                      style={{}}
                      dense=""
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={showTimepicker1}
                    />
                    </Pressable>
                    
                    <Dropdown
                      options={slotList}
                      placeholder={I18n.t('tripManagment.trip_time_slot')}
                      onChange={(txt)=>{
                        setSlotId(txt)
                        
                       
                      }}
                    />
                    <Dropdown
                      options={deliveryBoyList}
                      placeholder={I18n.t('tripManagment.delivery_boy')}
                      onChange={(txt)=>{
                        setDeliveryBoy(txt)
                      }}
                    />
                      {/* <Dropdown
                      options={driverList}
                      selectedValue={driver}
                      placeholder={I18n.t('tripManagment.driver')}
                      onChange={(txt)=>{
                          setDriver(txt)
                      }}
                     
                    /> */}
                     <Dropdown
                      options={driverList}
                      selectedValue={driver}
                      placeholder={I18n.t('tripManagment.driver')}
                      onChange={(txt)=>{
                          setDriver(txt)
                      }}
                     
                    />
                    <Dropdown
                      options={vehicles}
                      selectedValue={vehicle}
                      placeholder={I18n.t('tripManagment.assinged_vehicle')}
                      onChange={(txt)=>{
                        setVehicle(txt)
                        if(vehicles.length>0){
                          let i =  vehicles.findIndex(get)
                          if(i!=-1){
                           setCapacity(vehicles[i].capacity)
                          }
                         
                          function get(item) {
                            return item.value == txt
                          }
                        }

                      }}
                    />
                    <Dropdown
                      options={godowns}
                      selectedValue={startGd}
                      placeholder={I18n.t('tripManagment.start_godown')}
                      onChange={(txt)=>{
                        setStartGd(txt)
                      }}
                    />
            
                    <Dropdown
                      options={godowns}
                      selectedValue={endGd}
                      placeholder={I18n.t('tripManagment.end_godown')}
                      onChange={(txt)=>{
                        setEndGd(txt)
                      }}
                          />
                  
                  </View>
                </View>
                )
              }
              {
                select == 2 && (
                  <View style={style.container}>
                  <View style={{marginTop: 20}}>
                  <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.trip_name')}
                      value={name2}
                      onChange={(txt) => {
                        setName2(txt)
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
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={() => {}}
                    />
                      <Pressable
                       onPress={()=>showTimepicker1()}>
                    <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.trip_date')}
                      value={date.toString()}
                      onChange={(txt) => {
                        // setDate(txt)
                      }}
                      iconSize={20}
                      iconName="calendar-range"
                      placeholder=""
                      disabled={false}
                      error={false}
                      mode="flat"
                      numberOnly=""
                      maxLength={30}
                      editable={false}
                      style={{}}
                      dense=""
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={showTimepicker1}
                    />
                    </Pressable>
                    
                    <Pressable
                        onPress={()=>showTimepicker2()}
                      >
                      <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.trip_time')}
                      value={time.toString()}
                      onChange={(txt) => {
                        // setDate(txt)
                      }}
                      iconSize={20}
                      iconName="calendar-range"
                      placeholder=""
                      disabled={false}
                      error={false}
                      mode="flat"
                      numberOnly=""
                      maxLength={30}
                      editable={false}
                      style={{}}
                      dense=""
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={showTimepicker2}
                    />
                    </Pressable>
                    <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.omc_trip_driver')}
                      value={driver}
                      onChange={(txt) => {
                        setDriver(txt)
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
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={() => {}}
                    />
                    {/* <Dropdown
                      options={driverList}
                      selectedValue={driver}
                      placeholder={I18n.t('tripManagment.omc_trip_driver')}
                      onChange={(txt)=>{
                          setDriver(txt)
                      }}
                     
                    /> */}
                     <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.omc_trip_vehicle')}
                      value={vehicle}
                      onChange={(txt) => {
                        setVehicle(txt)
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
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={() => {}}
                    />
                    {/* <Dropdown
                      options={vehicles}
                      selectedValue={vehicle}
                      placeholder={I18n.t('tripManagment.omc_trip_vehicle')}
                      onChange={(txt)=>{
                        setVehicle(txt)
                        if(vehicles.length>0){
                          let i =  vehicles.findIndex(get)
                          if(i!=-1){
                           setCapacity(vehicles[i].capacity)
                          }
                         
                          function get(item) {
                            return item.value == txt
                          }
                        }
                      }}
                    /> */}
                    <Dropdown
                      options={godowns}
                      selectedValue={endGd}
                      placeholder={I18n.t('tripManagment.omc_godown')}
                      onChange={(txt)=>{
                        setEndGd(txt)
                      }}
                    />
            
                   
                          <View style={{marginBottom:30}}></View>
                  </View>
                </View>
                )
              }
              {
                select == 3 && (
                  <View style={style.container}>
                  <View style={{marginTop: 20}}>
                  <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.trip_name')}
                      value={name3}
                      onChange={(txt) => {
                        setName3(txt)
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
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={() => {}}
                    />
                      <Pressable
                       onPress={()=>showTimepicker1()}>
                    <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.trip_date')}
                      value={date.toString()}
                      onChange={(txt) => {
                        // setDate(txt)
                      }}
                      iconSize={20}
                      iconName="calendar-range"
                      placeholder=""
                      disabled={false}
                      error={false}
                      mode="flat"
                      numberOnly=""
                      maxLength={30}
                      editable={false}
                      style={{}}
                      dense=""
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={showTimepicker1}
                    />
                    </Pressable>
                    
                    <Pressable
                        onPress={()=>showTimepicker2()}
                      >
                      <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.trip_time')}
                      value={time.toString()}
                      onChange={(txt) => {
                        // setDate(txt)
                      }}
                      iconSize={20}
                      iconName="calendar-range"
                      placeholder=""
                      disabled={false}
                      error={false}
                      mode="flat"
                      numberOnly=""
                      maxLength={30}
                      editable={false}
                      style={{}}
                      dense=""
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={showTimepicker2}
                    />
                    </Pressable>
                    <Dropdown
                      options={roleList != null ? roleList : []}
                      placeholder={I18n.t('tripManagment.assing_mechanic')}
                      onChange={(txt)=>{
                          setMechanic(txt)
                      }}
                          />
                     <Dropdown
                      options={vehicles}
                      selectedValue={vehicle}
                      placeholder={I18n.t('tripManagment.assinged_vehicle')}
                      onChange={(txt)=>{
                        setVehicle(txt)
                        if(vehicles.length>0){
                          let i =  vehicles.findIndex(get)
                          if(i!=-1){
                           setCapacity(vehicles[i].capacity)
                          }
                         
                          function get(item) {
                            return item.value == txt
                          }
                        }
                      }}
                    />
                          <View style={{marginBottom:30}}></View>
                  </View>
                </View>
                )
              }
              {
                select == 4 && (
                  <View style={style.container}>
                  <View style={{ marginTop: 20 }}>
                  <View style={style.tabContaner}>
                <TouchableOpacity
                  style={isInward ? style.tabItemActive : style.tabItemInActive}
                  onPress={() => {
                    if (!isInward) {
                      setisInward(true);
                      setisOutward(false);
                    }
                  }}>
                  <Text style={style.tabText}>
                    {I18n.t('tripManagment.inward')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={isOutward ? style.tabItemActive : style.tabItemInActive}
                  onPress={() => {
                    if (!isOutward) {
                      setisInward(false);
                      setisOutward(true);
                    }
                  }}>
                  <Text style={style.tabText}>
                    {I18n.t('tripManagment.outward')}
                  </Text>
                </TouchableOpacity>
              </View>
              <Input
                  secureTextEntry={false}
                  label={I18n.t('tripManagment.agency_name')}
                  value={agencyName}
                  onChange={(txt) => {setAgencyName(txt)}}
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
                <Dropdown
                      options={godowns}
                      selectedValue={endGd}
                      placeholder={I18n.t('tripManagment.omc_godown')}
                      onChange={(txt)=>{
                        setEndGd(txt)
                      }}
                />
                <Input
                  secureTextEntry={false}
                  label={I18n.t('tripManagment.trip_name')}
                  value={name4}
                  onChange={(txt) => {setName4(txt)}}
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
        
        <Pressable
                       onPress={()=>showTimepicker1()}>
                    <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.trip_date')}
                      value={date.toString()}
                      onChange={(txt) => {
                        // setDate(txt)
                      }}
                      iconSize={20}
                      iconName="calendar-range"
                      placeholder=""
                      disabled={false}
                      error={false}
                      mode="flat"
                      numberOnly=""
                      maxLength={30}
                      editable={false}
                      style={{}}
                      dense=""
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={showTimepicker1}
                    />
                    </Pressable>
                    
                    <Pressable
                        onPress={()=>showTimepicker2()}
                      >
                      <Input
                      secureTextEntry={false}
                      label={I18n.t('tripManagment.trip_time')}
                      value={time.toString()}
                      onChange={(txt) => {
                        // setDate(txt)
                      }}
                      iconSize={20}
                      iconName="calendar-range"
                      placeholder=""
                      disabled={false}
                      error={false}
                      mode="flat"
                      numberOnly=""
                      maxLength={30}
                      editable={false}
                      style={{}}
                      dense=""
                      isAvailable={false}
                      success={false}
                      hintText=""
                      keyboardType="default"
                      onFocus={showTimepicker2}
                    />
                    </Pressable>
                    <Dropdown
                      options={driverList}
                      selectedValue={driver}
                      placeholder={I18n.t('tripManagment.driver')}
                      onChange={(txt)=>{
                          setDriver(txt)
                      }}
                     
                    />
                    <Dropdown
                      options={vehicles}
                      selectedValue={vehicle}
                      placeholder={I18n.t('tripManagment.assinged_vehicle')}
                      onChange={(txt)=>{
                        setVehicle(txt)
                        if(vehicles.length>0){
                          let i =  vehicles.findIndex(get)
                          if(i!=-1){
                           setCapacity(vehicles[i].capacity)
                          }
                         
                          function get(item) {
                            return item.value == txt
                          }
                        }
                      }}
                    />
                
                <View style={{marginBottom:30}}></View>
              </View>
            </View>
                )
              }
              
            </View>
          </ProgressStep>

          <ProgressStep
            label={I18n.t('tripCreation.stepper.stepper3')}
            // nextBtnText={constants.orderCreation.proceed}
            // nextBtnStyle={styles.nextButtonStyle}
            // nextBtnTextStyle={styles.nextButtonText}
            // previousBtnStyle={styles.previousButtonStyle}
            // previousBtnTextStyle={styles.nextButtonText}
            // previousBtnText={constants.orderCreation.back}
            removeBtnRow={true}>
                <DeleteModal
                  showDialog={todelete}
                  setShowDialog={setToDelete}
                  title={I18n.t('errorMessage.delete_staff')}
                  onDelete={deleteItem}
                />
             
            <View style={{marginTop: 20}}>
              <TouchableOpacity
                style={styles.dashedBUtton}
                onPress={() => {
                  setshowDialog(true);
                }}>
                <Text style={styles.buttonText}>
                  {I18n.t('tripCreation.add_item')}
                </Text>
              </TouchableOpacity>
              {qtyList.length>0 ? <FlatList
                keyExtractor={keyExtractor}
                data={qtyList}
                renderItem={({item,index}) => (
                  <List.Item
                    style={styles.listStyle}
                    title={item.filledCylinder ? 'Refilled Cyl.' : 'Empty Cyl.:'}
                    description={item.name +'\n'+'Qty. '+item.qty}
                    titleStyle={styles.listTitle}
                    descriptionStyle={styles.listDesriptoin}
                    right={props => (
                      <List.Icon
                        icon={() => (
                          <View style={{display: 'flex', flexDirection: 'row'}}>
                            <View style={styles.icon1Container}>
                              <Icon
                                name={'delete'}
                                color={config.DARK_GREY}
                                size={15}
                                onPress={()=>{
                                  setItemName(item.id)
                                  setToDelete(true)
                                }}
                              />
                            </View>
                            <View style={styles.icon2Container}>
                              <Icon
                                name={'edit'}
                                color={config.GREY}
                                size={15}
                                onPress={()=>{
                                  setshowDialog(true)
                                }}
                              />
                            </View>
                          </View>
                        )}
                      />
                    )}
                  />
                )}
                
              />
             
              : 
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
                {I18n.t('listingEmptyMessage.no_items')}
              </Text>
            </View>        
                }
              <View style={{marginTop: 80}}></View>
              {exceed &&
                <View style={style.wrap}>
                <View style={style.warning}>
                  <Text style={{color: config.WHITE,fontSize: 14}}>{I18n.t('errorMessage.over_exceed')}</Text>
                </View>
                </View>} 
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
                onPress={() => {navigation.navigate('TripManagment')}}>
                {I18n.t('tripCreation.submit')}
              </Button>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </FilterWrapper>
    </View>
  );
};

export default TripCreation;
