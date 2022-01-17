import React from 'react';
import {View, Text} from 'react-native';
import styles from './LekageDetail.styles';
import Header from '../../components/atoms/Header';
import constants from '../../constants/constants';
import I18n from "../../config/i18n";
import FilterWrapper from '../../components/FilterWrapper';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import FooterTab from '../../components/atoms/FooterTab';
import InitiatedLeakage from './Steps/InitiatedLeakage';
import OrderAccceptCard from '../../components/atoms/OrderAcceptCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import config from '../../config/colors';
import DropDown from '../../components/atoms/Dropdown';
import {Button} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';

const options = [
  {label: '1', value: '1', key: 1},
  {label: '2', value: '2', key: 2},
  {label: '3', value: '3', key: 3},
  {label: '4', value: '4', key: 4},
];

const LekageDetail: any = ({navigation}: {navigation: any}) => {
  const acceptDetailsData = {
    acceptedBy: 'Dharma\n(Bihari Gas)',
    acceptedDate: '25 June',
    acceptedTime: '12:00PM',
    acceptedRemark: 'N/A',
  };

  const customerDetails = {
    customerName: 'Moti Mahal',
    orderDate: '25 July',
    orderTime: '09:00AM',
    createdBy: 'Manoj Kumar',
    reason: 'Gas Tube/Pipeline Leak',
    itemName: '19 kg LPG Cyl',
    itemQty: '10',
    deliveryDate: '26 July',
    paymentStatus: 'Credit',
    address: '28, Sector A, Aliganj, Lucknow-226004',
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={I18n.t('lekageDetail.header')} />

      <FilterWrapper navigation={''} showFilter={false}>
        {/* Progress STepper Here */}

        <ProgressSteps
          borderWidth={2}
          completedProgressBarColor={'#33CC33'}
          labelFontSize={10}
          completedStepIconColor={'#33CC33'}
          activeLabelColor={'#33CC33'}>
          {/* Step 1: Initiated */}

          <ProgressStep
            label={I18n.t('lekageDetail.steps.initiated')}
            nextBtnText={I18n.t('lekageDetail.change_status')}
            nextBtnStyle={styles.nextButtonStyle}
            nextBtnTextStyle={styles.nextButtonText}
            previousBtnStyle={{display: 'none'}}>
            <View>
              <InitiatedLeakage
                viewButtons={true}
                isModified={true}
                customerDetails={customerDetails}
                postPoneVisit={() => {}}
                cancelVisit={() => {}}
              />
              <View style={{marginBottom: 30}}></View>

            </View>
          </ProgressStep>
          <ProgressStep
            label={I18n.t('lekageDetail.steps.accepted')}
            nextBtnText={I18n.t('lekageDetail.change_status')}
            nextBtnStyle={styles.nextButtonStyle}
            nextBtnTextStyle={styles.nextButtonText}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.nextButtonText}
            previousBtnText={I18n.t('orderCreation.back')}>
            <View>
              <View style={{marginBottom: 20}}></View>

              <OrderAccceptCard
                acceptDetails={acceptDetailsData}
                callDelivery={false}
              />
              <View style={{marginBottom: 20}}></View>
              <InitiatedLeakage
                viewButtons={true}
                isModified={true}
                customerDetails={customerDetails}
                postPoneVisit={() => {}}
                cancelVisit={() => {}}
              />
              <View style={{marginBottom: 30}}></View>

            </View>
          </ProgressStep>
          <ProgressStep
            label={I18n.t('lekageDetail.steps.assinged')}
            nextBtnText={I18n.t('lekageDetail.change_status')}
            nextBtnStyle={styles.nextButtonStyle}
            nextBtnTextStyle={styles.nextButtonText}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.nextButtonText}
            previousBtnText={I18n.t('orderCreation.back')}>
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
                  {I18n.t('lekageDetail.mechanic_visit_soon')}
                </Text>
              </View>

              <View style={{marginBottom: 20}}></View>

              <OrderAccceptCard
                acceptDetails={acceptDetailsData}
                callDelivery={true}
              />
              <View style={{marginBottom: 20}}></View>
              <InitiatedLeakage
                viewButtons={true}
                isModified={false}
                customerDetails={customerDetails}
                postPoneVisit={() => {}}
                cancelVisit={() => {}}
              />
              <View style={{marginBottom: 30}}></View>

            </View>
          </ProgressStep>
          <ProgressStep
            label={I18n.t('lekageDetail.steps.reached')}
            nextBtnText={I18n.t('lekageDetail.change_status')}
            nextBtnStyle={styles.nextButtonStyle}
            nextBtnTextStyle={styles.nextButtonText}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.nextButtonText}
            previousBtnText={I18n.t('orderCreation.back')}>
            <View>
              <View style={{marginBottom: 20}}></View>

              <View>
                <DropDown
                  options={options}
                  placeholder={I18n.t('lekageDetail.reason_for_leakage')}
                />
                <DropDown
                  options={options}
                  placeholder={I18n.t('lekageDetail.solution_for_leakage')}
                />
                <View style={{marginBottom: 20}}></View>

                <Button
                  labelStyle={[styles.button]}
                  mode="contained"
                  onPress={() => {}}>
                  {I18n.t('lekageDetail.submit')}
                </Button>
              </View>

              <View style={{marginBottom: 20}}></View>
              <InitiatedLeakage
                viewButtons={false}
                isModified={false}
                customerDetails={customerDetails}
                postPoneVisit={() => {}}
                cancelVisit={() => {}}
              />
              <View style={{marginBottom: 30}}></View>

            </View>
          </ProgressStep>
          <ProgressStep
            label={I18n.t('lekageDetail.steps.comleted')}
            removeBtnRow={true}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: '700',
                  textAlign: 'center',
                  color: config.FADED_BLUE,
                  marginTop: 20,
                  marginBottom: 20,
                }}>
                {'Dharma' + I18n.t('lekageDetail.recived_rating')}
              </Text>

              <View style={{marginBottom: 10}}></View>
              <AirbnbRating
                count={5}
                selectedColor={config.SKY_BLUE}
                unSelectedColor={config.LIGHT_GREY}
                starContainerStyle={{padding: 5}}
                defaultRating={4}
                size={30}
                reviewSize={0}
              />
              <View style={{marginBottom: 40}}></View>

              <Text
                style={{
                  color: config.GREY,
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                {'“Awesome support \nLove it :) ”'}
              </Text>
              <View style={{marginBottom: 50}}></View>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </FilterWrapper>

      <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </View>
  );
};

export default LekageDetail;
