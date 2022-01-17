import React, {ReactElement} from 'react';
import {ScrollView} from 'react-native';
import {Text, View} from 'react-native';
import BgImage from '../atoms/BgImage';
import Logo from './../atoms/Logo';


import styles from './PreAuthFormWrapper.styles';

const PreAuthFormWrapper = ({titlePreFix, titlePostFix, children}) => {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow:1}}>
      <View style={styles.container}>
     
        <View style={styles.innerContainer}>
          <View style={styles.title}>
            <Text style={styles.titlePreFix}>
              {titlePreFix}
              {!!titlePostFix && (
                <Text style={styles.titlePostFix}>&nbsp;{titlePostFix}</Text>
              )}
            </Text>
            <View style={styles.titleUnderLineWrapper}>
              <View style={styles.titleUnderline} />
            </View>
          </View>
          {children}
        </View>
        <View style={[styles.titleUnderline, styles.underLine]} />
      </View>
    </ScrollView>
  );
};

export default PreAuthFormWrapper;
