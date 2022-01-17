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
import PreAuthFormWrapper from '../../components/PreAuthFormWrapper';

const AgencyDashboard = ({navigation}: {navigation: any}) => {
  const [active, setActive] = React.useState('');

  return (
    <>
      <Header title={I18n.t('common.dashboard')} navigation={navigation} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow:1}}> 
        <View style ={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.toolBox}>
                <Card style={styles.toolContent}>
                    <Card.Content style={styles.content}>
                    <Title style={styles.cardSubTitle}>
                        {I18n.t('agencyDashboard.trip_to_close')}
                    </Title>
                    <IconButton
                        icon="arrow-right"
                        color={config.SKY_BLUE}
                        size={15}
                        onPress={() => {
                        
                        }}
                    />
                    </Card.Content>
                </Card>
                </View>
                <View style={styles.toolBox}>
                <Card style={styles.toolContent}>
                    <Card.Content style={styles.content}>
                    <Title style={styles.cardSubTitle}>
                        {I18n.t('agencyDashboard.order_created')}
                    </Title>
                    <IconButton
                        icon="arrow-right"
                        color={config.SKY_BLUE}
                        size={15}
                        onPress={() => {
                        
                        }}
                    />
                    </Card.Content>
                </Card>
                </View>   
                <View style={styles.toolBox}>
                <Card style={styles.toolContent}>
                    <Card.Content style={styles.content}>
                    <Title style={styles.cardSubTitle}>
                        {I18n.t('agencyDashboard.order_accepted_not_assigned')}
                    </Title>
                    <IconButton
                        icon="arrow-right"
                        color={config.SKY_BLUE}
                        size={15}
                        onPress={() => {
                        
                        }}
                    />
                    </Card.Content>
                </Card>
                </View>        
                <View style={styles.cardBox}>
                <Card style={styles.cardContent}>
                    <Card.Content>
                    <Title style={styles.cardTitle}>
                        {I18n.t('agencyDashboard.pending_trip')}
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
                <Card style={styles.cardContent}>
                    <Card.Content>
                    <Title style={styles.cardTitle}>
                    {I18n.t('agencyDashboard.todays_trip')}
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
                    {I18n.t('agencyDashboard.pending_order')}
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
                    {I18n.t('agencyDashboard.todays_order')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                        <IconCommunity name={'file'} color={config.GREY} size={15} />
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
                    {I18n.t('agencyDashboard.pending_payment')}
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
                    {I18n.t('agencyDashboard.todays_payment')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                        <IconCommunity name={'currency-inr'} color={config.GREY} size={15} />
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
                    {I18n.t('agencyDashboard.pending_imbalance')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                    <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/icons/imablance.png')}></Image>
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
                    {I18n.t('agencyDashboard.todays_collection')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                        <IconCommunity name={'calendar-today'} color={config.GREY} size={15} />
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
                    {I18n.t('agencyDashboard.defects')}
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
                <Card style={styles.cardContent}>
                    <Card.Content>
                    <Title style={styles.cardTitle}>
                    {I18n.t('agencyDashboard.leaks')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                    <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/icons/cylinder_leakage.png')}></Image>
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
                    {I18n.t('agencyDashboard.stocks')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                    <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/icons/stock.png')}></Image>
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
                    {I18n.t('agencyDashboard.reports')}
                    </Title>
                    </Card.Content>
                    <Card.Actions style={styles.action}>
                    <View style={styles.iconBox}>
                    <Image
                  style={{width: 12, height: 12}}
                  source={require('../../assets/icons/Group.png')}></Image>
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
            </View>
        </View>
        </ScrollView>
        <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
    </>
  );
};



export default AgencyDashboard;
