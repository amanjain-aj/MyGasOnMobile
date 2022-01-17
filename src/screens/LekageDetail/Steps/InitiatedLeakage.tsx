import React from 'react';
import {View, Text} from 'react-native';
import styles from '../LekageDetail.styles';
import {Button} from 'react-native-paper';
import config from '../../../config/colors';
import constants from '../../../constants/constants';
import I18n from "../../../config/i18n";
import LekageDetail from '../LekageDetail';
import LekageDetailCard from '../../../components/atoms/LekageDetailCard';

const InitiatedLeakage = ({
  isModified,
  customerDetails,
  postPoneVisit,
  cancelVisit,
  viewButtons,
}) => {
  return (
    <View>
      {viewButtons && viewButtons ? (
        <View>
          <Button
            style={
              isModified
                ? {backgroundColor: config.NAVY_BLUE}
                : {opacity: 0.5, backgroundColor: config.NAVY_BLUE}
            }
            contentStyle={{flexDirection: 'row-reverse'}}
            labelStyle={[styles.button]}
            mode="contained"
            onPress={() => {
              postPoneVisit;
            }}>
            {constants.lekageDetail.postpone_visit}
          </Button>
          <View style={{height: 20}} />
          <Button
            style={isModified ? {} : {opacity: 0.5}}
            contentStyle={{flexDirection: 'row-reverse'}}
            labelStyle={[styles.button]}
            mode="contained"
            onPress={() => {
              cancelVisit;
            }}>
            {I18n.t('lekageDetail.cancel_visit')}
          </Button>
        </View>
      ) : (
        <View></View>
      )}
      <View style={{height: 30}} />

      <LekageDetailCard cardDetails={customerDetails} />
    </View>
  );
};

export default InitiatedLeakage;
