import React, { useState } from 'react';
import {Text, View, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import CONSTANTS from '../../constants/constants';
import Header from '../../components/atoms/Header';
import styles from './Language.styles';
import { Card, Title } from 'react-native-paper';
import I18n from '../../config/i18n';
import { useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterTab from '../../components/atoms/FooterTab';




const Language: any =({navigation}: {navigation: any}) => {

        const [language,setLanguage] = useState('en');

        const changeLanguage = async (text) => {
            I18n.locale = text;
            navigation.dispatch(resetAction)
            await AsyncStorage.setItem('Language', text);
        }
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{name: 'App'}],
          });
        return(
           
            <View style ={styles.contianer}>
                 <Header navigation={navigation} title={I18n.t('language.header')} />
                 <ScrollView>
                 <View style={styles.wrapper}>
                 <View style={styles.cardBox}>
                     <Card style={styles.cardContent} onPress={()=>changeLanguage('en')}>
                        <Card.Content >
                            <Title style={styles.cardTitle} >
                                English
                            </Title>
                            <Title style={styles.cardSubTitle} >
                                English
                            </Title>
                        </Card.Content>
                    </Card>
                    <Card style={styles.cardContent} onPress={()=>changeLanguage('hi')}>
                        <Card.Content>
                            <Title style={styles.cardTitle} >
                                Hindi
                            </Title>
                            <Title style={styles.cardSubTitle} >
                                हिंदी
                            </Title>
                        </Card.Content>
                    </Card>
                    </View>
                    <View style={styles.cardBox}>
                    <Card style={styles.cardContent} onPress={()=>changeLanguage('bn')}>
                    <Card.Content>
                            <Title style={styles.cardTitle} >
                            Bengali
                            </Title>
                            <Title style={styles.cardSubTitle} >
                            বাংলা
                            </Title>
                        </Card.Content>
                       
                    </Card>
                    <Card style={styles.cardContent} onPress={()=>changeLanguage('gu')}>
                    <Card.Content>
                            <Title style={styles.cardTitle} >
                            Gujarati
                            </Title>
                            <Title style={styles.cardSubTitle} >
                            ગુજરાતી
                            </Title>
                        </Card.Content>
                    </Card>
                    </View>
                    <View style={styles.cardBox} >
                    <Card style={styles.cardContent} onPress={()=>changeLanguage('ml')}>
                    <Card.Content>
                            <Title style={styles.cardTitle} >
                            Malayalam
                            </Title>
                            <Title style={styles.cardSubTitle} >
                            മലയാളം
                            </Title>
                        </Card.Content>
                    </Card>
                    <Card style={styles.cardContent} onPress={()=>changeLanguage('kn')}>
                        <Card.Content>
                            <Title style={styles.cardTitle} >
                            Kannada
                            </Title>
                            <Title style={styles.cardSubTitle} >
                            ಕನ್ನಡ
                            </Title>
                        </Card.Content>
                    </Card>
                    </View>
                    <View style={styles.cardBox}>
                    <Card style={styles.cardContent} onPress={()=>changeLanguage('mr')}>
                    <Card.Content>
                            <Title style={styles.cardTitle} >
                            Marathi
                            </Title>
                            <Title style={styles.cardSubTitle} >
                            मराठी
                            </Title>
                        </Card.Content>
                    </Card>
                    <Card style={styles.cardContent} onPress={()=>changeLanguage('te')}>
                    <Card.Content>
                            <Title style={styles.cardTitle} >
                            Telugu
                            </Title>
                            <Title style={styles.cardSubTitle} >
                            తెలుగు
                            </Title>
                        </Card.Content>
                    </Card>
                    </View>
                 
                 
                    <View style={styles.cardBox}>
                    <Card style={styles.cardContent} onPress={()=>changeLanguage('ta')}>
                        <Card.Content>
                            <Title style={styles.cardTitle} >
                            Tamil
                            </Title>
                            <Title style={styles.cardSubTitle} >
                            தமிழ்
                            </Title>
                        </Card.Content>
                    </Card>
                   
                    </View>
                 </View>
                 </ScrollView>
                 <FooterTab navigation={navigation} onAddRoute={''} isAdd={false} />
            </View>
           

        )
}

export default Language;