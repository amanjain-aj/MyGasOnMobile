import React from 'react';
import {View, Text} from 'react-native';
import constants from '../../../constants/constants';
import styles from './ChalanCard.styles';

const ChalanCard: any = ({chalanDetais}) => {
  return (
    <View style={styles.contractWrapper}>
      <View style={styles.rowWrapper}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.label}>
            {constants.chalanCard.recived_chalan}
          </Text>
          <Text style={styles.valueUnderLine}>
            {constants.chalanCard.viewFile}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>{constants.chalanCard.other_slip}</Text>
          <Text style={[styles.valueUnderLine, {textAlign: 'right'}]}>
            {constants.chalanCard.viewFile}
          </Text>
        </View>
      </View>

      <View style={styles.rowWrapper}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={styles.label}>
            {constants.chalanCard.tax_invoce}
          </Text>
          <Text style={styles.value}>
            {chalanDetais.tax_invoice}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>{constants.chalanCard.download_invoice}</Text>
          <Text style={[styles.valueUnderLine, {textAlign: 'right'}]}>
            {constants.chalanCard.viewFile}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChalanCard;
