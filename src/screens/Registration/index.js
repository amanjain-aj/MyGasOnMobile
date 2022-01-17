import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

import CONSTANTS from './../../constants/constants';
import I18n from "../../config/i18n";

import PreAuthFormWrapper from './../../components/PreAuthFormWrapper';
import PreLoginLayout from './../../components/PreLoginLayout';

import styles from './Registration.styles';

const registrationData = [
  {
    id: 'ndCustomer',
    title: I18n.t('registration.categories.ndCustomerLabel'),
    screenName: 'RegisterNDCustomerPersonalInfo',
  },
  {
    id: 'agency',
    title: I18n.t('registration.categories.agencyLabel'),
    screenName: 'RegisterAgencyOwnerDetails',
  },
];

const Registration = ({ navigation }) => {
  return (
    <PreLoginLayout>
      <PreAuthFormWrapper
        titlePreFix={I18n.t('registration.title_pre')}
        titlePostFix={I18n.t('registration.title_post')}
      >
        {registrationData.map(({ id, title, description, screenName }) => (
          <Fragment key={id}>
            <View>
              <Text style={styles.title}>{title}</Text>
            </View>

            <Button
              style={styles.button}
              labelStyle={styles.btnLabel}
              mode="contained"
              onPress={() => navigation.navigate(screenName)}
            >
              {I18n.t('registration.registerHere')}
            </Button>
          </Fragment>
        ))}
      </PreAuthFormWrapper>
    </PreLoginLayout>
  );
};

export default Registration;
