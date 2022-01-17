import React, {useState} from 'react';
import {StyleSheet, Text, SafeAreaView, Image, View, ScrollView} from 'react-native';
import {Card, Drawer, IconButton, Title} from 'react-native-paper';
import Header from '../../components/atoms/Header';
import SideDrawer from '../../components/SideDrawer';
import constants from '../../constants/constants';
import I18n from '../../config/i18n';
import styles from './dashboard.styles';
import config from '../../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import FooterTab from '../../components/atoms/FooterTab';

const CustomerDashboard = ({navigation}: {navigation: any}) => {
  const [active, setActive] = React.useState('');

  return (
    <>
      <Header title={I18n.t('common.dashboard')} navigation={navigation} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow:1}}> 
        <View style ={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.toolBox}>
                <Card style={styles.toolContent1}>
                    <Card.Content style={styles.content}>
                    <Title style={styles.cardSubTitle1}>
                        {I18n.t('customerDashboard.reach_status')}
                    </Title>
                   
                    </Card.Content>
                </Card>
                </View>
               
                    
                <View style={styles.cardBox}>
                <Card style={styles.cardContent}>
                    <Card.Content>
                    <Title style={styles.cardTitle}>
                        {I18n.t('customerDashboard.pending_order')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                        <IconCommunity name={'file'} color={config.GREY} size={15} />
                        <Text style={styles.text}>
                        {30}
                        </Text>
                    </View>
                    <IconButton
                        icon="arrow-right"
                        color={config.SKY_BLUE}
                        size={15}
                        onPress={() => {
                        
                        }}
                    />
                    </Card.Actions>
                </Card>
                <Card style={styles.cardContent}>
                    <Card.Content>
                    <Title style={styles.cardTitle}>
                    {I18n.t('customerDashboard.todays_delivery')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                        <IconCommunity name={'truck-delivery'} color={config.GREY} size={15} />
                        <Text style={styles.text}>
                        {30}
                        </Text>
                    </View>
                    <IconButton
                        icon="arrow-right"
                        color={config.SKY_BLUE}
                        size={15}
                        onPress={() => {
                        
                        }}
                    />
                    </Card.Actions>
                </Card>
                </View>
                <View style={styles.cardBox}>
                <Card style={styles.cardContent}>
                    <Card.Content>
                    <Title style={styles.cardTitle}>
                    {I18n.t('customerDashboard.pending_imbalance')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                    <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/icons/imablance.png')}></Image>
                        <Text style={styles.text}>
                        {30}
                        </Text>
                    </View>
                    <IconButton
                        icon="arrow-right"
                        color={config.SKY_BLUE}
                        size={15}
                        onPress={() => {
                        
                        }}
                    />
                    </Card.Actions>
                </Card>
                <Card style={styles.cardContent}>
                    <Card.Content>
                    <Title style={styles.cardTitle}>
                    {I18n.t('customerDashboard.todays_collection')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                        <IconCommunity name={'wallet'} color={config.GREY} size={15} />
                        <Text style={styles.text}>
                        {0}
                        </Text>
                    </View>
                    <IconButton
                        icon="arrow-right"
                        color={config.SKY_BLUE}
                        size={15}
                        onPress={() => {
                        
                        }}
                    />
                    </Card.Actions>
                </Card>
                </View>
                <View style={styles.cardBox}>
                <Card style={styles.cardContent}>
                    <Card.Content>
                    <Title style={styles.cardTitle}>
                    {I18n.t('customerDashboard.pending_payment')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                        <IconCommunity name={'currency-inr'} color={config.GREY} size={15} />
                        <Text style={styles.text}>
                        {18}
                        </Text>
                    </View>
                    <IconButton
                        icon="arrow-right"
                        color={config.SKY_BLUE}
                        size={15}
                        onPress={() => {
                        
                        }}
                    />
                    </Card.Actions>
                </Card>
                <Card style={styles.cardContent}>
                    <Card.Content>
                    <Title style={styles.cardTitle}>
                    {I18n.t('customerDashboard.todays_defective')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                    <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/icons/defective.png')}></Image>
                        <Text style={styles.text}>
                        {30}
                        </Text>
                    </View>
                    <IconButton
                        icon="arrow-right"
                        color={config.SKY_BLUE}
                        size={15}
                        onPress={() => {
                        
                        }}
                    />
                    </Card.Actions>
                </Card>
                </View>
                <View style={styles.cardBox}>
                <Card style={styles.cardContent}>
                    <Card.Content>
                    <Title style={styles.cardTitle}>
                    {I18n.t('customerDashboard.todays_refill')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                    <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/icons/refill.png')}></Image>
                        <Text style={styles.text}>
                        {18}
                        </Text>
                    </View>
                    <IconButton
                        icon="arrow-right"
                        color={config.SKY_BLUE}
                        size={15}
                        onPress={() => {
                        
                        }}
                    />
                    </Card.Actions>
                </Card>
                <Card style={styles.cardContent}>
                    <Card.Content>
                    <Title style={styles.cardTitle}>
                    {I18n.t('customerDashboard.todays_new_pos')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                    <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/icons/defective.png')}></Image>
                        <Text style={styles.text}>
                        {30}
                        </Text>
                    </View>
                    <IconButton
                        icon="arrow-right"
                        color={config.SKY_BLUE}
                        size={15}
                        onPress={() => {
                        
                        }}
                    />
                    </Card.Actions>
                </Card>
                </View>
               
                <View style={styles.toolBox}>
                <Card style={styles.toolContent2}>
                    <Card.Content style={styles.content}>
                    <Title style={styles.cardSubTitle1}>
                        {I18n.t('customerDashboard.bill')}
                    </Title>
      
                    </Card.Content>
                </Card>
                </View> 
            </View>
        </View>
        </ScrollView>
        <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </>
  );
};



export default CustomerDashboard;
