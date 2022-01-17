import React from 'react';
import {View} from 'react-native';
import Header from '../../components/atoms/Header';
import PostAuthWrapper from '../../components/PostAuthWrapper';
import CONSTANTS from '../../constants/constants';
import I18n from "../../config/i18n";

import styles from '../HelpCenter/HelpCenter.styles';
import FooterTab from '../../components/atoms/FooterTab';


const PlanDetails: any = ({navigation}: {navigation: any}) => {

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title={I18n.t('planDetails.')}
      />

    <PostAuthWrapper
        navigation={navigation}
        subtitle={I18n.t('planDetails.text')}
        isAgencyHomePage={false}
        isEdit={false}
        isHelpCenter={true}>

      </PostAuthWrapper>

      <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </View>
  );
};

export default PlanDetails;