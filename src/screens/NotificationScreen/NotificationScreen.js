/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Styles from './NotificationScreen.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/atoms/Header';
import FooterTab from '../../components/atoms/FooterTab';
const AccordionComponent = () => {
    const [expanded, setExpanded] = React.useState(false);
    return (
        <View style={Styles.AccordionComponentView}>
            <TouchableOpacity onPress={() => { setExpanded(!expanded) }} style={Styles.AccordionComponentTopView}>
                <View>
                    <Text style={Styles.AccordionComponentBottomText}><Icon name={'circle'} color='#33CC33' size={7} />  Trip TR001 Completed</Text>
                    <Text style={Styles.AccordionComponentTimeText}>08:55 am</Text>
                </View>
                <Icon name={'expand-more'} color='#979797' size={25} />
            </TouchableOpacity>
            {
                expanded ?
                    <View style={Styles.AccordionComponentBottomView}>
                        <Text style={Styles.AccordionComponentBottomText}>Trip TR001 assigned to Ashok Sati has been completed by 06:00 PM</Text>
                    </View>
                    : null
            }
            
        </View>
    );
}

export default function NotificationScreen({navigation}) {
    return (
        <View style={Styles.container} >
            <Header title={'Notifications'} navigation={navigation} />
            <View style={Styles.scrollComp}>
                <ScrollView style={Styles.ScrollViewComp} showsVerticalScrollIndicator={false}>
                    <AccordionComponent />
                    <AccordionComponent />
                    <AccordionComponent />
                </ScrollView>
            </View>
            <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
        </View>
    );
}