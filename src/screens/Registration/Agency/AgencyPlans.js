import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

import CONSTANTS from './../../../constants/constants';
import I18n from "../../../config/i18n";

import PreAuthFormWrapper from './../../../components/PreAuthFormWrapper';
import PreLoginLayout from './../../../components/PreLoginLayout';

import styles from './../Registration.styles';
import { ScrollView } from 'react-native';

const RegisterAgencyPlans = ({ navigation }) => {
  return (
    <ScrollView>
      <PreLoginLayout>
        <PreAuthFormWrapper
          titlePreFix={I18n.t('registration.agency.titlePre')}
          titlePostFix={I18n.t('registration.agency.titlePost')}
        >
          {I18n.t('registration.agency.agencyPlans.map')(
            ({ id, title, description, buttonText, screenName }) => (
              <Fragment key={id}>
                <View>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.description}>{description}</Text>
                </View>
                <Button
                  style={styles.button}
                  labelStyle={styles.btnLabel}
                  mode="contained"
                  onPress={() => navigation.navigate(screenName)}
                >
                  {buttonText}
                </Button>
              </Fragment>
            )
          )}
        </PreAuthFormWrapper>
      </PreLoginLayout>
    </ScrollView>
  );
};

export default RegisterAgencyPlans;
