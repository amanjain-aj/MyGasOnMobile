import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import styles from './OrderDeatil.styles';
import Header from '../../components/atoms/Header';
import constants from '../../constants/constants';
import FilterWrapper from '../../components/FilterWrapper';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import OrderInitiated from './StatusScreens/OrderInitiated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from "../../config/i18n";
import config from '../../config/colors';
import OrderAccceptCard from '../../components/atoms/OrderAcceptCard';
import DeliveryCallCard from '../../components/atoms/DeliveryCallCard';
import ChalanCard from '../../components/atoms/ChalanCard';
import DeliverQuantityCard from '../../components/atoms/DeliverQuantityCard';
import GiveCompliment from './GiveCompliment';
import ChalanModal from '../../components/atoms/Modals/ChalanModal';
import RatingModal from '../../components/atoms/Modals/RatingModal';
import FailModal from '../../components/atoms/Modals/FailModal';
import PostponeDelivery from '../../components/atoms/Modals/PostponeDeliveryModal';
import OtpDetailScreen from './StatusScreens/OtpDetailScreen';
import OtpVerifyScreen from './StatusScreens/OtpVerifyScreen';
import FooterTab from '../../components/atoms/FooterTab';
import OrderCreation from '../OrderManagment/OrderCreation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {getOrderById,updateOrder} from '../../api/orderApi';
import Spinner from 'react-native-loading-spinner-overlay';
import RadioGroup from '../../components/atoms/RadioGroup';

const OrderDeatils: any = ({navigation,route}: {navigation: any,route: any}) => {
  const specificOrderData = [];
  const [isCustomer, setisCustomer] = useState(false);
  const [showChalan, setshowChalan] = useState(false);
  const [showRatingModal, setRatingModal] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showPostpone, setShowPostpone] = useState(false);
  const [orderData,setOrderData]= useState(null);
  const [showDailog, setshowDailog] = useState(false);
  const [step,setStep] = useState(0)
  const [error,setError] = useState(false)
  const [token,setToken] = useState('')
  const [id,setId]= useState('')
  const [loading,setLoading] = useState(false)
  const cancelOrder = () => {
    setShowCancel(true);
    console.warn('canvel');
  };

  const postPoneDelivery = () => {
    setShowPostpone(true);
  };

  const acceptDetailsData = {
    acceptedBy: 'Raju Pandey\n(Bihari Gas)',
    acceptedDate: '25 June',
    acceptedTime: '12:00PM',
    acceptedRemark: 'N/A',
  };

  const deliveryDetailsData = {
    vehicleModel: 'TATA Ace',
    vehicleType: 'Truck\nDL4SAQ 7596',
    deliveryBoyName: 'Rajguru (Bihari Gas)',
  };

  const chalanDetaisData = {
    tax_invoice: 'TI-1020-099399',
  };

  const quantityDetaisData = {
    delivered: '20',
    recived: '18',
  };

  const triggerUpdate =(body,token,orderId) => {
    updateOrder(body,token,orderId).then((res)=>{
      console.log("response",res.data)
    })
    .catch(err=>{
      console.log("Error",err)
    })
  }


  useFocusEffect(
    React.useCallback(()=>{
      AsyncStorage.multiGet(['API_TOKEN', 'USER_ID','USER_ROLE'], (err, items) => {
        if (err) {
          console.warn(err);
          let error_msg = `Error in usefocuseffect() under Ordermanagement class with ${err}`;
          throw error_msg;
        }
      
       
        getOrderById(route.params.orderId,items[0][1]).then((res)=>{
          setLoading(true)
          if(res.data.length>0 || res.data != undefined){

            console.log("Response",res.data)
            setOrderData(res.data)
            setLoading(false)
            
          }else{
              
            setLoading(false)
          }
        })
        .catch(err=>{
          setLoading(false)
          console.log("Error",err);
        })
    
      })
    
    },[])
  )
  
  const tripList = [
    {
      status: 'ACCEPTED',
     
    },
    {
      status: 'REJECTED',
    },
    {
      status: 'ASSIGNED',
    },
    {
      status: 'OUT FOR DELIVERY',
    },
    {
      status: 'REACHED',
    },
    {
      status: 'DELIVERED',
    },
    {
      status: 'COMPLETED',
    },
  ];
 

  return (
    
    <View style={styles.container}>
      <Header navigation={navigation} title={I18n.t('orderDetail.header')} />
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
      {/* Modal for ChalanDetails and Rating Confirmaiton Here */}
      <ChalanModal showDialog={showChalan} setShowDialog={setshowChalan} />
      <RatingModal
        showDialog={showRatingModal}
        setShowDialog={setRatingModal}
      />
        <Portal>
        <Dialog
          style={[styles.dialog]}
          visible={showDailog}
          onDismiss={() => {
            setshowDailog(false);
          }}>
          <Dialog.Content style={styles.dialogContent}>
            <View style={styles.innnerConatiner}>
              <Text style={styles.dialogTitle}>
                {I18n.t('orderCard.assing_trip')}
              </Text>
              <>
                <RadioGroup
                  radioGroupList={tripList}
                  initialvalue={0}
                  onChange={() => {}}
                />
              </>
              <Button
                style={{marginTop: 15}}
                labelStyle={[styles.buttonT]}
                mode="contained"
                onPress={() => setshowDailog(false)}>
                {I18n.t('orderManagment.proceed')}
              </Button>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
      {/* cancel or postpone modal here */}
      <FailModal
        showDialog={showCancel}
        setShowDialog={setShowCancel}
        title={I18n.t('failModal.cancel_order')}
        subTitle={I18n.t('failModal.succesfully_cancel_order')}
      />

      <PostponeDelivery
        showDialog={showPostpone}
        setShowDialog={setShowPostpone}
      />

      <FilterWrapper navigation={''} showFilter={false}>
        {/* Progress STepper Here */}

        <ProgressSteps
          borderWidth={2}
          completedProgressBarColor={'#33CC33'}
          labelFontSize={10}
          completedStepIconColor={'#33CC33'}
          activeLabelColor={'#33CC33'}
          activeStep={step}
          >
          {/* Step 1: Initiated */}

          <ProgressStep label={I18n.t('orderDetail.steps.initiated')}
              nextBtnText={I18n.t('orderDetail.changeStatus')}
              nextBtnStyle={styles.nextButtonStyle}
              nextBtnTextStyle={styles.nextButtonText}
              previousBtnStyle={{display:'none'}}
              onNext = {()=>{
                setshowDailog(true)
                setError(true)
              }} 
              errors={error} 
          >
            {
                orderData !== null &&
              
            <View>
              <OrderInitiated
                navigation={navigation}
                isModified={true}
                cancelOrder={cancelOrder}
                postPoneDelivery={postPoneDelivery}
                orderData = {orderData}
              />
            </View> 

}
          </ProgressStep>

          {/* Step 2: Accepted */}

          <ProgressStep label={I18n.t('orderDetail.steps.accepted')}
            nextBtnText={I18n.t('orderDetail.changeStatus')}
            nextBtnStyle={styles.nextButtonStyle}
            nextBtnTextStyle={styles.nextButtonText}
            previousBtnStyle={{display:'none'}}
              previousBtnTextStyle={styles.nextButtonText}
              previousBtnText={I18n.t('orderCreation.back')}
              onNext = {()=>{

              }} 
              errors={error} 
              >
            <View>
              <OrderAccceptCard acceptDetails={acceptDetailsData}
              callDelivery={false}/>
              <View style={{height: 20}} />
              {
                orderData !== null &&
              
            <View>
              <Pressable onPress={()=>{setStep(0)}}>
              <OrderInitiated
                navigation={navigation}
                isModified={true}
                cancelOrder={cancelOrder}
                postPoneDelivery={postPoneDelivery}
                orderData = {orderData}
              />
              </Pressable>
            </View> 
}
            </View>
          </ProgressStep>

          {/* Step 3: Assinged */}

          <ProgressStep label={I18n.t('orderDetail.steps.assinged')}
            nextBtnText={I18n.t('orderDetail.changeStatus')}
            nextBtnStyle={styles.nextButtonStyle}
            nextBtnTextStyle={styles.nextButtonText}
            previousBtnStyle={{display:'none'}}
              previousBtnTextStyle={styles.nextButtonText}
              previousBtnText={I18n.t('orderCreation.back')}
              onNext = {()=>{

              }} 
              errors={error} 
              >
            <View>
              <DeliveryCallCard deliveryDetails={deliveryDetailsData} />
              <View style={{height: 20}} />
              <Pressable onPress={()=>{setStep(1)}}>
              <OrderAccceptCard acceptDetails={acceptDetailsData}
              callDelivery={ false}/>
              </Pressable>
              <View style={{height: 20}} />
              {
                orderData !== null &&
              
            <View>
              <Pressable onPress={()=>{setStep(0)}}>
              <OrderInitiated
                navigation={navigation}
                isModified={false}
                cancelOrder={cancelOrder}
                postPoneDelivery={postPoneDelivery}
                orderData = {orderData}
              />
              </Pressable>
            </View> 
}
              {/* <OrderInitiated navigation={navigation} isModified={false} /> */}
            </View>
          </ProgressStep>

          {/* Step 4:Out for Delivery */}

          <ProgressStep label={I18n.t('orderDetail.steps.out_for_delivery')}
            nextBtnText={I18n.t('orderDetail.changeStatus')}
            nextBtnStyle={styles.nextButtonStyle}
            nextBtnTextStyle={styles.nextButtonText}
            previousBtnStyle={{display:'none'}}
              previousBtnTextStyle={styles.nextButtonText}
              previousBtnText={I18n.t('orderCreation.back')}
              onNext = {()=>{

              }} 
              errors={error} 
              >
            <View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon
                  name={'truck-delivery'}
                  color={config.NAVY_BLUE}
                  size={220}
                />
                <Text
                  style={{
                    fontSize: 34,
                    fontWeight: '700',
                    textAlign: 'center',
                    color: config.FADED_BLUE,
                    textTransform: 'uppercase',
                  }}>
                  {I18n.t('orderDetailCard.order_to_be_deliver')}
                </Text>
              </View>
              <View style={{height: 20}} />
              <Pressable onPress={()=>{setStep(2)}}>
              <DeliveryCallCard deliveryDetails={deliveryDetailsData} />
              </Pressable>
              <View style={{height: 20}} />
              <Pressable onPress={()=>{setStep(1)}}>
              <OrderAccceptCard acceptDetails={acceptDetailsData}
                callDelivery={ false}/>
                </Pressable>
              <View style={{height: 20}} />
              {
                orderData !== null &&
              
            <View>
               <Pressable onPress={()=>{setStep(0)}}>
              <OrderInitiated
                navigation={navigation}
                isModified={false}
                cancelOrder={cancelOrder}
                postPoneDelivery={postPoneDelivery}
                orderData = {orderData}
              />
              </Pressable>
            </View> 
}
              {/* <OrderInitiated navigation={navigation} isModified={false} /> */}
            </View>
          </ProgressStep>

          {/* Step 5: Delivered */}

          <ProgressStep label={I18n.t('orderDetail.steps.delivered')}
            nextBtnText={I18n.t('orderDetail.changeStatus')}
            nextBtnStyle={styles.nextButtonStyle}
            nextBtnTextStyle={styles.nextButtonText}
            previousBtnStyle={{display:'none'}}
              previousBtnTextStyle={styles.nextButtonText}
              previousBtnText={I18n.t('orderCreation.back}')}
              onNext = {()=>{

              }} 
              errors={error} 
              >
            <View>
              <DeliverQuantityCard quantityDetails={quantityDetaisData} />
              <View style={{height: 20}} />
              {isCustomer ? (
                <OtpDetailScreen />
              ) : (
               <OtpVerifyScreen />
              )}
              <View style={{height: 20}} />

              <ChalanCard chalanDetais={chalanDetaisData} />
              <View style={{height: 20}} />
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon
                  name={'truck-delivery'}
                  color={config.NAVY_BLUE}
                  size={220}
                />
                <Text
                  style={{
                    fontSize: 34,
                    fontWeight: '700',
                    textAlign: 'center',
                    color: config.FADED_BLUE,
                    textTransform: 'uppercase',
                  }}>
                  {I18n.t('orderDetailCard.order_to_be_deliver')}
                </Text>
              </View>
              <View style={{height: 20}} />
              <Pressable onPress={()=>{setStep(2)}}>
              <DeliveryCallCard deliveryDetails={deliveryDetailsData} />
              </Pressable>
              <View style={{height: 20}} />
              <Pressable onPress={()=>{setStep(1)}}>
              <OrderAccceptCard acceptDetails={acceptDetailsData} />
              </Pressable>
              <View style={{height: 20}} />
              {
                orderData !== null &&
              
            <View>
               <Pressable onPress={()=>{setStep(0)}}>
              <OrderInitiated
                navigation={navigation}
                isModified={false}
                cancelOrder={cancelOrder}
                postPoneDelivery={postPoneDelivery}
                orderData = {orderData}
              />
              </Pressable>
            </View> 
}
              {/* <OrderInitiated navigation={navigation} isModified={false} /> */}
            </View>
          </ProgressStep>
          

          {/* Step 6: Completed  */}

          <ProgressStep label={I18n.t('orderDetail.steps.comleted')}
          removeBtnRow={true}>
            <GiveCompliment navigaiton={navigation} />
          </ProgressStep>
        </ProgressSteps>
      </FilterWrapper>

      <FooterTab navigation={navigation}
        onAddRoute={'OrderCreation'}
        isAdd={true}
                
      />



    </View>
  );
};

export default OrderDeatils;
