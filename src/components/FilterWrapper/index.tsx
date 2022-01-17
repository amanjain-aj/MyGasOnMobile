import React, {ReactElement} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import styles from './FilterWrapper.styles';
import config from '../../config/colors';

const FilterWrapper = ({children, navigation, showFilter}) => {
  return (
    <ScrollView  style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View
          style={styles.innerContainer}
          >
          {showFilter !== false && (
            <View style={styles.filterIcon}>
              <IconButton
                icon="filter"
                color={config.SKY_BLUE}
                size={25}
                onPress={() => {
                  navigation.navigate('ListingFilter');
                }}
              />
            </View>
          )}
          <View style={{marginTop: 10}}>{children}</View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FilterWrapper;
