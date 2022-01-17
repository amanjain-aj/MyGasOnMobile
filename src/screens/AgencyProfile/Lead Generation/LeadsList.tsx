import React from 'react';
import { View,FlatList, SafeAreaView,Text } from 'react-native';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../components/atoms/Header';
import LeadsCard from '../../../components/atoms/LeadsCard';
import styles from './Lead.styles';
import CONSTANTS from '../../../constants/constants';
import I18n from "../../../config/i18n";
import FilterWrapper from '../../../components/FilterWrapper';
import config from '../../../config/colors';
import FooterTab from '../../../components/atoms/FooterTab';



const LeadsList: any = ({navigation}:{navigation: any}) => {


const leadsList = [
    {
        requestedBy: 'Kallu Singh',
        createdDate : '26 Apr, 8:00 AM',
        customer_type:  'Existing',
        customer_name: 'Moti Mahal',
        cylinder_type: '19 Kg'
    
    },
    {
        requestedBy: 'Kallu Singh',
        createdDate : '26 Apr, 8:00 AM',
        customer_type:  'Existing',
        customer_name: 'Moti Mahal',
        cylinder_type: '19 Kg'
    
    },
    {
        requestedBy: 'Kallu Singh',
        createdDate : '26 Apr, 8:00 AM',
        customer_type:  'Existing',
        customer_name: 'Moti Mahal',
        cylinder_type: '19 Kg'
    
    },
    {
        requestedBy: 'Kallu Singh',
        createdDate : '26 Apr, 8:00 AM',
        customer_type:  'Existing',
        customer_name: 'Moti Mahal',
        cylinder_type: '19 Kg'
    
    },
    {
        requestedBy: 'Kallu Singh',
        createdDate : '26 Apr, 8:00 AM',
        customer_type:  'Existing',
        customer_name: 'Moti Mahal',
        cylinder_type: '19 Kg'
    
    },
   
]
const selectedFilter = [ I18n.t('leadGenerationFilter.created_by'), I18n.t('leadGenerationFilter.customer_type'), I18n.t('leadGenerationFilter.date'), I18n.t('leadGenerationFilter.item_type')]
const keyExtractor = (item, index) => index.toString()


const renderItem = ({item}) => (
            <LeadsCard 

            requestedBy = {item.requestedBy}
            createdDate = {item.createdDate}
            customer_type = {item.customer_type}
            customer_name ={item.customer_name}
            cylinder_type ={item.cylinder_type}
        
            
            />
)
    
    return(

        <View style={styles.container}>
             <Header navigation={navigation}
             title={ I18n.t('agencyProfileEdit.header')}
            />
            <FilterWrapper
                navigation={''}
                showFilter = {true}
            >
            <View style={styles.filterWrapper}>
                <View style={styles.filterContent}>
                    <Text style={styles.filterText}>{selectedFilter[0]}</Text>
                </View>
                <View style={styles.filterContent}>
                    <Text style={styles.filterText}>{selectedFilter[1]}</Text>
                </View>
                <View style={styles.filterContent}>
                    <Text style={styles.filterText}>{selectedFilter[2]}</Text>
                </View>
                <View style={styles.filterContent}>
                    <Text style={styles.filterText}>{selectedFilter[3]}</Text>
                </View>
            </View>
            <SafeAreaView  style={{flex: 1}}>
            { leadsList.length ? <FlatList
                keyExtractor={keyExtractor}
                data={leadsList}
                renderItem={renderItem}
            />: 
            <View style={{display: 'flex',alignItems: 'center',justifyContent:'center'}}>
            <Text style={{fontSize: 24,fontWeight: 'bold'}}>{I18n.t('listingEmptyMessage.no_lead_generation')}</Text>
        </View>
            }
            </SafeAreaView>
            
                
            </FilterWrapper>

            <FooterTab navigation={navigation}
        onAddRoute={''}
        isAdd={true}
        onPress={() => {
          console.warn("Customr")
        }}
            />
            
        </View>


    );


}

export default LeadsList;