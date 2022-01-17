import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import styles from './ProfileBottomCard.styles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import config from  '../../../config/colors';


const ProfileBottomCard = ({cardDetails,onPress}) => {
    return (
        <View style={styles.container}>
           <Text style={styles.titlePreFix}>
            {cardDetails.firstname+" "+cardDetails.lastname}
           
            </Text>
            <Text style={styles.adressText}>{cardDetails.detail_address}</Text>
            <Button
                icon={() => (
                    <Icon style ={{position: 'absolute',left:-5,top: -11}} name={'arrow-forward'} color={config.WHITE} size={20} />
                )}
                contentStyle={{flexDirection:'row-reverse'}}
                style={styles.button}
                labelStyle={[styles.buttonLabel]}
                
                mode="contained"
                onPress={onPress}>
              {cardDetails.firstname+" "+cardDetails.lastname+" PROFILE"}
            </Button>
        </View>
    )
}

export default ProfileBottomCard
