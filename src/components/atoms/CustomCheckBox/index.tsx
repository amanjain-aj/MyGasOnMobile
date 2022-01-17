import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Checkbox } from 'react-native-paper'
import styles from './customCheckBox.styles'
import config from '../../../config/colors'

const CustomCheckBox: any = ({ title, subtitle, onChecked, isChecked }) => {
    
    const [checked, setchecked] = useState(isChecked)

    return (
        <View>
             <View style={styles.rowWrapper}>
                  <View style={{display: 'flex', flexDirection: 'column'}}>
                    <Checkbox
                      color={config.SKY_BLUE}
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                          setchecked(!checked)
                          onChecked(!checked)
                      }}
                    />
                  </View>
                  <View>
                    <Text style={styles.label}>
                      {title}
                    </Text>
                   {subtitle && <Text style={styles.value}>
                      {subtitle}
                    </Text>}
                  </View>
                </View>
        </View>
    )
}

export default CustomCheckBox
