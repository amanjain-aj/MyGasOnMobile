import React from 'react';
import { View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../components/atoms/Header';
import PostAuthWrapper from '../../../components/PostAuthWrapper';
import CONSTANTS from '../../../constants/constants';
import I18n from "../../../config/i18n";
import Input from '../../../components/atoms/Input';
import DropDown from '../../../components/atoms/Dropdown';
import styles from './Lead.styles';
import config from '../../../config/colors';
import { Button, Title } from 'react-native-paper';

const GenerateLead: any = ({navigation}: {navigation: any}) => {


    const options =[
        { label: '1', value: '1', key: 1 },
        { label: '2', value: '2', key: 2 },
        { label: '3', value: '3', key: 3 },
        { label: '4', value: '4', key: 4 },
    ];
    
    return(
        <View style={styles.container}>
             <Header navigation={navigation}
             title={ I18n.t('agencyProfileEdit.header')}
            />
             <PostAuthWrapper
                titlePreFix={ I18n.t('leadGeneration.title_prefix')}
                titlePostFix={ I18n.t('leadGeneration.title_postfix')}
                subtitle={''}
                navigation = {navigation}
                isAgencyHomePage = {false}
                isEdit = {false}
            >
                  <DropDown 
                    options= {options}
                    placeholder ={ I18n.t('leadGeneration.customer_type')}
                
                   
                />
                <Input
                    secureTextEntry = {false}
                    label={ I18n.t('leadGeneration.customer_name')}
                    value = ""
                    onChange={()=>{}}
                    iconSize = {20}
                    iconName='account-network'
                    placeholder = { I18n.t('leadGeneration.customer_name')}
                    disabled = {false}
                    error = {false}
                    mode = 'flat'
                    numberOnly = ''
                    maxLength= {30}
                    style = {{}}
                    dense = ''
                    isAvailable = {false}
                    success = {false}
                    hintText =""
                    keyboardType = 'default'
                    onFocus = {()=>{}}
                />
                <Input
                    secureTextEntry = {false}
                    label={ I18n.t('leadGeneration.customer_person_name')}
                    value = ""
                    onChange={()=>{}}
                    iconSize = {20}
                    iconName='account-network'
                    placeholder = { I18n.t('leadGeneration.customer_person_name')}
                    disabled = {false}
                    error = {false}
                    mode = 'flat'
                    numberOnly = ''
                    maxLength= {30}
                    style = {{}}
                    dense = ''
                    isAvailable = {false}
                    success = {false}
                    hintText =""
                    keyboardType = 'default'
                    onFocus = {()=>{}}
                />
                <Input
                    secureTextEntry = {false}
                    label={ I18n.t('leadGeneration.phone')}
                    value = ""
                    onChange={()=>{}}
                    iconSize = {20}
                    iconName='cellphone'
                    placeholder = { I18n.t('leadGeneration.phone')}
                    disabled = {false}
                    error = {false}
                    mode = 'flat'
                    numberOnly = ''
                    maxLength= {30}
                    style = {{}}
                    dense = ''
                    isAvailable = {false}
                    success = {false}
                    hintText =""
                    keyboardType = 'default'
                    onFocus = {()=>{}}
                />
                <Input
                    secureTextEntry = {false}
                    label={ I18n.t('leadGeneration.email')}
                    value = ""
                    onChange={()=>{}}
                    iconSize = {20}
                    iconName='gmail'
                    placeholder = { I18n.t('leadGeneration.email')}
                    disabled = {false}
                    error = {false}
                    mode = 'flat'
                    numberOnly = ''
                    maxLength= {30}
                    style = {{}}
                    dense = ''
                    isAvailable = {false}
                    success = {false}
                    hintText =""
                    keyboardType = 'default'
                    onFocus = {()=>{}}
                />
                 <DropDown 
                    options= {options}
                    placeholder ={ I18n.t('leadGeneration.omc')}
                   
                />
                 <Input
                    secureTextEntry = {false}
                    label={ I18n.t('leadGeneration.existing_cyl_discount')}
                    value = ""
                    onChange={()=>{}}
                    iconSize = {20}
                    iconName='currency-inr'
                    placeholder = { I18n.t('leadGeneration.existing_cyl_discount')}
                    disabled = {false}
                    error = {false}
                    mode = 'flat'
                    numberOnly = ''
                    maxLength= {30}
                    style = {{}}
                    dense = ''
                    isAvailable = {false}
                    success = {false}
                    hintText =""
                    keyboardType = 'default'
                    onFocus = {()=>{}}
                />
                <DropDown 
                    options= {options}
                    placeholder ={ I18n.t('leadGeneration.cyliner_type')}
                   
                />
                <Input
                    secureTextEntry = {false}
                    label={ I18n.t('leadGeneration.monthly_consumption')}
                    value = ""
                    onChange={()=>{}}
                    iconSize = {20}
                    iconName='battery-60'
                    placeholder = { I18n.t('leadGeneration.monthly_consumption')}
                    disabled = {false}
                    error = {false}
                    mode = 'flat'
                    numberOnly = ''
                    maxLength= {30}
                    style = {{}}
                    dense = ''
                    isAvailable = {false}
                    success = {false}
                    hintText =""
                    keyboardType = 'default'
                    onFocus = {()=>{}}
                />
                <Input
                    secureTextEntry = {false}
                    label={ I18n.t('leadGeneration.in_stock_capacity')}
                    value = ""
                    onChange={()=>{}}
                    iconSize = {20}
                    iconName='gas-cylinder'
                    placeholder = { I18n.t('leadGeneration.in_stock_capacity')}
                    disabled = {false}
                    error = {false}
                    mode = 'flat'
                    numberOnly = ''
                    maxLength= {30}
                    style = {{}}
                    dense = ''
                    isAvailable = {false}
                    success = {false}
                    hintText =""
                    keyboardType = 'default'
                    onFocus = {()=>{}}
                />
                <Input
                    secureTextEntry = {false}
                    label={ I18n.t('leadGeneration.expected_discount')}
                    value = ""
                    onChange={()=>{}}
                    iconSize = {20}
                    iconName='currency-usd-off'
                    placeholder = { I18n.t('leadGeneration.expected_discount')}
                    disabled = {false}
                    error = {false}
                    mode = 'flat'
                    numberOnly = ''
                    maxLength= {30}
                    style = {{}}
                    dense = ''
                    isAvailable = {false}
                    success = {false}
                    hintText =""
                    keyboardType = 'default'
                    onFocus = {()=>{}}
                />
                <Input
                    secureTextEntry = {false}
                    label={ I18n.t('leadGeneration.payment_terms')}
                    value = ""
                    onChange={()=>{}}
                    iconSize = {20}
                    iconName='clipboard-outline'
                    placeholder = { I18n.t('leadGeneration.payment_terms')}
                    disabled = {false}
                    error = {false}
                    mode = 'flat'
                    numberOnly = ''
                    maxLength= {30}
                    style = {{}}
                    dense = ''
                    isAvailable = {false}
                    success = {false}
                    hintText =""
                    keyboardType = 'default'
                    onFocus = {()=>{}}
                />
                 <Input
                    secureTextEntry = {false}
                    label={ I18n.t('leadGeneration.opening_dates')}
                    value = ""
                    onChange={()=>{}}
                    iconSize = {20}
                    iconName='file-document'
                    placeholder = {  I18n.t('leadGeneration.opening_dates')}
                    disabled = {false}
                    error = {false}
                    mode = 'flat'
                    numberOnly = ''
                    maxLength= {30}
                    style = {{}}
                    dense = ''
                    isAvailable = {false}
                    success = {false}
                    hintText =""
                    keyboardType = 'default'
                    onFocus = {()=>{}}
                />
                 <Button
                    icon={() => (
                        <Icon style ={{position: 'absolute',right: -85,top: -12}} name={'arrow-forward'} color={config.WHITE} size={25} />
                      )} 
                    contentStyle={{flexDirection: 'row-reverse'}}
                    labelStyle={[styles.button]}
                    mode="contained"
                    onPress={() => {} }
                >
                    { I18n.t('leadGeneration.acknowledge')}
                </Button>
               
                <View>
                <Title style={styles.suggestionTitle}>{I18n.t('leadGeneration.acknowledge')}</Title>
                <Input
                    secureTextEntry = {false}
                    label={ I18n.t('leadGeneration.subject')}
                    value = ""
                    onChange={()=>{}}
                    iconSize = {20}
                    iconName=''
                    placeholder =''
                    disabled = {false}
                    error = {false}
                    mode = 'flat'
                    numberOnly = ''
                    maxLength= {30}
                    style = {{}}
                    dense = ''
                    success = {false}
                    hintText =""
                    isAvailable = {false}
                    keyboardType = 'default'
                    onFocus = {()=>{}}
                />
                <Input
                    secureTextEntry = {false}
                    label={ I18n.t('leadGeneration.message')}
                    value=''
                    onChange={()=>{}}
                    iconSize = {20}
                    iconName=''
                    placeholder =''
                    disabled = {false}
                    error = {false}
                    mode = 'flat'
                    numberOnly = ''
                    maxLength= {30}
                    style = {{}}
                    dense = ''
                    success = {false}
                    hintText =""
                    isAvailable = {false}
                    keyboardType = 'default'
                    onFocus = {()=>{}}
                />
            </View>
            <Button
                    labelStyle={styles.button}
                    mode="contained"
                    onPress={() => {} }
                >
                    { I18n.t('leadGeneration.submit')}
                </Button>
            </PostAuthWrapper>
        </View>


    );
}

export default GenerateLead;